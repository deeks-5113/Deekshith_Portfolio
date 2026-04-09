import { Route, Routes } from 'react-router-dom';
import { BackgroundAura } from '@/components/BackgroundAura';
import { Sidebar } from '@/components/Sidebar';
import { useDeepDive } from '@/contexts/DeepDiveContext';
import { HomePage } from '@/pages/HomePage';
import { ProjectDeepDivePage } from '@/pages/ProjectDeepDivePage';

function App() {
  const { isInDeepDive } = useDeepDive();

  return (
    <div className="relative flex min-h-screen w-full bg-transparent text-white">
      <BackgroundAura />
      <Sidebar />

      <main className="relative z-0 flex-1 overflow-x-hidden">
        <div className={`transition-[margin] duration-500 ${isInDeepDive ? 'ml-0' : 'lg:ml-72'}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug/deep" element={<ProjectDeepDivePage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
