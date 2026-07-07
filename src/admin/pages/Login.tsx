import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Button, TextField, Typography, Paper, 
  Container, Alert, CircularProgress,
  InputAdornment, IconButton
} from '@mui/material';
import { Mail, Lock, Visibility, VisibilityOff, AdminPanelSettings } from '@mui/icons-material';
import axios from 'axios';
import { motion } from 'motion/react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('/api/admin/auth/login', { email, password });
      
      if (res.data.token) {
        localStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('adminUser', JSON.stringify(res.data.user));
        navigate('/admin/dashboard');
      } else {
        setError(res.data.error || 'Login failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #002147 0%, #001229 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative blurred circles for premium glassmorphism effect */}
      <Box sx={{ position: 'absolute', top: '-10%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,102,0,0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(40px)' }} />
      <Box sx={{ position: 'absolute', bottom: '-20%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,191,255,0.1) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(40px)' }} />

      <Container component="main" maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Paper 
            elevation={24} 
            sx={{ 
              p: 5, 
              width: '100%', 
              borderRadius: 4,
              backdropFilter: 'blur(16px)',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Box 
                sx={{ 
                  width: 64, 
                  height: 64, 
                  bgcolor: 'rgba(255,102,0,0.1)', 
                  color: '#ff6600',
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto',
                  mb: 2
                }}
              >
                <AdminPanelSettings fontSize="large" />
              </Box>
              <Typography component="h1" variant="h4" sx={{ fontWeight: '800', color: '#002147', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.5px' }}>
                Admin Portal
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: '#64748b', fontWeight: 500 }}>
                Secure access for Gurukulamagra staff
              </Typography>
            </Box>

            {error && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2, fontWeight: 500 }}>{error}</Alert>
              </motion.div>
            )}

            <Box component="form" onSubmit={handleLogin} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail sx={{ color: '#94a3b8' }} />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2, bgcolor: '#f8fafc' }
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#94a3b8' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2, bgcolor: '#f8fafc' }
                }}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ 
                  mt: 4, 
                  mb: 2, 
                  bgcolor: '#ff6600', 
                  '&:hover': { bgcolor: '#e65c00', transform: 'translateY(-2px)', boxShadow: '0 10px 20px -10px rgba(255, 102, 0, 0.5)' },
                  transition: 'all 0.2s ease',
                  py: 1.8,
                  borderRadius: 2,
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  textTransform: 'none'
                }}
              >
                {loading ? <CircularProgress size={26} color="inherit" /> : 'Secure Login'}
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
