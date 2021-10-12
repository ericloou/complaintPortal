import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Container, Grow, Grid } from "@material-ui/core";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";

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

export default function BasicTable() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [counter, setCounter] = useState(0);
  const [complaintList, setComplaintList] = useState([]);
  const [value, setValue] = React.useState(null);
  const [complaint, setComplaints] = useState({
    email: "",
    message: "",
    ticketNumber: 0,
    date: "",
  });

  const editComplaint = (id) => {
    axios.delete(`http://localhost:5000/complaints/${id}`).then(() => {
      axios.post("http://localhost:5000/complaints", complaint);
      window.location.reload(false);
    });
  };

  useEffect(() => {
    axios.get("http://localhost:5000/complaints").then((allComplaints) => {
      setComplaintList(allComplaints.data);
      // console.log(allComplaints.data);
    });
  }, []);

  //get persistent object from localStorage and parsing it in
  useEffect(() => {
    const data = localStorage.getItem("Total-Complaint");
    if (data) {
      setCounter(JSON.parse(data));
    }
  }, []);

  const history = useHistory();

  const routeChange = () => {
    let path = `/adminhome`;
    history.push(path);
  };

  function handleSubmit() {
    routeChange();
    editComplaint();
  }

  return (
    <>
      <div className="showComplaintHeader">
        <Box bgcolor="black">
          <img src="/images/MU_Logo.ico" alt="" />
          <Box>
            <Button variant="text" onClick={routeChange}>
              Back
            </Button>
          </Box>
        </Box>
        <h2>Total Number of complaints: {counter}</h2>
        <h2>All Complaints</h2>
      </div>
      <Box style={{ marginLeft: "auto" }} sx={{ pb: 2, pr: 2 }}></Box>
      <Grow in>
        <Container maxWidth="lg">
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
          ></Grid>
          <Grid item xs={12} sm={10}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Ticket Number</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Action</TableCell>

                    {/* <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Student/Staff Number</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {complaintList.map((complaint, key) => (
                    <TableRow
                      key={key}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {complaint.ticketNumber}
                      </TableCell>
                      <TableCell align="left">{complaint.message}</TableCell>
                      <TableCell align="left">{complaint.date}</TableCell>
                      <TableCell align="left">
                        <IconButton
                          color="primary"
                          aria-label="edit picture"
                          component="span"
                          onClick={handleOpen}
                        >
                          <EditIcon />
                        </IconButton>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <form onSubmit={handleSubmit}>
                            <Box sx={style}>
                              <div className="complaintModal">
                                <Typography
                                  id="modal-modal-title"
                                  variant="h6"
                                  component="h2"
                                >
                                  Editing
                                </Typography>
                                <text>
                                  Ticket Number:{complaint.ticketNumber}
                                </text>
                                <text>Message: {complaint.message} </text>
                                <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                >
                                  <DatePicker
                                    required
                                    label="Select a date"
                                    value={value}
                                    onChange={(newValue) => {
                                      setValue(newValue);
                                      setComplaints({
                                        ...complaint,
                                        date: newValue,
                                      });
                                    }}
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                  />
                                </LocalizationProvider>
                                <Box sx={{ py: 2 }}>
                                  <Button type="submit" variant="contained">
                                    Save
                                  </Button>
                                </Box>
                              </div>
                            </Box>
                          </form>
                        </Modal>
                      </TableCell>
                      {/* <TableCell align="right">{complaint.type}</TableCell>
                    <TableCell align="right">{complaint.name}</TableCell>
                    <TableCell align="right">{complaint.idNum}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Container>
      </Grow>
    </>
  );
}
