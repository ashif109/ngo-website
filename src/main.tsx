import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';
import { SiteContentProvider } from './context/SiteContentContext';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminApp from './admin/AdminApp.tsx';
import ErrorBoundary from './components/common/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/admin/*" element={<AdminApp />} />
            <Route path="/*" element={
              <SiteContentProvider>
                <App />
              </SiteContentProvider>
            } />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ErrorBoundary>
  </StrictMode>,
);
