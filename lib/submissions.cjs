const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const MAX_CV_BYTES = 5 * 1024 * 1024;
const MAX_BODY_BYTES = 6 * 1024 * 1024;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const field = (body, name, max = 200) =>
  String(body[name] || "")
    .trim()
    .slice(0, max);

function validateContact(body) {
  const record = Object.fromEntries(
    [
      "name",
      "email",
      "city",
      "category",
      "countryCode",
      "phone",
      "message",
    ].map((name) => [
      name,
      field(
        body,
        name,
        name === "message"
          ? 5000
          : name === "phone"
            ? 30
            : name === "countryCode"
              ? 10
              : 200,
      ),
    ]),
  );
  const errors = [];
  if (!record.name) errors.push("Name is required.");
  if (!emailPattern.test(record.email))
    errors.push("A valid email is required.");
  if (!record.message) errors.push("Message is required.");
  return { record, errors };
}

// Client / vendor / investor forms, validated against config/inquiries.js
function validateInquiry(definition, body) {
  const record = {};
  const errors = [];
  for (const def of definition.fields) {
    if (def.type === "file") continue;
    if (def.type === "checkboxes") {
      const raw = body[def.name] ?? [];
      const values = Array.isArray(raw) ? raw : [raw];
      const valid = values.every(value => typeof value === "string" && def.options.includes(value));
      record[def.name] = valid ? [...new Set(values)] : [];
      if (!valid) errors.push(`Please choose a valid ${def.label.toLowerCase()}.`);
      if (def.required && !values.length) errors.push(`${def.label} is required.`);
      if (def.allowOther && values.includes("Other")) {
        record[`${def.name}Other`] = field(body, `${def.name}Other`);
        if (!record[`${def.name}Other`]) errors.push(`Please specify other for ${def.label}.`);
      }
      continue;
    }
    const value = field(
      body,
      def.name,
      def.type === "textarea" ? 5000 : def.type === "phone" ? 30 : 200,
    );
    const label = def.label.replace(/\s*\(optional\)$/i, "");
    record[def.name] = value;
    if (def.type === "phone") {
      const codeName = def.name === "phone" ? "countryCode" : `${def.name}CountryCode`;
      record[codeName] = field(body, codeName, 10);
    }
    if (!value) {
      if (def.required) errors.push(`${label} is required.`);
      continue;
    }
    if (def.type === "email" && !emailPattern.test(value))
      errors.push("A valid email is required.");
    if (def.type === "url" && !/^https?:\/\/\S+\.\S+/i.test(value))
      errors.push(
        `${label} must be a valid web address starting with http:// or https://.`,
      );
    if (def.type === "select" && !def.options.includes(value))
      errors.push(`Please choose a valid ${label.toLowerCase()}.`);
    if (def.type === "number" && (!Number.isFinite(Number(value)) ||
        (def.min !== undefined && Number(value) < def.min) ||
        (def.max !== undefined && Number(value) > def.max) ||
        (def.step === 1 && !Number.isInteger(Number(value)))))
      errors.push(`${label} must be a valid number within the allowed range.`);
    if (def.pattern && !new RegExp(`^(?:${def.pattern})$`).test(value))
      errors.push(`${label} must be a valid six-digit Indian PIN code.`);
    if (def.allowOther && value === "Other") {
      record[`${def.name}Other`] = field(body, `${def.name}Other`);
      if (!record[`${def.name}Other`]) errors.push(`Please specify other for ${label}.`);
    }
  }
  return { record, errors };
}

const MAX_INQUIRY_BODY_BYTES = 16 * 1024 * 1024;
function validateInquiryFiles(definition, body) {
  const errors = [];
  const files = [];
  for (const def of definition.fields.filter(def => def.type === "file")) {
    const file = body[def.name];
    if (!file || (file.size === 0 && !file.name)) continue;
    if (typeof file.arrayBuffer !== "function" || !file.size ||
        ![".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"].includes(path.extname(file.name || "").toLowerCase())) {
      errors.push(`${def.label} must be a nonempty PDF, Word, JPG or PNG file.`);
    } else if (file.size > MAX_CV_BYTES) {
      errors.push(`${def.label} must be 5 MB or smaller.`);
    } else files.push({ fieldName: def.name, file });
  }
  return { files, errors };
}

async function saveInquiry(type, record, files) {
  const written = [];
  const attachments = [];
  try {
    for (const { fieldName, file } of files) {
      const folder = path.join(storageDirectory(), "vendor-documents");
      fs.mkdirSync(folder, { recursive: true });
      const name = `${crypto.randomUUID()}${path.extname(file.name).toLowerCase()}`;
      const destination = path.join(folder, name);
      fs.writeFileSync(destination, Buffer.from(await file.arrayBuffer()), { mode: 0o600 });
      written.push(destination);
      attachments.push({ field: fieldName, originalName: path.basename(file.name), file: `vendor-documents/${name}`, size: file.size });
    }
    appendRecord(`${type}-inquiries`, { ...record, ...(attachments.length ? { attachments } : {}) });
  } catch (error) {
    for (const destination of written) fs.unlinkSync(destination);
    throw error;
  }
}

function validateApplication(body, file, jobs) {
  const job = jobs.find((job) => job._id === field(body, "jobId"));
  const record = {
    jobId: job?._id,
    jobTitle: job?.title,
    name: field(body, "name"),
    email: field(body, "email"),
    countryCode: field(body, "countryCode", 10),
    phone: field(body, "phone", 30),
  };
  const errors = [];
  if (!job) errors.push("This job is no longer available.");
  if (!record.name) errors.push("Name is required.");
  if (!emailPattern.test(record.email))
    errors.push("A valid email is required.");
  if (!record.phone) errors.push("Phone is required.");
  const validFile =
    file &&
    typeof file.arrayBuffer === "function" &&
    [".pdf", ".doc", ".docx"].includes(
      path.extname(file.name || "").toLowerCase(),
    ) &&
    file.size > 0;
  if (!validFile) errors.push("Please attach your CV as a PDF or Word file.");
  if (file?.size > MAX_CV_BYTES) errors.push("CV must be 5 MB or smaller.");
  return { record, errors };
}

function storageDirectory() {
  return process.env.STORAGE_DIR
    ? path.resolve(process.env.STORAGE_DIR)
    : path.join(process.cwd(), "storage");
}

// Synchronous read + atomic rename prevents overlapping writes within a Node process.
function appendRecord(name, record) {
  const directory = storageDirectory();
  fs.mkdirSync(directory, { recursive: true });
  const destination = path.join(directory, `${name}.json`);
  const existing = fs.existsSync(destination)
    ? JSON.parse(fs.readFileSync(destination, "utf8"))
    : [];
  existing.push({ ...record, receivedAt: new Date().toISOString() });
  const temporary = `${destination}.${crypto.randomUUID()}.tmp`;
  try {
    fs.writeFileSync(temporary, JSON.stringify(existing, null, 2), {
      mode: 0o600,
    });
    fs.renameSync(temporary, destination);
  } finally {
    if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
  }
}

async function saveApplication(record, file) {
  const directory = path.join(storageDirectory(), "cv");
  fs.mkdirSync(directory, { recursive: true });
  const name = `${crypto.randomUUID()}${path.extname(file.name).toLowerCase()}`;
  const destination = path.join(directory, name);
  fs.writeFileSync(destination, Buffer.from(await file.arrayBuffer()), {
    mode: 0o600,
  });
  try {
    appendRecord("job-applications", { ...record, cvFile: `cv/${name}` });
  } catch (error) {
    fs.unlinkSync(destination);
    throw error;
  }
}

async function readBody(request, limit = MAX_BODY_BYTES) {
  if (Number(request.headers.get("content-length")) > limit) {
    throw Object.assign(new Error("Request is too large."), { status: 413 });
  }
  const reader = request.body?.getReader();
  if (!reader) return Buffer.alloc(0);
  const chunks = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > limit) {
        await reader.cancel();
        throw Object.assign(new Error("Request is too large."), {
          status: 413,
        });
      }
      chunks.push(Buffer.from(value));
    }
  } finally {
    reader.releaseLock();
  }
  return Buffer.concat(chunks);
}

module.exports = {
  MAX_CV_BYTES,
  validateContact,
  validateInquiry,
  validateInquiryFiles,
  saveInquiry,
  MAX_INQUIRY_BODY_BYTES,
  validateApplication,
  appendRecord,
  saveApplication,
  readBody,
};
