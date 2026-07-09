import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Tabs, Tab, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Chip, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, PersonAdd as PersonAddIcon } from '@mui/icons-material';
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
      id={`user-tabpanel-${index}`}
      aria-labelledby={`user-tab-${index}`}
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

export default function Users() {
  const [tabIndex, setTabIndex] = useState(0);
  const [users, setUsers] = useState<any[]>([]);
  const [donors, setDonors] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);

  // Modals
  const [openUserModal, setOpenUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [userFormData, setUserFormData] = useState({ name: '', email: '', password: '', role: 'editor', status: 'active' });

  const token = localStorage.getItem('adminToken');

  const fetchData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      if (tabIndex === 0) {
        const res = await axios.get('/api/admin/users', config);
        setUsers(res.data);
      } else if (tabIndex === 1) {
        const res = await axios.get('/api/admin/donations', config);
        setDonors(res.data);
      } else if (tabIndex === 2) {
        const res = await axios.get('/api/admin/volunteers', config);
        setVolunteers(res.data);
      } else if (tabIndex === 3) {
        const res = await axios.get('/api/admin/students', config);
        setStudents(res.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tabIndex]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  // --- Handlers for System Users ---
  const handleOpenUserModal = (user: any = null) => {
    if (user) {
      setEditingUser(user);
      setUserFormData({ name: user.name, email: user.email, password: '', role: user.role, status: user.status });
    } else {
      setEditingUser(null);
      setUserFormData({ name: '', email: '', password: '', role: 'editor', status: 'active' });
    }
    setOpenUserModal(true);
  };

  const handleSaveUser = async () => {
    if (!userFormData.name || !userFormData.email) {
      return alert('Name and email are required');
    }
    if (!editingUser && !userFormData.password) {
      return alert('Password is required for new users');
    }

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (editingUser) {
        await axios.put(`/api/admin/users/${editingUser._id}`, {
          role: userFormData.role,
          status: userFormData.status
        }, config);
      } else {
        await axios.post('/api/admin/users', userFormData, config);
      }
      setOpenUserModal(false);
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error saving user');
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`/api/admin/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error deleting user');
    }
  };

  // --- Delete Handlers for other types ---
  const handleDeleteDonor = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this donation record?')) return;
    try {
      await axios.delete(`/api/admin/donations/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error deleting donor');
    }
  };

  const handleDeleteVolunteer = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this volunteer?')) return;
    try {
      await axios.delete(`/api/admin/volunteers/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error deleting volunteer');
    }
  };

  const handleDeleteStudent = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      await axios.delete(`/api/admin/students/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error deleting student');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Users Management
        </Typography>
        {tabIndex === 0 && (
          <Button variant="contained" startIcon={<PersonAddIcon />} onClick={() => handleOpenUserModal()}>
            Add System User
          </Button>
        )}
      </Box>

      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={handleTabChange} aria-label="user management tabs">
            <Tab label="System Users" />
            <Tab label="Donors" />
            <Tab label="Volunteers" />
            <Tab label="Students" />
          </Tabs>
        </Box>

        {/* Tab 0: System Users */}
        <CustomTabPanel value={tabIndex} index={0}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip label={user.role} color={user.role === 'super-admin' ? 'primary' : 'default'} size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip label={user.status} color={user.status === 'active' ? 'success' : 'error'} size="small" />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleOpenUserModal(user)} color="primary"><EditIcon /></IconButton>
                      <IconButton onClick={() => handleDeleteUser(user._id)} color="error"><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>

        {/* Tab 1: Donors */}
        <CustomTabPanel value={tabIndex} index={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Donor Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donors.map((donor) => (
                  <TableRow key={donor._id}>
                    <TableCell>{donor.donorName}</TableCell>
                    <TableCell>{donor.email || 'N/A'}</TableCell>
                    <TableCell>{donor.phone}</TableCell>
                    <TableCell>₹{donor.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip label={donor.status} color={donor.status === 'verified' ? 'success' : 'warning'} size="small" />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleDeleteDonor(donor._id)} color="error"><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>

        {/* Tab 2: Volunteers */}
        <CustomTabPanel value={tabIndex} index={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {volunteers.map((vol) => (
                  <TableRow key={vol._id}>
                    <TableCell>{vol.name}</TableCell>
                    <TableCell>{vol.email}</TableCell>
                    <TableCell>{vol.phone}</TableCell>
                    <TableCell>{vol.role}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleDeleteVolunteer(vol._id)} color="error"><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>

        {/* Tab 3: Students */}
        <CustomTabPanel value={tabIndex} index={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Program</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell>{student.firstName} {student.lastName}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.phone}</TableCell>
                    <TableCell>{student.program?.titleEn || 'N/A'}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleDeleteStudent(student._id)} color="error"><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>
      </Paper>

      {/* User Modal */}
      <Dialog open={openUserModal} onClose={() => setOpenUserModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingUser ? 'Edit User Role/Status' : 'Add System User'}</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth label="Name" sx={{ mb: 2 }}
            value={userFormData.name} onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
            disabled={!!editingUser}
          />
          <TextField
            fullWidth label="Email" type="email" sx={{ mb: 2 }}
            value={userFormData.email} onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
            disabled={!!editingUser}
          />
          {!editingUser && (
            <TextField
              fullWidth label="Password" type="password" sx={{ mb: 2 }}
              value={userFormData.password} onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
            />
          )}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={userFormData.role} label="Role"
              onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="editor">Editor</MenuItem>
              <MenuItem value="viewer">Viewer</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={userFormData.status} label="Status"
              onChange={(e) => setUserFormData({ ...userFormData, status: e.target.value })}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="suspended">Suspended</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUserModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveUser}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
