import React, { useState, useEffect } from 'react';
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
import { async } from 'q';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function StaffTransaction() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [taodonAnchorEl, setTaodonAnchorEl] = useState(null);
  const [xacnhanAnchorEl, setXacnhanAnchorEl] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showFormGhinhan, setShowFormGhinhan] = useState(false);
  let [outOrders, setOutOrders] = useState([]);
  let [showFormHangGuiTapket, setShowFormHangGuiTapket] = useState(false);
  let [toUserOrders, setToUserOrders] = useState([]);
  const [showFormtoUserOrders, setShowFormtoUserOrders] = useState(false);
  const [statisticalData, setStatisticalData] = useState(null);
  const [showStatisticalChart, setShowStatisticalChart] = useState(false);

  const [ginhanAnchorEl, setGinhanAnchorEl] = useState(null);
  const [thongkeAnchorEl, setThongkeAnchorEl] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [showAllGatherOrders, setShowAllGatherOrders] = useState(false);



  const accessToken = window.localStorage.getItem('accessToken');
  const placeId = window.localStorage.getItem('placeId');

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
    setShowFormGhinhan(true);
    setShowFormHangGuiTapket(false);
    setShowStatisticalChart(false);
    setShowFormtoUserOrders(false);
  };

  const handleTaodonMenuOpen = async (event) => {
    setTaodonAnchorEl(event.currentTarget);
    setShowFormGhinhan(false);
    setShowStatisticalChart(false);
    setShowAllGatherOrders(false);
    setShowFormtoUserOrders(false);
  };


const handlThongkeMenuOpen = (event) => {
  setThongkeAnchorEl(event.currentTarget);
  setShowFormGhinhan(false);
  setShowStatisticalChart(true);
  setShowFormHangGuiTapket(false);
  setShowAllGatherOrders(false);
  setShowFormtoUserOrders(false);

};

var handleMenuClose = () => {
  setAnchorEl(null);
};

var handleSubMenuClose = () => {
  setGinhanAnchorEl(null);
  setTaodonAnchorEl(null);
  setXacnhanAnchorEl(null);
  setThongkeAnchorEl(null);
  setTaodonAnchorEl(null);
  setXacnhanAnchorEl(null);
};

var handlePrintReceipt = () => {
  setShowReceipt(true);
};

var handlePrintClose = () => {
  setShowReceipt(false);
};

var handleInputChange = (field) => (event) => {
  setFormData({ ...formData, [field]: event.target.value });
};

// const handleUpdateOrderClick = (orderId, newStatus) => {
//   handleUpdateOrder(orderId, newStatus);
// };

const handleConfirmGathering=()=>{
  setShowAllGatherOrders(true);
  setShowFormGhinhan(false);
  setShowStatisticalChart(false);
  setShowFormHangGuiTapket(false);
  setShowFormtoUserOrders(false);

}

const handleStatisticalClick = () => {
  setShowAllGatherOrders(false);
  setShowFormGhinhan(false);
  setShowStatisticalChart(true);
  setShowFormHangGuiTapket(false);
  setShowFormtoUserOrders(false);

};


const handlXacnhanMenuOpen = (event) => {
  setXacnhanAnchorEl(event.currentTarget);
};




  const handleHangGuiTapketMenuOpen = async (event) => {
    try {
      await axios.get('http://localhost:1406/v1/tranEmployee/allOutOrders', {headers})
        .then(res => {
          setOutOrders(res.data)
          setShowFormHangGuiTapket(true);
          setShowFormtoUserOrders(false);
        }
        );
      
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
      // Xử lý lỗi theo ý muốn của bạn
    }
  };

  const getHangGuiTayNguoiNhan = async (event) => {
    try {
      await axios.get('http://localhost:1406/v1/tranEmployee/allToUser', {headers})
        .then(res => {
          setToUserOrders(res.data)
          setShowFormtoUserOrders(true);
          setShowFormHangGuiTapket(false)
          console.log(res.data);
        }
        );
      
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
      // Xử lý lỗi theo ý muốn của bạn
    }
  }

  const sendOrdersToGatherPlace = async () => {
    try {
      const response = await axios.post(
        'http://localhost:1406/v1/tranEmployee/toGather', outOrders, {headers}
      );
  
      console.log(response.data);
      // Hiển thị thông báo thành công, có thể sử dụng thư viện thông báo hoặc cách khác
      // alert('Gửi đơn hàng thành công');
      toast.success('Gửi đơn hàng thành công')
  
      // Xóa bảng bằng cách cập nhật state
      setOutOrders([]);
    } catch (error) {
      console.error('Lỗi khi gửi đơn hàng đến điểm tập kết:', error);
      // Xử lý lỗi theo cách của bạn
    }
  };

  const sendOrdersToUser = async (orderId) => {
    try {
      console.log(placeId, orderId);
      await axios.post(
        'http://localhost:1406/v1/tranEmployee/toUser', {orderId: orderId}, {headers}
      ).then(res => {
        console.log(res.data);
      toast.success('Gửi đơn hàng thành công')
      setToUserOrders([]);
      })
      // setToUserOrders(toUserOrders);
      // Xóa bảng bằng cách cập nhật state
    } catch (error) {
      console.error('Lỗi khi gửi đơn hàng đến người nhận:', error);
      toast.error('Gửi đơn hàng thất bại')
      // Xử lý lỗi theo cách của bạn
    }
  };

  const tableCellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };


  useEffect(() => {
    async function fetchStatisticalData() {
      try {
        const response = await axios.get(
          'http://localhost:1406/v1/tranEmployee/statistical',
          {
            headers
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
        { name: 'Success', status: statisticalData.success },
        { name: 'Failed', status: statisticalData.failed },
      ];

      return (
        <ResponsiveContainer width="30%" height={600}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis tickCount={statisticalData.success + statisticalData.failed} />
            <Tooltip />
            <Legend />
            <Bar dataKey="status" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      );
    }
    return null;
  };

  

  const handleFormClose = () => {
    setShowFormGhinhan(false);
    setFormData({
      name: '',
      senderEmail: '',
      receiverEmail: ''
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let newData = {...formData, placeId: placeId}

    await axios.post('http://localhost:1406/v1/tranEmployee/order', newData, {headers})
    .then(res => {
      console.log(res.data)
      if (typeof res.data === 'object') {
        toast.success("Ghi nhận thành công")
        setFormData({
          name: '',
          senderEmail: '',
          receiverEmail: ''
        });
      }
    })
    .catch (err => {
      console.log(err)
      toast.error("Ghi nhận thất bại")
    })

  };

const getAllOrders = async () => {
  try {
    await axios.get('http://localhost:1406/v1/tranEmployee/allInOrders', {headers})
    .then(res => setAllOrders(res.data));
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};


const sendToGather = async () => {
  try {
    const response = await axios.post('http://localhost:1406/v1/tranEmployee/recGather', allOrders , { headers });
    setAllOrders([])
    console.log('Result from sending to gather:', response.data);
  } catch (error) {
    console.error('Error sending to gather:', error);
  }
};


  const handleLogout = () => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    window.localStorage.removeItem('userRole');
    window.location.href = '/';
  };
   //if (userRole === 'staffTransaction') {
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
                    <MenuItem onClick={handleHangGuiTapketMenuOpen}>
                      <ListItemIcon>
                        <Storage />
                      </ListItemIcon>
                      <ListItemText primary="Hàng gửi đến điểm tập kết" />
                    </MenuItem>
                    <MenuItem onClick={getHangGuiTayNguoiNhan}>
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
                  <Menu anchorEl={xacnhanAnchorEl} open={Boolean(xacnhanAnchorEl)} onClose={handleSubMenuClose} onClick={getAllOrders}>

                    <MenuItem onClick={handleConfirmGathering}>
                      <ListItemIcon>
                        <Storage />
                      </ListItemIcon>
                      <ListItemText primary="Hàng về từ điểm tập kết" />
                    </MenuItem>
                  </Menu>
                </li>
                <li>
                  <Button startIcon={<Assessment />} onClick={handleStatisticalClick} style={{ color: '#fff', paddingTop: '30px' }}>
                    Thống kê
                  </Button>
                </li>
                <li>
                  <Button startIcon={<PrintIcon />} onClick={handlePrintReceipt} style={{ color: '#fff', paddingTop: '30px' }}>
                    Giấy Biên Nhận
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

          {showFormGhinhan && (
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
        {allOrders.length!==0 && allOrders.map((order, index) => (
              <tr key={index} style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#fff' }}>
                <td style={{textAlign: 'center'}}>{index + 1}</td>
                <td style={{textAlign: 'center'}}>{order.name}</td>
                <td style={{textAlign: 'center'}}>{order.senderEmail}</td>
                <td style={{textAlign: 'center'}}>{order.receiverEmail}</td>
                <td style={{textAlign: 'center'}}>{order.dateSend.toLocaleString()}</td>
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
          
          {showFormHangGuiTapket && (
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
              {outOrders.length !== 0 && outOrders.map((order) => (
                <tr key={order._id} style={{ ':hover': { background: '#f5f5f5' } }}>
                  <td style={tableCellStyle}>{order.name}</td>
                  <td style={tableCellStyle}>{order.status}</td>
                  <td style={tableCellStyle}>{order.dateSend.toLocaleString()}</td>
                  <td style={tableCellStyle}>{order.senderEmail}</td>
                  <td style={tableCellStyle}>{order.receiverEmail}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button onClick={sendOrdersToGatherPlace} variant="contained" color="primary">
            Gửi đơn hàng đến điểm tập kết
          </Button>
            </div>
          </Grid>
          )}

          {showFormtoUserOrders && (
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
              {toUserOrders.length !== 0 && toUserOrders.map((order) => (
                <tr key={order._id} style={{ ':hover': { background: '#f5f5f5' } }}>
                  <td style={tableCellStyle}>{order.name}</td>
                  <td style={tableCellStyle}>{order.status}</td>
                  <td style={tableCellStyle}>{order.dateSend.toLocaleString()}</td>
                  <td style={tableCellStyle}>{order.senderEmail}</td>
                  <td style={tableCellStyle}>{order.receiverEmail}</td>
                  <td style={tableCellStyle}>{<Button onClick={() => sendOrdersToUser(order._id)} variant="contained" color="primary">
                  Gửi
                </Button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
            </div>
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

        {showReceipt && <ReceiptComponent onClose={handlePrintClose} />}
      </div>
    );
   //} else {
    //return <div>You are not allow to this action</div>
   //}
}

export default StaffTransaction;