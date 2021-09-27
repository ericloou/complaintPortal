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

export default function CreateComplaintForm() {
  const [type, setType] = useState("");
  var [checked, setChecked] = useState(false);
  const [counter, setCounter] = useState(0);
  const [complaint, setComplaints] = useState({
    type: "",
    name: "",
    idNum: "",
    email: "",
    message: "",
    ticketNumber: 0,
  });
  //get persistent object from localStorage and parsing it in
  useEffect(() => {
    const data = localStorage.getItem("Total-Count");
    if (data) {
      setCounter(JSON.parse(data));
    }
  }, []);
  //set persistent object by converting into string and storing in localStorage
  useEffect(() => {
    localStorage.setItem("Total-Count", JSON.stringify(counter));
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
    setComplaints(...complaint, (ticketNumber) => ticketNumber + 1);
  }
  return (
    <>
      <h2>Complaint Form</h2>
      <Box>
        {/* Create anoymous checkbox */}
        <FormControlLabel
          control={<Checkbox onChange={handleCheckbox} checked={checked} />}
          label="Anonymous"
        />

        {/* Create drop down list for complainttypes */}
        <FormControl required sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-required-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={complaint.type}
            label="Type *"
            onChange={(handleChange) => {
              setComplaints({ ...complaint, type: handleChange.target.value });
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Complaint">Complaint</MenuItem>
            <MenuItem value="Appeal">Appeal</MenuItem>
            <MenuItem value="Feedback">Feedback</MenuItem>
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>
      </Box>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          {/* Ternary operator to display textfield for name */}
          {checked ? (
            <TextField
              disabled
              id="outlined-required"
              label="Disabled"
              value="Anoymous"
              onChange={() => {
                setComplaints({ ...complaint, name: "Anoymous" });
              }}
            />
          ) : (
            <TextField
              required
              id="outlined-disabled"
              label="Name"
              value={complaint.name}
              onChange={(event) => {
                setComplaints({ ...complaint, name: event.target.value });
              }}
            />
          )}

          {/* Ternary operator to display textfield for student/staff number */}
          {checked ? (
            <TextField
              disabled
              id="outlined-required"
              label="Disabled"
              defaultValue="*******"
            />
          ) : (
            <TextField
              required
              id="outlined-disabled"
              label="Student/Staff Number"
              value={complaint.idNum}
              onChange={(event) => {
                setComplaints({ ...complaint, idNum: event.target.value });
              }}
            />
          )}

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
          style={{ width: "100%" }}
          rows={25}
          value={complaint.message}
          onChange={(event) => {
            setComplaints({ ...complaint, message: event.target.value });
          }}
        />
      </Box>

      {/* Create submit button with top and bottom padding*/}
      <Box sx={{ py: 5 }}>
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
    </>
  );
}
