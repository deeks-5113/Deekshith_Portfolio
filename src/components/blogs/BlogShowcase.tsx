import CardSwap, { Card } from './CardSwap';
import { useLens } from '@/context/LensContext';
import { getBlogCommentary } from '@/data/content';
import { useSiteContent } from '@/data/siteContent';

export function BlogShowcase() {
  const { isTyping, setActiveHoverLog } = useLens();
  const { siteContent } = useSiteContent();
  const { blogsSection } = siteContent;
  const blogs = blogsSection.items;

  if (isTyping) return null;

  return (
    <section
      id="blogs"
      className="relative z-10 mx-auto flex w-full max-w-[88rem] flex-col gap-18 px-4 py-24 md:px-8 lg:flex-row lg:items-center lg:gap-14 lg:pl-16"
      onMouseEnter={() => setActiveHoverLog(getBlogCommentary())}
      onMouseLeave={() => setActiveHoverLog(null)}
    >
      <div
        className="relative w-full lg:w-[40%]"
        onMouseEnter={() => setActiveHoverLog(getBlogCommentary(null, 'intro'))}
      >
        <div className="absolute inset-x-0 top-10 h-40 rounded-full bg-[#22D3EE]/10 blur-3xl" aria-hidden="true" />

        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#22D3EE]">{blogsSection.eyebrow}</p>
          <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight text-white md:text-5xl">
            {blogsSection.title}
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-400">
            {blogsSection.intro}
          </p>
          <p className="mt-10 max-w-md font-mono text-sm leading-7 text-zinc-500">
            {blogsSection.supporting}
          </p>
        </div>
      </div>

      <div className="relative h-[430px] w-full lg:h-[580px] lg:w-[60%]">
        <CardSwap
          width={700}
          height={360}
          cardDistance={56}
          verticalDistance={68}
          delay={4000}
          pauseOnHover
          easing="smooth"
          onCardClick={(index) => {
            const blog = blogs[index];
            if (!blog?.href) return;
            window.open(blog.href, '_blank', 'noopener,noreferrer');
          }}
        >
          {blogs.map((blog) => (
            <Card
              key={blog.slug}
              onMouseEnter={() => setActiveHoverLog(getBlogCommentary(blog.slug))}
              onMouseLeave={() => setActiveHoverLog(getBlogCommentary())}
              onFocus={() => setActiveHoverLog(getBlogCommentary(blog.slug))}
              onBlur={() => setActiveHoverLog(getBlogCommentary())}
              className="group cursor-pointer overflow-hidden border-white/12 bg-[#050505] shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
            >
              <div className="flex h-full">
                <div className="w-1/2 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex w-1/2 flex-col justify-between bg-[#0a0a0a] p-5">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#22D3EE]">
                      {blog.tag} | {blog.readTime}
                    </span>

                    <h3 className="mt-3 text-xl font-semibold leading-snug text-white">{blog.title}</h3>

                    <p className="mt-3 text-sm leading-6 text-zinc-400">{blog.description}</p>

                    <span className="mt-1 block text-xs text-gray-500">{blogsSection.cardMeta}</span>
                  </div>

                  <span className="mt-6 text-sm text-[#A78BFA] transition-colors group-hover:text-white">
                    {blogsSection.readMore}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </CardSwap>
      </div>
    </section>
  );
}
