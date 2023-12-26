import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Home,
  AccountCircle,
  Assessment,
  Settings,
  Storage,
  Delete as DeleteIcon,
  ExitToApp,
} from '@mui/icons-material';
import axios from 'axios';

function Boss() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const [placeAnchorEl, setPlaceAnchorEl] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [showTable, setShowTable] = useState(false); 
  const [places, setPlaces] = useState([]);
  const [showTable1, setShowTable1] = useState(false); 


  const accessToken = window.localStorage.getItem('accessToken');

  const headers = {
    'Content-Type': 'application/json',
    'AccessToken': accessToken,
  };

  const userRole = window.localStorage.getItem('userRole');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuOpen = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handlePlaceMenuOpen = (event) => {
    setPlaceAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubMenuClose = () => {
    setAccountAnchorEl(null);
    setPlaceAnchorEl(null);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    window.localStorage.removeItem('userRole');
    window.location.href = '/';
  };

  useEffect(() => {
    if (accountAnchorEl) {
      axios.get('http://localhost:1406/v1/boss/manage', { headers })
        .then((res) => {
          setAccounts(res.data);
          setShowTable(true); // Khi có dữ liệu, hiển thị bảng
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setShowTable(false); // Nếu có lỗi, ẩn bảng
        });
    }
  }, [accountAnchorEl]);

  useEffect(() => {
    if (placeAnchorEl) {
        axios.get('http://localhost:1406/v1/boss/place', { headers })
        .then((res) => {
          setPlaces(res.data);
          setShowTable1(true); // Khi có dữ liệu, hiển thị bảng
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setShowTable1(false); // Nếu có lỗi, ẩn bảng
        });
    }
  }, [placeAnchorEl]);

  const handleDeleteAccount = (accountId) => {
      axios.delete(`http://localhost:1406/v1/boss/manage/${accountId}`, { headers })
        .then(() => {
          // Xóa tài khoản khỏi danh sách accounts
          const updatedAccounts = accounts.filter((account) => account._id !== accountId);
          setAccounts(updatedAccounts);
        })
        .catch((error) => {
          console.error('Lỗi khi xóa tài khoản:', error);
        });
  };

  return (
    <div>
      <AppBar
        position="static"
        style={{
          backgroundColor: '#2196f3',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
        }}
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

      <Grid container style={{ height: '91vh' }}>
        <Grid
          item
          xs={3}
          style={{
            backgroundColor: '#1e88e5',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
            padding: '10px',
          }}
        >
          <nav>
            <ul>
              <li>
                <Button
                  startIcon={<Settings />}
                  onClick={handlePlaceMenuOpen}
                  style={{ color: '#fff', paddingTop: '30px' }}
                  onClose = {handleSubMenuClose}
                >
                  Quản lý hệ thống
                </Button>
              </li>
              <li>
                <Button
                  startIcon={<AccountCircle />}
                  onClick={handleAccountMenuOpen}
                  style={{ color: '#fff', paddingTop: '30px' }}
                  onClose = {handleSubMenuClose}
                >
                  Quản lý tài khoản
                </Button>
              </li>
              <li>
                <Button
                  startIcon={<Assessment />}
                  style={{ color: '#fff', paddingTop: '30px' }}
                >
                  Thống kê
                </Button>
              </li>
              <li>
                <Button
                  startIcon={<ExitToApp />}
                  onClick={handleLogout}
                  style={{
                    color: '#fff',
                    paddingTop: '30px',
                    marginTop: '380px',
                  }}
                >
                  Đăng xuất
                </Button>
              </li>
            </ul>
          </nav>
        </Grid>

        <Grid 
          item 
            xs={9}
            style={{
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
            }}
        >
          {showTable && ( // Chỉ hiển thị bảng nếu showTable là true
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ border: '1.5px solid #2d73eb', padding: '8px' }}><b>Tên</b></TableCell>
                    <TableCell style={{ border: '1.5px solid #2d73eb', padding: '8px' }}><b>Email</b></TableCell>
                    <TableCell style={{ border: '1.5px solid #2d73eb', padding: '8px' }}><b>Chức năng</b></TableCell>
                    <TableCell style={{ border: '1.5px solid #2d73eb', padding: '8px' }}><b>Thao tác</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accounts.map((account) => (
                    <TableRow key={account._id}>
                      <TableCell style={{ border: '1.5px solid #2d73eb', padding: '8px' }}>{account.name}</TableCell>
                      <TableCell style={{ border: '1.5px solid #2d73eb', padding: '8px' }}>{account.email}</TableCell>
                      <TableCell style={{ border: '1.5px solid #2d73eb', padding: '8px' }}>
                        {account.role === 'tran_manager'
                          ? 'Quản lý điểm giao dịch'
                          : account.role === 'gather_manager'
                          ? 'Quản lý điểm tập kết'
                          : ''}
                      </TableCell>
                      <TableCell style={{ border: '1.5px solid #2d73eb', padding: '8px' }}>
                        <IconButton color="secondary" onClick={() => handleDeleteAccount(account._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {showTable1 && ( // Chỉ hiển thị bảng nếu showTable là true
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ border: '1.5px solid #2d73eb', padding: '8px' }}><b>Name</b></TableCell>
                    <TableCell style={{ border: '1.5px solid #2d73eb', padding: '8px' }}><b>Address</b></TableCell>
                    <TableCell style={{ border: '1.5px solid #2d73eb', padding: '8px' }}><b>Type</b></TableCell>
                    <TableCell style={{ border: '1.5px solid #2d73eb', padding: '8px' }}><b>ManagerEmail</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {places.map((place) => (
                    <TableRow key={place._id}>
                      <TableCell style={{ border: '1.5px solid #2d73eb', padding: '8px' }}>{place.name}</TableCell>
                      <TableCell style={{ border: '1.5px solid #2d73eb', padding: '8px' }}>{place.address}</TableCell>
                      <TableCell style={{ border: '1.5px solid #2d73eb', padding: '8px' }}> {place.type} </TableCell>
                      <TableCell style={{ border: '1.5px solid #2d73eb', padding: '8px' }}> {place.managerEmail} </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default Boss;