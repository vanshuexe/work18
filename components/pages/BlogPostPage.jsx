import SiteLink from "../SiteLink";
import Rich from "../Rich";
import { formatDate } from "../../lib/presentation";

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
        </div>
        <h1 className="mt-3 font-poppins text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">{post.title}</h1>
        {post.excerpt ? <p className="mt-4 text-lg leading-relaxed text-gray-600">{post.excerpt}</p> : null}
        {post.image ? <img src={post.image} alt={post.title} className="mt-8 w-full rounded-2xl object-cover" /> : null}
        <div className="mt-8 space-y-8">
          {post.sections.map((section, index) => (
            <section key={index}>
              {section.title ? <h2 className="mb-3 font-poppins text-2xl font-bold text-[#f47422]">{section.title}</h2> : null}
              {section.image ? <img src={section.image} alt={section.title || post.title} loading="lazy" className="mb-4 w-full rounded-2xl object-cover" /> : null}
              {section.content ? (
                <p className="whitespace-pre-line text-[15px] leading-[1.9] text-gray-700 sm:text-[17px]">
                  <Rich text={section.content} />
                </p>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
