const data = require("./data");
const inquiries = require("../config/inquiries");
const {
  validateContact,
  validateInquiry,
  validateInquiryFiles,
  saveInquiry,
  MAX_INQUIRY_BODY_BYTES,
  validateApplication,
  appendRecord,
  saveApplication,
  readBody,
} = require("./submissions.cjs");

async function get(request, endpoint) {
  const query = new URL(request.url).searchParams;
  const slug = endpoint.join("/");
  switch (slug) {
    case "main-categories":
      return Response.json({ mainCategories: data.getMainCategories() });
    case "subcategories": {
      const subcategories = data.getSubcategories(
        query.get("mainCategorySlug"),
      );
      return Response.json({ subcategories, count: subcategories.length });
    }
    case "products": {
      const products = data.getProducts({
        mainCategorySlug: query.get("mainCategorySlug"),
        subcategoryId: query.get("subcategoryId"),
      });
      return Response.json({ products, count: products.length });
    }
    case "colors":
      return Response.json(data.getColors(query.get("colorType")));
    case "tinting-centers": {
      const centers = data.getTintingCenters();
      return Response.json({ centers, count: centers.length });
    }
    case "team-members":
      return Response.json({ teamMembers: data.getTeamMembers() });
    case "posts":
      return Response.json({ posts: data.getPosts() });
    case "catalogs":
      return Response.json({ catalogs: data.getCatalogs() });
    case "jobs":
      return Response.json(data.getJobs());
    case "search": {
      const q = query.get("q") || "";
      const results = data.search(q);
      return Response.json({ results, query: q, count: results.length });
    }
    case "contact":
    case "jobs/apply":
      return Response.json(
        { error: "Method not allowed" },
        { status: 405, headers: { Allow: "POST" } },
      );
    default: {
      if (
        endpoint.length === 2 &&
        endpoint[0] === "inquiries" &&
        Object.hasOwn(inquiries, endpoint[1])
      ) {
        return Response.json(
          { error: "Method not allowed" },
          { status: 405, headers: { Allow: "POST" } },
        );
      }
      if (endpoint.length === 2 && endpoint[0] === "products") {
        const product = data.getProduct(endpoint[1]);
        return product
          ? Response.json(product)
          : Response.json({ error: "Product not found" }, { status: 404 });
      }
      return Response.json({ error: "Not found" }, { status: 404 });
    }
  }
}

async function post(request, endpoint) {
  const slug = endpoint.join("/");
  const inquiry =
    endpoint.length === 2 &&
    endpoint[0] === "inquiries" &&
    Object.hasOwn(inquiries, endpoint[1])
      ? endpoint[1]
      : null;
  if (!inquiry && !["contact", "jobs/apply"].includes(slug))
    return Response.json({ error: "Not found" }, { status: 404 });
  try {
    const type = request.headers.get("content-type") || "";
    const bytes = await readBody(
      request,
      slug === "jobs/apply" ? undefined : inquiry && type.includes("multipart/form-data") ? MAX_INQUIRY_BODY_BYTES : 64 * 1024,
    );
    if (slug !== "jobs/apply") {
      let body;
      if (type.includes("application/json"))
        body = JSON.parse(bytes.toString("utf8"));
      else if (type.includes("application/x-www-form-urlencoded") || (inquiry && type.includes("multipart/form-data"))) {
        const form = type.includes("multipart/form-data")
          ? await new Response(bytes, { headers: { "Content-Type": type } }).formData()
          : new URLSearchParams(bytes.toString("utf8"));
        body = Object.fromEntries(form);
        if (inquiry) {
          for (const def of inquiries[inquiry].fields) {
            if (def.type === "checkboxes") body[def.name] = form.getAll(def.name);
            else if (form.getAll(def.name).length > 1)
              return Response.json({ ok: false, errors: ["Duplicate form fields are not allowed."] }, { status: 400 });
          }
        }
      }
      else
        return Response.json(
          { ok: false, errors: ["Unsupported content type."] },
          { status: 415 },
        );
      if (!body || typeof body !== "object" || Array.isArray(body))
        return Response.json(
          { ok: false, errors: ["Invalid form data."] },
          { status: 400 },
        );
      const { record, errors } = inquiry
        ? validateInquiry(inquiries[inquiry], body)
        : validateContact(body);
      const uploads = inquiry ? validateInquiryFiles(inquiries[inquiry], body) : { files: [], errors: [] };
      errors.push(...uploads.errors);
      if (errors.length)
        return Response.json({ ok: false, errors }, { status: 400 });
      if (inquiry) await saveInquiry(inquiry, record, uploads.files);
      else appendRecord("contact-messages", record);
    } else {
      if (!type.includes("multipart/form-data"))
        return Response.json(
          { ok: false, errors: ["Please submit your application with a CV."] },
          { status: 415 },
        );
      const form = await new Response(bytes, {
        headers: { "Content-Type": type },
      }).formData();
      if ([...form.keys()].length > 10 || form.getAll("cv").length !== 1)
        return Response.json(
          { ok: false, errors: ["Upload failed."] },
          { status: 400 },
        );
      const { record, errors } = validateApplication(
        Object.fromEntries(form),
        form.get("cv"),
        data.getJobs(),
      );
      if (errors.length)
        return Response.json({ ok: false, errors }, { status: 400 });
      await saveApplication(record, form.get("cv"));
    }
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (error.status)
      return Response.json(
        { ok: false, errors: [error.message] },
        { status: error.status },
      );
    if (error instanceof SyntaxError || error instanceof TypeError)
      return Response.json(
        { ok: false, errors: ["Invalid form data."] },
        { status: 400 },
      );
    console.error("Submission failed:", error);
    return Response.json(
      {
        ok: false,
        errors: ["Could not save your submission. Please try again."],
      },
      { status: 500 },
    );
  }
}

module.exports = { get, post };
