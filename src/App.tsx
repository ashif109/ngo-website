import React from 'react';
import Home from './pages/Home/Home';

/**
 * App Component
 * Orchestrates the modularized NGO website structure.
 * Designed for production readiness with premium aesthetics.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      <Home />
    </div>
  );
}
