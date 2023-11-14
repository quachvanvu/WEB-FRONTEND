import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BorderStyleSharp } from '@mui/icons-material';
import Boss from './pages/Boss';
import LoginPage from './pages/LoginPage'
import Transaction from './pages/Transaction';
import Gathering from './pages/Gathering';
import Customer from './pages/Customer'
import StaffGathering from './pages/StaffGathering';
import StaffTransaction from './pages/StaffTransaction';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/boss" element={<Boss />} />
      <Route path="/transaction" element={<Transaction />} />
      <Route path="/gathering" element={<Gathering />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/staffgathering" element={<StaffGathering />} />
      <Route path="/stafftransaction" element={<StaffTransaction />} />
    </Routes>
  </BrowserRouter>
    
    </div>
  );
}

export default App;
