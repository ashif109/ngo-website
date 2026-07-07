import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, CircularProgress, Tabs, Tab, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Collapse, Chip, Alert
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp, ContactMail, VolunteerActivism, ReportProblem } from '@mui/icons-material';
import { getAdminSubmissions } from '../../services/api';

function Row({ row, type }: { row: any, type: 'volunteers' | 'contacts' | 'generals' }) {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        
        {type === 'volunteers' && (
          <>
            <TableCell component="th" scope="row" fontWeight="bold">{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.phone}</TableCell>
            <TableCell>
              <Chip size="small" color="primary" variant="outlined" label={Array.isArray(row.interests) ? row.interests.join(', ') : row.interests} />
            </TableCell>
          </>
        )}

        {type === 'contacts' && (
          <>
            <TableCell component="th" scope="row" fontWeight="bold">{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.phone || 'N/A'}</TableCell>
            <TableCell><Typography color="secondary" fontWeight="bold">{row.subject || 'General'}</Typography></TableCell>
          </>
        )}

        {type === 'generals' && (
          <>
            <TableCell component="th" scope="row">
              <Chip size="small" color="secondary" label={row.formType} />
            </TableCell>
            <TableCell>{row.data?.name || 'N/A'}</TableCell>
            <TableCell>{row.data?.email || row.data?.phone || 'N/A'}</TableCell>
          </>
        )}
        
        <TableCell align="right">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom component="div" fontWeight="bold">
                Message & Details
              </Typography>
              
              {type === 'volunteers' && (
                <Typography variant="body2">{row.message || 'No additional message provided.'}</Typography>
              )}
              
              {type === 'contacts' && (
                <Typography variant="body2">{row.message}</Typography>
              )}
              
              {type === 'generals' && (
                <Box>
                  {Object.entries(row.data || {}).map(([k, v]: any) => (
                    <Typography key={k} variant="body2" sx={{ mb: 0.5 }}>
                      <strong>{k.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {String(v)}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Submissions() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabIndex, setTabIndex] = useState(0);
  const [data, setData] = useState({
    volunteers: [],
    contacts: [],
    generals: []
  });

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const res = await getAdminSubmissions();
      if (res.success) {
        setData({
          volunteers: res.data.volunteers || [],
          contacts: res.data.contacts || [],
          generals: res.data.generals || []
        });
      } else {
        setError(res.error || 'Failed to fetch submissions');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress sx={{ color: '#002147' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', pb: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#002147' }}>
          Form Submissions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage all incoming queries, volunteer applications, and general requests.
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Paper sx={{ width: '100%', mb: 2, borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#f8fafc' }}>
          <Tabs value={tabIndex} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
            <Tab icon={<VolunteerActivism fontSize="small" />} iconPosition="start" label={`Volunteers (${data.volunteers.length})`} />
            <Tab icon={<ContactMail fontSize="small" />} iconPosition="start" label={`Contacts (${data.contacts.length})`} />
            <Tab icon={<ReportProblem fontSize="small" />} iconPosition="start" label={`General Forms (${data.generals.length})`} />
          </Tabs>
        </Box>
        
        {/* Volunteers Tab */}
        {tabIndex === 0 && (
          <TableContainer>
            <Table aria-label="collapsible table">
              <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
                <TableRow>
                  <TableCell />
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Interests</TableCell>
                  <TableCell align="right">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.volunteers.length > 0 ? (
                  data.volunteers.map((row: any) => <Row key={row._id} row={row} type="volunteers" />)
                ) : (
                  <TableRow><TableCell colSpan={6} align="center" sx={{ py: 4 }}>No volunteer applications found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Contacts Tab */}
        {tabIndex === 1 && (
          <TableContainer>
            <Table aria-label="collapsible table">
              <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
                <TableRow>
                  <TableCell />
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell align="right">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.contacts.length > 0 ? (
                  data.contacts.map((row: any) => <Row key={row._id} row={row} type="contacts" />)
                ) : (
                  <TableRow><TableCell colSpan={6} align="center" sx={{ py: 4 }}>No contact queries found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Generals Tab */}
        {tabIndex === 2 && (
          <TableContainer>
            <Table aria-label="collapsible table">
              <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
                <TableRow>
                  <TableCell />
                  <TableCell>Form Type</TableCell>
                  <TableCell>Primary Name</TableCell>
                  <TableCell>Primary Contact</TableCell>
                  <TableCell align="right">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.generals.length > 0 ? (
                  data.generals.map((row: any) => <Row key={row._id} row={row} type="generals" />)
                ) : (
                  <TableRow><TableCell colSpan={5} align="center" sx={{ py: 4 }}>No general submissions found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
}
