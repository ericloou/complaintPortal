import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "../loading.js";
import ErrorMessage from "../errorMessage.js";
import ReactDom from "react-dom";

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

export default function BasicModal(useHistory) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("LoginId:", username, "Password: ", password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/users/login",
        {
          username,
          password,
        },
        config
      );
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      window.location.reload(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
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
        
        <div className="load">
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          <Box style={{ marginLeft: "auto" }} sx={{ pb: 10, pr: 50 }}>
          {loading && <Loading />}
          </Box>
          <form onSubmit={handleSubmit}>
            <Box sx={style}>
              <div className="login">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Department Admin login
                </Typography>
                <label> Username </label>
                <input
                  type="text"
                  value={username}
                  placeholder="Enter Username"
                  onInput={(e) => setUserName(e.target.value)}
                  required
                />
                <label> Password </label>
                <input
                  type="password"
                  value={password}
                  placeholder="Enter Password"
                  onInput={(e) => setPassword(e.target.value)}
                  required
                />
                <Box sx={{ py: 2 }}>
                  <Button type="submit" variant="contained">
                    Login
                  </Button>
                </Box>
              </div>
            </Box>
          </form>
        </div>
      </Modal>
    </div>
  );
}
