import { BackgroundAura } from "@/components/BackgroundAura";
import { Sidebar } from "@/components/Sidebar";
import { TelemetryCluster } from "@/components/TelemetryCluster";
import { HeroSection } from "@/components/HeroSection";

import { WorkSection } from "@/components/work/WorkSection";
import { AskDigitalTwin } from "@/components/AskDigitalTwin";

function App() {
  return (
    <div className="w-full min-h-screen text-white flex relative bg-transparent">
      <BackgroundAura />
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 relative z-0 overflow-x-hidden">
        <TelemetryCluster />
        <HeroSection />

        <WorkSection />
        <AskDigitalTwin />
      </main>
    </div>
  );
}

export default App;
