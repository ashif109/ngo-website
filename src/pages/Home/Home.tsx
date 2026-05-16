import React from 'react';
import Header from '../../components/layout/Header';
import Navbar from '../../components/layout/Navbar';
import Hero from '../../components/sections/Hero';
import ForthcomingPrograms from '../../components/sections/ForthcomingPrograms';
import Causes from '../../components/sections/Causes';
import ImpactStats from '../../components/sections/ImpactStats';
import MainContent from '../../components/sections/MainContent';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import DonateModal from '../../components/common/DonateModal';
import VolunteerModal from '../../components/common/VolunteerModal';
import ContactSection from '../../components/sections/ContactSection';

/**
 * Home Page Component
 * Represents the main landing page of the NGO website.
 */
export default function Home() {
  return (
    <>
      <Header />
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <ForthcomingPrograms />
        <Causes />
        <ImpactStats />
        
        <div className="institutional-container py-24">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
            {/* Primary Page Content */}
            <MainContent />
            
            {/* Contextual Sidebars */}
            <Sidebar />
          </div>
        </div>
      </main>

      <ContactSection />
      <Footer />
      <DonateModal />
      <VolunteerModal />
    </>
  );
}
