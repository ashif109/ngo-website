import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Grid, TextField, Button, Divider, IconButton, Card, CardContent, CircularProgress, Alert
} from '@mui/material';
import { Save as SaveIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Home, HeartHandshake, BarChart3, Loader2 } from 'lucide-react';
import axios from 'axios';
import { getSiteContent, updateSiteContent } from '../../services/api';
import ImageUploader from '../../components/common/ImageUploader';

export default function SiteContent() {
  const [loading, setLoading] = useState(true);
  const [heroContent, setHeroContent] = useState<any>({});
  const [causesContent, setCausesContent] = useState<any[]>([]);
  const [statsContent, setStatsContent] = useState<any[]>([]);
  const [saveStatus, setSaveStatus] = useState<{ [key: string]: 'idle' | 'saving' | 'saved' | 'error' }>({
    hero: 'idle', causes: 'idle', stats: 'idle'
  });
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const [heroRes, causesRes, statsRes] = await Promise.all([
        getSiteContent('hero'),
        getSiteContent('causes'),
        getSiteContent('stats')
      ]);
      if (heroRes.success) setHeroContent(heroRes.data || {});
      if (causesRes.success) setCausesContent(Array.isArray(causesRes.data) ? causesRes.data : []);
      if (statsRes.success) setStatsContent(Array.isArray(statsRes.data) ? statsRes.data : []);
    } catch (err) {
      console.error('Error fetching site content:', err);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSave = async (section: string, data: any) => {
    setSaveStatus({ ...saveStatus, [section]: 'saving' });
    try {
      const res = await updateSiteContent(section, data);
      if (res.success) {
        setSaveStatus({ ...saveStatus, [section]: 'saved' });
        showMessage(`${section.toUpperCase()} saved successfully!`);
        setTimeout(() => setSaveStatus({ ...saveStatus, [section]: 'idle' }), 2000);
      } else {
        throw new Error(res.error || 'Failed to save');
      }
    } catch (err: any) {
      setSaveStatus({ ...saveStatus, [section]: 'error' });
      showMessage(err.message, 'error');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress sx={{ color: '#ff6600' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1000, margin: '0 auto', pb: 8 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#002147' }}>
          Site Content Editor
        </Typography>
      </Box>

      {message && (
        <Alert severity={message.type} sx={{ mb: 4 }}>
          {message.text}
        </Alert>
      )}

      {/* Hero Section */}
      <Paper sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Home className="text-[#ff6600]" size={24} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Hero Section</Typography>
          </Box>
          <Button 
            variant="contained" 
            startIcon={saveStatus.hero === 'saving' ? <Loader2 className="animate-spin" size={16} /> : <SaveIcon fontSize="small" />} 
            disabled={saveStatus.hero === 'saving'}
            onClick={() => handleSave('hero', heroContent)}
            sx={{ bgcolor: '#002147', '&:hover': { bgcolor: '#001530' } }}
          >
            {saveStatus.hero === 'saved' ? 'Saved' : 'Save Hero'}
          </Button>
        </Box>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Headline (English)" value={heroContent.headlineEn || ''} onChange={e => setHeroContent({ ...heroContent, headlineEn: e.target.value })} fullWidth size="small" />
              <TextField label="Headline (Hindi)" value={heroContent.headlineHi || ''} onChange={e => setHeroContent({ ...heroContent, headlineHi: e.target.value })} fullWidth size="small" />
              <TextField label="Headline (Gujarati)" value={heroContent.headlineGu || ''} onChange={e => setHeroContent({ ...heroContent, headlineGu: e.target.value })} fullWidth size="small" />
              <TextField label="Badge Text (English)" value={heroContent.badgeEn || ''} onChange={e => setHeroContent({ ...heroContent, badgeEn: e.target.value })} fullWidth size="small" sx={{ mt: 2 }} />
              <TextField label="Badge Text (Hindi)" value={heroContent.badgeHi || ''} onChange={e => setHeroContent({ ...heroContent, badgeHi: e.target.value })} fullWidth size="small" />
              <TextField label="Badge Text (Gujarati)" value={heroContent.badgeGu || ''} onChange={e => setHeroContent({ ...heroContent, badgeGu: e.target.value })} fullWidth size="small" />
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: 'text.secondary' }}>Hero Background Image</Typography>
            <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1, border: '1px dashed #cbd5e1' }}>
              <ImageUploader
                label=""
                currentUrl={heroContent.backgroundImageUrl}
                onUpload={url => setHeroContent({ ...heroContent, backgroundImageUrl: url })}
              />
              {heroContent.backgroundImageUrl && (
                <Typography variant="caption" sx={{ color: 'success.main', mt: 1, display: 'block', wordBreak: 'break-all' }}>
                  ✓ Image active
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Core Causes Section */}
      <Paper sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <HeartHandshake className="text-[#ff6600]" size={24} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Core Causes</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="outlined" 
              startIcon={<AddIcon fontSize="small" />} 
              onClick={() => setCausesContent([...causesContent, {}])}
              sx={{ color: '#ff6600', borderColor: '#ff6600', '&:hover': { borderColor: '#e65c00', bgcolor: '#fff5f0' } }}
            >
              Add Cause
            </Button>
            <Button 
              variant="contained" 
              startIcon={saveStatus.causes === 'saving' ? <Loader2 className="animate-spin" size={16} /> : <SaveIcon fontSize="small" />} 
              disabled={saveStatus.causes === 'saving'}
              onClick={() => handleSave('causes', causesContent)}
              sx={{ bgcolor: '#002147', '&:hover': { bgcolor: '#001530' } }}
            >
              {saveStatus.causes === 'saved' ? 'Saved' : 'Save Causes'}
            </Button>
          </Box>
        </Box>
        <Divider sx={{ mb: 4 }} />

        {causesContent.map((cause: any, idx: number) => (
          <Card key={idx} sx={{ mb: 4, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Cause #{idx + 1}</Typography>
                <IconButton color="error" onClick={() => setCausesContent(causesContent.filter((_, i) => i !== idx))}>
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Grid container spacing={4}>
                <Grid item xs={12} md={7}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="Title (English)" value={cause.titleEn || ''} onChange={e => { const c = [...causesContent]; c[idx] = { ...c[idx], titleEn: e.target.value }; setCausesContent(c); }} fullWidth size="small" />
                    <TextField label="Title (Hindi)" value={cause.titleHi || ''} onChange={e => { const c = [...causesContent]; c[idx] = { ...c[idx], titleHi: e.target.value }; setCausesContent(c); }} fullWidth size="small" />
                    <TextField label="Title (Gujarati)" value={cause.titleGu || ''} onChange={e => { const c = [...causesContent]; c[idx] = { ...c[idx], titleGu: e.target.value }; setCausesContent(c); }} fullWidth size="small" />
                    <TextField label="Description (English)" multiline rows={2} value={cause.descEn || ''} onChange={e => { const c = [...causesContent]; c[idx] = { ...c[idx], descEn: e.target.value }; setCausesContent(c); }} fullWidth size="small" sx={{ mt: 1 }} />
                    <TextField label="Description (Hindi)" multiline rows={2} value={cause.descHi || ''} onChange={e => { const c = [...causesContent]; c[idx] = { ...c[idx], descHi: e.target.value }; setCausesContent(c); }} fullWidth size="small" />
                    <TextField label="Description (Gujarati)" multiline rows={2} value={cause.descGu || ''} onChange={e => { const c = [...causesContent]; c[idx] = { ...c[idx], descGu: e.target.value }; setCausesContent(c); }} fullWidth size="small" />
                  </Box>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: 'text.secondary' }}>Cause Image</Typography>
                  <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1, border: '1px dashed #cbd5e1', height: '100%' }}>
                    <ImageUploader
                      label=""
                      currentUrl={cause.imageUrl}
                      onUpload={url => { const c = [...causesContent]; c[idx] = { ...c[idx], imageUrl: url }; setCausesContent(c); }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Paper>

      {/* Impact Stats Section */}
      <Paper sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <BarChart3 className="text-[#ff6600]" size={24} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Impact Stats</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="outlined" 
              startIcon={<AddIcon fontSize="small" />} 
              onClick={() => setStatsContent([...statsContent, {}])}
              sx={{ color: '#ff6600', borderColor: '#ff6600', '&:hover': { borderColor: '#e65c00', bgcolor: '#fff5f0' } }}
            >
              Add Stat
            </Button>
            <Button 
              variant="contained" 
              startIcon={saveStatus.stats === 'saving' ? <Loader2 className="animate-spin" size={16} /> : <SaveIcon fontSize="small" />} 
              disabled={saveStatus.stats === 'saving'}
              onClick={() => handleSave('stats', statsContent)}
              sx={{ bgcolor: '#002147', '&:hover': { bgcolor: '#001530' } }}
            >
              {saveStatus.stats === 'saved' ? 'Saved' : 'Save Stats'}
            </Button>
          </Box>
        </Box>
        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          {statsContent.map((stat: any, idx: number) => (
            <Grid item xs={12} md={6} key={idx}>
              <Card sx={{ border: '1px solid #e2e8f0', boxShadow: 'none' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Stat #{idx + 1}</Typography>
                    <IconButton color="error" size="small" onClick={() => setStatsContent(statsContent.filter((_, i) => i !== idx))}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="Value (e.g. 15,000+)" value={stat.value || ''} onChange={e => { const s = [...statsContent]; s[idx] = { ...s[idx], value: e.target.value }; setStatsContent(s); }} fullWidth size="small" />
                    <TextField label="Label (English)" value={stat.labelEn || ''} onChange={e => { const s = [...statsContent]; s[idx] = { ...s[idx], labelEn: e.target.value }; setStatsContent(s); }} fullWidth size="small" />
                    <TextField label="Label (Hindi)" value={stat.labelHi || ''} onChange={e => { const s = [...statsContent]; s[idx] = { ...s[idx], labelHi: e.target.value }; setStatsContent(s); }} fullWidth size="small" />
                    <TextField label="Label (Gujarati)" value={stat.labelGu || ''} onChange={e => { const s = [...statsContent]; s[idx] = { ...s[idx], labelGu: e.target.value }; setStatsContent(s); }} fullWidth size="small" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
