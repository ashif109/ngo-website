import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ 
          display: 'flex', flexDirection: 'column', alignItems: 'center', 
          justifyContent: 'center', minHeight: '100vh', bgcolor: '#f8fafc', p: 4, textAlign: 'center'
        }}>
          <AlertTriangle size={64} color="#ef4444" style={{ marginBottom: '24px' }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 2 }}>
            Oops! Something went wrong.
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', mb: 4, maxWidth: 600 }}>
            We encountered an unexpected error while trying to load this page. 
            Our team has been notified.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => {
                this.setState({ hasError: false });
                window.location.hash = ''; // Return to home
                window.location.pathname = '/';
              }}
            >
              Go to Home
            </Button>
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={() => window.location.reload()}
            >
              Reload Page
            </Button>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}
