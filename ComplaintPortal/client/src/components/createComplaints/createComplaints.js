import { useState, useEffect, React, Suspense } from "react";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import axios from "axios";
import { Container ,Grid} from "@material-ui/core";
import useStyles from "../../styles.js";
import { useHistory} from "react-router-dom";
import ErrorMessage from "../errorMessage.js";

export default function CreateComplaintForm() {
  const history = useHistory();
  const routeChange = () => {
    let path = `/`;
    history.push(path);
  };

  const thankYouRoute = () =>{
    let path = `/thankYouPage`;
    history.push(path);
};

  const minValue = 1;
  const maxValue = 999999999;
  const [rng, setRng] = useState(1);
  const [counter, setCounter] = useState(0);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [ticketNumber, setTicketNumber] = useState(0);
  const [error, setError] = useState(false);
  const [date, setDate] = useState("");
  //Testing for thank you page
  const [submitted,setSubmitted] = useState(false);

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

  //Set the status of the complaint to "Pending" when click on submit button
  function setNewStatus(){
    setStatus("Pending");
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
      "status:",
      status,
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
        "http://localhost:5000/complaints",
        {
          email,
          message,
          ticketNumber,
          status,
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
      <div className="complaintHeader">
      
      <Grid item  xs={12}  sm={20}bgcolor="#e02744">
        <item><img src="/images/MU_Logo.ico" alt=""/></item>
        <Grid  item xs={12} sm={15}bgcolor="#e02744">
              <Button variant="contained" color="error" href="#contained-button" type="button" onClick={(e) => {
                e.preventDefault();
                window.location.href='https://www.murdoch.edu.au/';}
              }>
                Home
                </Button>
              <Button variant="contained" color="error" href="#contained-button" type="button" onClick={(e) => {
                e.preventDefault();
                window.location.href='https://www.murdoch.edu.au/about-us';}
              }>
                About us
              </Button>
              <Button variant="contained" color="error" href="#contained-button" type="button" onClick={(e) => {
                e.preventDefault();
                window.location.href='https://www.murdoch.edu.au/contact-us';}}>
                Contact us
              </Button>
              </Grid>
        <Grid border="1px solid #000000" item xs={12} sm={15}bgcolor="fffff2">
          
          <Button variant="contained" color="error" href="#contained-button" type="button" onClick={routeChange}>Back</Button>
          </Grid>
        </Grid>
        

        <h2>Complaint Form</h2>
        
      </div>

      <form onSubmit={handleSubmit}>
        <Box style={{ marginLeft: "auto" }} sx={{ pb: 2, pr: 2 }}>
          <Container maxWidth="lg">
            <div className="createComplain">
              {/* Create textfield for email with requirements */}
              <label>Email:</label>
              <input
                type="text"
                value={email}
                placeholder="Enter email"
                onInput={(e) => setEmail(e.target.value)}
                required
              />
              {/* Create submit button with top and bottom padding*/}
            </div>
            <div className="createComplain2">
              <label>Message: </label>
              <textarea
                required
                value={message}
                placeholder="Enter message"
                onInput={(e) => setMessage(e.target.value)}
              ></textarea>
              <Box sx={{ py: 2 }}>
                <Button
                  variant="contained"
                  type="submit"
                  endIcon={<SendIcon />}
                  
                  onClick={async()=>{
                    makeTicketNumber();
                    currentDate();
                    setNewStatus();
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
