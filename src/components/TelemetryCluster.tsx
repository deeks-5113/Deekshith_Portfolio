import React from 'react';
import { PerspectiveToggle } from './PerspectiveToggle';

export function TelemetryCluster() {
  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-6">
      {/* Badges Container */}
      <div className="flex items-center gap-4 text-xs font-mono tracking-wider">
        <div className="flex items-center gap-2 text-[#14B8A6] bg-twin-card/80 px-3 py-1.5 rounded-md border border-twin-border/50">
          <div className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
          <span>Agent Status: Ready for Pilot</span>
        </div>
        <div className="flex items-center gap-2 text-[#A1A1AA] bg-twin-card/80 px-3 py-1.5 rounded-md border border-twin-border/50">
          <span>System Uptime: 650+ LeetCode Rigor</span>
        </div>
      </div>

      {/* Perspective Toggle */}
      <PerspectiveToggle />
    </div>
  );
}
