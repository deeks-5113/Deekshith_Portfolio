import { blogs } from '@/data/blogs';
import CardSwap, { Card } from './CardSwap';
import { useLens } from '@/context/LensContext';

export function BlogShowcase() {
  const { isTyping } = useLens();

  if (isTyping) return null;

  return (
    <section
      id="blogs"
      className="relative z-10 mx-auto flex w-full max-w-[88rem] flex-col gap-18 px-4 py-24 md:px-8 lg:flex-row lg:items-center lg:gap-14 lg:pl-16"
    >
      <div className="relative w-full lg:w-[40%]">
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

                    <span className="mt-1 block text-xs text-gray-500">Real build • Real system • No fluff</span>
                  </div>

                  <span className="mt-6 text-sm text-[#A78BFA] transition-colors group-hover:text-white">
                    Read More -&gt;
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
