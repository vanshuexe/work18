import PageBanner from "../PageBanner";
import SiteLink from "../SiteLink";
import { formatDate } from "../../lib/presentation";

export function BlogCard({ post, readMore }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <SiteLink href={`/blogs/${post.slug}`} className="block aspect-[16/10] overflow-hidden bg-gray-100">
        {post.image ? <img src={post.image} alt={post.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" /> : null}
      </SiteLink>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-gray-500">
          {post.category ? <span className="rounded-full bg-[#f6f1fa] px-2.5 py-1 text-[#512178]">{post.category}</span> : null}
          {post.date ? <span>{formatDate(post.date)}</span> : null}
        </div>
        <h3 className="font-poppins text-lg font-bold leading-snug text-gray-900">
          <SiteLink href={`/blogs/${post.slug}`} className="hover:text-[#f47422]">{post.title}</SiteLink>
        </h3>
        {post.excerpt ? <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{post.excerpt}</p> : null}
        <SiteLink href={`/blogs/${post.slug}`} className="mt-4 inline-flex text-sm font-bold text-[#f47422] hover:underline">
          {readMore} →
        </SiteLink>
      </div>
    </article>
  );
}

export default function BlogsPage({ blogs }) {
  return (
    <div className="bg-white font-manrope text-gray-900">
      <div className="px-3 pt-4 sm:px-4">
        <PageBanner as="h1" tall image={blogs.banner} title={blogs.title} tagline={blogs.tagline} />
      </div>
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        {blogs.posts.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.posts.map((post) => (
              <BlogCard key={post.slug} post={post} readMore={blogs.readMore} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-gray-500">{blogs.emptyText}</p>
        )}
      </section>
    </div>
  );
}
