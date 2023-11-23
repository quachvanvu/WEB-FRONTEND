import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import magicLogo from '../images/magicLogo.png';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [formError, setFormError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setEmailError(!emailPattern.test(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleRegisterClick = () => {
    setIsRegistering(true);
  };

  const handleLoginFormSubmit =async (e) => {
    e.preventDefault();
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));
    if (emailError) {
      setFormError("Email không hợp lệ");
    } else if (email && password) {
      //setFormError("");
      try {
        
        const response = await axios.post('http://localhost:1406/v1/auth/login', {
          email: email,
          password: password});
        console.log(response.data)
        
        const token = response.data.accessToken; 
        localStorage.setItem('accessToken', token);

        setFormError("Đăng nhập thành công");
        //console.log(response.data);
        window.location.href = '/customer'; 
      } catch (error) {
        console.error(error);
        setFormError("Đăng nhập thất bại");
      }
    } else {
      setFormError("Vui lòng nhập đầy đủ thông tin");
    }
  };

  const handleRegisterFormSubmit =async (e) => {
    e.preventDefault();
    if (
      emailError ||
      !email ||
      !password ||
      !name ||
      !address ||
      !phoneNumber
    ) {
      setFormError("Vui lòng kiểm tra thông tin đăng ký");
    } else {
 try {
      
      const response = await axios.post('http://localhost:1406/v1/auth/register', {
        email,
        password,
        name,
        address,
        phoneNumber,
        role: "user"
      });
    
 // Hiển thị thông báo đăng ký thành công
 console.log("Dữ liệu đăng ký đã được gửi thành công:", response.data);
 setFormError(response.data.message);


 setFormError("Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.");
 const token = response.data.accessToken;
      localStorage.setItem('accessToken', token);

      localStorage.setItem('registeredUser', JSON.stringify({
        email,
        name,
        address,
        phoneNumber,
      }));

 localStorage.setItem('registeredUser', JSON.stringify({
  email,
        name,
        address,
        phoneNumber,
}));

 // Reset các trường nhập liệu
 setEmail("");
 setPassword("");
 //setConfirmPassword("");
 setName("");
 setAddress("");
 setPhoneNumber("");
 setEmailError(false);
 setIsRegistering(false); // Đặt lại trạng thái đăng ký

    } catch (error) {
      console.error(error);
      setFormError("Đăng ký thất bại");
    }
      
    }
  };

  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          height: "70%",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={6}
            style={{
              backgroundImage: `url(${magicLogo})`,
              backgroundSize: "cover",
              paddingRight : "10px"
            }}
          ></Grid>
          <Grid item xs={6} style={{ paddingTop: '30px' }}>
            <div style={{ padding: "16px" }}>
              <form
                onSubmit={
                  isRegistering
                    ? handleRegisterFormSubmit
                    : handleLoginFormSubmit
                }
              >
                <TextField
                  style={{ marginBottom: "10px" }}
                  label="Email"
                  fullWidth
                  value={email}
                  onChange={handleEmailChange}
                  error={emailError}
                  helperText={emailError ? "Email không hợp lệ" : ""}
                />
                <TextField
                  style={{ marginBottom: "10px" }}
                  label="Mật khẩu"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={handlePasswordChange}
                />
                {isRegistering && (
                  <>
                    <TextField
                      style={{ marginBottom: "10px", width: "100%" }}
                      label="Họ và tên"
                      fullWidth
                      value={name}
                      onChange={handleNameChange}
                    />
                    <TextField
                      style={{ marginBottom: "10px", width: "100%" }}
                      label="Địa chỉ"
                      fullWidth
                      value={address}
                      onChange={handleAddressChange}
                    />
                    <TextField
                      style={{ marginBottom: "10px", width: "100%" }}
                      label="Số điện thoại"
                      fullWidth
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                    />
                  </>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  {isRegistering ? "Đăng ký" : "Đăng nhập"}
                </Button>
                <p style={{ textAlign: "center" }}></p>
              </form>
              {formError && (
                <Typography variant="body2" color="error" align="center">
                  {formError}
                </Typography>
              )}
              {!isRegistering && (
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={handleRegisterClick}
                >
                  Đăng ký
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default LoginPage;