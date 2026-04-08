import { BackgroundAura } from "@/components/BackgroundAura";
import { Sidebar } from "@/components/Sidebar";
import { TelemetryCluster } from "@/components/TelemetryCluster";
import { HeroSection } from "@/components/HeroSection";
import { BentoGrid } from "@/components/BentoGrid";
import { AskDigitalTwin } from "@/components/AskDigitalTwin";

function App() {
  return (
    <div className="w-full min-h-screen bg-twin-bg text-white flex">
      <BackgroundAura />
      <TelemetryCluster />
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 relative z-0 overflow-x-hidden pt-8">
        <HeroSection />
        <BentoGrid />
        <AskDigitalTwin />
      </main>
    </div>
  );
}

export default App;
