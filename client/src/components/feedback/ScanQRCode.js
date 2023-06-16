import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material"
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
const ScanQRCode = ({ employeeId, name }) => {
  const [open, setOpen] = useState(false)
  const navigator = useNavigate()
  const handleClose = () => {
    setOpen(false)
  }

  function onScanSuccess(decodedText, decodedResult) {

    if (decodedText.includes("employee/feedback")) {
      let url = decodedText.replace(process.env.REACT_APP_BASE_URL, "/")
      navigator(url)
    }
  }

  function onScanFailure(error) {
  }

  const scanQRCode = () => {
    setOpen(true)
    setTimeout(() => {
      let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false);
      html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    }, 300);
  }
  return (
    <>
      <Button sx={{ mx: 2 }} variant="contained" onClick={scanQRCode} color="primary" startIcon={<QrCodeIcon />} >Scan QR Code</Button>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>
          Scan Employee QR Code
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }} >
          <div id="reader" width="600px"></div>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }} >
          <Button onClick={handleClose} autoFocus >Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ScanQRCode