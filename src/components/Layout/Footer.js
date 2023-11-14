import React from 'react';
import { Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="x1">
        <Typography variant="body2" color="textSecondary" align="center">
          Hệ thống quản lý chuyển phát <strong>Magicpost</strong>
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          &copy; {new Date().getFullYear()} Magicpost. All rights reserved.
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          <Link color="inherit" href="#">
            Chính sách bảo mật
          </Link>{' '}
          |{' '}
          <Link color="inherit" href="#">
            Điều khoản sử dụng
          </Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
