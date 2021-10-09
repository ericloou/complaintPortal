import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";

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

  function handleSubmit() {
    routeChange();
  };

  return (
    <div className="loginMain">
        <Button
          onClick={handleOpen}
          style={{ float: "right" }}
          sx={{ py: 2, pr: 5 }}
        >
          Admin Login
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form onSubmit={handleSubmit}>
          <Box sx={style}>
            <div className="login">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Department Admin login
            </Typography>
            <label> Login ID </label>
            <input type="text" required />
            <label> Password </label>
            <input type="password" required />
            <Box sx={{ py: 2 }}>
            <Button type ="submit" variant="contained">
              Login
            </Button>
            </Box>
            </div>
          </Box>
          </form>
        </Modal>
        </div>
  );
}
