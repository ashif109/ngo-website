import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSiteContent } from '../services/api';

interface SiteContentContextType {
  settings: any;
  hero: any;
  causes: any;
  stats: any;
  loading: boolean;
}

const SiteContentContext = createContext<SiteContentContextType>({
  settings: null,
  hero: null,
  causes: null,
  stats: null,
  loading: true,
});

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<any>(null);
  const [hero, setHero] = useState<any>(null);
  const [causes, setCauses] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllContent = async () => {
      try {
        const [settingsRes, heroRes, causesRes, statsRes] = await Promise.all([
          getSiteContent('settings'),
          getSiteContent('hero'),
          getSiteContent('causes'),
          getSiteContent('stats')
        ]);
        
        if (settingsRes.success) setSettings(settingsRes.data);
        if (heroRes.success) setHero(heroRes.data);
        if (causesRes.success) setCauses(causesRes.data);
        if (statsRes.success) setStats(statsRes.data);
      } catch (err) {
        console.error('Error fetching site content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllContent();
  }, []);

  return (
    <SiteContentContext.Provider value={{ settings, hero, causes, stats, loading }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => useContext(SiteContentContext);
