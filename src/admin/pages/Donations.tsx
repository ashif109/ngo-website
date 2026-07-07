import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Divider
} from '@mui/material';
import { Visibility as ViewIcon, Download as DownloadIcon, CheckCircle as VerifyIcon, Cancel as RejectIcon } from '@mui/icons-material';

export default function Donations() {
  const [donations, setDonations] = useState<any[]>([]);
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/admin/donations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDonations(res.data);
    } catch (err) {
      console.error('Error fetching donations:', err);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    if (!window.confirm(`Are you sure you want to mark this donation as ${status.toUpperCase()}?`)) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`/api/admin/donations/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchDonations();
      if (selectedDonation && selectedDonation._id === id) {
        setOpen(false);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleView = (donation: any) => {
    setSelectedDonation(donation);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Donations & Payments
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'rgba(184, 134, 11, 0.1)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Donor Info</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'right', color: 'primary.dark' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donations.map((donation) => (
              <TableRow key={donation._id}>
                <TableCell component="th" scope="row">
                  <Typography variant="body2" fontWeight="bold">{donation.isAnonymous ? 'Anonymous Donor' : donation.donorName}</Typography>
                  <Typography variant="caption" color="textSecondary">{donation.isAnonymous ? 'Hidden' : donation.phone}</Typography>
                </TableCell>
                <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{donation.razorpayOrderId}</TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="bold" sx={{ color: 'secondary.main' }}>
                    ₹ {donation.amount.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell>{new Date(donation.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip 
                    label={donation.status.toUpperCase()} 
                    color={
                      donation.status === 'verified' ? 'success' : 
                      donation.status === 'failed' || donation.status === 'rejected' ? 'error' : 
                      'warning'
                    } 
                    size="small"
                    sx={{ fontWeight: 'bold', fontSize: '0.75rem' }} 
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" title="View Details" onClick={() => handleView(donation)}><ViewIcon /></IconButton>
                  {donation.status === 'created' && (
                    <>
                      <IconButton color="success" title="Manually Verify" onClick={() => handleStatusUpdate(donation._id, 'verified')}><VerifyIcon /></IconButton>
                      <IconButton color="error" title="Reject" onClick={() => handleStatusUpdate(donation._id, 'rejected')}><RejectIcon /></IconButton>
                    </>
                  )}
                  <IconButton color="secondary" title="Download Receipt" disabled={donation.status !== 'verified'}><DownloadIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Details Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: '#fff' }}>
          Donation Details
        </DialogTitle>
        <DialogContent sx={{ mt: 2, p: 3 }}>
          {selectedDonation && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">Donor Name</Typography>
                <Typography variant="body1" fontWeight="bold">{selectedDonation.isAnonymous ? 'Anonymous' : selectedDonation.donorName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">Amount</Typography>
                <Typography variant="body1" fontWeight="bold" sx={{ color: 'secondary.main' }}>₹ {selectedDonation.amount.toLocaleString()}</Typography>
              </Grid>
              {!selectedDonation.isAnonymous && (
                <>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="textSecondary">Email</Typography>
                    <Typography variant="body1">{selectedDonation.email || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="textSecondary">Phone</Typography>
                    <Typography variant="body1">{selectedDonation.phone || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="textSecondary">PAN Number</Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>{selectedDonation.panNumber || 'N/A'}</Typography>
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">Razorpay Order ID</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{selectedDonation.razorpayOrderId}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">Razorpay Payment ID</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{selectedDonation.razorpayPaymentId || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" color="textSecondary">Campaign</Typography>
                <Typography variant="body1">{selectedDonation.campaign || 'General Donation'}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleClose} color="inherit">Close</Button>
          {selectedDonation && selectedDonation.status === 'created' && (
            <Button onClick={() => handleStatusUpdate(selectedDonation._id, 'verified')} variant="contained" color="success">
              Verify Manually
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
