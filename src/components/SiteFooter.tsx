import type { SVGProps } from 'react';
import { useSiteContent } from '@/data/siteContent';

const iconMap = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  X: XIcon,
} as const;

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.58 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.15-4.56-5.1 0-1.13.39-2.06 1.03-2.79-.1-.26-.45-1.31.1-2.74 0 0 .84-.28 2.75 1.07A9.28 9.28 0 0 1 12 6.84c.85 0 1.7.12 2.5.36 1.9-1.35 2.74-1.07 2.74-1.07.55 1.43.2 2.48.1 2.74.64.73 1.03 1.66 1.03 2.79 0 3.96-2.34 4.84-4.57 5.1.36.32.68.95.68 1.92 0 1.39-.01 2.51-.01 2.85 0 .28.18.61.69.5A10.26 10.26 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.3 6.94 1.97 1.97 0 0 0 5.25 3Zm15.19 9.85c0-3.46-1.84-5.07-4.3-5.07-1.98 0-2.86 1.1-3.35 1.86V8.5H9.4c.04.75 0 11.5 0 11.5h3.39v-6.42c0-.34.02-.68.13-.92.27-.68.88-1.39 1.91-1.39 1.35 0 1.89 1.05 1.89 2.58V20h3.38v-7.15Z" />
    </svg>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.9 2H22l-6.77 7.73L23.2 22h-6.24l-4.89-7.42L5.6 22H2.5l7.24-8.27L1.6 2h6.4l4.42 6.76L18.9 2Zm-1.1 18h1.72L7.06 3.9H5.2L17.8 20Z" />
    </svg>
  );
}

export function SiteFooter() {
  const { siteContent } = useSiteContent();
  const { footer } = siteContent;

  return (
    <footer className="relative z-10 px-4 pb-10 text-white md:px-8 lg:pl-16">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#090909]/85 px-6 py-6 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl md:px-8">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(192,132,252,0.24),_transparent_70%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.16),_transparent_72%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0))]"
            aria-hidden="true"
          />

          <div className="relative grid items-center gap-6 text-center md:grid-cols-3 md:text-left">
            <div className="flex items-center justify-center gap-3 md:justify-start">
              {footer.socialLinks.map((item) => {
                const Icon = iconMap[item.label as keyof typeof iconMap];

                const className =
                  'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-[#C084FC]/45 hover:text-white';

                if (!item.href) {
                  return (
                    <span
                      key={item.label}
                      aria-label={item.label}
                      className={className}
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                  );
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className={className}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                );
              })}
            </div>

            <p className="text-base font-semibold tracking-[0.18em] text-white md:text-center">
              {footer.name}
            </p>

            <p className="text-sm text-zinc-400 md:text-right">
              {footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
