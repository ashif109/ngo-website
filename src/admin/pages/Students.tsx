import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, IconButton, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Grid
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Email as EmailIcon } from '@mui/icons-material';
import axios from 'axios';

export default function Students() {
  const [students, setStudents] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', dob: '', 
    gender: 'male', studentId: '', batchYear: new Date().getFullYear(),
    program: '', currentStatus: 'active'
  });

  useEffect(() => {
    fetchStudents();
    fetchPrograms();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/admin/students', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  const fetchPrograms = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/admin/programs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPrograms(res.data);
    } catch (err) {
      console.error('Error fetching programs:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post('/api/admin/students', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchStudents();
      setOpen(false);
      setFormData({
        firstName: '', lastName: '', email: '', phone: '', dob: '', 
        gender: 'male', studentId: '', batchYear: new Date().getFullYear(),
        program: '', currentStatus: 'active'
      });
    } catch (err) {
      console.error('Error saving student:', err);
      alert('Error saving student. Make sure all fields are filled properly and Student ID / Email are unique.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this student profile?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/admin/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchStudents();
    } catch (err) {
      console.error('Error deleting student:', err);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Students & Alumni
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} color="primary" onClick={() => setOpen(true)}>
          Register Student
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'rgba(184, 134, 11, 0.1)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Student ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Program / Batch</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'right', color: 'primary.dark' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                  {student.firstName} {student.lastName}
                </TableCell>
                <TableCell sx={{ fontFamily: 'monospace' }}>{student.studentId}</TableCell>
                <TableCell>
                  <Typography variant="body2">{student.program?.titleEn || 'N/A'}</Typography>
                  <Typography variant="caption" color="textSecondary">Batch {student.batchYear}</Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={student.currentStatus === 'graduated' ? 'Alumni' : 'Active'} 
                    sx={{ 
                      bgcolor: student.currentStatus === 'graduated' ? 'secondary.main' : 'primary.main',
                      color: '#fff', fontWeight: 'bold', fontSize: '0.75rem'
                    }} 
                    size="small" 
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="info" title="Send Email" onClick={() => window.location.href = `mailto:${student.email}`}><EmailIcon /></IconButton>
                  <IconButton color="secondary" title="Delete" onClick={() => handleDelete(student._id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Register Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: '#fff' }}>Register New Student</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="date" label="Date of Birth" name="dob" value={formData.dob} onChange={handleChange} slotProps={{ inputLabel: { shrink: true } }} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Gender" name="gender" value={formData.gender} onChange={handleChange} required>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Student ID" name="studentId" value={formData.studentId} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="number" label="Batch Year" name="batchYear" value={formData.batchYear} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField select fullWidth label="Program" name="program" value={formData.program} onChange={handleChange} required>
                {programs.map((p) => (
                  <MenuItem key={p._id} value={p._id}>{p.titleEn}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setOpen(false)} color="inherit">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Register</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
