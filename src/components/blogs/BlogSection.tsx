import { useNavigate } from 'react-router-dom';
import { getBlogs } from '@/data/blogs';
import CardSwap, { Card } from './CardSwap';
import { useLens } from '@/context/LensContext';
import { useSiteVariant } from '@/data/siteContent';

export function BlogSection() {
  const navigate = useNavigate();
  const { isTyping } = useLens();
  const siteVariant = useSiteVariant();
  const blogs = getBlogs(siteVariant);

  if (isTyping) return null;

  return (
    <section
      id="blogs"
      className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-20 md:px-8 lg:flex-row lg:items-center lg:gap-10 lg:pl-16"
    >
      <div className="relative w-full lg:w-[44%]">
        <div className="absolute inset-x-0 top-10 h-40 rounded-full bg-[#22D3EE]/10 blur-3xl" aria-hidden="true" />

        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#22D3EE]">Writing</p>
          <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight text-white md:text-5xl">
            Thoughts from building real systems
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-400">
            Not theory. Not tutorials. Just lessons from things that broke, scaled, and taught me something.
          </p>
          <p className="mt-10 max-w-md font-mono text-sm leading-7 text-zinc-500">
            Three short reads on AI orchestration, operational system design, and automation that survives contact with
            production.
          </p>
        </div>
      </div>

      <div className="relative h-[340px] w-full lg:h-[420px] lg:w-[56%]">
        <CardSwap
          width={540}
          height={280}
          cardDistance={44}
          verticalDistance={54}
          delay={6000}
          pauseOnHover
          easing="smooth"
          onCardClick={(index) => {
            const blog = blogs[index];
            if (!blog) return;
            navigate(`/blog/${blog.slug}`);
          }}
        >
          {blogs.map((blog) => (
            <Card
              key={blog.slug}
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
                      {blog.tag} · {blog.readTime}
                    </span>

                    <h3 className="mt-3 text-xl font-semibold leading-snug text-white">{blog.title}</h3>

                    <p className="mt-3 text-sm leading-6 text-zinc-400">{blog.description}</p>
                  </div>

                  <span className="mt-6 text-sm text-[#A78BFA] transition-colors group-hover:text-white">
                    Read More →
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
