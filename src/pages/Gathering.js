import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { Home, AccountCircle, Assessment, ExitToApp, Add } from '@mui/icons-material';
import axios from 'axios';

function Gathering() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const [statisticAnchorEl, setStatisticAnchorEl] = useState(null); // State mới cho menu "Thống kê"

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

  const handleStatisticMenuOpen = (event) => { // Hàm để mở menu "Thống kê"
    setStatisticAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubMenuClose = () => {
    setAccountAnchorEl(null);
  };

  const handleStatisticMenuClose = () => { // Hàm để đóng menu "Thống kê"
    setStatisticAnchorEl(null);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    window.localStorage.removeItem('userRole');
    window.location.href = '/';
  };

  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({ name: '', email: '', password: '' });

  const fetchAccountsFromAPI = async () => {
    try {
      await axios.get('http://localhost:1406/v1/boss/manage', { headers })
        .then(data => {
          if(data.data) {
            const filteredAccounts = data.data.filter(account => account.role === 'gather_employee');
            setAccounts(filteredAccounts.slice(0, 4));
          } else {
            console.error('Lỗi khi lấy danh sách tài khoản:', data.message);
          } 
        })
    } catch (error) {
      console.error('Lỗi khi lấy danh sách tài khoản:', error.message);
    }
  };

  useEffect(() => {
    fetchAccountsFromAPI();
  }, []);

  const handleAddAccount = async () => {
    try {
      await axios.post('http://localhost:1406/v1/gaManager/register', {
        name: newAccount.name,
        email: newAccount.email,
        password: newAccount.password,
        role: "gather_employee"
      }, { headers })
        .then(data => {
         console.log('Thêm tài khoản thành công', data.data)
        })
        .catch(error =>  console.error('Lỗi khi thêm tài khoản:', error.statusText) )
    } catch (error) {
      console.error('Lỗi khi thêm tài khoản:', error.message);
    }

    setAccounts([...accounts, newAccount]);
    setNewAccount({ name: '', email: '', password: '', role: '' });
  };

  const handleDeleteAccount = async (index, accountId) => {
    try {
      // Gửi yêu cầu xóa đến API
     await axios.delete(`http://localhost:1406/v1/gaManager/manage/${accountId}`, { headers })
      .then( data => console.log('Xóa tài khoản thành công', data.data))
      .catch(err => console.error(err))
    } catch (error) {
      console.error('Lỗi khi xóa tài khoản:', error.message);
    }
  
    // Cập nhật state để render lại danh sách tài khoản
    const updatedAccounts = [...accounts];
    updatedAccounts.splice(index, 1);
    setAccounts(updatedAccounts);
  };
  
  
 if (userRole === 'gathering') {
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
              <ListItemText primary="Trưởng điểm giao dịch" />
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
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <nav>
            <ul>
              <li>
                <Button
                  startIcon={<AccountCircle />}
                  onClick={handleAccountMenuOpen}
                  style={{ color: '#fff', paddingTop: '30px' }}
                >
                  Cấp tài khoản
                </Button>
              </li>
              <li>
              <Button
              startIcon={<Assessment />}
              onClick={handleStatisticMenuOpen} // Button để mở menu "Thống kê"
              style={{ color: '#fff', paddingTop: '30px' }}
            >
              Thống kê
            </Button>
            <Menu
              anchorEl={statisticAnchorEl}
              keepMounted
              open={Boolean(statisticAnchorEl)}
              onClose={handleStatisticMenuClose} // Menu "Thống kê"
            >
              <MenuItem onClick={handleStatisticMenuClose}>
                <ListItemText primary="Hàng đi" />
              </MenuItem>
              <MenuItem onClick={handleStatisticMenuClose}>
                <ListItemText primary="Hàng đến" />
              </MenuItem>
            </Menu>
              </li>
              <li>
                <Button
                  startIcon={<ExitToApp />}
                  onClick={handleLogout}
                  style={{ color: '#fff', paddingTop: '30px', marginTop: 'auto' }}
                >
                  Đăng xuất
                </Button>
              </li>
            </ul>
          </nav>
        </Grid>

        {Boolean(accountAnchorEl) && (
          <Grid
            item
            xs={9}
            style={{
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box>
              <TableContainer>
                <Table style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ border: '1px solid #2d73eb', padding: '8px' }}><b>Tên</b></TableCell>
                      <TableCell style={{ border: '1px solid #2d73eb', padding: '8px' }}><b>Email</b></TableCell>
                      <TableCell style={{ border: '1px solid #2d73eb', padding: '8px' }}><b>Hành động</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {accounts.map((account, index) => (
                      <TableRow key={index}>
                        <TableCell style={{ border: '1.5px solid #2d73eb', padding: '8px' }}>{account.name}</TableCell>
                        <TableCell style={{ border: '1.5px solid #2d73eb', padding: '8px' }}>{account.email}</TableCell>
                        <TableCell style={{ border: '1.5px solid #2d73eb', padding: '8px' }}>
                        <Button onClick={() => handleDeleteAccount(index, account._id)}>Xóa</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box mt={2} style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom>
                  Thêm Tài Khoản
                </Typography>
                <TextField
                  label="Tên"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                />
                <TextField
                  label="Email"
                  value={newAccount.email}
                  onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
                />
                <TextField
                  label="Mật khẩu"
                  value={newAccount.password}
                  onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })}
                />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Add />}
                  onClick={handleAddAccount}
                  style={{ marginTop: '10px' }}
                >
                  Thêm
                </Button>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
    </div>
  );
 } else {
  return <div>You are not allow to this action</div>
 }
}

export default Gathering;
