import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, ListItemIcon, ListItemText, Box, Grid } from '@mui/material';
import { Home, AccountCircle, Storage, Gavel, ExitToApp } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';


function StaffTransaction() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [ginhanAnchorEl, setGinhanAnchorEl] = React.useState(null);
  const [taodonAnchorEl, setTaodonAnchorEl] = React.useState(null);
  const [xacnhanAnchorEl, setXacnhanAnchorEl] = React.useState(null);

  const accessToken = window.localStorage.getItem('accessToken');

  const headers = {
    'Content-Type': 'application/json',
    'AccessToken': accessToken,
  };
  
  const userRole = window.localStorage.getItem('userRole');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleGhinhanMenuOpen = (event) => {
    setGinhanAnchorEl(event.currentTarget);
  };

  const handleTaodonMenuOpen = (event) => {
    setTaodonAnchorEl(event.currentTarget);
  };

  const handlXacnhanMenuOpen = (event) => {
    setXacnhanAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubMenuClose = () => {
    setGinhanAnchorEl(null);
    setTaodonAnchorEl(null);
    setXacnhanAnchorEl(null);
  };
  const handleLogout = () => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    window.location.href = '/';
  };
  if (userRole === 'staffTransaction') {
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
                <Button startIcon={<HowToRegOutlinedIcon />} onClick={handleGhinhanMenuOpen}
                 style={{ color : '#fff', paddingTop : '30px'}}
                 >
                  Ghi nhận
                </Button>
                <Menu
                  anchorEl={ginhanAnchorEl}
                  open={Boolean(ginhanAnchorEl)}
                  onClose={handleSubMenuClose}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <Gavel />
                    </ListItemIcon>
                    <ListItemText primary="Điểm giao dịch" />
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Storage />
                    </ListItemIcon>
                    <ListItemText primary="Điểm tập kết" />
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
                    <ListItemText primary="Trưởng điểm tập kết" />
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Gavel />
                    </ListItemIcon>
                    <ListItemText primary="Trưởng điểm giao dịch" />
                  </MenuItem>
                </Menu>
              </li>
              <li>
                <Button startIcon={<CheckCircleIcon />} onClick={handlXacnhanMenuOpen}
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
                    <ListItemText primary="Hàng gửi" />
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Gavel />
                    </ListItemIcon>
                    <ListItemText primary="Hàng nhận" />
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
  } else {
    return <div>You are not allow to this action</div>
  }
}

export default StaffTransaction;
