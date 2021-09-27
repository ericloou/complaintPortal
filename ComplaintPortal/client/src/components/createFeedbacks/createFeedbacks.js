import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import axios from "axios";
import { Container, Grow, Grid, AppBar } from "@material-ui/core";
import useStyles from "../../styles.js";
import { useHistory } from "react-router-dom";

export default function CreateFeedbackForm() {
  const history = useHistory();

  const routeChange = () => {
    let path = `/`;
    history.push(path);
  };
  const classes = useStyles();
  const [type, setType] = useState("");
  const [counter, setCounter] = useState(0);
  const [feedback, setFeedbacks] = useState({
    name: "",
    idNum: "",
    unit: "",
    message: "",
    ticketNumber: "F",
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

  const createFeedback = () => {
    axios.post("http://localhost:5000/feedbacks", feedback);
    window.location.reload(false); //refresh the entie page when submit button is clicked
  };

  function totalCount() {
    setCounter((currentCount) => currentCount + 1);
  }
  //generate ticket number upon click submit button
  function makeTicketNumber() {
    setFeedbacks(...feedback, (ticketNumber) => ticketNumber + 1);
  }
  return (
    <>
      <h2>Complaint Form</h2>
      <Box style={{ marginLeft: "auto" }} sx={{ pb: 2, pr: 2 }}>
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Button onClick={routeChange}>Home</Button>
        </AppBar>
        <Container maxWidth="lg">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              {/* Create textfield for email with requirements */}
              <TextField
                required
                id="outlined-required"
                label="Email"
                value={feedback.unit}
                onChange={(event) => {
                  setFeedbacks({ ...feedback, unit: event.target.value });
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
              value={feedback.message}
              onChange={(event) => {
                setFeedbacks({ ...feedback, message: event.target.value });
              }}
            />
          </Box>

          {/* Create submit button with top and bottom padding*/}
          <Box sx={{ py: 2 }}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => {
                createFeedback();
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
