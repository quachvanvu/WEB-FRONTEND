import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Grid,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material';
import {
  Home,
  AccountCircle,
  Storage,
  Gavel,
  ExitToApp,
  Assessment,
} from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import PrintIcon from '@mui/icons-material/Print';
import ReceiptComponent from '../component/ReceiptComponent';
import axios from 'axios';

function StaffTransaction() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [ginhanAnchorEl, setGinhanAnchorEl] = useState(null);
  const [taodonAnchorEl, setTaodonAnchorEl] = useState(null);
  const [xacnhanAnchorEl, setXacnhanAnchorEl] = useState(null);
  const [thongkeAnchorEl, setThongkeAnchorEl] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const accessToken = window.localStorage.getItem('accessToken');
  const headers = {
    'Content-Type': 'application/json',
    'AccessToken': accessToken,
  };

  const userRole = window.localStorage.getItem('userRole');

  const [formData, setFormData] = useState({
    name: '',
    senderEmail: '',
    receiverEmail: ''
  });

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleGhinhanMenuOpen = () => {
    setShowForm(true);
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

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleFormClose = () => {
    setShowForm(false);
    setFormData({
      name: '',
      senderEmail: '',
      receiverEmail: ''
    });
  };
  const tranPlaceId = window.localStorage.getItem('placeId');
  const handleFormSubmit = (event) => {
    event.preventDefault();
    let newData = {...formData, tranPlaceId: tranPlaceId}
    console.log(typeof newData);

    axios.post('http://localhost:1406/v1/tranEmployee/order', newData, headers)
    .then(res => console.log(res))

    // fetch('http://localhost:1406/v1/tranEmployee/order', {
    //   method: 'POST',
    //   body: newData,
    // }, headers)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('API response:', data);
    //     console.log('thành công')
    //     handleFormClose();
    //   })
    //   .catch((error) => {
    //     console.error('API error:', error);
    //     console.log("không thành công")
    //   });
  };

  const handleLogout = () => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    window.localStorage.removeItem('userRole');
    window.location.href = '/';
  };
  // if (userRole === 'staffTransaction') {
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

        <Grid container style={{ display: 'flex', flexDirection: 'row', height: '91vh' }}>
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

          {showForm && (
            <Grid item xs={9} style={{ padding: '16px' }}>
              <div style={{ backgroundColor: '#fff', padding: '16px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
                <Typography variant="h6" style={{ marginBottom: '16px', textAlign: 'center' }}>Ghi nhận hàng của người gửi</Typography>
                <form onSubmit={handleFormSubmit}>
                  <TextField
                    label="Tên"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                  />
                  <TextField
                    label="Email người gửi"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.senderEmail}
                    onChange={handleInputChange('senderEmail')}
                  />
                  <TextField
                    label="Email người nhận"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.receiverEmail}
                    onChange={handleInputChange('receiverEmail')}
                  />

                  <div style={{ marginTop: '16px', textAlign: 'right' }}>
                    <Button type="submit" variant="contained" color="primary" style={{ marginRight: '8px' }}>Gửi</Button>
                    <Button type="button" variant="contained" onClick={handleFormClose}>Đóng</Button>
                  </div>
                </form>
              </div>
            </Grid>
          )}
        </Grid>

        {showReceipt && <ReceiptComponent onClose={handlePrintClose} />}
      </div>
    );
  // } else {
  //   return <div>You are not allow to this action</div>
  // }
}

export default StaffTransaction;
