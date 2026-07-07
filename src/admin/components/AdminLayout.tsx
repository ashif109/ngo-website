import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, Drawer, AppBar, Toolbar, List, Typography, Divider, 
  IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Avatar, Menu, MenuItem
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Article as ArticleIcon,
  Event as EventIcon,
  School as SchoolIcon,
  AttachMoney as MoneyIcon,
  Mail as MailIcon,
  AccountCircle
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { text: 'Events & Programs', icon: <EventIcon />, path: '/admin/programs' },
  { text: 'Academic Courses', icon: <SchoolIcon />, path: '/admin/courses' },
  { text: 'Admissions', icon: <SchoolIcon />, path: '/admin/admissions' },
  { text: 'Students & Alumni', icon: <SchoolIcon />, path: '/admin/students' },
  { text: 'Donations', icon: <MoneyIcon />, path: '/admin/donations' },
  { text: 'Submissions', icon: <MailIcon />, path: '/admin/submissions' },
  { text: 'Site Content', icon: <ArticleIcon />, path: '/admin/content' },
  { text: 'CMS Pages', icon: <ArticleIcon />, path: '/admin/pages' },
  { text: 'Announcements', icon: <ArticleIcon />, path: '/admin/announcements' },
  { text: 'Publications', icon: <ArticleIcon />, path: '/admin/publications' },
  { text: 'Media Library', icon: <ArticleIcon />, path: '/admin/media' },
  { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' },
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('adminToken');
  
  React.useEffect(() => {
    if (!token) {
      navigate('/admin/login', { replace: true });
      return;
    }
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login', { replace: true });
      }
    } catch (e) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      navigate('/admin/login', { replace: true });
    }
  }, [navigate, token]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const drawer = (
    <div>
      <Toolbar sx={{ background: 'linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 100%)', borderBottom: '2px solid #D4AF37' }}>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', color: '#D4AF37', letterSpacing: 1 }}>
          Gurukulam Admin
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'rgba(212, 175, 55, 0.15)',
                  borderRight: '4px solid #7A1F1E',
                },
                '&:hover': {
                  bgcolor: 'rgba(212, 175, 55, 0.08)',
                }
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? '#7A1F1E' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography sx={{ 
                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                    color: location.pathname === item.path ? '#D4AF37' : 'inherit'
                  }}>
                    {item.text}
                  </Typography>
                } 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  if (!token) {
    return null;
  }
  
  // Prevent rendering if token is expired locally
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp * 1000 < Date.now()) return null;
  } catch (e) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: 'linear-gradient(90deg, #7A1F1E 0%, #D4AF37 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {menuItems.find(m => m.path === location.pathname)?.text || 'Admin Portal'}
          </Typography>
          
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, bgcolor: '#FDFBF7', minHeight: '100vh' }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
