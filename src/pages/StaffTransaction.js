import {
  AccountCircle,
  Assessment,
  ExitToApp,
  Gavel,
  Home,
  Storage,
} from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import PrintIcon from '@mui/icons-material/Print';
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReceiptComponent from '../component/ReceiptComponent';

function StaffTransaction() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [ginhanAnchorEl, setGinhanAnchorEl] = useState(null);
  const [taodonAnchorEl, setTaodonAnchorEl] = useState(null);
  const [xacnhanAnchorEl, setXacnhanAnchorEl] = useState(null);
  const [thongkeAnchorEl, setThongkeAnchorEl] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [showAllGatherOrders, setShowAllGatherOrders] = useState(false);

  const accessToken = window.localStorage.getItem('accessToken');
  const tranPlaceId = window.localStorage.getItem('placeId');
  const headers = {
    'Content-Type': 'application/json',
    'AccessToken': accessToken,
    'placeId':tranPlaceId,
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
  
   //const tranPlaceId='6554d12d2c07dd4087e973d1';
 
  const handleFormSubmit = (event) => {
    event.preventDefault();
    let newData = {...formData, tranPlaceId: tranPlaceId}
    console.log(typeof newData);
    console.log(newData,tranPlaceId);

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
    
    axios.post("http://localhost:1406/v1/tranEmployee/order", newData,  headers  )
    .then(res => {
      
      console.log(res);
      console.log('Đã tạo đơn hàng thành công:', res.data);
      setShowForm(false);
      console.log('Đã tạo đơn hàng thành công');
      console.log('API Response:', res);

      // Kiểm tra mã phản hồi từ máy chủ
      console.log('Status Code:', res.status);
  
      // Kiểm tra dữ liệu trả về từ máy chủ
      console.log('Response Data:', res.data);
    })
    .catch(error => {
      // Xử lý lỗi
      console.error('API Error:', error);
  
      // Kiểm tra mã phản hồi từ máy chủ khi xảy ra lỗi
      if (error.response) {
        console.log('Error Response Data:', error.response.data);
        console.log('Error Status Code:', error.response.status);
      }
  
      console.log('Không thành công');
    });
    
  };

  const handleLogout = () => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    window.localStorage.removeItem('userRole');
    window.location.href = '/';
  };

  useEffect(() => {
    
    getAllOrders();
  }, []);
  const getOrderID='6554d12d2c07dd4087e973d1';

  const getAllOrders = async () => {
    try {
      axios.get('http://localhost:1406/v1/tranEmployee/allInOrders',{headers})
      .then(
        res=>{
          setAllOrders(res.data);
        }
      )
      /*const response = await axios.get('', 
      {
        headers
      }
      );*/
      
      /*
      console.log(response.data);*/
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  
 
  

  const sendToGather = async () => {
    try {
      // Thay đổi URL API theo đúng địa chỉ của bạn
      const response = await axios.post('http://localhost:1406/v1/tranEmployee/recGather', {
        placeId: '6554d12d2c07dd4087e973d1',
        orders: allOrders,
      });

      console.log('Result from sending to gather:', response.data);
    } catch (error) {
      console.error('Error sending to gather:', error);
    }
  };

  const handleUpdateOrder = async (orderId, newStatus) => {
    try {
      
      const response = await axios.patch(`http://localhost:1406/v1/tranEmployee/update/${orderId}`, { newStatus }, headers);

      console.log('API Response:', response.data);

      
      console.log('Status Code:', response.status);

      
      console.log('Response Data:', response.data);

      
      getAllOrders();
    } catch (error) {
      console.error('API Error:', error);

    }
  };
  
  const handleUpdateOrderClick = (orderId, newStatus) => {
    handleUpdateOrder(orderId, newStatus);
  };

  const handleConfirmGathering=()=>{
    setShowAllGatherOrders(true);
  }
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

                    <MenuItem onClick={handleConfirmGathering}>
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
                  <div>
      
    </div>
   
                </form>


              </div>
            </Grid>
          )}

          {showAllGatherOrders&&(
             <Grid item xs={9} style={{ padding: '16px' }}>
             <div style={{ backgroundColor: '#fff', padding: '16px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
               <Typography variant="h6" style={{ marginBottom: '16px', textAlign: 'center' ,fontSize: '18px',}}>Hàng về từ điểm tập kết</Typography>
              
               <div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px',tableLayout: 'fixed',backgroundColor:'#EEEEEE' ,}}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#007bff', color: '#fff' ,width: '50px'}}>STT</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#007bff', color: '#fff' }}>Tên</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#007bff', color: '#fff' }}>Email người gửi</th>
            <th style={{ border: '1px solid #ddd', padding: '8px',backgroundColor: '#007bff', color: '#fff' }}>Email người nhận</th>
            <th style={{ border: '1px solid #ddd', padding: '8px',backgroundColor: '#007bff', color: '#fff' }}>Ngày gửi</th>
          </tr>
        </thead>
        <tbody>
        {allOrders.map((order, index) => (
              <tr key={index} style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#fff' }}>
                <td style={{textAlign: 'center'}}>{index + 1}</td>
                <td style={{textAlign: 'center'}}>{order.name}</td>
                <td style={{textAlign: 'center'}}>{order.senderEmail}</td>
                <td style={{textAlign: 'center'}}>{order.receiverEmail}</td>
                <td style={{textAlign: 'center'}}>{order.dateSend}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
                
                 <div style={{ marginTop: '16px', textAlign: 'right' }}>
                 <Button type="button" variant="contained" onClick={sendToGather}>Gửi vào kho </Button>
                   <Button type="button" variant="contained" onClick={handleFormClose}>Đóng</Button>

                 </div>
                 <div>
   </div>



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
