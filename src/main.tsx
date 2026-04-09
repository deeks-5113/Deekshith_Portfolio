import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { LensProvider } from './context/LensContext.tsx';
import { DeepDiveProvider } from './contexts/DeepDiveContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LensProvider>
        <DeepDiveProvider>
          <App />
        </DeepDiveProvider>
      </LensProvider>
    </BrowserRouter>
  </StrictMode>
);
