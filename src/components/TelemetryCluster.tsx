import React from 'react';
import { PerspectiveToggle } from './PerspectiveToggle';

export function TelemetryCluster() {
  return (
    <nav className="sticky top-0 z-50 w-full flex items-center justify-end gap-6 px-8 lg:px-16 py-6 pb-2 bg-gradient-to-b from-black/90 to-transparent pointer-events-none">
      <div className="pointer-events-auto flex flex-col md:flex-row items-end md:items-center gap-4 md:gap-6 mt-4">
        {/* Badges Container */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-mono tracking-wider">
          <div className="flex items-center gap-2 text-[#22D3EE] bg-black/60 px-3 py-1.5 rounded-md border border-[#22D3EE]/30 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
            <span>Agent Status: Ready</span>
          </div>
          <div className="flex items-center gap-2 text-[#A1A1AA] bg-black/60 px-3 py-1.5 rounded-md border border-twin-border/50 backdrop-blur-sm">
            <span>Uptime: 650+ Rigor</span>
          </div>
        </div>

        {/* Perspective Toggle */}
        <PerspectiveToggle />
      </div>
    </nav>
  );
}
