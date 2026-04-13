import { Navigate, Route, Routes } from 'react-router-dom';
import { BackgroundAura } from '@/components/BackgroundAura';
import { Sidebar } from '@/components/Sidebar';
import { HomePage } from '@/pages/HomePage';
import { BlogPostPage } from '@/pages/BlogPostPage';
import { ProjectDeepDivePage } from '@/pages/ProjectDeepDivePage';

function App() {
  return (
    <div
      className="relative flex min-h-screen w-full bg-transparent text-white"
      style={{ ['--narrative-rail-width' as string]: '20rem' }}
    >
      <BackgroundAura />
      <Sidebar />

      <main className="relative z-0 flex-1 overflow-x-hidden">
        <div className="transition-[margin] duration-500 lg:ml-[var(--narrative-rail-width)]">
          <Routes>
            <Route path="/" element={<Navigate to="/product" replace />} />
            <Route path="/product" element={<HomePage />} />
            <Route path="/consulting" element={<HomePage />} />
            <Route path="/gcc" element={<HomePage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/projects/:slug/deep" element={<ProjectDeepDivePage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
