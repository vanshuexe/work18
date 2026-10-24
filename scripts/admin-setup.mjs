// Creates (or resets) the admin login in Supabase and checks the database is ready.
//
//   1. Put your Supabase keys in .env.local (see .env.local.example)
//   2. Run supabase/schema.sql once in the Supabase SQL editor
//   3. npm run admin:setup
//
// A strong random password is generated, saved to admin-credentials.local.txt (git-ignored) and
// printed once. Run it again any time to issue a new password.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const root = process.cwd();
for (const file of [".env.local", ".env"]) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) continue;
  for (const line of fs.readFileSync(full, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (match && !(match[1] in process.env)) process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
}

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const service = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = (process.env.ADMIN_EMAIL || "admin@aeropolish.com").trim().toLowerCase();

if (!url || !service) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Fill in .env.local first (see .env.local.example).");
  process.exit(1);
}

function strongPassword(length = 24) {
  const sets = ["ABCDEFGHJKLMNPQRSTUVWXYZ", "abcdefghijkmnopqrstuvwxyz", "23456789", "!@#$%^&*-_=+?"];
  const all = sets.join("");
  const chars = sets.map((set) => set[crypto.randomInt(set.length)]);
  while (chars.length < length) chars.push(all[crypto.randomInt(all.length)]);
  for (let i = chars.length - 1; i > 0; i--) {
    const j = crypto.randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

const admin = createClient(url, service, { auth: { persistSession: false, autoRefreshToken: false } });
const password = strongPassword();

let existing = null;
for (let page = 1; page <= 20 && !existing; page++) {
  const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
  if (error) {
    console.error("Could not read users:", error.message);
    process.exit(1);
  }
  existing = data.users.find((user) => user.email?.toLowerCase() === email) || null;
  if (data.users.length < 200) break;
}

const result = existing
  ? await admin.auth.admin.updateUserById(existing.id, { password, email_confirm: true })
  : await admin.auth.admin.createUser({ email, password, email_confirm: true });
if (result.error) {
  console.error("Could not create the admin user:", result.error.message);
  process.exit(1);
}

const file = path.join(root, "admin-credentials.local.txt");
fs.writeFileSync(file, `Aeropolish admin login\nEmail:    ${email}\nPassword: ${password}\n\nKeep this private. Delete this file once the password is stored safely.\n`, { mode: 0o600 });

console.log(`\nAdmin user ${existing ? "updated" : "created"}.\n  Email:    ${email}\n  Password: ${password}\n\nAlso saved to admin-credentials.local.txt (git-ignored).`);

const table = await admin.from("site_content").select("key").limit(1);
console.log(table.error ? `\nThe site_content table is not ready yet: ${table.error.message}\nRun supabase/schema.sql in the Supabase SQL editor.` : "\nDatabase table site_content: OK");
const bucket = await admin.storage.getBucket("media");
console.log(bucket.error ? "Storage bucket 'media' is missing: run supabase/schema.sql." : "Storage bucket 'media': OK");
