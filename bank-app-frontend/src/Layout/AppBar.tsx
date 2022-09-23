import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink, Outlet } from 'react-router-dom';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bank App
          </Typography>
          <Button component={RouterLink} to="/" color="inherit">
            Client Register
          </Button>
          <Button
            component={RouterLink}
            to="/credit-facilities"
            color="inherit"
          >
            Credit Facility
          </Button>
          <Button component={RouterLink} to="/loans" color="inherit">
            Loans Database
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
