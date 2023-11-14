import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, ListItemIcon, ListItemText, Box, Grid } from '@mui/material';
import { Home, AccountCircle, Assessment, Storage, Gavel, ExitToApp  } from '@mui/icons-material';



function Gathering() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [systemAnchorEl, setSystemAnchorEl] = React.useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSystemMenuOpen = (event) => {
    setSystemAnchorEl(event.currentTarget);
  };

  const handleAccountMenuOpen = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubMenuClose = () => {
    setSystemAnchorEl(null);
    setAccountAnchorEl(null);
  };
  const handleLogout = () => {
    window.location.href = '/';
  };
  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: '#2196f3', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
        <Toolbar>
          <IconButton color="inherit">
            <Home />
          </IconButton>
          <Typography variant="h6">Trang chủ</Typography>
          <div style={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <ListItemText primary="Trưởng điểm tập kết" />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Grid container style={{ height : '91vh'}}>
        <Grid item xs={3} style={{ 
            backgroundColor: '#1e88e5', 
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', padding: '10px' }}
            >
        <nav>
          <ul>
            <li>
              <Button startIcon={<AccountCircle />} onClick={handleAccountMenuOpen}
               style={{ color : '#fff', paddingTop : '30px'}}
               >
                Quản lý tài khoản
              </Button>
            </li>
            <li>
              <Button startIcon={<Assessment />} onClick={handleSystemMenuOpen} 
                style={{ color : '#fff', paddingTop : '30px'}}
                >
                Thống kê
              </Button>
              <Menu
                anchorEl={systemAnchorEl}
                open={Boolean(systemAnchorEl)}
                onClose={handleSubMenuClose}
              >
                <MenuItem>
                  <ListItemIcon>
                    <Storage />
                  </ListItemIcon>
                  <ListItemText primary="Hàng đi" />
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Gavel />
                  </ListItemIcon>
                  <ListItemText primary="Hàng đến" />
                </MenuItem>
              </Menu>
            </li>
            <li>
            <Button startIcon={<ExitToApp />} onClick={handleLogout} 
            style={{ color : '#fff', paddingTop : '30px', marginTop : '380px'}}
            >
            Đăng xuất
          </Button>
            </li>
          </ul>
        </nav>
        </Grid>
        </Grid>
    </div>
  );
}

export default Gathering;
