import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShieldAlert, LogOut, Users, HeartHandshake, Scale, Mail, 
  Plus, Edit, Trash2, Calendar, FileText, Globe, Key, 
  Loader2, CheckCircle2, Home, Image, BarChart3, Settings,
  BookOpen, ExternalLink, X, Save, AlertCircle, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  getAdminSubmissions, getPrograms, createProgram, updateProgram, deleteProgram, changeAdminPassword,
  getSiteContent, updateSiteContent, getGallery, addGalleryImage, deleteGalleryImage, updateGalleryImage
} from '../services/api';
import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ImageUploader from '../components/common/ImageUploader';

interface SubmissionType {
  volunteers: any[];
  contacts: any[];
  donations: any[];
  generals: any[];
}

type Tab = 'submissions' | 'programs' | 'hero' | 'causes' | 'gallery' | 'stats' | 'settings' | 'security';

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: 'submissions', label: 'Submissions', icon: FileText },
  { id: 'programs', label: 'Programs', icon: Calendar },
  { id: 'hero', label: 'Hero Section', icon: Home },
  { id: 'causes', label: 'Core Causes', icon: HeartHandshake },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'stats', label: 'Impact Stats', icon: BarChart3 },
  { id: 'settings', label: 'Site Settings', icon: Settings },
  { id: 'security', label: 'Security', icon: Key },
];

// ─── Toast helper ────────────────────────────────────────────────────────────
function useToast() {
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const show = useCallback((msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);
  return { toast, show };
}

// ─── Reusable section save status ─────────────────────────────────────────────
function useSaveStatus() {
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const saving = () => setStatus('saving');
  const saved = () => { setStatus('saved'); setTimeout(() => setStatus('idle'), 2500); };
  const error = () => { setStatus('error'); setTimeout(() => setStatus('idle'), 3000); };
  return { status, saving, saved, error };
}

// ─── Input style helper ───────────────────────────────────────────────────────
const inputCls = "w-full p-3 bg-blue-950/40 border border-white/10 rounded-sm text-white text-xs outline-none focus:ring-1 focus:ring-orange-500 placeholder:text-white/30";
const labelCls = "block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-1.5";
const sectionHeaderCls = "text-base font-serif font-black text-white uppercase tracking-wide border-b border-white/10 pb-3 mb-5";

// ─────────────────────────────────────────────────────────────────────────────
const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('submissions');
  const [submissionSubTab, setSubmissionSubTab] = useState<'volunteers' | 'contacts' | 'donations' | 'generals'>('volunteers');
  const [submissions, setSubmissions] = useState<SubmissionType>({ volunteers: [], contacts: [], donations: [], generals: [] });
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSubId, setExpandedSubId] = useState<string | null>(null);

  // CMS Content States
  const [heroContent, setHeroContent] = useState<any>({});
  const [causesContent, setCausesContent] = useState<any[]>([]);
  const [statsContent, setStatsContent] = useState<any[]>([]);
  const [settingsContent, setSettingsContent] = useState<any>({});
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [gallerySection, setGallerySection] = useState('campus-life');

  // Save statuses per section
  const heroSave = useSaveStatus();
  const causesSave = useSaveStatus();
  const statsSave = useSaveStatus();
  const settingsSave = useSaveStatus();

  // Gallery add form
  const [galleryForm, setGalleryForm] = useState({ imageUrl: '', captionEn: '', captionHi: '', captionGu: '', section: 'campus-life' });
  const [galleryAddMode, setGalleryAddMode] = useState(false);
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [galleryAdding, setGalleryAdding] = useState(false);
  const [editingGallery, setEditingGallery] = useState<any | null>(null);

  // Program modal
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<any | null>(null);
  const [programForm, setProgramForm] = useState({ textEn: '', textHi: '', textGu: '', link: '', websiteLink: '' });

  // Password
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [securityStatus, setSecurityStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [securityError, setSecurityError] = useState('');

  const { toast, show: showToast } = useToast();

  // ── Auth guard & initial data fetch ──────────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) { window.location.hash = '#/admin-login'; return; }
    document.title = 'Admin Dashboard | Triyambakam Gurukulam Association';
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [subRes, progRes, heroRes, causesRes, statsRes, settingsRes, galleryRes] = await Promise.all([
        getAdminSubmissions(),
        getPrograms(),
        getSiteContent('hero'),
        getSiteContent('causes'),
        getSiteContent('stats'),
        getSiteContent('settings'),
        getGallery()
      ]);
      if (subRes.success) setSubmissions(subRes.data);
      if (progRes.success) setPrograms(progRes.data);
      if (heroRes.success) setHeroContent(heroRes.data);
      if (causesRes.success) setCausesContent(Array.isArray(causesRes.data) ? causesRes.data : []);
      if (statsRes.success) setStatsContent(Array.isArray(statsRes.data) ? statsRes.data : []);
      if (settingsRes.success) setSettingsContent(settingsRes.data);
      if (galleryRes.success) setGalleryImages(galleryRes.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshGallery = async (sec?: string) => {
    const res = await getGallery(sec || gallerySection);
    if (res.success) setGalleryImages(res.data);
  };

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    window.location.hash = '#/admin-login';
  };

  // Hero save
  const handleHeroSave = async () => {
    heroSave.saving();
    const res = await updateSiteContent('hero', heroContent);
    if (res.success) { heroSave.saved(); showToast('Hero section saved!'); }
    else { heroSave.error(); showToast(res.error || 'Failed to save', 'error'); }
  };

  // Causes save
  const handleCausesSave = async () => {
    causesSave.saving();
    const res = await updateSiteContent('causes', causesContent);
    if (res.success) { causesSave.saved(); showToast('Core Causes saved!'); }
    else { causesSave.error(); showToast(res.error || 'Failed to save', 'error'); }
  };

  // Stats save
  const handleStatsSave = async () => {
    statsSave.saving();
    const res = await updateSiteContent('stats', statsContent);
    if (res.success) { statsSave.saved(); showToast('Impact Stats saved!'); }
    else { statsSave.error(); showToast(res.error || 'Failed to save', 'error'); }
  };

  // Settings save
  const handleSettingsSave = async () => {
    settingsSave.saving();
    const res = await updateSiteContent('settings', settingsContent);
    if (res.success) { settingsSave.saved(); showToast('Settings saved!'); }
    else { settingsSave.error(); showToast(res.error || 'Failed to save', 'error'); }
  };

  // Gallery add
  const handleGalleryAdd = async () => {
    if (!galleryForm.imageUrl && !galleryFile) {
      showToast('Please provide an image URL or select a file', 'error');
      return;
    }
    setGalleryAdding(true);
    const fd = new FormData();
    if (galleryFile) fd.append('image', galleryFile);
    fd.append('captionEn', galleryForm.captionEn);
    fd.append('captionHi', galleryForm.captionHi);
    fd.append('captionGu', galleryForm.captionGu);
    fd.append('section', galleryForm.section);
    if (galleryForm.imageUrl) fd.append('imageUrl', galleryForm.imageUrl);

    const res = await addGalleryImage(fd);
    setGalleryAdding(false);
    if (res.success) {
      showToast('Image added to gallery!');
      setGalleryForm({ imageUrl: '', captionEn: '', captionHi: '', captionGu: '', section: 'campus-life' });
      setGalleryFile(null);
      setGalleryAddMode(false);
      await refreshGallery();
    } else {
      showToast(res.error || 'Failed to add image', 'error');
    }
  };

  const handleGalleryDelete = async (id: string) => {
    if (!window.confirm('Delete this gallery image?')) return;
    const res = await deleteGalleryImage(id);
    if (res.success) { showToast('Image deleted'); await refreshGallery(); }
    else showToast(res.error || 'Failed to delete', 'error');
  };

  const handleGalleryEditSave = async () => {
    if (!editingGallery) return;
    const res = await updateGalleryImage(editingGallery._id, {
      captionEn: editingGallery.captionEn,
      captionHi: editingGallery.captionHi,
      captionGu: editingGallery.captionGu,
      section: editingGallery.section
    });
    if (res.success) { showToast('Caption updated'); setEditingGallery(null); await refreshGallery(); }
    else showToast(res.error || 'Failed to update', 'error');
  };

  // Programs
  const handleOpenAddModal = () => {
    setEditingProgram(null);
    setProgramForm({ textEn: '', textHi: '', textGu: '', link: '', websiteLink: '' });
    setIsProgramModalOpen(true);
  };

  const handleOpenEditModal = (prog: any) => {
    setEditingProgram(prog);
    setProgramForm({ textEn: prog.textEn, textHi: prog.textHi, textGu: prog.textGu, link: prog.link || '', websiteLink: prog.websiteLink || '' });
    setIsProgramModalOpen(true);
  };

  const handleProgramSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = editingProgram
        ? await updateProgram(editingProgram._id, programForm)
        : await createProgram(programForm);
      if (res.success) {
        const progRes = await getPrograms();
        if (progRes.success) setPrograms(progRes.data);
        setIsProgramModalOpen(false);
        showToast(editingProgram ? 'Program updated!' : 'Program created!');
      } else {
        showToast(res.error || 'Failed to save program', 'error');
      }
    } catch (err) {
      showToast('Error saving program', 'error');
    }
  };

  const handleDeleteProgram = async (id: string) => {
    if (!window.confirm('Delete this forthcoming program?')) return;
    const res = await deleteProgram(id);
    if (res.success) { setPrograms(programs.filter(p => p._id !== id)); showToast('Program deleted'); }
    else showToast(res.error || 'Failed to delete', 'error');
  };

  // Password change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setSecurityStatus('error'); setSecurityError('Passwords do not match'); return;
    }
    if (passwordForm.newPassword.length < 6) {
      setSecurityStatus('error'); setSecurityError('Password must be at least 6 characters'); return;
    }
    setSecurityStatus('loading'); setSecurityError('');
    const res = await changeAdminPassword({ oldPassword: passwordForm.oldPassword, newPassword: passwordForm.newPassword });
    if (res.success) { setSecurityStatus('success'); setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' }); setTimeout(() => setSecurityStatus('idle'), 2500); }
    else { setSecurityStatus('error'); setSecurityError(res.error || 'Failed'); }
  };

  // ─── Save button renderer ─────────────────────────────────────────────────
  const SaveButton = ({ status, onClick }: { status: any; onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={status.status === 'saving'}
      className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-sm font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
    >
      {status.status === 'saving' ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
      {status.status === 'saving' ? 'Saving...' : status.status === 'saved' ? 'Saved!' : 'Save Changes'}
    </button>
  );

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <>
      <Header />
      <Navbar />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-[200] px-5 py-3 rounded-sm shadow-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 ${
              toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow bg-[#002147] text-white py-12 relative overflow-hidden" id="admin-dashboard-content">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-blue-800/15 rounded-full blur-[130px] -mr-72 -mt-72 z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-orange-600/5 rounded-full blur-[110px] -ml-60 z-0 pointer-events-none"></div>

        <div className="institutional-container relative z-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-[0.2em] mb-2">
                <ShieldAlert size={16} /> Administrative Console
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-black uppercase text-white tracking-tight">
                Admin <span className="text-orange-500">Dashboard</span>
              </h1>
              <p className="text-blue-200 text-xs mt-1">
                Logged in as: <span className="text-white font-bold">{localStorage.getItem('adminEmail')}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchAllData}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-blue-200 hover:text-white rounded-sm font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer"
              >
                <RefreshCw size={12} /> Refresh
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 bg-red-600/10 hover:bg-red-600 border border-red-500/20 text-red-200 hover:text-white rounded-sm font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <LogOut size={12} /> Log Out
              </button>
            </div>
          </div>

          {loading ? (
            <div className="py-24 text-center space-y-4">
              <Loader2 className="animate-spin text-orange-400 mx-auto" size={48} />
              <p className="text-blue-200 text-xs uppercase tracking-widest font-black">Loading dashboard data...</p>
            </div>
          ) : (
            <>
              {/* Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
                {[
                  { label: 'Volunteers', value: submissions.volunteers.length, color: 'text-orange-400', bg: 'bg-orange-600/15', border: 'border-orange-500/20', icon: Users },
                  { label: 'Donations', value: submissions.donations.length, color: 'text-green-400', bg: 'bg-green-600/15', border: 'border-green-500/20', icon: HeartHandshake },
                  { label: 'Grievances', value: submissions.generals.filter((s: any) => s.formType === 'Grievance Submission').length, color: 'text-indigo-400', bg: 'bg-indigo-600/15', border: 'border-indigo-500/20', icon: Scale },
                  { label: 'Contacts', value: submissions.contacts.length, color: 'text-blue-400', bg: 'bg-blue-600/15', border: 'border-blue-500/20', icon: Mail },
                  { label: 'Programs', value: programs.length, color: 'text-amber-400', bg: 'bg-amber-600/15', border: 'border-amber-500/20', icon: Calendar },
                  { label: 'Gallery', value: galleryImages.length, color: 'text-pink-400', bg: 'bg-pink-600/15', border: 'border-pink-500/20', icon: Image },
                ].map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-sm flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-sm ${m.bg} border ${m.border} flex items-center justify-center ${m.color} flex-shrink-0`}>
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] font-black text-blue-200 uppercase truncate">{m.label}</p>
                        <p className="text-xl font-serif font-bold text-white">{m.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tab Nav */}
              <div className="flex flex-wrap gap-1 border-b border-white/10 mb-8 overflow-x-auto no-scrollbar pb-1">
                {TABS.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-3 text-[10px] font-black uppercase tracking-wider border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap rounded-t-sm ${
                        activeTab === tab.id
                          ? 'border-orange-500 text-white bg-white/[0.03]'
                          : 'border-transparent text-blue-300 hover:text-white hover:bg-white/[0.02]'
                      }`}
                    >
                      <Icon size={12} className={activeTab === tab.id ? 'text-orange-400' : 'text-blue-400'} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="bg-white/5 border border-white/10 rounded-sm p-6 sm:p-8 shadow-xl">

                {/* ── SUBMISSIONS ── */}
                {activeTab === 'submissions' && (
                  <div className="space-y-5">
                    <div className="flex flex-wrap gap-2 pb-4 border-b border-white/10">
                      {['volunteers', 'donations', 'contacts', 'generals'].map(st => (
                        <button
                          key={st}
                          onClick={() => { setSubmissionSubTab(st as any); setExpandedSubId(null); }}
                          className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-full border transition-all cursor-pointer capitalize ${
                            submissionSubTab === st ? 'bg-orange-600 border-transparent text-white' : 'bg-white/5 border-white/10 text-blue-200 hover:bg-white/10'
                          }`}
                        >
                          {st === 'generals' ? 'General' : st}
                        </button>
                      ))}
                    </div>
                    <div className="overflow-x-auto">
                      {submissionSubTab === 'volunteers' && (
                        submissions.volunteers.length > 0 ? (
                          <table className="w-full text-left text-xs border-collapse">
                            <thead><tr className="border-b border-white/15 text-[10px] font-black uppercase tracking-wider text-blue-300">
                              <th className="pb-3 pr-4">Name</th><th className="pb-3 pr-4">Email</th><th className="pb-3 pr-4">Phone</th><th className="pb-3 pr-4">Interests</th><th className="pb-3 pr-4">Date</th><th className="pb-3 text-right">Msg</th>
                            </tr></thead>
                            <tbody>
                              {submissions.volunteers.map((v: any) => (
                                <React.Fragment key={v._id}>
                                  <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                    <td className="py-3 pr-4 font-bold text-white">{v.name}</td>
                                    <td className="py-3 pr-4 text-blue-200">{v.email}</td>
                                    <td className="py-3 pr-4 text-blue-200">{v.phone}</td>
                                    <td className="py-3 pr-4"><span className="bg-orange-600/10 border border-orange-500/20 text-orange-400 px-2 py-0.5 rounded-sm font-black text-[9px] uppercase">{Array.isArray(v.interests) ? v.interests.join(', ') : v.interests}</span></td>
                                    <td className="py-3 pr-4 text-blue-300/70">{new Date(v.createdAt).toLocaleDateString()}</td>
                                    <td className="py-3 text-right"><button onClick={() => setExpandedSubId(expandedSubId === v._id ? null : v._id)} className="text-orange-400 hover:underline font-black text-[10px] uppercase cursor-pointer">{expandedSubId === v._id ? 'Close' : 'View'}</button></td>
                                  </tr>
                                  {expandedSubId === v._id && (
                                    <tr><td colSpan={6} className="bg-white/[0.02] border-b border-white/5 p-4 text-blue-100 italic text-xs"><strong>Message:</strong> {v.message || 'N/A'}</td></tr>
                                  )}
                                </React.Fragment>
                              ))}
                            </tbody>
                          </table>
                        ) : <p className="text-center py-10 text-blue-300 font-bold">No volunteer applications found.</p>
                      )}
                      {submissionSubTab === 'contacts' && (
                        submissions.contacts.length > 0 ? (
                          <table className="w-full text-left text-xs border-collapse">
                            <thead><tr className="border-b border-white/15 text-[10px] font-black uppercase tracking-wider text-blue-300">
                              <th className="pb-3 pr-4">Name</th><th className="pb-3 pr-4">Email</th><th className="pb-3 pr-4">Subject</th><th className="pb-3 pr-4">Date</th><th className="pb-3 text-right">Msg</th>
                            </tr></thead>
                            <tbody>
                              {submissions.contacts.map((c: any) => (
                                <React.Fragment key={c._id}>
                                  <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                    <td className="py-3 pr-4 font-bold text-white">{c.name}</td>
                                    <td className="py-3 pr-4 text-blue-200">{c.email}</td>
                                    <td className="py-3 pr-4 text-orange-400 font-bold">{c.subject || 'General'}</td>
                                    <td className="py-3 pr-4 text-blue-300/70">{new Date(c.createdAt).toLocaleDateString()}</td>
                                    <td className="py-3 text-right"><button onClick={() => setExpandedSubId(expandedSubId === c._id ? null : c._id)} className="text-orange-400 hover:underline font-black text-[10px] uppercase cursor-pointer">{expandedSubId === c._id ? 'Close' : 'View'}</button></td>
                                  </tr>
                                  {expandedSubId === c._id && (
                                    <tr><td colSpan={5} className="bg-white/[0.02] border-b border-white/5 p-4 text-blue-100 italic text-xs"><strong>Message:</strong> {c.message}</td></tr>
                                  )}
                                </React.Fragment>
                              ))}
                            </tbody>
                          </table>
                        ) : <p className="text-center py-10 text-blue-300 font-bold">No contact queries.</p>
                      )}
                      {submissionSubTab === 'donations' && (
                        submissions.donations.length > 0 ? (
                          <table className="w-full text-left text-xs border-collapse">
                            <thead><tr className="border-b border-white/15 text-[10px] font-black uppercase tracking-wider text-blue-300">
                              <th className="pb-3 pr-4">Donor</th><th className="pb-3 pr-4">Phone</th><th className="pb-3 pr-4">Email</th><th className="pb-3 pr-4">UTR/TXN ID</th><th className="pb-3 pr-4">Amount</th><th className="pb-3 pr-4">Date</th>
                            </tr></thead>
                            <tbody>
                              {submissions.donations.map((d: any) => (
                                <tr key={d._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                  <td className="py-3 pr-4 font-bold text-white">{d.donorName}</td>
                                  <td className="py-3 pr-4 text-blue-200">{d.phone}</td>
                                  <td className="py-3 pr-4 text-blue-200">{d.email || 'N/A'}</td>
                                  <td className="py-3 pr-4 text-orange-400 font-mono font-bold">{d.transactionId}</td>
                                  <td className="py-3 pr-4 font-black text-green-400">₹{d.amount}</td>
                                  <td className="py-3 pr-4 text-blue-300/70">{new Date(d.createdAt).toLocaleDateString()}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : <p className="text-center py-10 text-blue-300 font-bold">No donation records.</p>
                      )}
                      {submissionSubTab === 'generals' && (
                        submissions.generals.length > 0 ? (
                          <table className="w-full text-left text-xs border-collapse">
                            <thead><tr className="border-b border-white/15 text-[10px] font-black uppercase tracking-wider text-blue-300">
                              <th className="pb-3 pr-4">Form Type</th><th className="pb-3 pr-4">Name</th><th className="pb-3 pr-4">Contact</th><th className="pb-3 pr-4">Date</th><th className="pb-3 text-right">Details</th>
                            </tr></thead>
                            <tbody>
                              {submissions.generals.map((g: any) => (
                                <React.Fragment key={g._id}>
                                  <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                    <td className="py-3 pr-4 font-bold text-orange-400 text-[10px] uppercase">{g.formType}</td>
                                    <td className="py-3 pr-4 font-bold text-white">{g.data?.name || 'N/A'}</td>
                                    <td className="py-3 pr-4 text-blue-200">{g.data?.email || g.data?.phone || 'N/A'}</td>
                                    <td className="py-3 pr-4 text-blue-300/70">{new Date(g.createdAt).toLocaleDateString()}</td>
                                    <td className="py-3 text-right"><button onClick={() => setExpandedSubId(expandedSubId === g._id ? null : g._id)} className="text-orange-400 hover:underline font-black text-[10px] uppercase cursor-pointer">{expandedSubId === g._id ? 'Close' : 'View'}</button></td>
                                  </tr>
                                  {expandedSubId === g._id && (
                                    <tr><td colSpan={5} className="bg-white/[0.02] border-b border-white/5 p-4">
                                      <div className="text-xs space-y-1.5 text-blue-100">{Object.entries(g.data || {}).map(([k, v]: any) => (
                                        <div key={k}><strong className="text-[10px] text-blue-300 uppercase">{k.replace(/([A-Z])/g, ' $1')}: </strong>{String(v)}</div>
                                      ))}</div>
                                    </td></tr>
                                  )}
                                </React.Fragment>
                              ))}
                            </tbody>
                          </table>
                        ) : <p className="text-center py-10 text-blue-300 font-bold">No general submissions.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* ── PROGRAMS ── */}
                {activeTab === 'programs' && (
                  <div className="space-y-5">
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <h3 className={sectionHeaderCls}>Forthcoming Programs</h3>
                      <button onClick={handleOpenAddModal} className="bg-orange-600 hover:bg-orange-700 text-white font-black text-[10px] uppercase tracking-wider px-4 py-2.5 rounded-sm transition-all shadow-md hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer">
                        <Plus size={14} /> Add Program
                      </button>
                    </div>
                    {programs.length > 0 ? (
                      <div className="grid grid-cols-1 gap-4">
                        {programs.map(prog => (
                          <div key={prog._id} className="bg-white/[0.02] border border-white/5 hover:border-white/10 p-5 rounded-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all">
                            <div className="space-y-1.5 max-w-xl">
                              <div className="flex items-center gap-1.5 text-[9px] font-black text-orange-400 uppercase tracking-widest"><BookOpen size={12} /> Active Program</div>
                              <div className="text-sm font-semibold text-white"><span className="text-[10px] text-blue-300 uppercase font-black pr-2">EN:</span>{prog.textEn}</div>
                              <div className="text-xs text-blue-200"><span className="text-[10px] text-blue-300 uppercase font-black pr-2">HI:</span>{prog.textHi}</div>
                              {prog.link && <span className="text-[10px] text-blue-300 font-bold">📄 PDF linked</span>}
                              {prog.websiteLink && <span className="text-[10px] text-blue-300 font-bold ml-2">🌐 Website linked</span>}
                            </div>
                            <div className="flex gap-2.5 self-end sm:self-center">
                              <button onClick={() => handleOpenEditModal(prog)} className="p-2.5 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white rounded-sm border border-white/5 transition-all cursor-pointer"><Edit size={14} /></button>
                              <button onClick={() => handleDeleteProgram(prog._id)} className="p-2.5 bg-red-600/10 hover:bg-red-600 text-red-300 hover:text-white rounded-sm border border-red-500/10 transition-all cursor-pointer"><Trash2 size={14} /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="border border-white/5 p-10 rounded-sm text-center bg-white/[0.01]">
                        <p className="text-blue-200/50 text-xs font-bold uppercase tracking-wider">No programs. Add one to display it on the homepage.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* ── HERO SECTION ── */}
                {activeTab === 'hero' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className={sectionHeaderCls}>Hero Section Editor</h3>
                      <SaveButton status={heroSave} onClick={handleHeroSave} />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className={labelCls}>Headline (English)</label>
                          <input className={inputCls} value={heroContent.headlineEn || ''} onChange={e => setHeroContent({ ...heroContent, headlineEn: e.target.value })} placeholder="Preserving Wisdom, Empowering the Future" />
                        </div>
                        <div>
                          <label className={labelCls}>Headline (Hindi)</label>
                          <input className={inputCls} value={heroContent.headlineHi || ''} onChange={e => setHeroContent({ ...heroContent, headlineHi: e.target.value })} placeholder="ज्ञान का संरक्षण..." />
                        </div>
                        <div>
                          <label className={labelCls}>Headline (Gujarati)</label>
                          <input className={inputCls} value={heroContent.headlineGu || ''} onChange={e => setHeroContent({ ...heroContent, headlineGu: e.target.value })} placeholder="જ્ઞાનનું સંરક્ષણ..." />
                        </div>
                        <div>
                          <label className={labelCls}>Badge Text (English)</label>
                          <input className={inputCls} value={heroContent.badgeEn || ''} onChange={e => setHeroContent({ ...heroContent, badgeEn: e.target.value })} placeholder="National Initiative 2026" />
                        </div>
                        <div>
                          <label className={labelCls}>Badge Text (Hindi)</label>
                          <input className={inputCls} value={heroContent.badgeHi || ''} onChange={e => setHeroContent({ ...heroContent, badgeHi: e.target.value })} placeholder="राष्ट्रीय पहल 2026" />
                        </div>
                        <div>
                          <label className={labelCls}>Badge Text (Gujarati)</label>
                          <input className={inputCls} value={heroContent.badgeGu || ''} onChange={e => setHeroContent({ ...heroContent, badgeGu: e.target.value })} placeholder="રાષ્ટ્રીય પહેલ 2026" />
                        </div>
                      </div>
                      <div>
                        <ImageUploader
                          label="Hero Background Image"
                          currentUrl={heroContent.backgroundImageUrl}
                          onUpload={url => setHeroContent({ ...heroContent, backgroundImageUrl: url })}
                        />
                        {heroContent.backgroundImageUrl && (
                          <p className="text-[10px] text-green-400 mt-2 font-bold break-all">✓ {heroContent.backgroundImageUrl}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── CORE CAUSES ── */}
                {activeTab === 'causes' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className={sectionHeaderCls}>Core Causes Editor</h3>
                      <SaveButton status={causesSave} onClick={handleCausesSave} />
                    </div>
                    <div className="space-y-8">
                      {causesContent.map((cause: any, idx: number) => (
                        <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-sm p-5 space-y-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-6 h-6 rounded-full bg-orange-600/20 border border-orange-500/30 text-orange-400 flex items-center justify-center text-xs font-black">{idx + 1}</span>
                            <span className="text-sm font-serif font-bold text-white">{cause.titleEn || `Cause ${idx + 1}`}</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div>
                                <label className={labelCls}>Title (English)</label>
                                <input className={inputCls} value={cause.titleEn || ''} onChange={e => { const c = [...causesContent]; c[idx] = { ...c[idx], titleEn: e.target.value }; setCausesContent(c); }} />
                              </div>
                              <div>
                                <label className={labelCls}>Title (Hindi)</label>
                                <input className={inputCls} value={cause.titleHi || ''} onChange={e => { const c = [...causesContent]; c[idx] = { ...c[idx], titleHi: e.target.value }; setCausesContent(c); }} />
                              </div>
                              <div>
                                <label className={labelCls}>Title (Gujarati)</label>
                                <input className={inputCls} value={cause.titleGu || ''} onChange={e => { const c = [...causesContent]; c[idx] = { ...c[idx], titleGu: e.target.value }; setCausesContent(c); }} />
                              </div>
                              <div>
                                <label className={labelCls}>Description (English)</label>
                                <textarea rows={2} className={inputCls + ' resize-none'} value={cause.descEn || ''} onChange={e => { const c = [...causesContent]; c[idx] = { ...c[idx], descEn: e.target.value }; setCausesContent(c); }} />
                              </div>
                              <div>
                                <label className={labelCls}>Description (Hindi)</label>
                                <textarea rows={2} className={inputCls + ' resize-none'} value={cause.descHi || ''} onChange={e => { const c = [...causesContent]; c[idx] = { ...c[idx], descHi: e.target.value }; setCausesContent(c); }} />
                              </div>
                              <div>
                                <label className={labelCls}>Description (Gujarati)</label>
                                <textarea rows={2} className={inputCls + ' resize-none'} value={cause.descGu || ''} onChange={e => { const c = [...causesContent]; c[idx] = { ...c[idx], descGu: e.target.value }; setCausesContent(c); }} />
                              </div>
                            </div>
                            <ImageUploader
                              label={`Cause ${idx + 1} Image`}
                              currentUrl={cause.imageUrl}
                              onUpload={url => { const c = [...causesContent]; c[idx] = { ...c[idx], imageUrl: url }; setCausesContent(c); }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── GALLERY ── */}
                {activeTab === 'gallery' && (
                  <div className="space-y-5">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 pb-4">
                      <h3 className={sectionHeaderCls}>Gallery Manager</h3>
                      <div className="flex items-center gap-2">
                        <select
                          value={gallerySection}
                          onChange={async e => { setGallerySection(e.target.value); await refreshGallery(e.target.value); }}
                          className="p-2 bg-blue-950/40 border border-white/10 rounded-sm text-white text-xs outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
                        >
                          <option value="campus-life">Campus Life</option>
                          <option value="hero">Hero</option>
                          <option value="events">Events</option>
                          <option value="team">Team</option>
                          <option value="other">Other</option>
                        </select>
                        <button onClick={() => setGalleryAddMode(!galleryAddMode)} className="bg-orange-600 hover:bg-orange-700 text-white font-black text-[10px] uppercase tracking-wider px-4 py-2.5 rounded-sm transition-all flex items-center gap-1.5 cursor-pointer">
                          {galleryAddMode ? <><X size={12} /> Cancel</> : <><Plus size={12} /> Add Image</>}
                        </button>
                      </div>
                    </div>

                    {/* Add image form */}
                    {galleryAddMode && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-blue-950/40 border border-white/10 rounded-sm p-5 space-y-4">
                        <h4 className="text-xs font-black text-white uppercase tracking-wider">Add New Gallery Image</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div>
                              <label className={labelCls}>Image URL (or upload file)</label>
                              <input
                                type="url"
                                className={inputCls}
                                value={galleryForm.imageUrl}
                                onChange={e => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                              />
                            </div>
                            <div>
                              <label className={labelCls}>OR Upload File</label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={e => setGalleryFile(e.target.files?.[0] || null)}
                                className="w-full text-xs text-blue-200 file:mr-3 file:py-2 file:px-3 file:rounded-sm file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-orange-600 file:text-white file:cursor-pointer cursor-pointer"
                              />
                              {galleryFile && <p className="text-[10px] text-green-400 font-bold mt-1">✓ {galleryFile.name}</p>}
                            </div>
                            <div>
                              <label className={labelCls}>Section</label>
                              <select value={galleryForm.section} onChange={e => setGalleryForm({ ...galleryForm, section: e.target.value })} className={inputCls + ' cursor-pointer'}>
                                <option value="campus-life">Campus Life</option>
                                <option value="hero">Hero</option>
                                <option value="events">Events</option>
                                <option value="team">Team</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className={labelCls}>Caption (English)</label>
                              <input className={inputCls} value={galleryForm.captionEn} onChange={e => setGalleryForm({ ...galleryForm, captionEn: e.target.value })} placeholder="Caption in English" />
                            </div>
                            <div>
                              <label className={labelCls}>Caption (Hindi)</label>
                              <input className={inputCls} value={galleryForm.captionHi} onChange={e => setGalleryForm({ ...galleryForm, captionHi: e.target.value })} placeholder="हिंदी में कैप्शन" />
                            </div>
                            <div>
                              <label className={labelCls}>Caption (Gujarati)</label>
                              <input className={inputCls} value={galleryForm.captionGu} onChange={e => setGalleryForm({ ...galleryForm, captionGu: e.target.value })} placeholder="ગુજરાતી માં કૅપ્શન" />
                            </div>
                          </div>
                        </div>
                        <button onClick={handleGalleryAdd} disabled={galleryAdding} className="bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-wider px-6 py-2.5 rounded-sm transition-all cursor-pointer flex items-center gap-2 disabled:opacity-60">
                          {galleryAdding ? <><Loader2 size={12} className="animate-spin" /> Adding...</> : <><Plus size={12} /> Add to Gallery</>}
                        </button>
                      </motion.div>
                    )}

                    {/* Gallery grid */}
                    {galleryImages.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {galleryImages.map((img: any) => (
                          <div key={img._id} className="group relative rounded-sm overflow-hidden border border-white/10 bg-blue-950/30">
                            {editingGallery?._id === img._id ? (
                              <div className="p-3 space-y-2 bg-blue-950/80">
                                <input className="w-full p-2 bg-blue-900/60 border border-white/10 rounded-sm text-white text-[10px] outline-none" value={editingGallery.captionEn} onChange={e => setEditingGallery({ ...editingGallery, captionEn: e.target.value })} placeholder="Caption EN" />
                                <input className="w-full p-2 bg-blue-900/60 border border-white/10 rounded-sm text-white text-[10px] outline-none" value={editingGallery.captionHi} onChange={e => setEditingGallery({ ...editingGallery, captionHi: e.target.value })} placeholder="Caption HI" />
                                <input className="w-full p-2 bg-blue-900/60 border border-white/10 rounded-sm text-white text-[10px] outline-none" value={editingGallery.captionGu} onChange={e => setEditingGallery({ ...editingGallery, captionGu: e.target.value })} placeholder="Caption GU" />
                                <div className="flex gap-2">
                                  <button onClick={handleGalleryEditSave} className="flex-1 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-sm text-[10px] font-black uppercase cursor-pointer"><Save size={10} className="inline mr-1" />Save</button>
                                  <button onClick={() => setEditingGallery(null)} className="flex-1 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-sm text-[10px] font-black uppercase cursor-pointer">Cancel</button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <img src={img.url} alt={img.captionEn || 'Gallery'} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500" onError={(e: any) => { e.target.style.display = 'none'; }} />
                                {img.captionEn && (
                                  <div className="p-2 bg-blue-950/80">
                                    <p className="text-[10px] text-blue-200 truncate">{img.captionEn}</p>
                                    <p className="text-[9px] text-blue-400 uppercase font-bold">{img.section}</p>
                                  </div>
                                )}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                  <button onClick={() => setEditingGallery({ ...img })} className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-sm cursor-pointer transition-colors"><Edit size={14} /></button>
                                  <button onClick={() => handleGalleryDelete(img._id)} className="p-2 bg-red-600/80 hover:bg-red-600 text-white rounded-sm cursor-pointer transition-colors"><Trash2 size={14} /></button>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="border border-white/5 p-12 rounded-sm text-center bg-white/[0.01]">
                        <Image size={32} className="text-blue-300/30 mx-auto mb-3" />
                        <p className="text-blue-200/50 text-xs font-bold uppercase tracking-wider">No images in this section. Click "Add Image" above.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* ── IMPACT STATS ── */}
                {activeTab === 'stats' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className={sectionHeaderCls}>Impact Statistics Editor</h3>
                      <SaveButton status={statsSave} onClick={handleStatsSave} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {statsContent.map((stat: any, idx: number) => (
                        <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-sm p-5 space-y-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-6 h-6 rounded-sm bg-orange-600/20 border border-orange-500/30 text-orange-400 flex items-center justify-center text-xs font-black">{idx + 1}</span>
                            <span className="text-sm font-bold text-white">{stat.labelEn || `Stat ${idx + 1}`}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className={labelCls}>Label (English)</label>
                              <input className={inputCls} value={stat.labelEn || ''} onChange={e => { const s = [...statsContent]; s[idx] = { ...s[idx], labelEn: e.target.value }; setStatsContent(s); }} />
                            </div>
                            <div>
                              <label className={labelCls}>Value</label>
                              <input className={inputCls} value={stat.value || ''} onChange={e => { const s = [...statsContent]; s[idx] = { ...s[idx], value: e.target.value }; setStatsContent(s); }} placeholder="15,000+" />
                            </div>
                            <div>
                              <label className={labelCls}>Label (Hindi)</label>
                              <input className={inputCls} value={stat.labelHi || ''} onChange={e => { const s = [...statsContent]; s[idx] = { ...s[idx], labelHi: e.target.value }; setStatsContent(s); }} />
                            </div>
                            <div>
                              <label className={labelCls}>Label (Gujarati)</label>
                              <input className={inputCls} value={stat.labelGu || ''} onChange={e => { const s = [...statsContent]; s[idx] = { ...s[idx], labelGu: e.target.value }; setStatsContent(s); }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── SITE SETTINGS ── */}
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className={sectionHeaderCls}>Site Settings & Contact Info</h3>
                      <SaveButton status={settingsSave} onClick={handleSettingsSave} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-4">
                        <h4 className="text-xs font-black text-orange-400 uppercase tracking-wider border-b border-white/10 pb-2">Organization Name</h4>
                        <div>
                          <label className={labelCls}>Name (English)</label>
                          <input className={inputCls} value={settingsContent.orgNameEn || ''} onChange={e => setSettingsContent({ ...settingsContent, orgNameEn: e.target.value })} />
                        </div>
                        <div>
                          <label className={labelCls}>Name (Hindi)</label>
                          <input className={inputCls} value={settingsContent.orgNameHi || ''} onChange={e => setSettingsContent({ ...settingsContent, orgNameHi: e.target.value })} />
                        </div>
                        <div>
                          <label className={labelCls}>Name (Gujarati)</label>
                          <input className={inputCls} value={settingsContent.orgNameGu || ''} onChange={e => setSettingsContent({ ...settingsContent, orgNameGu: e.target.value })} />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-xs font-black text-orange-400 uppercase tracking-wider border-b border-white/10 pb-2">Contact Details</h4>
                        <div>
                          <label className={labelCls}>Office Address</label>
                          <textarea rows={3} className={inputCls + ' resize-none'} value={settingsContent.address || ''} onChange={e => setSettingsContent({ ...settingsContent, address: e.target.value })} />
                        </div>
                        <div>
                          <label className={labelCls}>Email</label>
                          <input type="email" className={inputCls} value={settingsContent.email || ''} onChange={e => setSettingsContent({ ...settingsContent, email: e.target.value })} />
                        </div>
                        <div>
                          <label className={labelCls}>Phone</label>
                          <input className={inputCls} value={settingsContent.phone || ''} onChange={e => setSettingsContent({ ...settingsContent, phone: e.target.value })} />
                        </div>
                      </div>
                      <div className="space-y-4 md:col-span-2">
                        <h4 className="text-xs font-black text-orange-400 uppercase tracking-wider border-b border-white/10 pb-2">Social Media Links</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {['facebook', 'twitter', 'instagram', 'youtube'].map(platform => (
                            <div key={platform}>
                              <label className={labelCls}>{platform.charAt(0).toUpperCase() + platform.slice(1)} URL</label>
                              <input
                                type="url"
                                className={inputCls}
                                value={settingsContent[`${platform}Url`] || ''}
                                onChange={e => setSettingsContent({ ...settingsContent, [`${platform}Url`]: e.target.value })}
                                placeholder={`https://${platform}.com/yourpage`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── SECURITY ── */}
                {activeTab === 'security' && (
                  <div className="max-w-md mx-auto py-4 space-y-5">
                    <h3 className={sectionHeaderCls}>Change Security Credentials</h3>
                    {securityStatus === 'success' ? (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-sm flex items-center justify-center gap-2">
                        <CheckCircle2 size={16} /><span className="text-xs font-black uppercase tracking-wider">Password changed successfully!</span>
                      </motion.div>
                    ) : (
                      <form onSubmit={handlePasswordChange} className="space-y-5">
                        {securityStatus === 'error' && (
                          <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3.5 rounded-sm text-xs font-bold">⚠️ {securityError}</div>
                        )}
                        <div>
                          <label className={labelCls}>Current Password</label>
                          <input required type="password" className={inputCls} value={passwordForm.oldPassword} onChange={e => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })} placeholder="Current Password" />
                        </div>
                        <div>
                          <label className={labelCls}>New Password</label>
                          <input required type="password" className={inputCls} value={passwordForm.newPassword} onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} placeholder="New Password (min 6 chars)" />
                        </div>
                        <div>
                          <label className={labelCls}>Confirm New Password</label>
                          <input required type="password" className={inputCls} value={passwordForm.confirmPassword} onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} placeholder="Confirm New Password" />
                        </div>
                        <button disabled={securityStatus === 'loading'} type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-sm font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:-translate-y-0.5 disabled:opacity-70">
                          {securityStatus === 'loading' ? <Loader2 className="animate-spin" size={14} /> : 'Update Password'}
                        </button>
                      </form>
                    )}
                  </div>
                )}

              </div>
            </>
          )}
        </div>
      </main>

      <Footer />

      {/* Program Modal */}
      <AnimatePresence>
        {isProgramModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-[#002147] border border-white/10 rounded-sm shadow-2xl w-full max-w-lg overflow-hidden relative flex flex-col max-h-[90vh] border-t-4 border-orange-500">
              <div className="bg-blue-950 p-6 text-white relative flex-shrink-0 border-b border-white/10">
                <button onClick={() => setIsProgramModalOpen(false)} className="absolute top-4 right-4 text-white/80 hover:text-white cursor-pointer font-bold text-lg leading-none">✕</button>
                <h2 className="text-xl font-serif font-black uppercase text-white tracking-wide">{editingProgram ? 'Edit Program' : 'Add Forthcoming Program'}</h2>
                <p className="text-blue-300 text-xs mt-1">Configure in English, Hindi, and Gujarati.</p>
              </div>
              <form onSubmit={handleProgramSubmit} className="p-6 overflow-y-auto space-y-4 text-left">
                {[{ lang: 'English', key: 'textEn', required: true }, { lang: 'Hindi', key: 'textHi', required: true }, { lang: 'Gujarati', key: 'textGu', required: true }].map(({ lang, key, required }) => (
                  <div key={key}>
                    <label className={labelCls}>Program Text ({lang}) {required && '*'}</label>
                    <textarea required={required} rows={3} className={inputCls + ' resize-none'} value={(programForm as any)[key]} onChange={e => setProgramForm({ ...programForm, [key]: e.target.value })} />
                  </div>
                ))}
                <div>
                  <label className={labelCls}>Details PDF URL (Optional)</label>
                  <input type="url" className={inputCls} value={programForm.link} onChange={e => setProgramForm({ ...programForm, link: e.target.value })} placeholder="https://..." />
                </div>
                <div>
                  <label className={labelCls}>Website URL (Optional)</label>
                  <input type="url" className={inputCls} value={programForm.websiteLink} onChange={e => setProgramForm({ ...programForm, websiteLink: e.target.value })} placeholder="https://..." />
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsProgramModalOpen(false)} className="px-5 py-3 bg-white/5 hover:bg-white/10 text-white rounded-sm font-bold text-xs uppercase tracking-wider cursor-pointer">Cancel</button>
                  <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-sm font-black text-xs uppercase tracking-wider cursor-pointer shadow-lg">{editingProgram ? 'Save Changes' : 'Create Program'}</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminDashboardPage;
