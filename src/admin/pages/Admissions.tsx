import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, IconButton, Chip, Avatar,
  Dialog, DialogTitle, DialogContent, DialogActions, Grid, Divider
} from '@mui/material';
import { Visibility as ViewIcon, CheckCircle as ApproveIcon, Cancel as RejectIcon } from '@mui/icons-material';
import axios from 'axios';

export default function Admissions() {
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdmission, setSelectedAdmission] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/admin/admissions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAdmissions(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching admissions:', err);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    if (!window.confirm(`Are you sure you want to mark this admission as ${status.toUpperCase()}?`)) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`/api/admin/admissions/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAdmissions();
      if (selectedAdmission && selectedAdmission._id === id) {
        setOpen(false);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleView = (admission: any) => {
    setSelectedAdmission(admission);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Admissions Dashboard
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'rgba(184, 134, 11, 0.1)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Applicant</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Program</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Applied On</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'right', color: 'primary.dark' }}>Review</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admissions.map((admission) => (
              <TableRow key={admission._id}>
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: 'primary.main', color: '#fff' }}>
                      {admission.studentName.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">{admission.studentName}</Typography>
                      <Typography variant="caption" color="textSecondary">{admission.email}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{admission.programId?.titleEn || 'N/A'}</TableCell>
                <TableCell>{new Date(admission.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip 
                    label={admission.status.toUpperCase()} 
                    color={
                      admission.status === 'approved' ? 'success' : 
                      admission.status === 'rejected' ? 'error' : 
                      admission.status === 'pending' ? 'warning' : 'default'
                    } 
                    size="small"
                    sx={{ fontWeight: 'bold', fontSize: '0.75rem' }} 
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" title="View Details" onClick={() => handleView(admission)}><ViewIcon /></IconButton>
                  <IconButton color="success" title="Approve" onClick={() => handleStatusUpdate(admission._id, 'approved')}><ApproveIcon /></IconButton>
                  <IconButton color="secondary" title="Reject" onClick={() => handleStatusUpdate(admission._id, 'rejected')}><RejectIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Details Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: '#fff' }}>
          Admission Application Details
        </DialogTitle>
        <DialogContent sx={{ mt: 2, p: 3 }}>
          {selectedAdmission && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">Applicant Name</Typography>
                <Typography variant="body1" fontWeight="bold">{selectedAdmission.studentName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">Program</Typography>
                <Typography variant="body1" fontWeight="bold">{selectedAdmission.programId?.titleEn}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">Email Address</Typography>
                <Typography variant="body1">{selectedAdmission.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">Phone Number</Typography>
                <Typography variant="body1">{selectedAdmission.phone}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">Date of Birth</Typography>
                <Typography variant="body1">{selectedAdmission.dateOfBirth ? new Date(selectedAdmission.dateOfBirth).toLocaleDateString() : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">Gender</Typography>
                <Typography variant="body1">{selectedAdmission.gender || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="caption" color="textSecondary">Current Address</Typography>
                <Typography variant="body1">{selectedAdmission.address || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" color="textSecondary">Previous Education / Qualifications</Typography>
                <Typography variant="body1">{selectedAdmission.previousEducation || 'N/A'}</Typography>
              </Grid>
              {selectedAdmission.documents && selectedAdmission.documents.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="caption" color="textSecondary">Uploaded Documents</Typography>
                  <Box sx={{ mt: 1 }}>
                    {selectedAdmission.documents.map((doc: string, idx: number) => (
                      <Button key={idx} variant="outlined" size="small" href={doc} target="_blank" sx={{ mr: 1, mb: 1 }}>
                        Document {idx + 1}
                      </Button>
                    ))}
                  </Box>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleClose} color="inherit">Close</Button>
          {selectedAdmission && selectedAdmission.status === 'pending' && (
            <>
              <Button onClick={() => handleStatusUpdate(selectedAdmission._id, 'rejected')} color="secondary" variant="outlined">
                Reject
              </Button>
              <Button onClick={() => handleStatusUpdate(selectedAdmission._id, 'approved')} color="success" variant="contained">
                Approve Admission
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
