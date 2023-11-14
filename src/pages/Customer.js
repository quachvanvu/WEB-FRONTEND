import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, ListItemIcon, ListItemText, Box, Grid } from '@mui/material';
import { Home, AccountCircle, ExitToApp  } from '@mui/icons-material';
import OfflinePinOutlinedIcon from '@mui/icons-material/OfflinePinOutlined';



function Customer() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [statusAnchorEl, setStatusAnchorEl] = React.useState(null);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuOpen = (event) => {
    setStatusAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubMenuClose = () => {
    setStatusAnchorEl(null);
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
              <ListItemText primary="" />
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
              <Button startIcon={<OfflinePinOutlinedIcon />} onClick={handleAccountMenuOpen} 
                style={{ color : '#fff', paddingTop : '30px'}}
                >
                Trạng thái đơn hàng
              </Button>
            </li>
            <li>
            <Button startIcon={<ExitToApp />} onClick={handleLogout} 
            style={{ color : '#fff', paddingTop : '30px', marginTop : '50px'}}
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

export default Customer;
