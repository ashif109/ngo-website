import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, IconButton, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Grid
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Public as PublicIcon } from '@mui/icons-material';
import axios from 'axios';

export default function CMSPages() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog State
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [formData, setFormData] = useState({
    title: '', slug: '', content: '', excerpt: '', status: 'draft', metaTitle: '', metaDescription: ''
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/admin/pages', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      setPages(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching pages:', err);
    }
  };

  const handleOpen = (page?: any) => {
    if (page) {
      setIsEdit(true);
      setCurrentId(page._id);
      setFormData({
        title: page.title || '',
        slug: page.slug || '',
        content: page.content || '',
        excerpt: page.excerpt || '',
        status: page.status || 'draft',
        metaTitle: page.metaTitle || '',
        metaDescription: page.metaDescription || ''
      });
    } else {
      setIsEdit(false);
      setFormData({
        title: '', slug: '', content: '', excerpt: '', status: 'draft', metaTitle: '', metaDescription: ''
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
        await axios.put(`/api/admin/pages/${currentId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/admin/pages', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchPages();
      handleClose();
    } catch (err: any) {
      console.error('Error saving page:', err);
      alert(err.response?.data?.message || 'Error saving page. Slug must be unique.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this page?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/admin/pages/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPages();
    } catch (err) {
      console.error('Error deleting page:', err);
    }
  };

  const togglePublish = async (page: any) => {
    try {
      const token = localStorage.getItem('adminToken');
      const newStatus = page.status === 'published' ? 'draft' : 'published';
      await axios.put(`/api/admin/pages/${page._id}`, { ...page, status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPages();
    } catch (err) {
      console.error('Error toggling publish:', err);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          CMS Pages
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} color="primary" onClick={() => handleOpen()}>
          Create New Page
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'rgba(184, 134, 11, 0.1)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Slug / URL</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Version</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Last Updated</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'right', color: 'primary.dark' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pages.map((page) => (
              <TableRow key={page._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>{page.title}</TableCell>
                <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>/{page.slug}</TableCell>
                <TableCell>
                  <Chip 
                    label={page.status.toUpperCase()} 
                    color={page.status === 'published' ? 'success' : 'warning'} 
                    size="small" 
                    sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}
                  />
                </TableCell>
                <TableCell>v{page.version}</TableCell>
                <TableCell>{new Date(page.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell align="right">
                  <IconButton color={page.status === 'published' ? 'secondary' : 'success'} onClick={() => togglePublish(page)} title={page.status === 'published' ? 'Unpublish' : 'Publish'}>
                    <PublicIcon />
                  </IconButton>
                  <IconButton color="primary" onClick={() => handleOpen(page)} title="Edit"><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(page._id)} title="Delete"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {pages.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  No pages found. Create your first page!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create/Edit Page Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: '#fff' }}>
          {isEdit ? 'Edit Page' : 'Create New Page'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2, p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Page Title" name="title" value={formData.title} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="URL Slug" name="slug" value={formData.slug} onChange={handleChange} required helperText="e.g. about-us" />
            </Grid>
            <Grid item xs={12}>
              <TextField select fullWidth label="Status" name="status" value={formData.status} onChange={handleChange}>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="review">Review</MenuItem>
                <MenuItem value="published">Published</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={8} label="Page Content (HTML/Text)" name="content" value={formData.content} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={2} label="Excerpt" name="excerpt" value={formData.excerpt} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Meta Title (SEO)" name="metaTitle" value={formData.metaTitle} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Meta Description (SEO)" name="metaDescription" value={formData.metaDescription} onChange={handleChange} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleClose} color="inherit">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {isEdit ? 'Update Page' : 'Create Page'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
