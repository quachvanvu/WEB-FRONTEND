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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const accessToken = window.localStorage.getItem('accessToken');

const headers = {
  'Content-Type': 'application/json',
  'AccessToken': accessToken,
};

function Customer() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sendOrderAnchorEl, setSendOrderAnchorEl] = React.useState(null);
  const [receivedOrderAnchorEl, setReceivedOrderAnchorEl] = React.useState(null);
  const [unconfimredAnchorE1, setUnconfimredAnchorE1] =  React.useState(null);


  const [sendOrder, setSendOrder] = useState([]);
  const [showSendOrder, setShowSendOrder] = useState(false);

  const [receivedOrder, setReceivedOrder] = useState([]);
  const [showReceivedOrder, setShowReceivedOrder] = useState(false);

  const [unconfimred, setUnconfimred] = useState([]);
  const [showUnconfimred, setShowUnconfimred] = useState(false);


  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const tableCellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  const handleSendOrder = (event) => {
    setSendOrderAnchorEl(event.currentTarget);
    setShowSendOrder(true);
    setShowReceivedOrder(false);
    setShowUnconfimred(false);
  };

  useEffect(() => {
    if (sendOrderAnchorEl) {
        axios.get('http://localhost:1406/v1/user/send', { headers })
        .then((res) => {
          setSendOrder(res.data);
          setShowSendOrder(true); // Khi có dữ liệu, hiển thị bảng
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setShowSendOrder(false); // Nếu có lỗi, ẩn bảng
        });
    }
  }, [sendOrderAnchorEl]);

  const handleReceivedOrder = (event) => {
    setReceivedOrderAnchorEl(event.currentTarget);
    setShowSendOrder(false);
    setShowReceivedOrder(true);
    setShowUnconfimred(false);
  };

  useEffect(() => {
    if (receivedOrderAnchorEl) {
        axios.get('http://localhost:1406/v1/user/receive', { headers })
        .then((res) => {
          setReceivedOrder(res.data);
          setShowReceivedOrder(true); // Khi có dữ liệu, hiển thị bảng
          console.log(res.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setShowReceivedOrder(false); // Nếu có lỗi, ẩn bảng
        });
    }
  }, [receivedOrderAnchorEl]);

  const handleUnconfimred = (event) => {
    setUnconfimredAnchorE1(event.currentTarget);
    setShowSendOrder(false);
    setShowReceivedOrder(false);
    setShowUnconfimred(true);
  }

  useEffect(() => {
    if (unconfimredAnchorE1) {
        axios.get('http://localhost:1406/v1/user/allOrders', { headers })
        .then((res) => {
          setUnconfimred(res.data);
          setShowUnconfimred(true); // Khi có dữ liệu, hiển thị bảng
          console.log(res.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setShowUnconfimred(false); // Nếu có lỗi, ẩn bảng
        });
    }
  }, [unconfimredAnchorE1]);

  const confirmOrder = async (orderId, placeId) => {
    try {
      // await axios.post(
      //   'http://localhost:1406/v1/user/acceptOrder', {
      //     orderId: orderId,
      //     placeId: placeId
      //   }, { headers }
      // ).then(res => console.log(res.data))
      // Hiển thị thông báo thành công, có thể sử dụng thư viện thông báo hoặc cách khác
      // alert('xác nhận thành công');

      await axios.post('http://localhost:1406/v1/user/acceptOrder', {
        orderId: orderId, 
        placeId: placeId
      }, { headers}).then(res => console.log(res.data))
      toast.success("Xác nhận thành công");
  
      // Xóa bảng bằng cách cập nhật state
      setUnconfimred([]);
    } catch (error) {
      console.error('Lỗi xác nhận đơn hàng', error);
      // Xử lý lỗi theo cách của bạn
    }
  };

  const handleSubMenuClose = () => {
    setSendOrderAnchorEl(null);
    setReceivedOrderAnchorEl(null);
    setUnconfimredAnchorE1(null);
  };
  
  const handleLogout = () => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    window.localStorage.removeItem('userRole');
    window.location.href = '/';
  };
  return (
    <div>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <ToastContainer />
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

      <Grid container style={{ height : '91vh'}}>
        <Grid item xs={3} style={{ 
            backgroundColor: '#1e88e5', 
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', padding: '10px' }}
            >
        <nav>
          <ul>
            <li>
              <Button startIcon={<OfflinePinOutlinedIcon />} onClick={handleSendOrder} 
                style={{ color : '#fff', paddingTop : '30px'}}
                >
                Đơn hàng đã gửi
              </Button>
            </li>
            <li>
              <Button startIcon={<OfflinePinOutlinedIcon />}  onClick={handleReceivedOrder}
                style={{ color : '#fff', paddingTop : '30px'}}
                >
                Đơn hàng đã nhận
              </Button>
            </li>
            <li>
              <Button startIcon={<OfflinePinOutlinedIcon />} onClick={handleUnconfimred}
                style={{ color : '#fff', paddingTop : '30px'}}
                >
                Xác nhận đơn hàng
              </Button>
            </li>
            <li>
            <Button startIcon={<ExitToApp />} onClick={handleLogout} 
            style={{ color : '#fff', paddingTop : '30px', marginTop : '50px'}}
            >
            Đăng xuất
          </Button>
            </li>
          </ul>
        </nav>
        </Grid>

        {showSendOrder && (
          <Grid item xs={9} style={{ padding: '16px' }}>
          <div>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px', border: '1px solid #1a1817' }}>
          <thead>
            <tr style={{ background: '#f2f2f2' }}>
              <th style={tableCellStyle}>Tên</th>
              <th style={tableCellStyle}>Trạng thái</th>
              <th style={tableCellStyle}>Ngày gửi</th>
              <th style={tableCellStyle}>Email người gửi</th>
              <th style={tableCellStyle}>Email người nhận</th>
        
            </tr>
          </thead>
          <tbody>
            {sendOrder.length !== 0 && sendOrder.map((order) => (
              <tr key={order._id} style={{ ':hover': { background: '#f5f5f5' } }}>
                <td style={tableCellStyle}>{order.name}</td>
                <td style={tableCellStyle}>{order.status}</td>
                <td style={tableCellStyle}>{order.dateSend}</td>
                <td style={tableCellStyle}>{order.senderEmail}</td>
                <td style={tableCellStyle}>{order.receiverEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
          </div>
        </Grid>
        )}

        {showReceivedOrder && (
          <Grid item xs={9} style={{ padding: '16px' }}>
          <div>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px', border: '1px solid #1a1817' }}>
          <thead>
            <tr style={{ background: '#f2f2f2' }}>
              <th style={tableCellStyle}>Tên</th>
              <th style={tableCellStyle}>Trạng thái</th>
              <th style={tableCellStyle}>Ngày gửi</th>
              <th style={tableCellStyle}>Email người gửi</th>
              <th style={tableCellStyle}>Email người nhận</th>
        
            </tr>
          </thead>
          <tbody>
            {receivedOrder.length !== 0 && receivedOrder.map((order) => (
              <tr key={order._id} style={{ ':hover': { background: '#f5f5f5' } }}>
                <td style={tableCellStyle}>{order.name}</td>
                <td style={tableCellStyle}>{order.status}</td>
                <td style={tableCellStyle}>{order.dateSend}</td>
                <td style={tableCellStyle}>{order.senderEmail}</td>
                <td style={tableCellStyle}>{order.receiverEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
          </div>
        </Grid>
        )}

        {showUnconfimred && (
          <Grid item xs={9} style={{ padding: '16px' }}>
          <div>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px', border: '1px solid #1a1817' }}>
          <thead>
            <tr style={{ background: '#f2f2f2' }}>
              <th style={tableCellStyle}>Tên</th>
              <th style={tableCellStyle}>Trạng thái</th>
              <th style={tableCellStyle}>Ngày gửi</th>
              <th style={tableCellStyle}>Email người gửi</th>
              <th style={tableCellStyle}>Email người nhận</th>
              <th style={tableCellStyle}>Hành động</th>

            </tr>
          </thead>
          <tbody>
            {unconfimred.length !== 0 && unconfimred.map((order) => (
              <tr key={order._id} style={{ ':hover': { background: '#f5f5f5' } }}>
                <td style={tableCellStyle}>{order.name}</td>
                <td style={tableCellStyle}>{order.status}</td>
                <td style={tableCellStyle}>{order.dateSend}</td>
                <td style={tableCellStyle}>{order.senderEmail}</td>
                <td style={tableCellStyle}>{order.receiverEmail}</td>
                <td style={tableCellStyle}>{<Button onClick={() => confirmOrder(order._id, order.placeId)} variant="contained" color="primary">
                  xác nhận
                </Button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
          </div>
        </Grid>
        )}
        </Grid>
    </div>
  );
}

export default Customer;
