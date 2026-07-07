import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminApp from './admin/AdminApp.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
);
