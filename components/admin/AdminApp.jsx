"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Node from "./FieldEditor";
import QueriesPanel from "./QueriesPanel";

const VIEW = {
  home: "/",
  about: "/about-us",
  company: "/our-vision",
  privateLabel: "/private-label",
  ralPage: "/ral-colours",
  gallery: "/gallery",
  blogs: "/blogs",
  thinners: "/thinners",
  waterproofing: "/waterproofing",
  paintGuides: "/paint-guides",
  site: "/",
  contact: "/#contact",
  "data.products": "/interior-paints",
  "data.posts": "/news",
  "data.jobs": "/careers",
};

const card = "rounded-2xl border border-gray-200 bg-white shadow-sm";
const primary = "rounded-lg bg-[#512178] px-4 py-2 text-sm font-semibold text-white hover:bg-[#431b64] disabled:opacity-60";
const secondary = "rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:border-[#512178] disabled:opacity-60";

function SetupNotice() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <div className={`${card} p-8`}>
        <h1 className="font-poppins text-2xl font-bold text-[#2a1442]">Admin panel: Supabase is not connected yet</h1>
        <p className="mt-3 text-gray-700">Do this once, and the login will appear here:</p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-gray-800">
          <li>Create a free project at supabase.com.</li>
          <li>
            Copy <code className="rounded bg-gray-100 px-1">.env.local.example</code> to <code className="rounded bg-gray-100 px-1">.env.local</code> and paste your project URL, anon key and service role key
            (Supabase dashboard, Project Settings, API).
          </li>
          <li>
            In Supabase open the SQL Editor and run the file <code className="rounded bg-gray-100 px-1">supabase/schema.sql</code>.
          </li>
          <li>
            Run <code className="rounded bg-gray-100 px-1">npm run admin:setup</code>. It creates the admin login and a strong random password.
          </li>
          <li>Restart the site and reload this page.</li>
        </ol>
      </div>
    </div>
  );
}

function Login({ supabase, adminEmail, onError, error }) {
  const [email, setEmail] = useState(adminEmail);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    onError("");
    const { error: failure } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (failure) onError(failure.message === "Invalid login credentials" ? "Wrong email or password." : failure.message);
    setBusy(false);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f1fa] px-4">
      <form onSubmit={submit} className={`${card} w-full max-w-sm space-y-4 p-8`}>
        <div>
          <img src="/aeropolish-navbar-logo.png" alt="Aeropolish" className="h-9 w-auto" />
          <h1 className="mt-5 font-poppins text-xl font-bold text-[#2a1442]">Admin login</h1>
          <p className="mt-1 text-sm text-gray-600">Edit the website's text, images and videos.</p>
        </div>
        <label className="block text-sm font-semibold text-gray-800">
          Email
          <input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm font-semibold text-gray-800">
          Password
          <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </label>
        {error ? <p role="alert" className="text-sm text-red-600">{error}</p> : null}
        <button type="submit" disabled={busy} className={`${primary} w-full`}>{busy ? "Signing in…" : "Sign in"}</button>
      </form>
    </div>
  );
}

function ChangePassword({ supabase, onClose }) {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (event) => {
    event.preventDefault();
    if (value.length < 12) return setMessage("Use at least 12 characters.");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: value });
    setBusy(false);
    setMessage(error ? error.message : "Password changed.");
    if (!error) setValue("");
  };
  return (
    <form onSubmit={submit} className={`${card} mb-6 flex flex-wrap items-end gap-3 p-4`}>
      <label className="min-w-[240px] flex-1 text-sm font-semibold text-gray-800">
        New password (12+ characters)
        <input type="password" autoComplete="new-password" value={value} onChange={(e) => setValue(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
      </label>
      <button type="submit" disabled={busy} className={primary}>Change password</button>
      <button type="button" onClick={onClose} className={secondary}>Close</button>
      {message ? <p className="w-full text-sm text-gray-700">{message}</p> : null}
    </form>
  );
}

export default function AdminApp({ supabaseUrl, supabaseAnonKey, adminEmail, configured }) {
  const supabase = useMemo(
    () => (supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null),
    [supabaseUrl, supabaseAnonKey],
  );
  const [session, setSession] = useState(undefined); // undefined = checking
  const [loginError, setLoginError] = useState("");
  const [pages, setPages] = useState([]);
  const [current, setCurrent] = useState(null); // { key, label, note, defaults, value, saved }
  const [doc, setDoc] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" });
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState("pages"); // "pages" | "queries"
  const [newCount, setNewCount] = useState(0);
  const tokenRef = useRef("");

  useEffect(() => {
    if (!supabase) return undefined;
    supabase.auth.getSession().then(({ data }) => setSession(data.session || null));
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next || null));
    return () => data.subscription.unsubscribe();
  }, [supabase]);

  tokenRef.current = session?.access_token || "";

  const api = useCallback(async (path, options = {}) => {
    const response = await fetch(path, {
      ...options,
      headers: { ...(options.headers || {}), Authorization: `Bearer ${tokenRef.current}`, ...(options.body ? { "Content-Type": "application/json" } : {}) },
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw Object.assign(new Error(body.error || `Request failed (${response.status})`), { status: response.status });
    return body;
  }, []);

  const loadPages = useCallback(async () => {
    try {
      const { pages: list } = await api("/api/admin/pages");
      setPages(list);
    } catch (error) {
      setStatus({ type: "error", text: error.status === 401 ? `This account is not allowed to edit the site. Sign in as ${adminEmail}.` : error.message });
    }
  }, [api, adminEmail]);

  useEffect(() => {
    if (session) loadPages();
  }, [session, loadPages]);

  // Badge on the Queries button: how many have not been opened yet.
  useEffect(() => {
    if (!session) return;
    api("/api/admin/submissions")
      .then((data) => setNewCount((data.submissions || []).filter((row) => row.status === "new").length))
      .catch(() => {});
  }, [session, api]);

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const open = async (page) => {
    if (dirty && !window.confirm("You have unsaved changes. Leave this page without saving?")) return;
    setStatus({ type: "", text: "" });
    setBusy(true);
    setMenuOpen(false);
    setView("pages");
    try {
      const data = await api(`/api/admin/page?key=${encodeURIComponent(page.key)}`);
      setCurrent({ ...data, note: page.note, group: page.group });
      setDoc(data.value);
      setDirty(false);
    } catch (error) {
      setStatus({ type: "error", text: error.message });
    }
    setBusy(false);
  };

  const openQueries = () => {
    if (dirty && !window.confirm("You have unsaved changes. Leave this page without saving?")) return;
    setCurrent(null);
    setDirty(false);
    setStatus({ type: "", text: "" });
    setMenuOpen(false);
    setView("queries");
  };

  const upload = useCallback(
    async (file) => {
      const { path, token, publicUrl, error } = await api("/api/admin/upload", { method: "POST", body: JSON.stringify({ filename: file.name, contentType: file.type }) });
      if (error) throw new Error(error);
      const { error: failure } = await supabase.storage.from("media").uploadToSignedUrl(path, token, file, { contentType: file.type });
      if (failure) throw new Error(failure.message);
      return publicUrl;
    },
    [api, supabase],
  );

  const save = async () => {
    setBusy(true);
    setStatus({ type: "", text: "" });
    try {
      await api(`/api/admin/page?key=${encodeURIComponent(current.key)}`, { method: "PUT", body: JSON.stringify({ value: doc }) });
      setDirty(false);
      setCurrent((c) => ({ ...c, saved: true }));
      setStatus({ type: "ok", text: "Saved. The website shows the change within a few seconds." });
      loadPages();
    } catch (error) {
      setStatus({ type: "error", text: error.message });
    }
    setBusy(false);
  };

  const reset = async () => {
    if (!window.confirm("Throw away all edits to this page and go back to the original content?")) return;
    setBusy(true);
    try {
      await api(`/api/admin/page?key=${encodeURIComponent(current.key)}`, { method: "DELETE" });
      setDoc(current.defaults);
      setDirty(false);
      setCurrent((c) => ({ ...c, saved: false, value: c.defaults }));
      setStatus({ type: "ok", text: "Restored the original content." });
      loadPages();
    } catch (error) {
      setStatus({ type: "error", text: error.message });
    }
    setBusy(false);
  };

  if (!configured || !supabase) return <SetupNotice />;
  if (session === undefined) return <div className="flex min-h-screen items-center justify-center text-gray-500">Loading…</div>;
  if (!session) return <Login supabase={supabase} adminEmail={adminEmail} onError={setLoginError} error={loginError} />;

  const groups = pages.reduce((acc, page) => ((acc[page.group] ||= []).push(page), acc), {});

  return (
    <div className="min-h-screen bg-gray-50 font-manrope text-gray-900">
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <button type="button" className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-semibold lg:hidden" onClick={() => setMenuOpen((v) => !v)}>
          Pages
        </button>
        <img src="/aeropolish-navbar-logo.png" alt="Aeropolish" className="h-7 w-auto" />
        <span className="hidden text-sm font-semibold text-gray-500 sm:inline">Admin panel</span>
        <div className="ml-auto flex items-center gap-2">
          <a href="/" target="_blank" rel="noreferrer" className={secondary}>View site</a>
          <button type="button" className={secondary} onClick={() => setShowPassword((v) => !v)}>Password</button>
          <button type="button" className={secondary} onClick={() => supabase.auth.signOut()}>Sign out</button>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px] gap-6 px-4 py-6">
        <aside className={`${menuOpen ? "block" : "hidden"} fixed inset-x-4 top-16 z-20 max-h-[75vh] overflow-y-auto ${card} p-4 lg:static lg:block lg:max-h-none lg:w-72 lg:flex-shrink-0 lg:self-start`}>
          <div className="mb-4">
            <p className="mb-1 px-2 text-xs font-bold uppercase tracking-wide text-gray-500">Inbox</p>
            <button
              type="button"
              onClick={openQueries}
              className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold ${view === "queries" ? "bg-[#f6f1fa] text-[#512178]" : "text-gray-800 hover:bg-gray-100"}`}
            >
              <span>Queries</span>
              {newCount ? <span className="rounded-full bg-[#f47422] px-2 py-0.5 text-[10px] font-bold text-white">{newCount} new</span> : null}
            </button>
          </div>
          {Object.entries(groups).map(([group, list]) => (
            <div key={group} className="mb-4 last:mb-0">
              <p className="mb-1 px-2 text-xs font-bold uppercase tracking-wide text-gray-500">{group}</p>
              {list.map((page) => (
                <button
                  key={page.key}
                  type="button"
                  onClick={() => open(page)}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold ${current?.key === page.key ? "bg-[#f6f1fa] text-[#512178]" : "text-gray-800 hover:bg-gray-100"}`}
                >
                  <span>{page.label}</span>
                  {page.saved ? <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">edited</span> : null}
                </button>
              ))}
            </div>
          ))}
          {!pages.length ? <p className="p-2 text-sm text-gray-500">Loading pages…</p> : null}
        </aside>

        <main className="min-w-0 flex-1">
          {showPassword ? <ChangePassword supabase={supabase} onClose={() => setShowPassword(false)} /> : null}
          {status.text && !current ? <p className={`mb-4 text-sm ${status.type === "error" ? "text-red-600" : "text-emerald-700"}`}>{status.text}</p> : null}
          {view === "queries" ? (
            <QueriesPanel api={api} onCount={setNewCount} />
          ) : !current ? (
            <div className={`${card} p-8`}>
              <h1 className="font-poppins text-2xl font-bold text-[#2a1442]">Welcome</h1>
              <p className="mt-2 max-w-xl text-gray-700">Pick a page on the left. Change any text, title, description, image or video, then press Save. Add or delete blog posts under Blogs, and read messages sent from the website forms under Queries.</p>
              {busy ? <p className="mt-4 text-sm text-gray-500">Loading…</p> : null}
            </div>
          ) : (
            <div className="space-y-4">
              <div className={`${card} sticky top-[60px] z-10 flex flex-wrap items-center gap-3 p-4`}>
                <div className="min-w-0 flex-1">
                  <h1 className="truncate font-poppins text-xl font-bold text-[#2a1442]">{current.label}</h1>
                  {current.note ? <p className="text-xs text-gray-600">{current.note}</p> : null}
                </div>
                {dirty ? <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">Unsaved changes</span> : null}
                {VIEW[current.key] ? <a href={VIEW[current.key]} target="_blank" rel="noreferrer" className={secondary}>View page</a> : null}
                {current.saved ? <button type="button" disabled={busy} onClick={reset} className={secondary}>Reset to original</button> : null}
                <button type="button" disabled={busy || !dirty} onClick={save} className={primary}>{busy ? "Working…" : "Save changes"}</button>
              </div>
              {status.text ? <p role="status" className={`rounded-lg px-4 py-2 text-sm ${status.type === "error" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-800"}`}>{status.text}</p> : null}
              <div className={`${card} p-5`}>
                <Node
                  name={current.key}
                  value={doc}
                  onChange={(next) => {
                    setDoc(next);
                    setDirty(true);
                  }}
                  upload={upload}
                  bare
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
