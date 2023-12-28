import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, ListItemIcon, ListItemText, Box, Grid } from '@mui/material';
import { Home, AccountCircle, Storage, Gavel, ExitToApp } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';



function StaffGathering() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [xacnhanAnchorEl, setXacnhanAnchorEl] = React.useState(null);
  const [taodonAnchorEl, setTaodonAnchorEl] = React.useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showFormGhinhan, setShowFormGhinhan] = useState(false);

  const [allTranOrders, setAllTranOrders] = useState([]);
  const [showAllOrderFromTran, setShowAllOrderFromTran] = useState(false);
  const [allGatherOrders, setAllGatherOrders] = useState([]);
  const [showAllOrderFromGather, setShowAllOrderFromGather] = useState(false);
  const [allSendToGatherOrders, setAllSendToGatherOrders] = useState([]);
  const [showAllSendToGatherOrders, setShowAllSendToGatherOrders] = useState(false);
  const [allSendToTranOrders, setAllSendToTranOrders] = useState([]);
  const [showAllSendToTranOrders, setShowAllSendToTranOrders] = useState(false);
  const [currentMenuItem, setCurrentMenuItem] = useState(null);

  const accessToken = window.localStorage.getItem('accessToken');

  const headers = {
    'Content-Type': 'application/json',
    'AccessToken': accessToken,
  };

  const userRole = window.localStorage.getItem('userRole');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleXacnhanMenuOpen = (event) => {
    setXacnhanAnchorEl(event.currentTarget);
    setTaodonAnchorEl(null);
    setShowAllOrderFromTran(false);
    setShowAllOrderFromGather(false);
    setShowAllSendToGatherOrders(false);
    setShowAllSendToTranOrders(false);
  };

  const handleTaodonMenuOpen = (event) => {
    setTaodonAnchorEl(event.currentTarget);
  setXacnhanAnchorEl(null);
  setShowAllOrderFromTran(false);
  setShowAllOrderFromGather(false);
  setShowAllSendToGatherOrders(false);
  setShowAllSendToTranOrders(false);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubMenuClose = () => {
    setXacnhanAnchorEl(null);
    setTaodonAnchorEl(null);
  };
  
  const handleLogout = () => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    window.localStorage.removeItem('userRole');
    window.location.href = '/';
  };

  const handleFormClose = () => {
    setShowFormGhinhan(false);
   
  };


const getAllOrdersFromTran = async () => {
  try {
    const response = await axios.get('http://localhost:1406/v1/gatherEmployee/orderFromTran', { headers });
    setAllTranOrders(response.data);
    console.log('Data from server:', response);
    
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
  setShowAllOrderFromTran(true);
  setShowAllOrderFromGather(false);
  setShowAllSendToGatherOrders(false);
  setAllSendToTranOrders(false);
};


const sendTranOrderToDepot = async () => {
  try {
   
    const response = await axios.post('http://localhost:1406/v1/gatherEmployee/toGather', allTranOrders , { headers });
    setAllTranOrders([])
    console.log('Result from sending to gather:', response.data);
  } catch (error) {
    console.error('Error sending to gather:', error);
  }

};



const getAllOrdersFromGather = async () => {
  try {
    const response = await axios.get('http://localhost:1406/v1/gatherEmployee/confirmToEnd', { headers });
    setAllGatherOrders(response.data);
    console.log('Data from server:', response);
    
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
  
  setShowAllOrderFromTran(false);
  setShowAllOrderFromGather(true);
  setShowAllSendToGatherOrders(false);
  setAllSendToTranOrders(false);
};


const sendGatherOrderToDepot = async () => {
  try {
   
    const response = await axios.post('http://localhost:1406/v1/gatherEmployee/inGather', allGatherOrders , { headers });
    setAllGatherOrders([])
    console.log('Result from sending to gather:', response.data);
  } catch (error) {
    console.error('Error sending to gather:', error);
  }
};

const getAllSendToGatherOder = async () => {
  try {
    const response = await axios.get('http://localhost:1406/v1/gatherEmployee/orderToEnd', { headers });
   setAllSendToGatherOrders(response.data);
    console.log('Data from server:', response);
    
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
  setShowAllOrderFromTran(false);
  setShowAllOrderFromGather(false);
  setShowAllSendToGatherOrders(true);
  setAllSendToTranOrders(false);
};

const sendOderToGather = async () => {
  try {
   
    const response = await axios.post('http://localhost:1406/v1/gatherEmployee/toEnd', allSendToGatherOrders , { headers });
    allSendToGatherOrders([])
    console.log('Result from sending to gather:', response.data);
  } catch (error) {
    console.error('Error sending to gather:', error);
  }
};

const getAllSendToTranOder = async () => {
  try {
    const response = await axios.get('http://localhost:1406/v1/gatherEmployee/allOrdersToTran', { headers });
   setAllSendToTranOrders(response.data);
    console.log('Data from server:', response);
    
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
  setShowAllOrderFromTran(false);
  setShowAllOrderFromGather(false);
  setShowAllSendToGatherOrders(false);
  setShowAllSendToTranOrders(true);
};

const sendOderToTransaction = async () => {
  try {
   
    const response = await axios.post('http://localhost:1406/v1/gatherEmployee/allOrdersToTran', allSendToTranOrders, { headers });
    setAllSendToTranOrders([])
    console.log('Result from sending to gather:', response.data);
  } catch (error) {
    console.error('Error sending to gather:', error);
  }
};

  //if (userRole === 'staffGathering') {
    return (
      <div>
        <AppBar position="static" 
        style={{ backgroundColor: '#007bff', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}
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
  
        <Grid container style={{ height : '91vh'}}>
          <Grid item xs={3} style={{ 
              backgroundColor: '#007bff', 
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', padding: '10px' }}
              >
          <nav>
            <ul>
              <li>
                <Button startIcon={<CheckCircleIcon />} onClick={handleXacnhanMenuOpen} 
                  style={{ color : '#fff', paddingTop : '30px'}}
                  >
                  Xác nhận
                </Button>

                <Menu
                  anchorEl={xacnhanAnchorEl}
                  open={Boolean(xacnhanAnchorEl)}
                  onClose={handleSubMenuClose}
                 
                >
                  <MenuItem  onClick={getAllOrdersFromTran}>
                    <ListItemIcon>
                      <Storage />
                    </ListItemIcon>
                    <ListItemText primary="Đơn hàng đi từ điểm giao dịch chuyển đến" />
                  </MenuItem>

                  <MenuItem onClick={getAllOrdersFromGather}>
                    <ListItemIcon>
                      <Gavel />
                    </ListItemIcon>
                    <ListItemText primary="Đơn hàng nhận về từ điểm tập kết khác" />
                  </MenuItem>
                </Menu>
              </li>
              <li>
                <Button startIcon={<AddCircleOutlineIcon />} onClick={handleTaodonMenuOpen}
                style={{ color : '#fff', paddingTop : '30px'}}
                >
                  Tạo đơn
                </Button>
                <Menu
                  anchorEl={taodonAnchorEl}
                  open={Boolean(taodonAnchorEl)}
                  onClose={handleSubMenuClose}
                >
                  <MenuItem onClick={getAllSendToGatherOder}>
                    <ListItemIcon>
                      <Storage />
                    </ListItemIcon>
                    <ListItemText primary="Chuyển hàng đến điểm tập kết đích" />
                  </MenuItem>
                  <MenuItem onClick={getAllSendToTranOder}>
                    <ListItemIcon>
                      <Gavel />
                    </ListItemIcon>
                    <ListItemText primary="Chuyển hàng đến điểm giao dịch đích" />
                  </MenuItem>
                </Menu>
              </li>
              <li>
              <Button startIcon={<ExitToApp />} onClick={handleLogout} 
              style={{ color : '#fff', paddingTop : '30px', marginTop : '380px'}}
              >
              Đăng xuất
            </Button>
              </li>
            </ul>
          </nav>
          </Grid>


          {showAllOrderFromTran&&(
             <Grid item xs={9} style={{ padding: '16px' }}>
             <div style={{ backgroundColor: '#fff', padding: '16px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
               <Typography variant="h6" style={{ marginBottom: '16px', textAlign: 'center' ,fontSize: '20px',fontFamily:'bold'}}>HÀNG VỀ TỪ ĐIỂM GIAO DỊCH</Typography>
              
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
        {allTranOrders.length!==0 && allTranOrders.map((order, index) => (
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
                 <Button type="button" variant="contained" onClick={sendTranOrderToDepot}>Gửi vào kho </Button>
                   <Button type="button" variant="contained" onClick={handleFormClose}>Đóng</Button>

                 </div>
                 <div>
   </div>
             </div>
           </Grid>
          )}


    {showAllOrderFromGather&&(
             <Grid item xs={9} style={{ padding: '16px' }}>
             <div style={{ backgroundColor: '#fff', padding: '16px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
               <Typography variant="h6" style={{ marginBottom: '16px', textAlign: 'center' ,fontSize: '20px',fontFamily:'bold'}}>HÀNG VỀ TỪ ĐIỂM TẬP KẾT</Typography>
              
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
        {allGatherOrders.length!==0 && allGatherOrders.map((order, index) => (
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
                 <Button type="button" variant="contained" onClick={sendGatherOrderToDepot}>Gửi vào kho </Button>
                   <Button type="button" variant="contained" onClick={handleFormClose}>Đóng</Button>

                 </div>
                 <div>
   </div>
             </div>
           </Grid>
          )}


{showAllSendToGatherOrders&&(
             <Grid item xs={9} style={{ padding: '16px' }}>
             <div style={{ backgroundColor: '#fff', padding: '16px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
               <Typography variant="h6" style={{ marginBottom: '16px', textAlign: 'center' ,fontSize: '20px',fontFamily:'bold'}}>HÀNG GỬI ĐẾN ĐIỂM TẬP KẾT</Typography>
              
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
        {allSendToGatherOrders.length!==0 && allSendToGatherOrders.map((order, index) => (
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
                 <Button type="button" variant="contained" onClick={sendOderToGather}>Gửi đến điểm tập kết </Button>
                   <Button type="button" variant="contained" onClick={handleFormClose}>Đóng</Button>

                 </div>
                 <div>
   </div>
             </div>
           </Grid>
          )}

{showAllSendToTranOrders&&(
             <Grid item xs={9} style={{ padding: '16px' }}>
             <div style={{ backgroundColor: '#fff', padding: '16px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
               <Typography variant="h6" style={{ marginBottom: '16px', textAlign: 'center' ,fontSize: '20px',fontFamily:'bold',}}>HÀNG GỬI ĐẾN ĐIỂM GIAO DỊCH</Typography>
              
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
        {allSendToTranOrders.length!==0 && allSendToTranOrders.map((order, index) => (
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
                 <Button type="button" variant="contained" onClick={sendOderToTransaction}>Gửi đến điểm giao dịch </Button>
                   <Button type="button" variant="contained" onClick={handleFormClose}>Đóng</Button>

                 </div>
                 <div>
   </div>
             </div>
           </Grid>
          )}

          </Grid>
      </div>
    );
  //} else {
    //return <div>You are not allow to this action</div>
  //}//
}

export default StaffGathering;
