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
  const [accounts, setAccounts] = useState([]);
  const [showTable, setShowTable] = useState(false); // Thêm state mới

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuOpen = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubMenuClose = () => {
    setAccountAnchorEl(null);
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    if (accountAnchorEl) {
      axios.get('http://localhost:1406/v1/boss/manage')
        .then((data) => {
          const filteredAccounts = data.data.filter(
            (account) =>
              account.role === 'tran_manager' || account.role === 'gather_manager'
          );
          setAccounts(filteredAccounts);
          setShowTable(true); // Khi có dữ liệu, hiển thị bảng
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setShowTable(false); // Nếu có lỗi, ẩn bảng
        });
    }
  }, [accountAnchorEl]);

  const handleDeleteAccount = (accountId) => {
      axios.delete(`http://localhost:1406/v1/boss/manage/${accountId}`)
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
            <MenuItem onClick={handleAccountMenuOpen}>
              <ListItemIcon>
                <Storage />
              </ListItemIcon>
              <ListItemText primary="Quản lý tài khoản" />
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
                  onClick={handleMenuClose}
                  style={{ color: '#fff', paddingTop: '30px' }}
                >
                  Quản lý hệ thống
                </Button>
              </li>
              <li>
                <Button
                  startIcon={<AccountCircle />}
                  onClick={handleAccountMenuOpen}
                  style={{ color: '#fff', paddingTop: '30px' }}
                >
                  Quản lý tài khoản
                </Button>
              </li>
              <li>
                <Button
                  startIcon={<Assessment />}
                  onClick={handleMenuClose}
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
                          ? 'Nhân viên điểm giao dịch'
                          : account.role === 'gather_manager'
                          ? 'Nhân viên điểm tập kết'
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
        </Grid>
      </Grid>
    </div>
  );
}

export default Boss;
