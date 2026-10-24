"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

// Every query sent through the website forms, with all the details the visitor filled in.

const card = "rounded-2xl border border-gray-200 bg-white shadow-sm";
const primary = "rounded-lg bg-[#512178] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#431b64] disabled:opacity-60";
const secondary = "rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 hover:border-[#512178] disabled:opacity-60";

const KIND = {
  contact: { label: "Contact message", short: "Contact", tone: "bg-sky-100 text-sky-800" },
  client: { label: "Client inquiry", short: "Client", tone: "bg-emerald-100 text-emerald-800" },
  vendor: { label: "Vendor application", short: "Vendor", tone: "bg-amber-100 text-amber-800" },
  investor: { label: "Investor message", short: "Investor", tone: "bg-fuchsia-100 text-fuchsia-800" },
  job: { label: "Job application", short: "Job", tone: "bg-indigo-100 text-indigo-800" },
};
const STATUS = {
  new: { label: "New", tone: "bg-red-100 text-red-700" },
  read: { label: "Read", tone: "bg-gray-100 text-gray-700" },
  done: { label: "Done", tone: "bg-emerald-100 text-emerald-700" },
};

const humanize = (key) =>
  String(key)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/^./, (c) => c.toUpperCase());

const when = (iso) => {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
};

const display = (value) => {
  if (Array.isArray(value)) return value.join(", ");
  if (value === null || value === undefined) return "";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

// Phone fields come with their own "...CountryCode" field; show them together.
function entries(submission, labels) {
  const data = submission.data || {};
  const known = labels[submission.kind] || {};
  const rows = [];
  for (const [key, value] of Object.entries(data)) {
    if (/CountryCode$|^countryCode$/.test(key)) continue;
    if (/Other$/.test(key) && key.slice(0, -5) in data) continue;
    if (key === "jobId" || key === "cvFile") continue;
    const text = display(value);
    if (!text) continue;
    let shown = text;
    if (/phone/i.test(key)) {
      const codeKey = key === "phone" ? "countryCode" : `${key}CountryCode`;
      if (data[codeKey]) shown = `${data[codeKey]} ${text}`;
    }
    if (data[`${key}Other`]) shown = `${shown} (${data[`${key}Other`]})`;
    rows.push({ key, label: known[key] || humanize(key), value: shown });
  }
  return rows;
}

const headline = (submission) => {
  const d = submission.data || {};
  return d.name || d.companyName || d.organization || d.email || "Unknown sender";
};

const summary = (submission) => {
  const d = submission.data || {};
  if (submission.kind === "job") return d.jobTitle || "";
  const text = d.message || d.productInterest || d.category || d.investorType || d.businessType || "";
  return display(text).slice(0, 110);
};

function Attachment({ item, api }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const open = async () => {
    setBusy(true);
    setError("");
    try {
      const { url } = await api(`/api/admin/submissions?file=${encodeURIComponent(item.path)}`);
      window.open(url, "_blank", "noopener");
    } catch (e) {
      setError(e.message);
    }
    setBusy(false);
  };
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
      <span className="font-semibold text-gray-800">{item.name}</span>
      <span className="text-xs text-gray-500">{Math.max(1, Math.round((item.size || 0) / 1024))} KB</span>
      <button type="button" className={`${secondary} ml-auto`} disabled={busy} onClick={open}>
        {busy ? "Opening…" : "Download / open"}
      </button>
      {error ? <span className="w-full text-xs text-red-600">{error}</span> : null}
    </div>
  );
}

function Row({ submission, labels, open, onToggle, onStatus, onDelete, api }) {
  const kind = KIND[submission.kind] || { label: submission.kind, short: submission.kind, tone: "bg-gray-100 text-gray-700" };
  const status = STATUS[submission.status] || STATUS.new;
  const fields = open ? entries(submission, labels) : [];
  const d = submission.data || {};
  const phone = d.phone ? `${d.countryCode || ""}${d.countryCode ? " " : ""}${d.phone}`.trim() : "";
  return (
    <div className={`${card} ${submission.status === "new" ? "border-l-4 border-l-[#f47422]" : ""}`}>
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3 text-left">
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${kind.tone}`}>{kind.short}</span>
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-gray-900">
          {headline(submission)}
          {summary(submission) ? <span className="ml-2 font-normal text-gray-500">{summary(submission)}</span> : null}
        </span>
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${status.tone}`}>{status.label}</span>
        <span className="text-xs text-gray-500">{when(submission.created_at)}</span>
      </button>
      {open ? (
        <div className="space-y-4 border-t border-gray-200 px-4 py-4">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">{kind.label}</p>
          <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {fields.map((row) => (
              <div key={row.key} className={row.value.length > 70 || row.value.includes("\n") ? "sm:col-span-2" : ""}>
                <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">{row.label}</dt>
                <dd className="mt-0.5 whitespace-pre-wrap break-words text-sm text-gray-900">{row.value}</dd>
              </div>
            ))}
          </dl>
          {submission.attachments?.length ? (
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Uploaded documents</p>
              {submission.attachments.map((item) => (
                <Attachment key={item.path} item={item} api={api} />
              ))}
            </div>
          ) : null}
          <div className="flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3">
            {d.email ? (
              <a className={primary} href={`mailto:${d.email}`}>
                Reply by email
              </a>
            ) : null}
            {phone ? (
              <a className={secondary} href={`tel:${phone.replace(/[^\d+]/g, "")}`}>
                Call {phone}
              </a>
            ) : null}
            <span className="ml-auto" />
            {submission.status !== "done" ? (
              <button type="button" className={secondary} onClick={() => onStatus(submission, "done")}>
                Mark done
              </button>
            ) : null}
            {submission.status !== "new" ? (
              <button type="button" className={secondary} onClick={() => onStatus(submission, "new")}>
                Mark unread
              </button>
            ) : null}
            <button type="button" className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50" onClick={() => onDelete(submission)}>
              Delete
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function QueriesPanel({ api, onCount }) {
  const [rows, setRows] = useState([]);
  const [labels, setLabels] = useState({});
  const [loading, setLoading] = useState(true);
  const [notReady, setNotReady] = useState(false);
  const [error, setError] = useState("");
  const [kind, setKind] = useState("all");
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api("/api/admin/submissions");
      setRows(data.submissions || []);
      setLabels(data.labels || {});
      setNotReady(Boolean(data.notReady));
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }, [api]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    onCount?.(rows.filter((row) => row.status === "new").length);
  }, [rows, onCount]);

  const counts = useMemo(() => {
    const out = { all: rows.length };
    for (const row of rows) out[row.kind] = (out[row.kind] || 0) + 1;
    return out;
  }, [rows]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter(
      (row) =>
        (kind === "all" || row.kind === kind) &&
        (status === "all" || row.status === status) &&
        (!q || JSON.stringify(row.data).toLowerCase().includes(q)),
    );
  }, [rows, kind, status, search]);

  const patch = (id, changes) => setRows((list) => list.map((row) => (row.id === id ? { ...row, ...changes } : row)));

  const setRowStatus = async (submission, next) => {
    const before = submission.status;
    patch(submission.id, { status: next });
    try {
      await api("/api/admin/submissions", { method: "PATCH", body: JSON.stringify({ id: submission.id, status: next }) });
    } catch (e) {
      patch(submission.id, { status: before });
      setError(e.message);
    }
  };

  const toggle = (submission) => {
    const opening = openId !== submission.id;
    setOpenId(opening ? submission.id : null);
    if (opening && submission.status === "new") setRowStatus(submission, "read");
  };

  const remove = async (submission) => {
    if (!window.confirm(`Delete this query from ${headline(submission)}? This cannot be undone.`)) return;
    try {
      await api(`/api/admin/submissions?id=${encodeURIComponent(submission.id)}`, { method: "DELETE" });
      setRows((list) => list.filter((row) => row.id !== submission.id));
      setOpenId(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const tabs = [["all", "All"], ...Object.entries(KIND).map(([key, value]) => [key, value.short])];

  return (
    <div className="space-y-4">
      <div className={`${card} flex flex-wrap items-center gap-3 p-4`}>
        <div className="min-w-0 flex-1">
          <h1 className="font-poppins text-xl font-bold text-[#2a1442]">Queries</h1>
          <p className="text-xs text-gray-600">Everything visitors send through the contact, client, vendor, investor and job forms.</p>
        </div>
        <button type="button" className={secondary} onClick={load} disabled={loading}>
          {loading ? "Loading…" : "Refresh"}
        </button>
      </div>

      {error ? <p role="alert" className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p> : null}

      {notReady ? (
        <div className={`${card} p-5 text-sm text-gray-800`}>
          <p className="font-semibold">The queries table is not created yet.</p>
          <p className="mt-1">
            Open the Supabase SQL Editor, paste the end of <code className="rounded bg-gray-100 px-1">supabase/schema.sql</code> (the part starting with “Queries from the website forms”) and run it. Then press Refresh.
          </p>
        </div>
      ) : (
        <>
          <div className={`${card} space-y-3 p-4`}>
            <div className="flex flex-wrap gap-2">
              {tabs.map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setKind(key)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${kind === key ? "bg-[#512178] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  {label} <span className="opacity-70">({counts[key] || 0})</span>
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email, phone, message…"
                className="min-w-[220px] flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm" aria-label="Status">
                <option value="all">All statuses</option>
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          {!loading && !visible.length ? <p className={`${card} p-8 text-center text-sm text-gray-500`}>{rows.length ? "No queries match these filters." : "No queries yet. New form submissions will appear here."}</p> : null}

          <div className="space-y-3">
            {visible.map((submission) => (
              <Row
                key={submission.id}
                submission={submission}
                labels={labels}
                open={openId === submission.id}
                onToggle={() => toggle(submission)}
                onStatus={setRowStatus}
                onDelete={remove}
                api={api}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
