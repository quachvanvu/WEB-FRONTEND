import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  Paper,
} from '@mui/material';
import OfflinePinOutlinedIcon from '@mui/icons-material/OfflinePinOutlined';
import ExitToApp from '@mui/icons-material/ExitToApp';
import Home from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';

function Customer() {
  const [data, setData] = useState([]);
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

  useEffect(() => {
    const sendApiUrl = 'http://localhost:1406/v1/user/send';
    const receiveApiUrl = 'http://localhost:1406/v1/user/receive';

    const fetchData = async () => {
      try {
        const sendResponse = await axios.get(sendApiUrl,  { email: "tu@123gmail.com" });
        const receiveResponse = await axios.get(receiveApiUrl, { email:"tu@123gmail.com"});

        // Combine data from both responses
        const combinedData = [...sendResponse.data, ...receiveResponse.data];
        console.log(combinedData);
        setData(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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

      <Grid container style={{ height: '91vh' }}>
        <Grid item xs={3} style={{ backgroundColor: '#1e88e5', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', padding: '10px' }}>
          <nav>
            <ul>
              <li>
                <Button startIcon={<OfflinePinOutlinedIcon />} onClick={handleAccountMenuOpen} style={{ color: '#fff', paddingTop: '30px' }}>
                  Trạng thái đơn hàng
                </Button>
              </li>
              <li>
                <Button startIcon={<ExitToApp />} onClick={handleLogout} style={{ color: '#fff', paddingTop: '30px', marginTop: '50px' }}>
                  Đăng xuất
                </Button>
              </li>
            </ul>
          </nav>
        </Grid>

        <Grid item xs={9} style={{ padding: '20px' }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Ngày gửi</TableCell>
                  <TableCell>Email người gửi</TableCell>
                  <TableCell>Email người nhận</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.dateSend}</TableCell>
                    <TableCell>{item.senderEmail}</TableCell>
                    <TableCell>{item.receiverEmail}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default Customer;
