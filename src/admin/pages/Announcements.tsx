import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, IconButton, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Grid, Switch, FormControlLabel
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Announcement as AnnouncementIcon } from '@mui/icons-material';
import axios from 'axios';

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog State
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [formData, setFormData] = useState({
    contentEn: '', contentHi: '', contentGu: '', 
    linkUrl: '', linkTextEn: '', linkTextHi: '', linkTextGu: '',
    isActive: true, isPinned: false, order: 0
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/admin/announcements', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      setAnnouncements(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching announcements:', err);
    }
  };

  const handleOpen = (announcement?: any) => {
    if (announcement) {
      setIsEdit(true);
      setCurrentId(announcement._id);
      setFormData({
        contentEn: announcement.contentEn || '',
        contentHi: announcement.contentHi || '',
        contentGu: announcement.contentGu || '',
        linkUrl: announcement.linkUrl || '',
        linkTextEn: announcement.linkTextEn || '',
        linkTextHi: announcement.linkTextHi || '',
        linkTextGu: announcement.linkTextGu || '',
        isActive: announcement.isActive !== undefined ? announcement.isActive : true,
        isPinned: announcement.isPinned !== undefined ? announcement.isPinned : false,
        order: announcement.order || 0
      });
    } else {
      setIsEdit(false);
      setFormData({ 
        contentEn: '', contentHi: '', contentGu: '', 
        linkUrl: '', linkTextEn: '', linkTextHi: '', linkTextGu: '',
        isActive: true, isPinned: false, order: 0
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.contentEn) {
      return alert('Content (English) is required');
    }

    try {
      const token = localStorage.getItem('adminToken');
      if (isEdit) {
        await axios.put(`/api/admin/announcements/${currentId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/admin/announcements', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchAnnouncements();
      handleClose();
    } catch (err: any) {
      console.error('Error saving announcement:', err);
      alert(err.response?.data?.error || err.response?.data?.message || 'Error saving announcement');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/admin/announcements/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAnnouncements();
    } catch (err) {
      console.error('Error deleting announcement:', err);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Latest News & Announcements
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} color="primary" onClick={() => handleOpen()}>
          Add Announcement
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'rgba(184, 134, 11, 0.1)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Content</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Link</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Pinned?</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'right', color: 'primary.dark' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {announcements.map((announcement) => (
              <TableRow key={announcement._id} sx={{ bgcolor: announcement.isPinned ? 'rgba(255, 193, 7, 0.05)' : 'inherit' }}>
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}>
                    <AnnouncementIcon sx={{ mr: 1, color: announcement.isPinned ? 'warning.main' : 'secondary.main' }} />
                    <Typography variant="body2" sx={{ maxWidth: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {announcement.contentEn}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  {announcement.linkUrl ? (
                    <a href={announcement.linkUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2' }}>
                      {announcement.linkTextEn || 'Link'}
                    </a>
                  ) : 'N/A'}
                </TableCell>
                <TableCell>
                  {announcement.isPinned ? <Chip label="Pinned" size="small" color="warning" /> : ''}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={announcement.isActive ? 'Active' : 'Inactive'} 
                    color={announcement.isActive ? 'success' : 'default'} 
                    size="small" 
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(announcement)}><EditIcon /></IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(announcement._id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {announcements.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>No announcements found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: '#fff' }}>
          {isEdit ? 'Edit Announcement' : 'Add New Announcement'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {/* English Fields */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="primary">English Details (Required)</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={2} label="Content (English)" name="contentEn" value={formData.contentEn} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Link Text (English)" name="linkTextEn" value={formData.linkTextEn} onChange={handleChange} placeholder="e.g. Read More" />
            </Grid>

            {/* Hindi Fields */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="primary" sx={{ mt: 2 }}>Hindi Details (Optional)</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={2} label="Content (Hindi)" name="contentHi" value={formData.contentHi} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Link Text (Hindi)" name="linkTextHi" value={formData.linkTextHi} onChange={handleChange} />
            </Grid>

            {/* Gujarati Fields */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="primary" sx={{ mt: 2 }}>Gujarati Details (Optional)</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={2} label="Content (Gujarati)" name="contentGu" value={formData.contentGu} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Link Text (Gujarati)" name="linkTextGu" value={formData.linkTextGu} onChange={handleChange} />
            </Grid>

            {/* General Fields */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="primary" sx={{ mt: 2 }}>Settings</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Link URL" name="linkUrl" value={formData.linkUrl} onChange={handleChange} placeholder="https://" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                control={<Switch checked={formData.isPinned} onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })} color="warning" />}
                label="Pin to top"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField select fullWidth label="Is Active" name="isActive" value={formData.isActive as any} onChange={handleChange}>
                <MenuItem value={true as any}>Yes</MenuItem>
                <MenuItem value={false as any}>No</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth type="number" label="Display Order" name="order" value={formData.order} onChange={handleChange} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleClose} color="inherit">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {isEdit ? 'Update Announcement' : 'Create Announcement'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
