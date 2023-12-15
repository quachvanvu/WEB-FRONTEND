import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, Grid, ListItemIcon, ListItemText } from '@mui/material';
import { Home, AccountCircle, Storage, Gavel, ExitToApp, Assessment } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import PrintIcon from '@mui/icons-material/Print';
import ReceiptComponent from '../component/ReceiptComponent'; // Import ReceiptComponent

function StaffTransaction() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [ginhanAnchorEl, setGinhanAnchorEl] = useState(null);
  const [taodonAnchorEl, setTaodonAnchorEl] = useState(null);
  const [xacnhanAnchorEl, setXacnhanAnchorEl] = useState(null);
  const [thongkeAnchorEl, setThongkeAnchorEl] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);

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

  const handlThongkeMenuOpen = (event) => {
    setThongkeAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubMenuClose = () => {
    setGinhanAnchorEl(null);
    setTaodonAnchorEl(null);
    setXacnhanAnchorEl(null);
    setThongkeAnchorEl(null);
  };

  const handlePrintReceipt = () => {
    setShowReceipt(true);
  };

  const handlePrintClose = () => {
    setShowReceipt(false);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    window.localStorage.removeItem('userRole');
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
          <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <Storage />
              </ListItemIcon>
              <ListItemText primary="Lãnh đạo công ty" />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Grid container style={{ height: '91vh' }}>
        <Grid item xs={3} style={{ backgroundColor: '#1e88e5', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', padding: '10px' }}>
          <nav>
            <ul>
              <li>
                <Button startIcon={<HowToRegOutlinedIcon />} onClick={handleGhinhanMenuOpen} style={{ color: '#fff', paddingTop: '30px' }}>
                  Ghi nhận hàng của người gửi
                </Button>
              </li>
              <li>
                <Button startIcon={<AddCircleOutlineIcon />} onClick={handleTaodonMenuOpen} style={{ color: '#fff', paddingTop: '30px' }}>
                  Tạo đơn
                </Button>
                <Menu anchorEl={taodonAnchorEl} open={Boolean(taodonAnchorEl)} onClose={handleSubMenuClose}>
                  <MenuItem>
                    <ListItemIcon>
                      <Storage />
                    </ListItemIcon>
                    <ListItemText primary="Hàng gửi đến điểm tập kết" />
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Gavel />
                    </ListItemIcon>
                    <ListItemText primary="Hàng chuyển đến tay người nhận" />
                  </MenuItem>
                </Menu>
              </li>
              <li>
                <Button startIcon={<CheckCircleIcon />} onClick={handlXacnhanMenuOpen} style={{ color: '#fff', paddingTop: '30px' }}>
                  Xác nhận
                </Button>
                <Menu anchorEl={xacnhanAnchorEl} open={Boolean(xacnhanAnchorEl)} onClose={handleSubMenuClose}>
                  <MenuItem>
                    <ListItemIcon>
                      <Storage />
                    </ListItemIcon>
                    <ListItemText primary="Hàng về từ điểm tập kết" />
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Gavel />
                    </ListItemIcon>
                    <ListItemText primary="Hàng gửi tới tay người nhận" />
                  </MenuItem>
                </Menu>
              </li>
              <li>
                <Button startIcon={<Assessment />} onClick={handlThongkeMenuOpen} style={{ color: '#fff', paddingTop: '30px' }}>
                  Thống kê
                </Button>
                <Menu anchorEl={thongkeAnchorEl} open={Boolean(thongkeAnchorEl)} onClose={handleSubMenuClose}>
                  <MenuItem>
                    <ListItemIcon>
                      <Storage />
                    </ListItemIcon>
                    <ListItemText primary="Hàng chuyển thành công" />
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Gavel />
                    </ListItemIcon>
                    <ListItemText primary="Hàng chuyển không thành công" />
                  </MenuItem>
                </Menu>
              </li>
              <li>
                <Button startIcon={<PrintIcon />} onClick={handlePrintReceipt} style={{ color: '#fff', paddingTop: '30px' }}>
                  In Giấy Biên Nhận
                </Button>
              </li>
              <li>
                <Button startIcon={<ExitToApp />} onClick={handleLogout} style={{ color: '#fff', paddingTop: '30px', marginTop: '350px' }}>
                  Đăng xuất
                </Button>
              </li>
            </ul>
          </nav>
        </Grid>
      </Grid>

      {/* Component Giấy Biên Nhận */}
      {showReceipt && <ReceiptComponent onClose={handlePrintClose} />}
    </div>
  );
}

export default StaffTransaction;
