import { useState, useEffect, React } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from "@mui/material/FormHelperText";
// import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { Container, AppBar } from "@material-ui/core";
import useStyles from "../../styles.js";
import { useHistory } from "react-router-dom";

export default function CreateComplaintForm() {
  const history = useHistory();

  const routeChange = () => {
    let path = `/`;
    history.push(path);
  };

  const minValue = 1;
  const maxValue = 999999;
  const [rng, setRng] = useState(1);

  const classes = useStyles();
  const [type, setType] = useState("");
  var [checked, setChecked] = useState(false);
  const [counter, setCounter] = useState(0);
  const [complaint, setComplaints] = useState({
    email: "",
    message: "",
    ticketNumber: 0,
  });
  //get persistent object from localStorage and parsing it in
  useEffect(() => {
    const data = localStorage.getItem("Total-Complaint");
    if (data) {
      setCounter(JSON.parse(data));
    }
  }, []);
  //set persistent object by converting into string and storing in localStorage
  useEffect(() => {
    localStorage.setItem("Total-Complaint", JSON.stringify(counter));
  });

  const handleChange = (event) => {
    setType(event.target.value);
    console.log(event.target.value);
  };

  const handleCheckbox = (event) => {
    setChecked(event.target.checked);
    console.log(checked);
  };

  const createComplaint = () => {
    axios.post("http://localhost:5000/complaints", complaint);
    window.location.reload(false); //refresh the entie page when submit button is clicked
  };

  function totalCount() {
    setCounter((currentCount) => currentCount + 1);
  }

  //generate ticket number upon click submit button
  function makeTicketNumber() {
    setRng(Math.floor(Math.random() * (maxValue - minValue + 1) + minValue));
    complaint.ticketNumber = { rng };
    setComplaints(...complaint, (ticketNumber) => ticketNumber);
  }
  function randomNumberGenerator() {
    setRng(Math.floor(Math.random() * (maxValue - minValue + 1) + minValue));
    // complaint.ticketNumber = rng;
  }

  function handleSubmit() {
    createComplaint();
    totalCount();
    makeTicketNumber();
    // randomNumberGenerator();
  }

  return (
    <>
      <div className="complaintHeader">
        <Box bgcolor="black">
          <img src="/images/MU_Logo.ico" alt="" />
          <Box>
            <Button onClick={routeChange}>Home</Button>
          </Box>
        </Box>
        <h2>Complaint Form</h2>
        {/* <h2>{rng}</h2> */}
      </div>

      <form onSubmit={handleSubmit}>
        <Box style={{ marginLeft: "auto" }} sx={{ pb: 2, pr: 2 }}>
          <Container maxWidth="lg">
            <div className="createComplain">
              {/* Create textfield for email with requirements */}
              <label>Email:</label>
              <input
                type="text"
                required
                value={complaint.email}
                onChange={(event) => {
                  setComplaints({ ...complaint, email: event.target.value });
                }}
              />
              {/* Create submit button with top and bottom padding*/}
            </div>
            <div className="createComplain2">
              <label>Message: </label>
              <textarea
                required
                value={complaint.message}
                onChange={(event) => {
                  setComplaints({ ...complaint, message: event.target.value });
                }}
              ></textarea>
              <Box sx={{ py: 2 }}>
                <Button
                  variant="contained"
                  type="submit"
                  endIcon={<SendIcon />}
                >
                  Submit
                </Button>
              </Box>
            </div>
          </Container>
        </Box>
      </form>
    </>
  );
}
