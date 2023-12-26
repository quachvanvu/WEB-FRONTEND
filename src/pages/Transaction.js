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
import {
  // ... (other imports)
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'; 

function Transaction() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const [statisticalData, setStatisticalData] = useState(null);
  const [showStatisticalChart, setShowStatisticalChart] = useState(false);

  const accessToken = window.localStorage.getItem('accessToken');
  const tranPlaceId = window.localStorage.getItem('placeId');

  const headers = {
    'Content-Type': 'application/json',
    'AccessToken': accessToken,
    'placeId': tranPlaceId,
  };

  const userRole = window.localStorage.getItem('userRole');

  const placeId = window.localStorage.getItem('placeId');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuOpen = (event) => {
    setAccountAnchorEl(event.currentTarget);
    setShowStatisticalChart(false);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    async function fetchStatisticalData() {
      try {
        const response = await axios.get(
          'http://localhost:1406/v1/tranManager/statistical',
          {
            headers: {
              'Content-Type': 'application/json',
              'AccessToken': accessToken,
              'placeId': tranPlaceId,
            },
          }
        );
        setStatisticalData(response.data);
      } catch (error) {
        console.error('Error fetching statistical data:', error);
      }
    }

    fetchStatisticalData();
  }, []); // Run once when component mounts

  // Render statistical data in a bar chart
  const renderStatisticalChart = () => {
    if (statisticalData) {
      const data = [
        { name: 'Sended', status: statisticalData.sended },
        { name: 'Received', status: statisticalData.received },
      ];

      return (
        <ResponsiveContainer width="30%" height={600}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis tickCount={statisticalData.sended + statisticalData.received} />
            <Tooltip />
            <Legend />
            <Bar dataKey="status" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      );
    }
    return null;
  };

  const handleStatisticalClick = () => {
    setShowStatisticalChart(true);
    setAccountAnchorEl(null);
  };

  
  const handleLogout = () => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    window.localStorage.removeItem('userRole');
    window.location.href = '/';
  };

  const [accounts, setAccounts] = useState([]);

  axios.get('http://localhost:1406/v1/tranManager/all', {headers})
    .then(res => setAccounts(res.data))


  const [newAccount, setNewAccount] = useState({ name: '', email: '', password: '' });


  const handleAddAccount = async () => {

    const requestData = {
      name: newAccount.name,
      email: newAccount.email,
      password: newAccount.password,
      role: "tran_employee",
      placeId : placeId,
    };

    await axios.post('http://localhost:1406/v1/tranManager/register', requestData, {headers})
    .then(res => console.log(res.data))

    setAccounts([...accounts, newAccount]);
    setNewAccount({ name: '', email: '', password: '', role: '' });
  };

  const handleDeleteAccount = async (index, accountId) => {
    await axios.delete(`http://localhost:1406/v1/tranManager/manage/${accountId}`, {headers})
    .then(res => console.log(res.data))
  
    // Cập nhật state để render lại danh sách tài khoản
    const updatedAccounts = [...accounts];
    updatedAccounts.splice(index, 1);
    setAccounts(updatedAccounts);
  };
  

  // if (userRole === 'transaction') {
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
                  <Button startIcon={<Assessment />} onClick={handleStatisticalClick} style={{ color: '#fff', paddingTop: '30px' }}>
                    Thống kê
                  </Button>
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

          {showStatisticalChart &&
            (
              <Grid item xs={9} style={{ padding: '16px' }}>
              <div>
            {renderStatisticalChart()}
            </div>
            </Grid>
          )}
        </Grid>
        
      </div>
    );
  // } else {
  //   return <div>You are not allow to this action</div>
  // }
}

export default Transaction;
