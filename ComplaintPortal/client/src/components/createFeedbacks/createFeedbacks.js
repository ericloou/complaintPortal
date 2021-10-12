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
    const fdata = localStorage.getItem("Total-Feedback");
    if (fdata) {
      setCounter(JSON.parse(fdata));
    }
  }, []);
  //set persistent object by converting into string and storing in localStorage
  useEffect(() => {
    localStorage.setItem("Total-Feedback", JSON.stringify(counter));
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

  function handleSubmit() {
    createFeedback();
    totalCount();
    makeTicketNumber();
    // randomNumberGenerator();
  }

  return (
    <>
      <div className="createFeedbackHeader">
        <Box bgcolor="black">
          <img src="/images/MU_Logo.ico" alt="" />
          <Box>
            <Button onClick={routeChange}>Home</Button>
          </Box>
        </Box>
        <h2>Feedback Form</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <Box style={{ marginLeft: "auto" }} sx={{ pb: 2, pr: 2 }}>
          <Container maxWidth="lg">
            <div className="createFeedback">
              {/* Create textfield for email with requirements */}
              <label>Email:</label>
              <input
                required
                type="text"
                value={feedback.unit}
                onChange={(event) => {
                  setFeedbacks({ ...feedback, unit: event.target.value });
                }}
              />
            </div>
            <div className="createFeedback2">
              {/* Create multiline textfield to contain complaint/appeals messages */}
              <label>Message: </label>
              <textarea
                required
                value={feedback.message}
                onChange={(event) => {
                  setFeedbacks({ ...feedback, message: event.target.value });
                }}
              ></textarea>
              {/* Create submit button with top and bottom padding*/}
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
