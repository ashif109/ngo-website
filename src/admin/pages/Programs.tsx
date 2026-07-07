import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, IconButton, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Event as EventIcon } from '@mui/icons-material';
import axios from 'axios';

export default function Programs() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog State
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [formData, setFormData] = useState({
    titleEn: '', titleHi: '', titleGu: '', 
    status: 'upcoming', location: '', startDate: '', endDate: '', descriptionEn: ''
  });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/admin/programs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      setPrograms(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching programs:', err);
    }
  };

  const handleOpen = (program?: any) => {
    if (program) {
      setIsEdit(true);
      setCurrentId(program._id);
      setFormData({
        titleEn: program.titleEn || '',
        titleHi: program.titleHi || '',
        titleGu: program.titleGu || '',
        status: program.status || 'upcoming',
        location: program.location || '',
        startDate: program.startDate ? new Date(program.startDate).toISOString().split('T')[0] : '',
        endDate: program.endDate ? new Date(program.endDate).toISOString().split('T')[0] : '',
        descriptionEn: program.descriptionEn || '',
        descriptionHi: program.descriptionHi || '',
        descriptionGu: program.descriptionGu || '',
        link: program.link || '',
        websiteLink: program.websiteLink || ''
      });
    } else {
      setIsEdit(false);
      setFormData({ 
        titleEn: '', titleHi: '', titleGu: '', 
        status: 'upcoming', location: '', startDate: '', endDate: '', 
        descriptionEn: '', descriptionHi: '', descriptionGu: '',
        link: '', websiteLink: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (isEdit) {
        await axios.put(`/api/admin/programs/${currentId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/admin/programs', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchPrograms();
      handleClose();
    } catch (err) {
      console.error('Error saving program:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this program?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/admin/programs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPrograms();
    } catch (err) {
      console.error('Error deleting program:', err);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Forthcoming Programs
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} color="primary" onClick={() => handleOpen()}>
          Add Program
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'rgba(184, 134, 11, 0.1)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Program Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Start Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'right', color: 'primary.dark' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {programs.map((program) => (
              <TableRow key={program._id}>
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}>
                    <EventIcon sx={{ mr: 1, color: 'secondary.main' }} />
                    {program.titleEn}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={program.status.toUpperCase()} 
                    sx={{ 
                      bgcolor: program.status === 'upcoming' ? 'warning.light' : program.status === 'ongoing' ? 'primary.light' : '#e0e0e0',
                      color: program.status === 'upcoming' ? '#000' : '#fff',
                      fontWeight: 'bold', fontSize: '0.75rem'
                    }} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>{program.startDate ? new Date(program.startDate).toLocaleDateString() : 'TBD'}</TableCell>
                <TableCell>{program.location}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(program)}><EditIcon /></IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(program._id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: '#fff' }}>
          {isEdit ? 'Edit Program' : 'Add New Program'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField fullWidth label="Title (English)" name="titleEn" value={formData.titleEn} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Title (Hindi)" name="titleHi" value={formData.titleHi} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Title (Gujarati)" name="titleGu" value={formData.titleGu} onChange={handleChange} margin="normal" required />
          <TextField select fullWidth label="Status" name="status" value={formData.status} onChange={handleChange} margin="normal">
            <MenuItem value="upcoming">Upcoming</MenuItem>
            <MenuItem value="ongoing">Ongoing</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>
          <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleChange} margin="normal" />
          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <TextField 
              fullWidth 
              label="Start Date" 
              name="startDate" 
              type={formData.startDate ? "date" : "text"}
              onFocus={(e) => e.target.type = 'date'}
              onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
              value={formData.startDate} 
              onChange={handleChange} 
              margin="normal" 
            />
            <TextField 
              fullWidth 
              label="End Date" 
              name="endDate" 
              type={formData.endDate ? "date" : "text"}
              onFocus={(e) => e.target.type = 'date'}
              onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
              value={formData.endDate} 
              onChange={handleChange} 
              margin="normal" 
            />
          </Box>
          <TextField fullWidth multiline rows={3} label="Description (English)" name="descriptionEn" value={formData.descriptionEn} onChange={handleChange} margin="normal" />
          <TextField fullWidth multiline rows={3} label="Description (Hindi)" name="descriptionHi" value={formData.descriptionHi} onChange={handleChange} margin="normal" />
          <TextField fullWidth multiline rows={3} label="Description (Gujarati)" name="descriptionGu" value={formData.descriptionGu} onChange={handleChange} margin="normal" />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField fullWidth label="Brochure PDF Link" name="link" value={formData.link} onChange={handleChange} margin="normal" placeholder="https://" />
            <TextField fullWidth label="Website Link" name="websiteLink" value={formData.websiteLink} onChange={handleChange} margin="normal" placeholder="https://" />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleClose} color="inherit">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {isEdit ? 'Update Program' : 'Create Program'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
