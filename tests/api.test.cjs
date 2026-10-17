const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const api = require("../lib/api.cjs");
const data = require("../lib/data");
const {
  validateApplication,
  MAX_CV_BYTES,
  readBody,
} = require("../lib/submissions.cjs");

let directory;
const previousStorage = process.env.STORAGE_DIR;
before(() => {
  directory = fs.mkdtempSync(path.join(os.tmpdir(), "aeropolish-test-"));
  process.env.STORAGE_DIR = directory;
});
after(() => {
  if (previousStorage === undefined) delete process.env.STORAGE_DIR;
  else process.env.STORAGE_DIR = previousStorage;
  fs.rmSync(directory, { recursive: true, force: true });
});
const request = (url = "") => new Request(`http://localhost/api/${url}`);
const contact = (body) =>
  api.post(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
    ["contact"],
  );

test("all data APIs retain their response formats", async () => {
  for (const [endpoint, key] of [
    ["main-categories", "mainCategories"],
    ["subcategories", "subcategories"],
    ["products", "products"],
    ["tinting-centers", "centers"],
    ["team-members", "teamMembers"],
    ["posts", "posts"],
    ["catalogs", "catalogs"],
  ]) {
    const response = await api.get(request(endpoint), [endpoint]);
    assert.equal(response.status, 200);
    assert.ok(Array.isArray((await response.json())[key]), endpoint);
  }
  for (const endpoint of ["jobs", "colors"])
    assert.ok(
      Array.isArray(
        await (await api.get(request(endpoint), [endpoint])).json(),
      ),
    );
});

test("product filters, details, and missing products", async () => {
  const products = await (
    await api.get(request("products?mainCategorySlug=interior-paints"), [
      "products",
    ])
  ).json();
  assert.ok(products.count > 0);
  assert.ok(
    products.products.every(
      (product) => product.mainCategory.slug === "interior-paints",
    ),
  );
  const product = products.products[0];
  const filtered = await (
    await api.get(
      request(`products?subcategoryId=${product.subcategory._id}`),
      ["products"],
    )
  ).json();
  assert.ok(
    filtered.products.every(
      (item) => item.subcategory._id === product.subcategory._id,
    ),
  );
  assert.equal(
    (await (await api.get(request(), ["products", product._id])).json())._id,
    product._id,
  );
  assert.equal((await api.get(request(), ["products", "missing"])).status, 404);
});

test("search and color families match their source data", async () => {
  const empty = await (await api.get(request("search?q=a"), ["search"])).json();
  assert.equal(empty.count, 0);
  const product = data.getProducts()[0];
  const result = await (
    await api.get(
      request(`search?q=${encodeURIComponent(product.productNameEn)}`),
      ["search"],
    )
  ).json();
  assert.ok(result.results.some((item) => item.id === product._id));
  const colors = await (
    await api.get(request("colors?colorType=blue"), ["colors"])
  ).json();
  assert.ok(colors.length > 0);
  assert.ok(colors.every((color) => color.colorType === "blue"));
});

test("invalid contact does not create storage; valid contacts append", async () => {
  assert.equal(
    (await contact({ name: "", email: "invalid", message: "" })).status,
    400,
  );
  const destination = path.join(directory, "contact-messages.json");
  assert.equal(fs.existsSync(destination), false);
  const valid = {
    name: "Test User",
    email: "test@example.com",
    message: "Migration test",
  };
  const responses = await Promise.all([
    contact(valid),
    contact({ ...valid, message: "Second message" }),
  ]);
  assert.ok(responses.every((response) => response.status === 201));
  const records = JSON.parse(fs.readFileSync(destination));
  assert.equal(records.length, 2);
  assert.equal(records[1].message, "Second message");
});

test("malformed JSON, oversized requests, and unsupported formats are rejected", async () => {
  const malformed = new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{",
  });
  assert.equal((await api.post(malformed, ["contact"])).status, 400);
  const unsupported = new Request("http://localhost/api/contact", {
    method: "POST",
    body: "hello",
  });
  assert.equal((await api.post(unsupported, ["contact"])).status, 415);
  const tooLarge = new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "a".repeat(70000) }),
  });
  assert.equal((await api.post(tooLarge, ["contact"])).status, 413);
  await assert.rejects(
    readBody(
      new Request("http://localhost", { method: "POST", body: "12345" }),
      4,
    ),
    { status: 413 },
  );
});

test("applications enforce job availability and CV type/size", async () => {
  const jobs = [{ _id: "test-job", title: "Test Job" }];
  const body = {
    jobId: "test-job",
    name: "Test",
    email: "test@example.com",
    phone: "123",
  };
  assert.deepEqual(
    validateApplication(body, new File(["%PDF-test"], "cv.pdf"), jobs).errors,
    [],
  );
  assert.ok(
    validateApplication(body, new File(["test"], "cv.exe"), jobs).errors.length,
  );
  assert.ok(
    validateApplication(body, new File([], "empty.pdf"), jobs).errors.length,
  );
  assert.ok(
    validateApplication(
      body,
      { name: "cv.pdf", size: MAX_CV_BYTES + 1, arrayBuffer() {} },
      jobs,
    ).errors.includes("CV must be 5 MB or smaller."),
  );
  const form = new FormData();
  for (const [name, value] of Object.entries(body)) form.set(name, value);
  form.set("cv", new File(["%PDF-test"], "cv.pdf"));
  const response = await api.post(
    new Request("http://localhost/api/jobs/apply", {
      method: "POST",
      body: form,
    }),
    ["jobs", "apply"],
  );
  assert.equal(response.status, 400); // No test job is added to the real empty job dataset.
  assert.equal(fs.existsSync(path.join(directory, "cv")), false);
});

test("unknown API endpoints and incorrect methods do not return page HTML", async () => {
  assert.equal((await api.get(request(), ["missing"])).status, 404);
  const response = await api.get(request(), ["contact"]);
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("allow"), "POST");
});

test("valid multipart applications persist the CV and application record", async () => {
  const original = data.getJobs;
  data.getJobs = () => [{ _id: "fixture-job", title: "Fixture Job" }];
  try {
    const form = new FormData();
    for (const [key, value] of Object.entries({
      jobId: "fixture-job",
      name: "Test Applicant",
      email: "applicant@example.com",
      phone: "12345678",
    }))
      form.set(key, value);
    form.set(
      "cv",
      new File(["%PDF-1.7\nTest CV"], "resume.pdf", {
        type: "application/pdf",
      }),
    );
    const response = await api.post(
      new Request("http://localhost/api/jobs/apply", {
        method: "POST",
        body: form,
      }),
      ["jobs", "apply"],
    );
    assert.equal(response.status, 201);
    const records = JSON.parse(
      fs.readFileSync(path.join(directory, "job-applications.json")),
    );
    assert.equal(records[0].jobTitle, "Fixture Job");
    assert.equal(
      fs.readFileSync(path.join(directory, records[0].cvFile), "utf8"),
      "%PDF-1.7\nTest CV",
    );
  } finally {
    data.getJobs = original;
  }
});

test("client, vendor and investor inquiries validate and save to separate files", async () => {
  const inquiry = (type, body) =>
    api.post(
      new Request(`http://localhost/api/inquiries/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
      ["inquiries", type],
    );

  const invalid = await inquiry("vendor", {
    company: "Acme",
    email: "bad",
    website: "not-a-url",
    supplyCategory: "Bogus",
  });
  assert.equal(invalid.status, 400);
  const { errors } = await invalid.json();
  assert.ok(errors.includes("A valid email is required."));
  assert.ok(errors.some((error) => error.startsWith("Website")));
  assert.ok(errors.some((error) => error.includes("products / services you supply")));
  assert.equal(
    fs.existsSync(path.join(directory, "vendor-inquiries.json")),
    false,
  );

  const valid = {
    client: {
      name: "Client",
      email: "c@example.com",
      phone: "1",
      company: "Client Engineering",
      companyType: "Private Limited",
      yearEstablished: "2015",
      address: "Industrial Area",
      city: "Pune",
      state: "Maharashtra",
      pinCode: "411001",
      designation: "Purchase Manager",
      industry: "Engineering & Manufacturing",
      products: ["Epoxy Coating", "Industrial Thinner"],
      application: "Metal fabrication",
      monthlyConsumption: "1,000–3,000 Litres",
      message: "Hi",
    },
    vendor: {
      company: "Acme",
      name: "Vendor",
      email: "v@example.com",
      phone: "1",
      cityState: "Mumbai, Maharashtra",
      yearEstablished: "2010",
      website: "https://acme.example",
      supplyCategory: ["Packaging Materials"],
      message: "Hi",
    },
    investor: {
      name: "Investor",
      email: "i@example.com",
      phone: "1",
      countryCode: "+91",
      country: "India",
      investorType: "Strategic Investors",
      message: "Hi",
    },
  };
  for (const [type, body] of Object.entries(valid)) {
    assert.equal((await inquiry(type, body)).status, 201, type);
    const records = JSON.parse(
      fs.readFileSync(path.join(directory, `${type}-inquiries.json`)),
    );
    assert.equal(records.length, 1, type);
    assert.equal(records[0].email, body.email);
  }

  assert.equal((await inquiry("unknown", {})).status, 404);
  assert.equal((await api.get(request(), ["inquiries", "client"])).status, 405);
});
