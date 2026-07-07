import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, IconButton, Chip, Avatar,
  Dialog, DialogTitle, DialogContent, DialogActions, Grid, Divider, Tabs, Tab, TextField, Switch, FormControlLabel, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import { Visibility as ViewIcon, CheckCircle as ApproveIcon, Cancel as RejectIcon, Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Admissions() {
  const [tabValue, setTabValue] = useState(0);
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedAdmission, setSelectedAdmission] = useState<any>(null);
  const [openAppDialog, setOpenAppDialog] = useState(false);
  
  const [openCampaignDialog, setOpenCampaignDialog] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<any>(null);
  const [campaignForm, setCampaignForm] = useState({
    titleEn: '', titleHi: '', titleGu: '',
    descriptionEn: '', descriptionHi: '', descriptionGu: '',
    academicYear: '', startDate: '', endDate: '',
    status: 'upcoming', isActive: true
  });

  useEffect(() => {
    fetchAdmissions();
    fetchCampaigns();
  }, []);

  const fetchAdmissions = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/admin/admissions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      setAdmissions(data);
    } catch (err) {
      console.error('Error fetching admissions:', err);
    }
  };

  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/admin/admission-campaigns', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCampaigns(res.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // --- Campaign Handlers ---
  const handleCampaignSubmit = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const payload = { ...campaignForm };
      
      if (editingCampaign) {
        await axios.put(`/api/admin/admission-campaigns/${editingCampaign._id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/admin/admission-campaigns', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setOpenCampaignDialog(false);
      fetchCampaigns();
    } catch (err) {
      console.error('Error saving campaign:', err);
    }
  };

  const handleDeleteCampaign = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this campaign?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/admin/admission-campaigns/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCampaigns();
    } catch (err) {
      console.error('Error deleting campaign:', err);
    }
  };

  const openNewCampaignDialog = () => {
    setEditingCampaign(null);
    setCampaignForm({
      titleEn: '', titleHi: '', titleGu: '',
      descriptionEn: '', descriptionHi: '', descriptionGu: '',
      academicYear: '', startDate: '', endDate: '',
      status: 'upcoming', isActive: true
    });
    setOpenCampaignDialog(true);
  };

  const openEditCampaignDialog = (camp: any) => {
    setEditingCampaign(camp);
    setCampaignForm({
      titleEn: camp.titleEn || '', titleHi: camp.titleHi || '', titleGu: camp.titleGu || '',
      descriptionEn: camp.descriptionEn || '', descriptionHi: camp.descriptionHi || '', descriptionGu: camp.descriptionGu || '',
      academicYear: camp.academicYear || '', 
      startDate: camp.startDate ? new Date(camp.startDate).toISOString().split('T')[0] : '', 
      endDate: camp.endDate ? new Date(camp.endDate).toISOString().split('T')[0] : '',
      status: camp.status || 'upcoming', isActive: camp.isActive
    });
    setOpenCampaignDialog(true);
  };

  // --- Admission Handlers ---
  const handleStatusUpdate = async (id: string, status: string) => {
    if (!window.confirm(`Are you sure you want to mark this application as ${status.toUpperCase()}?`)) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`/api/admin/admissions/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAdmissions();
      if (selectedAdmission && selectedAdmission._id === id) {
        setOpenAppDialog(false);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleViewApp = (admission: any) => {
    setSelectedAdmission(admission);
    setOpenAppDialog(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Admissions Management
        </Typography>
        {tabValue === 0 && (
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={openNewCampaignDialog}>
            New Campaign
          </Button>
        )}
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="admissions tabs">
          <Tab label="Admission Campaigns" />
          <Tab label="Applications" />
        </Tabs>
      </Box>

      <CustomTabPanel value={tabValue} index={0}>
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: 'rgba(212, 175, 55, 0.1)' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Academic Year</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Duration</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Frontend Active</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'right', color: 'primary.dark' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaigns.map((camp) => (
                <TableRow key={camp._id}>
                  <TableCell>{camp.titleEn}</TableCell>
                  <TableCell>{camp.academicYear}</TableCell>
                  <TableCell>{new Date(camp.startDate).toLocaleDateString()} - {new Date(camp.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Chip label={camp.status.toUpperCase()} size="small" color={camp.status === 'active' ? 'success' : camp.status === 'upcoming' ? 'warning' : 'default'} />
                  </TableCell>
                  <TableCell>
                    <Chip label={camp.isActive ? 'YES' : 'NO'} size="small" color={camp.isActive ? 'primary' : 'default'} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => openEditCampaignDialog(camp)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDeleteCampaign(camp._id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {campaigns.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">No admission campaigns found. Create one to open admissions!</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={1}>
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: 'rgba(212, 175, 55, 0.1)' }}>
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
                    <IconButton color="primary" title="View Details" onClick={() => handleViewApp(admission)}><ViewIcon /></IconButton>
                    <IconButton color="success" title="Approve" onClick={() => handleStatusUpdate(admission._id, 'approved')}><ApproveIcon /></IconButton>
                    <IconButton color="secondary" title="Reject" onClick={() => handleStatusUpdate(admission._id, 'rejected')}><RejectIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {admissions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">No applications received yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomTabPanel>

      {/* Campaign Dialog */}
      <Dialog open={openCampaignDialog} onClose={() => setOpenCampaignDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: '#fff' }}>
          {editingCampaign ? 'Edit Admission Campaign' : 'Create Admission Campaign'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}><TextField fullWidth label="Title (English)" value={campaignForm.titleEn} onChange={(e) => setCampaignForm({...campaignForm, titleEn: e.target.value})} required /></Grid>
            <Grid item xs={12} sm={4}><TextField fullWidth label="Title (Hindi)" value={campaignForm.titleHi} onChange={(e) => setCampaignForm({...campaignForm, titleHi: e.target.value})} /></Grid>
            <Grid item xs={12} sm={4}><TextField fullWidth label="Title (Gujarati)" value={campaignForm.titleGu} onChange={(e) => setCampaignForm({...campaignForm, titleGu: e.target.value})} /></Grid>
            
            <Grid item xs={12} sm={4}><TextField fullWidth label="Description (English)" multiline rows={3} value={campaignForm.descriptionEn} onChange={(e) => setCampaignForm({...campaignForm, descriptionEn: e.target.value})} required /></Grid>
            <Grid item xs={12} sm={4}><TextField fullWidth label="Description (Hindi)" multiline rows={3} value={campaignForm.descriptionHi} onChange={(e) => setCampaignForm({...campaignForm, descriptionHi: e.target.value})} /></Grid>
            <Grid item xs={12} sm={4}><TextField fullWidth label="Description (Gujarati)" multiline rows={3} value={campaignForm.descriptionGu} onChange={(e) => setCampaignForm({...campaignForm, descriptionGu: e.target.value})} /></Grid>
            
            <Grid item xs={12} sm={4}><TextField fullWidth label="Academic Year (e.g. 2026-27)" value={campaignForm.academicYear} onChange={(e) => setCampaignForm({...campaignForm, academicYear: e.target.value})} required /></Grid>
            <Grid item xs={12} sm={4}>
              <TextField 
                fullWidth 
                label="Start Date" 
                type={campaignForm.startDate ? "date" : "text"}
                onFocus={(e) => e.target.type = 'date'}
                onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                value={campaignForm.startDate} 
                onChange={(e) => setCampaignForm({...campaignForm, startDate: e.target.value})} 
                required 
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField 
                fullWidth 
                label="End Date" 
                type={campaignForm.endDate ? "date" : "text"}
                onFocus={(e) => e.target.type = 'date'}
                onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                value={campaignForm.endDate} 
                onChange={(e) => setCampaignForm({...campaignForm, endDate: e.target.value})} 
                required 
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select value={campaignForm.status} label="Status" onChange={(e) => setCampaignForm({...campaignForm, status: e.target.value})}>
                  <MenuItem value="upcoming">Upcoming</MenuItem>
                  <MenuItem value="active">Active (Accepting Apps)</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControlLabel control={<Switch checked={campaignForm.isActive} onChange={(e) => setCampaignForm({...campaignForm, isActive: e.target.checked})} color="primary" />} label="Display on Website Banner" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenCampaignDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleCampaignSubmit}>Save Campaign</Button>
        </DialogActions>
      </Dialog>

      {/* Application Review Dialog */}
      <Dialog open={openAppDialog} onClose={() => setOpenAppDialog(false)} maxWidth="md" fullWidth>
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
                <Typography variant="body1">{selectedAdmission.dob ? new Date(selectedAdmission.dob).toLocaleDateString() : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">Gender</Typography>
                <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>{selectedAdmission.gender || 'N/A'}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setOpenAppDialog(false)} color="inherit">Close</Button>
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
