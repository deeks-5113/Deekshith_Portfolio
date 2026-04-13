import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSiteContent } from '@/data/siteContent';

export function TelemetryCluster() {
  const { siteVariant, siteContent } = useSiteContent();
  const { telemetry } = siteContent.ui;
  const views = [
    { label: 'Product', to: '/product', key: 'product' },
    { label: 'Consulting', to: '/consulting', key: 'consulting' },
    { label: 'GCC', to: '/gcc', key: 'gcc' },
  ] as const;

  return (
    <nav className="sticky top-0 z-50 w-full flex items-center justify-end gap-6 px-8 lg:px-16 py-6 pb-2 bg-gradient-to-b from-black/90 to-transparent pointer-events-none">
      <div className="pointer-events-auto mt-4 flex flex-col items-end gap-4 md:flex-row md:items-center md:gap-6">
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-mono tracking-wider">
          <div className="flex items-center gap-2 text-[#22D3EE] bg-black/60 px-3 py-1.5 rounded-md border border-[#22D3EE]/30 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
            <span>{telemetry.agentStatus}</span>
          </div>
          <div className="flex items-center gap-2 text-[#A1A1AA] bg-black/60 px-3 py-1.5 rounded-md border border-twin-border/50 backdrop-blur-sm">
            <span>{telemetry.uptime}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-full border border-twin-border/60 bg-black/60 p-1 backdrop-blur-sm">
          {views.map((view) => {
            const isActive = siteVariant === view.key;

            return (
              <NavLink
                key={view.key}
                to={view.to}
                className={`rounded-full px-4 py-2 text-[10px] font-mono uppercase tracking-[0.18em] transition-colors sm:text-xs ${
                  isActive
                    ? 'bg-[#22D3EE] text-black'
                    : 'text-zinc-300 hover:bg-white/8 hover:text-white'
                }`}
              >
                {view.label}
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
