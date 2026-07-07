import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, IconButton, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Grid
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, School as SchoolIcon } from '@mui/icons-material';
import axios from 'axios';

export default function Courses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog State
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [formData, setFormData] = useState({
    titleEn: '', titleHi: '', titleGu: '', 
    descriptionEn: '', descriptionHi: '', descriptionGu: '',
    typeEn: '', typeHi: '', typeGu: '',
    statusEn: '', statusHi: '', statusGu: '',
    syllabusLink: '', isNewCourse: false,
    tagEn: '', tagHi: '', tagGu: '',
    isActive: true, order: 0
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/admin/courses', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      setCourses(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const handleOpen = (course?: any) => {
    if (course) {
      setIsEdit(true);
      setCurrentId(course._id);
      setFormData({
        titleEn: course.titleEn || '',
        titleHi: course.titleHi || '',
        titleGu: course.titleGu || '',
        descriptionEn: course.descriptionEn || '',
        descriptionHi: course.descriptionHi || '',
        descriptionGu: course.descriptionGu || '',
        typeEn: course.typeEn || '',
        typeHi: course.typeHi || '',
        typeGu: course.typeGu || '',
        statusEn: course.statusEn || '',
        statusHi: course.statusHi || '',
        statusGu: course.statusGu || '',
        syllabusLink: course.syllabusLink || '',
        isNewCourse: course.isNewCourse || false,
        tagEn: course.tagEn || '',
        tagHi: course.tagHi || '',
        tagGu: course.tagGu || '',
        isActive: course.isActive !== undefined ? course.isActive : true,
        order: course.order || 0
      });
    } else {
      setIsEdit(false);
      setFormData({ 
        titleEn: '', titleHi: '', titleGu: '', 
        descriptionEn: '', descriptionHi: '', descriptionGu: '',
        typeEn: '', typeHi: '', typeGu: '',
        statusEn: '', statusHi: '', statusGu: '',
        syllabusLink: '', isNewCourse: false,
        tagEn: '', tagHi: '', tagGu: '',
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
        await axios.put(`/api/admin/courses/${currentId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/admin/courses', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchCourses();
      handleClose();
    } catch (err) {
      console.error('Error saving course:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/admin/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCourses();
    } catch (err) {
      console.error('Error deleting course:', err);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Academic Courses
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} color="primary" onClick={() => handleOpen()}>
          Add Course
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'rgba(184, 134, 11, 0.1)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Course Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Order</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'right', color: 'primary.dark' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}>
                    <SchoolIcon sx={{ mr: 1, color: 'secondary.main' }} />
                    {course.titleEn}
                  </Box>
                  {course.isNewCourse && <Chip label="New" size="small" color="error" sx={{ mt: 1, height: 20, fontSize: '0.65rem' }} />}
                </TableCell>
                <TableCell>{course.typeEn}</TableCell>
                <TableCell>
                  <Chip 
                    label={course.isActive ? 'Active' : 'Inactive'} 
                    color={course.isActive ? 'success' : 'default'} 
                    size="small" 
                  />
                  <Typography variant="caption" display="block" sx={{ mt: 0.5, color: 'text.secondary' }}>
                    {course.statusEn}
                  </Typography>
                </TableCell>
                <TableCell>{course.order}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(course)}><EditIcon /></IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(course._id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {courses.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>No courses found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: '#fff' }}>
          {isEdit ? 'Edit Course' : 'Add New Course'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {/* English Fields */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="primary">English Details (Required)</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Title (English)" name="titleEn" value={formData.titleEn} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Type (English)" name="typeEn" value={formData.typeEn} onChange={handleChange} required placeholder="e.g. Integrated Degree" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Status (English)" name="statusEn" value={formData.statusEn} onChange={handleChange} required placeholder="e.g. Admissions Open" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={2} label="Description (English)" name="descriptionEn" value={formData.descriptionEn} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Tag (English)" name="tagEn" value={formData.tagEn} onChange={handleChange} placeholder="e.g. Apply Now" />
            </Grid>

            {/* Hindi Fields */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="primary" sx={{ mt: 2 }}>Hindi Details (Optional)</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Title (Hindi)" name="titleHi" value={formData.titleHi} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Type (Hindi)" name="typeHi" value={formData.typeHi} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Status (Hindi)" name="statusHi" value={formData.statusHi} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={2} label="Description (Hindi)" name="descriptionHi" value={formData.descriptionHi} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Tag (Hindi)" name="tagHi" value={formData.tagHi} onChange={handleChange} />
            </Grid>

            {/* Gujarati Fields */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="primary" sx={{ mt: 2 }}>Gujarati Details (Optional)</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Title (Gujarati)" name="titleGu" value={formData.titleGu} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Type (Gujarati)" name="typeGu" value={formData.typeGu} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Status (Gujarati)" name="statusGu" value={formData.statusGu} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={2} label="Description (Gujarati)" name="descriptionGu" value={formData.descriptionGu} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Tag (Gujarati)" name="tagGu" value={formData.tagGu} onChange={handleChange} />
            </Grid>

            {/* General Fields */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="primary" sx={{ mt: 2 }}>Settings</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Syllabus/Notify Link" name="syllabusLink" value={formData.syllabusLink} onChange={handleChange} placeholder="https://" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth type="number" label="Display Order" name="order" value={formData.order} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField select fullWidth label="Is Active" name="isActive" value={formData.isActive as any} onChange={handleChange}>
                <MenuItem value={true as any}>Yes</MenuItem>
                <MenuItem value={false as any}>No</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField select fullWidth label="Is New Course" name="isNewCourse" value={formData.isNewCourse as any} onChange={handleChange}>
                <MenuItem value={true as any}>Yes</MenuItem>
                <MenuItem value={false as any}>No</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleClose} color="inherit">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {isEdit ? 'Update Course' : 'Create Course'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
