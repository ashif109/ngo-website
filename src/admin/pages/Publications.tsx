import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, IconButton, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Grid, Tabs, Tab
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Book as BookIcon } from '@mui/icons-material';
import axios from 'axios';

export default function Publications() {
  const [publications, setPublications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  
  // Dialog State
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [formData, setFormData] = useState({
    titleEn: '', titleHi: '', titleGu: '', 
    category: 'publication',
    dateEn: '', dateHi: '', dateGu: '',
    imgUrl: '', fileUrl: '',
    isActive: true, order: 0
  });

  const categories = ['publication', 'policy_brief', 'newsletter', 'resource'];
  const currentCategory = categories[tabIndex];

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/admin/publications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      setPublications(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching publications:', err);
    }
  };

  const handleOpen = (pub?: any) => {
    if (pub) {
      setIsEdit(true);
      setCurrentId(pub._id);
      setFormData({
        titleEn: pub.titleEn || '',
        titleHi: pub.titleHi || '',
        titleGu: pub.titleGu || '',
        category: pub.category || 'publication',
        dateEn: pub.dateEn || '',
        dateHi: pub.dateHi || '',
        dateGu: pub.dateGu || '',
        imgUrl: pub.imgUrl || '',
        fileUrl: pub.fileUrl || '',
        isActive: pub.isActive !== undefined ? pub.isActive : true,
        order: pub.order || 0
      });
    } else {
      setIsEdit(false);
      setFormData({ 
        titleEn: '', titleHi: '', titleGu: '', 
        category: currentCategory,
        dateEn: '', dateHi: '', dateGu: '',
        imgUrl: '', fileUrl: '',
        isActive: true, order: 0
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
    try {
      const token = localStorage.getItem('adminToken');
      if (isEdit) {
        await axios.put(`/api/admin/publications/${currentId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/admin/publications', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchPublications();
      handleClose();
    } catch (err) {
      console.error('Error saving publication:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/admin/publications/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPublications();
    } catch (err) {
      console.error('Error deleting publication:', err);
    }
  };

  const filteredData = publications.filter(p => p.category === currentCategory);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Publications & Media
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} color="primary" onClick={() => handleOpen()}>
          Add New Item
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabIndex} onChange={(e, v) => setTabIndex(v)} textColor="primary" indicatorColor="primary">
          <Tab label="Publications" />
          <Tab label="Policy Briefs" />
          <Tab label="Newsletters" />
          <Tab label="Key Resources" />
        </Tabs>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'rgba(184, 134, 11, 0.1)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Date Info</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Image/File</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'right', color: 'primary.dark' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((pub) => (
              <TableRow key={pub._id}>
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}>
                    <BookIcon sx={{ mr: 1, color: 'secondary.main' }} />
                    {pub.titleEn}
                  </Box>
                </TableCell>
                <TableCell>{pub.dateEn || 'N/A'}</TableCell>
                <TableCell>
                  {pub.imgUrl && <Chip label="Has Image" size="small" color="primary" variant="outlined" sx={{ mr: 1 }} />}
                  {pub.fileUrl && <Chip label="Has File" size="small" color="secondary" variant="outlined" />}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={pub.isActive ? 'Active' : 'Inactive'} 
                    color={pub.isActive ? 'success' : 'default'} 
                    size="small" 
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(pub)}><EditIcon /></IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(pub._id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>No items found in this category.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: '#fff' }}>
          {isEdit ? 'Edit Item' : 'Add New Item'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Category" name="category" value={formData.category} onChange={handleChange} required>
                <MenuItem value="publication">Publication</MenuItem>
                <MenuItem value="policy_brief">Policy Brief</MenuItem>
                <MenuItem value="newsletter">Newsletter</MenuItem>
                <MenuItem value="resource">Key Resource</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Is Active" name="isActive" value={formData.isActive as any} onChange={handleChange}>
                <MenuItem value={true as any}>Yes</MenuItem>
                <MenuItem value={false as any}>No</MenuItem>
              </TextField>
            </Grid>

            {/* English Fields */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="primary">English Details (Required)</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Title (English)" name="titleEn" value={formData.titleEn} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Date Info (English)" name="dateEn" value={formData.dateEn} onChange={handleChange} placeholder="e.g. May 2026" />
            </Grid>

            {/* Hindi Fields */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="primary" sx={{ mt: 1 }}>Hindi Details (Optional)</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Title (Hindi)" name="titleHi" value={formData.titleHi} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Date Info (Hindi)" name="dateHi" value={formData.dateHi} onChange={handleChange} />
            </Grid>

            {/* Gujarati Fields */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="primary" sx={{ mt: 1 }}>Gujarati Details (Optional)</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Title (Gujarati)" name="titleGu" value={formData.titleGu} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Date Info (Gujarati)" name="dateGu" value={formData.dateGu} onChange={handleChange} />
            </Grid>

            {/* Links/Media Fields */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="primary" sx={{ mt: 1 }}>Media & Links</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Image URL" name="imgUrl" value={formData.imgUrl} onChange={handleChange} placeholder="Upload in Media Library and paste URL here" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="File URL (PDF/Link)" name="fileUrl" value={formData.fileUrl} onChange={handleChange} placeholder="URL to open when clicked" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth type="number" label="Display Order" name="order" value={formData.order} onChange={handleChange} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleClose} color="inherit">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {isEdit ? 'Update Item' : 'Create Item'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
