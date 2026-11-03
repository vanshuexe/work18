"use client";

import { useMemo, useRef, useState } from "react";
import tagIcons from "../../config/tag-icons";

// A form generated from the page's own content: text boxes for text, upload buttons for images and
// videos, repeatable cards for lists. It works for any page without a hand-written form.

const IMAGE_KEY = /(image|img|photo|poster|logo|banner|thumbnail|picture)(desktop|mobile)?(s|link|url)?$/i;
const IMAGE_EXT = /\.(png|jpe?g|webp|gif|avif|svg)(\?|#|$)/i;
const VIDEO_EXT = /\.(mp4|webm|mov)(\?|#|$)/i;
const FILE_EXT = /\.(pdf|docx?)(\?|#|$)/i;
const TITLE_KEYS = ["title", "name", "label", "productNameEn", "heading", "alt", "key", "src", "tag"];
const HIDDEN = new Set(["_id", "__v", "createdAt", "updatedAt"]);

const humanize = (key) =>
  ({
    bannerDesktop: "Desktop banner image",
    bannerMobile: "Mobile banner image (screens up to 640px)",
    titleColor: "Title color",
    excerptColor: "Paragraph / excerpt color",
    headingColor: "Section heading color",
    color: "Text color",
    fontSize: "Text size",
    blocks: "Article content blocks",
  })[key] ||
  String(key)
    .replace(/^data\./, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/^./, (c) => c.toUpperCase());

const isHexColor = (value) => /^#[0-9a-f]{6}$/i.test(value);

function ColorField({ name, value, onChange }) {
  const color = isHexColor(value) ? value : "#f47422";
  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        aria-label={`${humanize(name)} picker`}
        value={color}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-14 cursor-pointer rounded border border-gray-300 bg-white p-1"
      />
      <span className="text-sm text-gray-600">{value || "Theme default"}</span>
      {value ? (
        <button type="button" onClick={() => onChange("")} className="text-xs font-semibold text-[#512178] underline">
          Use default
        </button>
      ) : null}
    </div>
  );
}

function mediaKind(key, value) {
  if (typeof value !== "string") return null;
  if (/^(src)$/i.test(key) && VIDEO_EXT.test(value)) return "video";
  if (VIDEO_EXT.test(value) || /video/i.test(key)) return "video";
  if (IMAGE_EXT.test(value) || IMAGE_KEY.test(key) || /^src$/i.test(key)) return "image";
  if (FILE_EXT.test(value) || /pdfLink/i.test(key)) return "file";
  return null;
}

// An empty item shaped like the existing ones. New items start switched on (published / active)
// and dated today, so a freshly added post shows up straight away.
const blankLike = (sample, key = "") => {
  if (Array.isArray(sample)) return [];
  if (sample && typeof sample === "object") return Object.fromEntries(Object.entries(sample).map(([k, v]) => [k, blankLike(v, k)]));
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return true;
  if (/^date$/i.test(key) && /^\d{4}-\d{2}-\d{2}$/.test(String(sample))) return new Date().toISOString().slice(0, 10);
  return "";
};

const titleOf = (item, index) => {
  if (item && typeof item === "object") {
    for (const key of TITLE_KEYS) if (typeof item[key] === "string" && item[key].trim()) return item[key].trim().slice(0, 70);
  }
  return `Item ${index + 1}`;
};

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#512178] focus:outline-none focus:ring-2 focus:ring-[#512178]/20";

function MediaField({ name, value, kind, onChange, upload }) {
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const pick = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const url = await upload(file);
      let patch;
      if (kind === "image" && file.type.startsWith("image/") && !file.type.includes("svg")) {
        patch = await new Promise((resolve) => {
          const probe = new Image();
          probe.onload = () => resolve({ width: probe.naturalWidth, height: probe.naturalHeight });
          probe.onerror = () => resolve(undefined);
          probe.src = URL.createObjectURL(file);
        });
      }
      onChange(url, patch);
    } catch (e) {
      setError(e.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  const accept = kind === "video" ? "video/mp4,video/webm,video/quicktime" : kind === "image" ? "image/*" : ".pdf,.doc,.docx,application/pdf";
  return (
    <div className="space-y-2">
      <div className="flex gap-3">
        {kind === "image" && value ? (
          <img src={value} alt="" className="h-20 w-28 flex-shrink-0 rounded-lg border border-gray-200 bg-gray-100 object-contain" />
        ) : null}
        {kind === "video" && value ? (
          <video src={value} muted className="h-20 w-28 flex-shrink-0 rounded-lg border border-gray-200 bg-black object-cover" preload="metadata" />
        ) : null}
        <div className="min-w-0 flex-1 space-y-2">
          <input className={inputClass} value={value ?? ""} onChange={(e) => onChange(e.target.value)} aria-label={`${name} address`} placeholder="/images/file.jpg or https://..." />
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" disabled={busy} onClick={() => fileRef.current?.click()} className="rounded-lg bg-[#512178] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#431b64] disabled:opacity-60">
              {busy ? "Uploading…" : `Upload new ${kind}`}
            </button>
            {value ? (
              <a href={value} target="_blank" rel="noreferrer" className="text-xs font-semibold text-[#512178] underline">
                Open
              </a>
            ) : null}
            {value ? (
              <button type="button" onClick={() => onChange("")} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">
                Remove {kind}
              </button>
            ) : null}
            <input ref={fileRef} type="file" accept={accept} hidden onChange={pick} />
          </div>
        </div>
      </div>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

function Leaf({ name, value, onChange, upload }) {
  if (name === "type") {
    return (
      <select className={inputClass} value={value || "paragraph"} onChange={(event) => onChange(event.target.value)}>
        <option value="heading">Heading</option>
        <option value="paragraph">Paragraph</option>
        <option value="list">Bullet / numbered list</option>
        <option value="image">Image</option>
      </select>
    );
  }
  if (name === "level") {
    return (
      <select className={inputClass} value={value || "h3"} onChange={(event) => onChange(event.target.value)}>
        <option value="h2">Large heading</option>
        <option value="h3">Small heading</option>
      </select>
    );
  }
  if (name === "fontSize") {
    return (
      <select className={inputClass} value={value || ""} onChange={(event) => onChange(event.target.value)}>
        <option value="">Default</option>
        <option value="small">Small</option>
        <option value="normal">Normal</option>
        <option value="large">Large</option>
      </select>
    );
  }
  if (name === "color" || name.endsWith("Color")) {
    return <ColorField name={name} value={String(value || "")} onChange={onChange} />;
  }
  if (name === "icon") {
    return (
      <div className="flex items-center gap-3">
        <select className={inputClass} value={value || "/tags/generic.svg"} onChange={(event) => onChange(event.target.value)}>
          {tagIcons.map((icon) => (
            <option key={icon} value={`/tags/${icon}.svg`}>{icon}</option>
          ))}
        </select>
        <img src={value || "/tags/generic.svg"} alt="" className="h-8 w-8 object-contain" />
      </div>
    );
  }
  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm text-gray-800">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 rounded border-gray-300" />
        {value ? "Yes" : "No"}
      </label>
    );
  }
  if (typeof value === "number") {
    return <input type="number" className={inputClass} value={value} onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))} />;
  }
  const text = value == null ? "" : String(value);
  const kind = mediaKind(name, text);
  if (kind) return <MediaField name={name} value={text} kind={kind} onChange={onChange} upload={upload} />;
  if (name === "html") {
    return <textarea className={`${inputClass} h-96 font-mono text-xs`} value={text} onChange={(e) => onChange(e.target.value)} spellCheck={false} />;
  }
  if (text.length > 80 || text.includes("\n")) {
    return <textarea className={inputClass} rows={Math.min(14, Math.max(3, Math.ceil(text.length / 90) + text.split("\n").length - 1))} value={text} onChange={(e) => onChange(e.target.value)} />;
  }
  return <input className={inputClass} value={text} onChange={(e) => onChange(e.target.value)} />;
}

const Label = ({ children }) => <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-500">{children}</span>;

function ListEditor({ name, items, onChange, upload, depth }) {
  const [open, setOpen] = useState(() => new Set());
  const [filter, setFilter] = useState("");
  const [limit, setLimit] = useState(25);
  const simple = items.every((item) => item === null || typeof item !== "object");
  const total = items.length;

  const move = (from, to) => {
    if (to < 0 || to >= total) return;
    const next = items.slice();
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };
  const remove = (index) => {
    if (typeof window !== "undefined" && !window.confirm("Delete this item?")) return;
    onChange(items.filter((_, i) => i !== index));
  };
  const add = () => {
    const template = items.length ? blankLike(items[items.length - 1]) : "";
    onChange([...items, template]);
    if (!simple) setOpen((current) => new Set(current).add(items.length));
    setLimit((current) => Math.max(current, items.length + 1));
  };
  const duplicate = (index) => {
    const copy = JSON.parse(JSON.stringify(items[index]));
    const next = items.slice();
    next.splice(index + 1, 0, copy);
    onChange(next);
  };

  const rows = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return items.map((item, index) => ({ item, index })).filter(({ item, index }) => !q || titleOf(item, index).toLowerCase().includes(q) || JSON.stringify(item).toLowerCase().includes(q));
  }, [items, filter]);

  return (
    <div className="space-y-3">
      {total > 12 ? (
        <input className={inputClass} placeholder={`Search ${total} items…`} value={filter} onChange={(e) => setFilter(e.target.value)} />
      ) : null}
      {rows.slice(0, filter ? 200 : limit).map(({ item, index }) =>
        simple ? (
          <div key={index} className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <Leaf name={name} value={item} onChange={(v) => onChange(items.map((x, i) => (i === index ? v : x)))} upload={upload} />
            </div>
            <ItemButtons index={index} total={total} move={move} remove={remove} />
          </div>
        ) : (
          <div key={index} className="rounded-xl border border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2 px-3 py-2">
              <button type="button" onClick={() => setOpen((current) => { const next = new Set(current); next.has(index) ? next.delete(index) : next.add(index); return next; })} className="flex min-w-0 flex-1 items-center gap-2 text-left" aria-expanded={open.has(index)}>
                <span className={`text-xs text-gray-500 transition-transform ${open.has(index) ? "rotate-90" : ""}`}>▶</span>
                <span className="truncate text-sm font-semibold text-gray-900">{index + 1}. {titleOf(item, index)}</span>
              </button>
              <button type="button" onClick={() => duplicate(index)} className="rounded px-2 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-200" title="Duplicate">Copy</button>
              <ItemButtons index={index} total={total} move={move} remove={remove} />
            </div>
            {open.has(index) ? (
              <div className="border-t border-gray-200 bg-white p-4">
                <Node name={name} value={item} onChange={(v) => onChange(items.map((x, i) => (i === index ? v : x)))} upload={upload} depth={depth + 1} bare />
              </div>
            ) : null}
          </div>
        ),
      )}
      {!filter && rows.length > limit ? (
        <button type="button" onClick={() => setLimit((current) => current + 25)} className="w-full rounded-lg border border-dashed border-gray-300 py-2 text-sm font-semibold text-gray-600 hover:border-[#512178]">
          Show more ({rows.length - limit} left)
        </button>
      ) : null}
      <button type="button" onClick={add} className="rounded-lg border border-[#512178] px-3 py-1.5 text-sm font-semibold text-[#512178] hover:bg-[#f6f1fa]">
        + Add {simple ? "line" : "item"}
      </button>
    </div>
  );
}

function ItemButtons({ index, total, move, remove }) {
  const base = "rounded px-2 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-200 disabled:opacity-30";
  return (
    <div className="flex flex-shrink-0 items-center">
      <button type="button" className={base} disabled={index === 0} onClick={() => move(index, index - 1)} aria-label="Move up">↑</button>
      <button type="button" className={base} disabled={index === total - 1} onClick={() => move(index, index + 1)} aria-label="Move down">↓</button>
      <button type="button" className="rounded px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50" onClick={() => remove(index)} aria-label="Delete">✕</button>
    </div>
  );
}

function BlocksEditor({ blocks, onChange, upload }) {
  const add = (type) => {
    const defaults = {
      heading: { type, text: "", level: "h3", color: "" },
      paragraph: { type, text: "", color: "", fontSize: "", bold: false, italic: false },
      list: { type, ordered: false, items: [""], color: "" },
      image: { type, image: "", alt: "", caption: "" },
    };
    onChange([...blocks, defaults[type]]);
  };
  const update = (index, next) => onChange(blocks.map((block, i) => (i === index ? next : block)));
  const move = (from, to) => {
    if (to < 0 || to >= blocks.length) return;
    const next = blocks.slice();
    const [block] = next.splice(from, 1);
    next.splice(to, 0, block);
    onChange(next);
  };
  const remove = (index) => {
    if (window.confirm("Delete this content block?")) onChange(blocks.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {blocks.map((block, index) => (
        <div key={index} className="rounded-xl border border-gray-200 bg-gray-50 p-3">
          <div className="mb-3 flex items-center justify-between gap-2">
            <strong className="text-sm text-gray-800">{index + 1}. {humanize(block.type || "paragraph")}</strong>
            <ItemButtons index={index} total={blocks.length} move={move} remove={remove} />
          </div>
          <div className="space-y-3">
            <div>
              <Label>Block type</Label>
              <Leaf name="type" value={block.type} onChange={(type) => update(index, {
                heading: { type, text: "", level: "h3", color: "" },
                paragraph: { type, text: "", color: "", fontSize: "", bold: false, italic: false },
                list: { type, ordered: false, items: [""], color: "" },
                image: { type, image: "", alt: "", caption: "" },
              }[type])} />
            </div>
            {block.type === "heading" ? (
              <>
                <div><Label>Heading</Label><Leaf name="text" value={block.text || ""} onChange={(text) => update(index, { ...block, text })} /></div>
                <div><Label>Heading size</Label><Leaf name="level" value={block.level || "h3"} onChange={(level) => update(index, { ...block, level })} /></div>
                <div><Label>Heading color</Label><ColorField name="color" value={block.color || ""} onChange={(color) => update(index, { ...block, color })} /></div>
              </>
            ) : null}
            {block.type === "paragraph" ? (
              <>
                <div><Label>Paragraph text</Label><Leaf name="text" value={block.text || ""} onChange={(text) => update(index, { ...block, text })} /></div>
                <div><Label>Paragraph color</Label><ColorField name="color" value={block.color || ""} onChange={(color) => update(index, { ...block, color })} /></div>
                <div><Label>Text size</Label><Leaf name="fontSize" value={block.fontSize || ""} onChange={(fontSize) => update(index, { ...block, fontSize })} /></div>
                <div className="flex gap-5">
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(block.bold)} onChange={(event) => update(index, { ...block, bold: event.target.checked })} /> Bold</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(block.italic)} onChange={(event) => update(index, { ...block, italic: event.target.checked })} /> Italic</label>
                </div>
              </>
            ) : null}
            {block.type === "list" ? (
              <>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(block.ordered)} onChange={(event) => update(index, { ...block, ordered: event.target.checked })} /> Numbered list</label>
                <div><Label>List text color</Label><ColorField name="color" value={block.color || ""} onChange={(color) => update(index, { ...block, color })} /></div>
                <div><Label>List items</Label><ListEditor name="items" items={Array.isArray(block.items) ? block.items : []} onChange={(items) => update(index, { ...block, items })} upload={upload} depth={1} /></div>
              </>
            ) : null}
            {block.type === "image" ? (
              <>
                <div><Label>Image</Label><MediaField name="image" value={block.image || ""} kind="image" onChange={(image) => update(index, { ...block, image })} upload={upload} /></div>
                <div><Label>Image description</Label><Leaf name="alt" value={block.alt || ""} onChange={(alt) => update(index, { ...block, alt })} /></div>
                <div><Label>Caption</Label><Leaf name="caption" value={block.caption || ""} onChange={(caption) => update(index, { ...block, caption })} /></div>
              </>
            ) : null}
          </div>
        </div>
      ))}
      <div className="flex flex-wrap gap-2">
        {[
          ["heading", "+ Add heading"],
          ["paragraph", "+ Add paragraph"],
          ["list", "+ Add list"],
          ["image", "+ Add image"],
        ].map(([type, label]) => (
          <button key={type} type="button" onClick={() => add(type)} className="rounded-lg border border-[#512178] px-3 py-1.5 text-sm font-semibold text-[#512178] hover:bg-[#f6f1fa]">
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Node({ name, value, onChange, upload, depth = 0, bare = false }) {
  if (name === "blocks" && Array.isArray(value)) {
    return <BlocksEditor blocks={value} onChange={onChange} upload={upload} />;
  }
  if (Array.isArray(value)) {
    return <ListEditor name={name} items={value} onChange={onChange} upload={upload} depth={depth} />;
  }
  if (value && typeof value === "object") {
    const keys = Object.keys(value);
    const set = (key) => (next, patch) => onChange({ ...value, [key]: next, ...(patch ? Object.fromEntries(Object.entries(patch).filter(([k]) => k in value)) : {}) });
    return (
      <div className={bare ? "space-y-4" : "space-y-4 rounded-xl border border-gray-200 p-4"}>
        {keys.map((key) => {
          if (HIDDEN.has(key)) return null;
          const child = value[key];
          const complex = child && typeof child === "object";
          return (
            <div key={key}>
              <Label>{humanize(key)}</Label>
              {complex ? <Node name={key} value={child} onChange={set(key)} upload={upload} depth={depth + 1} /> : <Leaf name={key} value={child} onChange={set(key)} upload={upload} />}
            </div>
          );
        })}
      </div>
    );
  }
  return <Leaf name={name} value={value} onChange={onChange} upload={upload} />;
}
