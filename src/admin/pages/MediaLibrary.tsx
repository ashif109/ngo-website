import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Grid, Button, IconButton, 
  Card, CardMedia, CardContent, CardActions 
} from '@mui/material';
import { 
  CloudUpload as CloudUploadIcon, 
  Delete as DeleteIcon, 
  ContentCopy as CopyIcon 
} from '@mui/icons-material';

import axios from 'axios';

export default function MediaLibrary() {
  const [media, setMedia] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/admin/media', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMedia(res.data);
    } catch (err) {
      console.error('Error fetching media:', err);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('adminToken');
      await axios.post('/api/admin/media/upload', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMedia();
    } catch (err) {
      console.error('Error uploading media:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this media file permanently?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/admin/media/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMedia();
    } catch (err) {
      console.error('Error deleting media:', err);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Media Library
        </Typography>
        <Button 
          variant="contained" 
          component="label"
          startIcon={<CloudUploadIcon />} 
          disabled={uploading}
          color="primary"
        >
          {uploading ? 'Uploading...' : 'Upload File'}
          <input type="file" hidden onChange={handleFileUpload} accept="image/*,.pdf" />
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 4, bgcolor: '#FAFAFA', border: '2px dashed #B8860B', textAlign: 'center' }}>
        <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
        <Typography variant="h6" color="textSecondary">
          Drag & Drop files here to upload
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Supports JPG, PNG, WEBP, PDF up to 10MB
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {media.map((file) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={file._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={file.url}
                alt={file.filename}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Typography variant="body2" noWrap sx={{ fontWeight: 'bold' }}>
                  {file.filename}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
                <IconButton size="small" title="Copy URL" onClick={() => navigator.clipboard.writeText(file.url)}>
                  <CopyIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" color="error" title="Delete" onClick={() => handleDelete(file._id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
