import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Premium Golden/Red/Yellow theme for the admin portal
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7A1F1E', // Matches Home Primary
      light: '#9D2928',
      dark: '#5C1615'
    },
    secondary: {
      main: '#D4AF37', // Matches Home Secondary (Gold)
      light: '#E6C55C',
      dark: '#B89326'
    },
    warning: {
      main: '#D97706', // Matches Home Accent
    },
    background: {
      default: '#FDFBF7',
      paper: '#FFFFFF'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600
    }
  }
});

import AdminLogin from './pages/Login';
import AdminDashboard from './pages/Dashboard';
import AdminLayout from './components/AdminLayout';
import CMSPages from './pages/CMSPages';
import MediaLibrary from './pages/MediaLibrary';
import Programs from './pages/Programs';
import Admissions from './pages/Admissions';
import Donations from './pages/Donations';
import Students from './pages/Students';
import Users from './pages/Users';
import Submissions from './pages/Submissions';
import SiteContent from './pages/SiteContent';
import Settings from './pages/Settings';
import Courses from './pages/Courses';
import Publications from './pages/Publications';
import Announcements from './pages/Announcements';

export default function AdminApp() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          navigate('/admin/login');
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/content" element={<SiteContent />} />
          <Route path="/pages" element={<CMSPages />} />
          <Route path="/media" element={<MediaLibrary />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/students" element={<Students />} />
          <Route path="/users" element={<Users />} />
          <Route path="/submissions" element={<Submissions />} />
          <Route path="/settings" element={<Settings />} />
          {/* Default route redirect */}
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
