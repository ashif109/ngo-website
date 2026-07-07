import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { 
  People as PeopleIcon, 
  Article as ArticleIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon 
} from '@mui/icons-material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import axios from 'axios';

const StatCard = ({ title, value, icon, color }: any) => (
  <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 2 }}>
    <Box>
      <Typography color="textSecondary" variant="subtitle2" sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>
        {value}
      </Typography>
    </Box>
    <Box sx={{ backgroundColor: `${color}15`, p: 1.5, borderRadius: '50%', color: color }}>
      {icon}
    </Box>
  </Paper>
);

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<any>({
    totalUsers: 0,
    activePages: 0,
    totalDonations: 0,
    totalStudents: 0
  });
  const [revenueData, setRevenueData] = useState<any[]>([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await axios.get('/api/admin/analytics/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data) {
          setMetrics(res.data.metrics || {
            totalUsers: 0,
            activePages: 0,
            totalDonations: 0,
            totalStudents: 0
          });
          setRevenueData(res.data.revenueData || []);
        }
      } catch (err) {
        console.error('Error fetching analytics:', err);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#002147' }}>
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <StatCard title="Admins & Editors" value={metrics?.totalUsers || 0} icon={<PeopleIcon fontSize="large" />} color="#2196f3" />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard title="Active Pages" value={metrics?.activePages || 0} icon={<ArticleIcon fontSize="large" />} color="#4caf50" />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard title="Total Donations" value={`₹ ${((metrics?.totalDonations) || 0).toLocaleString()}`} icon={<MoneyIcon fontSize="large" />} color="#ff9800" />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard title="Students Registered" value={metrics?.totalStudents || 0} icon={<TrendingUpIcon fontSize="large" />} color="#f44336" />
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>Donation Revenue (Past 7 Months)</Typography>
          <Box sx={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip 
                  formatter={(value: number) => [`₹ ${value.toLocaleString()}`, 'Revenue']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#ff6600" 
                  strokeWidth={3}
                  activeDot={{ r: 8 }} 
                  dot={{ r: 4, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
