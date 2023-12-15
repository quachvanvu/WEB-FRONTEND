import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from '@mui/material';

const ReceiptComponent = ({ onClose }) => {
  const [receiptInfo, setReceiptInfo] = useState({
    senderName: '',
    senderAddress: '',
    senderPhoneNumber: '',
    receiverName: '',
    receiverAddress: '',
    receiverPhoneNumber: '',
    itemType: '',
    weight: '',
    quantity: '',
    // Thêm các trường thông tin khác nếu cần thiết
  });

  const handleChange = (field) => (event) => {
    setReceiptInfo({ ...receiptInfo, [field]: event.target.value });
  };

  const handlePrint = () => {
    // Thực hiện logic in giấy biên nhận ở đây (ví dụ: sử dụng window.print())
    window.print();

    // Sau khi in xong, đóng form
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>In Giấy Biên Nhận</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thông Tin Người Gửi</TableCell>
                <TableCell>Thông Tin Người Nhận</TableCell>
                <TableCell>Chi Tiết Hàng Hóa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField
                    label="Tên người gửi"
                    value={receiptInfo.senderName}
                    onChange={handleChange('senderName')}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Địa chỉ người gửi"
                    value={receiptInfo.senderAddress}
                    onChange={handleChange('senderAddress')}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Số điện thoại người gửi"
                    value={receiptInfo.senderPhoneNumber}
                    onChange={handleChange('senderPhoneNumber')}
                    fullWidth
                    margin="normal"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    label="Tên người nhận"
                    value={receiptInfo.receiverName}
                    onChange={handleChange('receiverName')}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Địa chỉ người nhận"
                    value={receiptInfo.receiverAddress}
                    onChange={handleChange('receiverAddress')}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Số điện thoại người nhận"
                    value={receiptInfo.receiverPhoneNumber}
                    onChange={handleChange('receiverPhoneNumber')}
                    fullWidth
                    margin="normal"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    label="Loại hàng"
                    value={receiptInfo.itemType}
                    onChange={handleChange('itemType')}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Khối lượng"
                    value={receiptInfo.weight}
                    onChange={handleChange('weight')}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Số lượng"
                    value={receiptInfo.quantity}
                    onChange={handleChange('quantity')}
                    fullWidth
                    margin="normal"
                  />
                  {/* Thêm các trường khác nếu cần thiết */}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePrint} color="primary">
          In
        </Button>
        <Button onClick={onClose} color="primary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReceiptComponent;
