import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, ListItemIcon, ListItemText, Box, Grid } from '@mui/material';
import { Home, AccountCircle, Storage, Gavel, ExitToApp } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';




function StaffGathering() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [xacnhanAnchorEl, setXacnhanAnchorEl] = React.useState(null);
  const [taodonAnchorEl, setTaodonAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleXacnhanMenuOpen = (event) => {
    setXacnhanAnchorEl(event.currentTarget);
  };

  const handleTaodonMenuOpen = (event) => {
    setTaodonAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubMenuClose = () => {
    setXacnhanAnchorEl(null);
    setTaodonAnchorEl(null);
  };
  const handleLogout = () => {
    window.location.href = '/';
  };
  return (
    <div>
      <AppBar position="static" 
      style={{ backgroundColor: '#2196f3', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}
      >
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
              <ListItemIcon>
                <Storage />
              </ListItemIcon>
              <ListItemText primary="Lãnh đạo công ty" />
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
              <Button startIcon={<CheckCircleIcon />} onClick={handleXacnhanMenuOpen} 
                style={{ color : '#fff', paddingTop : '30px'}}
                >
                Xác nhận
              </Button>
              <Menu
                anchorEl={xacnhanAnchorEl}
                open={Boolean(xacnhanAnchorEl)}
                onClose={handleSubMenuClose}
              >
                <MenuItem>
                  <ListItemIcon>
                    <Storage />
                  </ListItemIcon>
                  <ListItemText primary="Đơn hàng đi từ điểm giao dịch chuyển đến" />
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Gavel />
                  </ListItemIcon>
                  <ListItemText primary="Đơn hàng nhận về từ điểm tập kết khác" />
                </MenuItem>
              </Menu>
            </li>
            <li>
              <Button startIcon={<AddCircleOutlineIcon />} onClick={handleTaodonMenuOpen}
              style={{ color : '#fff', paddingTop : '30px'}}
              >
                Tạo đơn
              </Button>
              <Menu
                anchorEl={taodonAnchorEl}
                open={Boolean(taodonAnchorEl)}
                onClose={handleSubMenuClose}
              >
                <MenuItem>
                  <ListItemIcon>
                    <Storage />
                  </ListItemIcon>
                  <ListItemText primary="Chuyển hàng đến điểm tập kết đích" />
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Gavel />
                  </ListItemIcon>
                  <ListItemText primary="Chuyển hàng đến điểm giao dịch đích" />
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

export default StaffGathering;
