import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getBlogBySlug } from '@/data/blogs';
import { useSiteContent } from '@/data/siteContent';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { siteVariant, siteContent } = useSiteContent();
  const blog = slug ? getBlogBySlug(slug, siteVariant) : undefined;
  const { post } = siteContent.blogsSection;

  if (!blog) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="relative z-10 mx-auto min-h-screen w-full max-w-5xl px-6 py-16 md:px-10 lg:pl-16">
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
      >
        <ArrowLeft size={16} />
        {post.backToHome}
      </Link>

      <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-[#060606]/85 shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border-b border-white/8 p-8 lg:border-b-0 lg:border-r lg:p-10">
            {/* <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#22D3EE]">{blog.eyebrow}</p> */}
            <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight text-white md:text-5xl">{blog.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">{blog.heroSummary}</p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-zinc-500">
              <span className="rounded-full border border-white/10 px-4 py-2">{blog.tag}</span>
              <span className="rounded-full border border-white/10 px-4 py-2">{blog.readTime}</span>
              <span className="rounded-full border border-white/10 px-4 py-2">{blog.date}</span>
            </div>
          </div>

          <div className="min-h-[320px] bg-[#040404] p-5 lg:min-h-full">
            <img src={blog.image} alt={blog.title} className="h-full w-full rounded-[1.5rem] object-cover" />
          </div>
        </div>

        <div className="grid gap-10 p-8 lg:grid-cols-[0.75fr_1.25fr] lg:p-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-zinc-500">{post.whyItMattersLabel}</p>
            <p className="mt-5 text-base leading-8 text-zinc-400">
              {post.whyItMattersBody}
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-zinc-500">{post.keyTakeawaysLabel}</p>
            <div className="mt-5 space-y-4">
              {blog.lessons.map((lesson) => (
                <article key={lesson} className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-5">
                  <p className="text-base leading-7 text-zinc-300">{lesson}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
