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

function Gathering() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const [statisticAnchorEl, setStatisticAnchorEl] = useState(null); // State mới cho menu "Thống kê"

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
    window.location.href = '/';
  };

  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({ name: '', email: '', password: '' });

  const fetchAccountsFromAPI = async () => {
    try {
      const response = await fetch('http://localhost:1406/v1/boss/manage');
      if (response.ok) {
        const data = await response.json();
        const filteredAccounts = data.filter(account => account.role === 'gather_employee');
        setAccounts(filteredAccounts.slice(0, 4));
      } else {
        console.error('Lỗi khi lấy danh sách tài khoản:', response.statusText);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách tài khoản:', error.message);
    }
  };

  useEffect(() => {
    fetchAccountsFromAPI();
  }, []);

  const handleAddAccount = async () => {
    const requestData = {
      name: newAccount.name,
      email: newAccount.email,
      password: newAccount.password,
      role: "gather_employee",
    };

    try {
      const response = await fetch('http://localhost:1406/v1/gaManager/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        console.log('Thêm tài khoản thành công');
      } else {
        console.error('Lỗi khi thêm tài khoản:', response.statusText);
      }
    } catch (error) {
      console.error('Lỗi khi thêm tài khoản:', error.message);
    }

    setAccounts([...accounts, newAccount]);
    setNewAccount({ name: '', email: '', password: '', role: '' });
  };

  const handleDeleteAccount = async (index, accountId) => {
    try {
      // Gửi yêu cầu xóa đến API
      const response = await fetch(`http://localhost:1406/v1/gaManager/manage/${accountId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('Xóa tài khoản thành công');
      } else {
        console.error('Lỗi khi xóa tài khoản:', response.statusText);
      }
    } catch (error) {
      console.error('Lỗi khi xóa tài khoản:', error.message);
    }
  
    // Cập nhật state để render lại danh sách tài khoản
    const updatedAccounts = [...accounts];
    updatedAccounts.splice(index, 1);
    setAccounts(updatedAccounts);
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
}

export default Gathering;
