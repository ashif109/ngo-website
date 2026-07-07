import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Grid, TextField, Button, Divider, Alert, CircularProgress
} from '@mui/material';
import { Save as SaveIcon, Shield as ShieldIcon, Settings as SettingsIcon, Loader2 } from 'lucide-react';
import axios from 'axios';
import { getSiteContent, updateSiteContent, changeAdminPassword } from '../../services/api';

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [settingsContent, setSettingsContent] = useState<any>({});
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  
  const [saveStatus, setSaveStatus] = useState<{ [key: string]: 'idle' | 'saving' | 'saved' | 'error' }>({
    settings: 'idle', security: 'idle'
  });
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await getSiteContent('settings');
      if (res.success) {
        setSettingsContent(res.data || {});
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSettingsSave = async () => {
    setSaveStatus({ ...saveStatus, settings: 'saving' });
    try {
      const res = await updateSiteContent('settings', settingsContent);
      if (res.success) {
        setSaveStatus({ ...saveStatus, settings: 'saved' });
        showMessage('Site settings saved successfully!');
        setTimeout(() => setSaveStatus({ ...saveStatus, settings: 'idle' }), 2000);
      } else {
        throw new Error(res.error || 'Failed to save settings');
      }
    } catch (err: any) {
      setSaveStatus({ ...saveStatus, settings: 'error' });
      showMessage(err.message, 'error');
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showMessage('New passwords do not match', 'error');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      showMessage('Password must be at least 6 characters', 'error');
      return;
    }

    setSaveStatus({ ...saveStatus, security: 'saving' });
    try {
      const res = await changeAdminPassword({ oldPassword: passwordForm.oldPassword, newPassword: passwordForm.newPassword });
      if (res.success) {
        setSaveStatus({ ...saveStatus, security: 'saved' });
        showMessage('Password changed successfully!');
        setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => setSaveStatus({ ...saveStatus, security: 'idle' }), 2000);
      } else {
        throw new Error(res.error || 'Failed to change password');
      }
    } catch (err: any) {
      setSaveStatus({ ...saveStatus, security: 'error' });
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
          Site Settings
        </Typography>
      </Box>

      {message && (
        <Alert severity={message.type} sx={{ mb: 4 }}>
          {message.text}
        </Alert>
      )}

      {/* General Settings */}
      <Paper sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SettingsIcon className="text-[#ff6600]" size={24} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Global Configuration</Typography>
          </Box>
          <Button 
            variant="contained" 
            startIcon={saveStatus.settings === 'saving' ? <Loader2 className="animate-spin" size={16} /> : <SaveIcon size={16} />} 
            disabled={saveStatus.settings === 'saving'}
            onClick={handleSettingsSave}
            sx={{ bgcolor: '#002147', '&:hover': { bgcolor: '#001530' } }}
          >
            {saveStatus.settings === 'saved' ? 'Saved' : 'Save Settings'}
          </Button>
        </Box>
        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#ff6600', mb: 2, textTransform: 'uppercase' }}>
              Organization Name
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Name (English)" value={settingsContent.orgNameEn || ''} onChange={e => setSettingsContent({ ...settingsContent, orgNameEn: e.target.value })} fullWidth size="small" />
              <TextField label="Name (Hindi)" value={settingsContent.orgNameHi || ''} onChange={e => setSettingsContent({ ...settingsContent, orgNameHi: e.target.value })} fullWidth size="small" />
              <TextField label="Name (Gujarati)" value={settingsContent.orgNameGu || ''} onChange={e => setSettingsContent({ ...settingsContent, orgNameGu: e.target.value })} fullWidth size="small" />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#ff6600', mb: 2, textTransform: 'uppercase' }}>
              Contact Details
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Office Address" multiline rows={2} value={settingsContent.address || ''} onChange={e => setSettingsContent({ ...settingsContent, address: e.target.value })} fullWidth size="small" />
              <TextField label="Email" type="email" value={settingsContent.email || ''} onChange={e => setSettingsContent({ ...settingsContent, email: e.target.value })} fullWidth size="small" />
              <TextField label="Phone" value={settingsContent.phone || ''} onChange={e => setSettingsContent({ ...settingsContent, phone: e.target.value })} fullWidth size="small" />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#ff6600', mb: 2, textTransform: 'uppercase' }}>
              Social Media Links
            </Typography>
            <Grid container spacing={2}>
              {['facebook', 'twitter', 'instagram', 'youtube'].map(platform => (
                <Grid item xs={12} sm={6} key={platform}>
                  <TextField 
                    label={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`} 
                    type="url"
                    value={settingsContent[`${platform}Url`] || ''} 
                    onChange={e => setSettingsContent({ ...settingsContent, [`${platform}Url`]: e.target.value })} 
                    fullWidth 
                    size="small" 
                    placeholder={`https://${platform}.com/`}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Security Section */}
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <ShieldIcon className="text-error" size={24} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Security Credentials</Typography>
        </Box>
        <Divider sx={{ mb: 4 }} />
        
        <Box component="form" onSubmit={handlePasswordChange} sx={{ maxWidth: 400 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField 
              required 
              label="Current Password" 
              type="password" 
              value={passwordForm.oldPassword} 
              onChange={e => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })} 
              fullWidth 
              size="small" 
            />
            <TextField 
              required 
              label="New Password" 
              type="password" 
              value={passwordForm.newPassword} 
              onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} 
              fullWidth 
              size="small" 
              helperText="Minimum 6 characters"
            />
            <TextField 
              required 
              label="Confirm New Password" 
              type="password" 
              value={passwordForm.confirmPassword} 
              onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} 
              fullWidth 
              size="small" 
            />
            <Button 
              type="submit"
              variant="contained" 
              color="error"
              disabled={saveStatus.security === 'saving'}
              startIcon={saveStatus.security === 'saving' ? <Loader2 className="animate-spin" size={16} /> : undefined}
              sx={{ mt: 1, py: 1.5, fontWeight: 'bold' }}
            >
              Update Password
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
