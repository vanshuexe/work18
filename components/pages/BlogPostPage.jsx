import SiteLink from "../SiteLink";
import Rich from "../Rich";
import { formatDate } from "../../lib/presentation";

const bodyClass = "text-[15px] leading-[1.9] text-gray-700 sm:text-[17px]";

export const readingMinutes = (post) => {
  const text = [post.excerpt, ...post.sections.map((section) => `${section.title || ""} ${section.content || ""}`)].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200));
};

// Blank line = new paragraph. A block where every line starts with "- " is a bullet list, and one
// where every line starts with "1. " is a numbered list.
function Body({ text }) {
  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => {
      const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
      if (lines.every((line) => /^[-•]\s+/.test(line))) {
        return (
          <ul key={index} className={`${bodyClass} list-disc space-y-2 pl-6 marker:text-[#f47422]`}>
            {lines.map((line, i) => (
              <li key={i}>
                <Rich text={line.replace(/^[-•]\s+/, "")} />
              </li>
            ))}
          </ul>
        );
      }
      if (lines.every((line) => /^\d+[.)]\s+/.test(line))) {
        return (
          <ol key={index} className={`${bodyClass} list-decimal space-y-2 pl-6 marker:font-bold marker:text-[#f47422]`}>
            {lines.map((line, i) => (
              <li key={i}>
                <Rich text={line.replace(/^\d+[.)]\s+/, "")} />
              </li>
            ))}
          </ol>
        );
      }
      return (
        <p key={index} className={`${bodyClass} whitespace-pre-line`}>
          <Rich text={block} />
        </p>
      );
    });
}

export default function BlogPostPage({ post, blogs }) {
  return (
    <article className="bg-white font-manrope text-gray-900">
      <div className="mx-auto max-w-3xl px-5 pb-16 pt-28 sm:px-8">
        <SiteLink href="/blogs" className="text-sm font-bold text-[#f47422] hover:underline">
          ← {blogs.backLabel}
        </SiteLink>
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-gray-500">
          {post.category ? <span className="rounded-full bg-[#f6f1fa] px-2.5 py-1 text-[#512178]">{post.category}</span> : null}
          {post.date ? <span>{formatDate(post.date)}</span> : null}
          {post.author ? <span>By {post.author}</span> : null}
          <span>{readingMinutes(post)} min read</span>
        </div>
        <h1 className="mt-3 font-poppins text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">{post.title}</h1>
        {post.excerpt ? <p className="mt-4 text-lg leading-relaxed text-gray-600">{post.excerpt}</p> : null}
        {post.image ? <img src={post.image} alt={post.title} className="mt-8 w-full rounded-2xl object-cover" /> : null}
        <div className="mt-10 space-y-10">
          {post.sections.map((section, index) => (
            <section key={index} className="space-y-4">
              {section.title ? <h2 className="font-poppins text-2xl font-bold text-[#f47422]">{section.title}</h2> : null}
              {section.image ? <img src={section.image} alt={section.title || post.title} loading="lazy" className="w-full rounded-2xl object-cover" /> : null}
              {section.content ? <Body text={section.content} /> : null}
            </section>
          ))}
        </div>

        {blogs.ctaTitle ? (
          <aside className="mt-14 rounded-2xl bg-[#f6f1fa] p-6 sm:p-8">
            <h2 className="font-poppins text-xl font-bold text-[#2a1442] sm:text-2xl">{blogs.ctaTitle}</h2>
            {blogs.ctaText ? <p className="mt-2 text-gray-700">{blogs.ctaText}</p> : null}
            {blogs.ctaButton ? (
              <SiteLink href={blogs.ctaLink || "/client"} className="mt-5 inline-flex min-h-[48px] items-center rounded-xl bg-[#512178] px-6 text-sm font-bold text-white transition-colors hover:bg-[#431b64]">
                {blogs.ctaButton}
              </SiteLink>
            ) : null}
          </aside>
        ) : null}
      </div>
    </article>
  );
}
