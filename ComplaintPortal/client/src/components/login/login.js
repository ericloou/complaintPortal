import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { BrowserRouter, Route, Link, useHistory } from "react-router-dom";
// import Complaint from "../showComplaints/showComplaints.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const history = useHistory();

  const routeChange = () => {
    let path = `/adminhome`;
    history.push(path);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Admin Login</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Department Admin login
          </Typography>
          <TextField
            sx={{ pb: 2 }}
            required
            id="outlined-required"
            label="Required"
            defaultValue="Login ID"
          />
          <TextField
            sx={{ pr: 5 }}
            required
            id="outlined-required"
            label="Required"
            defaultValue="Password"
          />
          <Button variant="contained" onClick={routeChange}>
            Login
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
