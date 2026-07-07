import React, { useState, useEffect } from 'react';
import Home from './pages/Home/Home';
import EventsPage from './pages/EventsPage';
import AboutUsPage from './pages/AboutUsPage';
import AdmissionsPage from './pages/AdmissionsPage';
import VedicStudiesPage from './pages/VedicStudiesPage';
import ResearchPage from './pages/ResearchPage';
import GurukulamsPage from './pages/GurukulamsPage';
import PublicationsPage from './pages/PublicationsPage';
import CampusLifePage from './pages/CampusLifePage';
import ResourcesPage from './pages/ResourcesPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import MediaRoomPage from './pages/MediaRoomPage';
import AwardsPage from './pages/AwardsPage';
import ContactPage from './pages/ContactPage';
import AlumniLoginPage from './pages/AlumniLoginPage';
import HelpDeskPage from './pages/HelpDeskPage';
import GrievancePortalPage from './pages/GrievancePortalPage';
import ImportantLinksPage from './pages/ImportantLinksPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import DisclaimerPage from './pages/DisclaimerPage';
import HowToReachPage from './pages/HowToReachPage';
import FaqPage from './pages/FaqPage';
import BlogPage from './pages/BlogPage';
import DynamicPage from './pages/DynamicPage';

/**
 * App Component
 * Orchestrates the modularized NGO website structure.
 * Designed for production readiness with premium aesthetics.
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  useEffect(() => {
    const checkRoute = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      
      if (
        hash === '#/forthcoming-programmes' || 
        hash === '#/forthcoming-programs' || 
        hash === '#/events' || 
        path === '/forthcoming-programmes' || 
        path === '/forthcoming-programs' || 
        path === '/events'
      ) {
        setCurrentPage('events');
      } else if (
        hash === '#/about-us' || 
        hash === '#/about' || 
        path === '/about-us' || 
        path === '/about'
      ) {
        setCurrentPage('about');
      } else if (
        hash === '#/admissions' || 
        hash === '#/admission' || 
        path === '/admissions' || 
        path === '/admission'
      ) {
        setCurrentPage('admissions');
      } else if (
        hash === '#/vedic-studies' || 
        hash === '#/vedic-study' || 
        path === '/vedic-studies' || 
        path === '/vedic-study'
      ) {
        setCurrentPage('vedic-studies');
      } else if (
        hash === '#/research' || 
        path === '/research'
      ) {
        setCurrentPage('research');
      } else if (
        hash === '#/gurukulams' || 
        path === '/gurukulams'
      ) {
        setCurrentPage('gurukulams');
      } else if (
        hash === '#/publications' || 
        path === '/publications'
      ) {
        setCurrentPage('publications');
      } else if (
        hash === '#/campus-life' || 
        path === '/campus-life'
      ) {
        setCurrentPage('campus-life');
      } else if (
        hash === '#/resources' || 
        path === '/resources'
      ) {
        setCurrentPage('resources');
      } else if (
        hash === '#/announcements' || 
        path === '/announcements'
      ) {
        setCurrentPage('announcements');
      } else if (hash === '#/media-room' || path === '/media-room') {
        setCurrentPage('media-room');
      } else if (hash === '#/awards' || path === '/awards') {
        setCurrentPage('awards');
      } else if (hash === '#/contact-us' || path === '/contact-us') {
        setCurrentPage('contact-us');
      } else if (hash === '#/alumni-login' || path === '/alumni-login') {
        setCurrentPage('alumni-login');
      } else if (hash === '#/help-desk' || path === '/help-desk') {
        setCurrentPage('help-desk');
      } else if (hash === '#/grievance-portal' || path === '/grievance-portal') {
        setCurrentPage('grievance-portal');
      } else if (hash === '#/important-links' || path === '/important-links') {
        setCurrentPage('important-links');
      } else if (hash === '#/privacy-policy' || path === '/privacy-policy') {
        setCurrentPage('privacy-policy');
      } else if (hash === '#/disclaimer' || path === '/disclaimer') {
        setCurrentPage('disclaimer');
      } else if (hash === '#/how-to-reach' || path === '/how-to-reach') {
        setCurrentPage('how-to-reach');
      } else if (hash === '#/faq' || path === '/faq') {
        setCurrentPage('faq');
      } else if (hash === '#/blog' || path === '/blog') {
        setCurrentPage('blog');
      } else if (hash.startsWith('#/p/')) {
        const slug = hash.replace('#/p/', '');
        setCurrentPage(`page:${slug}`);
      } else if (path.startsWith('/p/')) {
        const slug = path.replace('/p/', '');
        setCurrentPage(`page:${slug}`);
      } else {
        setCurrentPage('home');
      }
      window.scrollTo({ top: 0, behavior: 'instant' as any });
    };

    // Check route on initial page load
    checkRoute();

    // Listen to browser hash changes (for back/forward buttons and shared links)
    window.addEventListener('hashchange', checkRoute);

    // Listen to our custom navigation events
    const handleToEvents = () => {
      window.location.hash = '#/forthcoming-programs';
    };

    const handleToAbout = () => {
      window.location.hash = '#/about-us';
    };

    const handleToAdmissions = () => {
      window.location.hash = '#/admissions';
    };

    const handleToVedicStudies = () => {
      window.location.hash = '#/vedic-studies';
    };

    const handleToResearch = () => {
      window.location.hash = '#/research';
    };

    const handleToGurukulams = () => {
      window.location.hash = '#/gurukulams';
    };

    const handleToPublications = () => {
      window.location.hash = '#/publications';
    };

    const handleToCampusLife = () => {
      window.location.hash = '#/campus-life';
    };

    const handleToResources = () => {
      window.location.hash = '#/resources';
    };

    const handleToAnnouncements = () => {
      window.location.hash = '#/announcements';
    };

    const handleToHome = () => {
      window.location.hash = '';
    };

    const handleToDynamicPage = ((e: CustomEvent) => {
      if (e.detail && e.detail.slug) {
        window.location.hash = `#/p/${e.detail.slug}`;
      }
    }) as EventListener;

    window.addEventListener('navigateToEvents', handleToEvents);
    window.addEventListener('navigateToAbout', handleToAbout);
    window.addEventListener('navigateToAdmissions', handleToAdmissions);
    window.addEventListener('navigateToVedicStudies', handleToVedicStudies);
    window.addEventListener('navigateToResearch', handleToResearch);
    window.addEventListener('navigateToGurukulams', handleToGurukulams);
    window.addEventListener('navigateToPublications', handleToPublications);
    window.addEventListener('navigateToCampusLife', handleToCampusLife);
    window.addEventListener('navigateToResources', handleToResources);
    window.addEventListener('navigateToAnnouncements', handleToAnnouncements);
    window.addEventListener('navigateToHome', handleToHome);
    window.addEventListener('navigateToDynamicPage', handleToDynamicPage);

    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('navigateToEvents', handleToEvents);
      window.removeEventListener('navigateToAbout', handleToAbout);
      window.removeEventListener('navigateToAdmissions', handleToAdmissions);
      window.removeEventListener('navigateToVedicStudies', handleToVedicStudies);
      window.removeEventListener('navigateToResearch', handleToResearch);
      window.removeEventListener('navigateToGurukulams', handleToGurukulams);
      window.removeEventListener('navigateToPublications', handleToPublications);
      window.removeEventListener('navigateToCampusLife', handleToCampusLife);
      window.removeEventListener('navigateToResources', handleToResources);
      window.removeEventListener('navigateToAnnouncements', handleToAnnouncements);
      window.removeEventListener('navigateToHome', handleToHome);
      window.removeEventListener('navigateToDynamicPage', handleToDynamicPage);
    };
  }, []);

  const renderPage = () => {
    if (currentPage.startsWith('page:')) {
      const slug = currentPage.split(':')[1];
      return <DynamicPage slug={slug} />;
    }

    switch (currentPage) {
      case 'home': return <Home />;
      case 'events': return <EventsPage />;
      case 'about': return <AboutUsPage />;
      case 'admissions': return <AdmissionsPage />;
      case 'vedic-studies': return <VedicStudiesPage />;
      case 'research': return <ResearchPage />;
      case 'gurukulams': return <GurukulamsPage />;
      case 'publications': return <PublicationsPage />;
      case 'campus-life': return <CampusLifePage />;
      case 'resources': return <ResourcesPage />;
      case 'announcements': return <AnnouncementsPage />;
      case 'media-room': return <MediaRoomPage />;
      case 'awards': return <AwardsPage />;
      case 'contact-us': return <ContactPage />;
      case 'alumni-login': return <AlumniLoginPage />;
      case 'help-desk': return <HelpDeskPage />;
      case 'grievance-portal': return <GrievancePortalPage />;
      case 'important-links': return <ImportantLinksPage />;
      case 'privacy-policy': return <PrivacyPolicyPage />;
      case 'disclaimer': return <DisclaimerPage />;
      case 'how-to-reach': return <HowToReachPage />;
      case 'faq': return <FaqPage />;
      case 'blog': return <BlogPage />;
      default: return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-surface selection:text-primary">
      {renderPage()}
    </div>
  );
}
