import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
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
  const classes = useStyles();
  const [type, setType] = useState("");
  var [checked, setChecked] = useState(false);
  const [counter, setCounter] = useState(0);
  const [complaint, setComplaints] = useState({
    name: "",
    idNum: "",
    email: "",
    message: "",
    ticketNumber: "",
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
    setComplaints(...complaint, (ticketNumber) => ticketNumber);
  }
  return (
    <>
      <Box bgcolor="black">
        <img src="/images/MU_Logo.ico" alt="" />
        <Box>
          <Button onClick={routeChange}>Home</Button>
        </Box>
      </Box>
      <h2>Complaint Form</h2>
      <Box style={{ marginLeft: "auto" }} sx={{ pb: 2, pr: 2 }}>
        <Container maxWidth="lg">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            validate
            autoComplete="off"
          >
            <div>
              {/* Create textfield for email with requirements */}
              <TextField
                required
                id="outlined-required"
                label="Email"
                value={complaint.email}
                onChange={(event) => {
                  setComplaints({ ...complaint, email: event.target.value });
                }}
              />
            </div>
          </Box>

          {/* Create multiline textfield to contain complaint/appeals messages */}
          <Box
            sx={{
              width: 500,
              height: 600,
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          >
            <TextField
              required
              fullWidth
              label="Message"
              id="Message"
              multiline
              style={{ width: "220%" }}
              rows={22}
              value={complaint.message}
              onChange={(event) => {
                setComplaints({ ...complaint, message: event.target.value });
              }}
            />
          </Box>

          {/* Create submit button with top and bottom padding*/}
          <Box sx={{ py: 2 }}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => {
                createComplaint();
                totalCount();
                makeTicketNumber();
              }}
            >
              Submit
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
