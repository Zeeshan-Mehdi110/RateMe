import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material"
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useState } from "react";
import qrious from "qrious";

const EmployeeQRCode = ({ employeeId, name }) => {
  const [open, setOpen] = useState(false)
  const url = process.env.REACT_APP_BASE_URL + "employee/feedback/" + employeeId;
  const handleClose = () => {
    setOpen(false)
  }
  const createQRCode = () => {
    setOpen(true)
    setTimeout(() => {
      const qr = new qrious({
        element: document.getElementById("qr-code"),
        value: url,
        size: 200,
        padding: 12
      })
      document.getElementById("download-qr-code").setAttribute("href", qr.toDataURL())
    }, 300);
  }
  return (
    <>
      <IconButton onClick={createQRCode} ><QrCodeIcon /></IconButton>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>
          {name} - QR Code
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }} >
          <canvas id="qr-code" ></canvas>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }} >

          <Button component={"a"} id="download-qr-code" download={`${name} - qrcode.png`} variant="contained" color="primary">Download</Button>
          <Button onClick={handleClose} autoFocus >Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EmployeeQRCode