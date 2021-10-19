import { useState, useEffect, React } from "react";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import axios from "axios";
import { Container} from "@material-ui/core";
import useStyles from "../../styles.js";
import { useHistory } from "react-router-dom";
import ErrorMessage from "../errorMessage.js";

export default function CreateFeedbackForm() {
  const history = useHistory();
  const routeChange = () => {
    let path = `/`;
    history.push(path);
  };


  const minValue = 1;
  const maxValue = 999999999;
  const [rng, setRng] = useState(1);
  const [counter, setCounter] = useState(0);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [ticketNumber, setTicketNumber] = useState(0);
  const [error, setError] = useState(false);
  const [date, setDate] = useState("");

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

  function totalCount() {
    setCounter((currentCount) => currentCount + 1);
  }

  function currentDate() {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    setDate(`${date}/${month < 10 ? `0${month}` : `${month}`}/${year}`);
  }
  //generate ticket number upon click submit button
  function makeTicketNumber() {
    setTicketNumber(
      Math.floor(Math.random() * (maxValue - minValue + 1) + minValue)
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(
      "email:",
      email,
      "message: ",
      message,
      "ticket: ",
      ticketNumber,
      "date: ",
      date,
    );
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/feedbacks",
        {
          email,
          message,
          ticketNumber,
          date,
        },
        config
      );
      console.log(data);
      totalCount();
      window.location.reload(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

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
                value={email}
                placeholder="Enter email"
                onInput={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="createFeedback2">
              {/* Create multiline textfield to contain complaint/appeals messages */}
              <label>Message: </label>
              <textarea
                required
                value={message}
                placeholder="Enter message"
                onInput={(e) => setMessage(e.target.value)}
              ></textarea>
              {/* Create submit button with top and bottom padding*/}
              <Box sx={{ py: 2 }}>
                <Button
                  variant="contained"
                  type="submit"
                  endIcon={<SendIcon />}
                  onClick={()=>{
                    makeTicketNumber();
                    currentDate();
                  }}
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
