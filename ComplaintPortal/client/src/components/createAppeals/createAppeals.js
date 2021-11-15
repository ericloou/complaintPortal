import { useState, useEffect, React } from "react";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import axios from "axios";
import { Container ,Grid} from "@material-ui/core";
import useStyles from "../../styles.js";
import { useHistory } from "react-router-dom";
import ErrorMessage from "../errorMessage.js";

export default function CreateAppealForm() {
  const history = useHistory();

  const routeChange = () => {
    let path = `/`;
    history.push(path);
  };

  const minValue = 1;
  const maxValue = 999999999;
  const [type, setType] = useState("");
  const [counter, setCounter] = useState(0);
  const [name, setName] = useState("");
  const [idNum, setIdNum] = useState("");
  const [unit, setUnit] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [ticketNumber, setTicketNumber] = useState(0);
  const [error, setError] = useState(false);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  //get persistent object from localStorage and parsing it in
  useEffect(() => {
    const adata = localStorage.getItem("Total-Appeal");
    if (adata) {
      setCounter(JSON.parse(adata));
    }
  }, []);
  //set persistent object by converting into string and storing in localStorage
  useEffect(() => {
    localStorage.setItem("Total-Appeal", JSON.stringify(counter));
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
      "name:",
      name,
      "idNum: ",
      idNum,
      "unit: ",
      unit,
      "email: ",
      email,
      "message: ",
      message,
      "type: ",
      type,
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
        "http://localhost:5000/appeals",
        {
          name,
          idNum,
          unit,
          email,
          message,
          type,
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
      <div className="appealHeader">
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
        <h2>Appeals Form</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="appealMain">
          <label>Name:</label>
          <input
            required
            type="text"
            value={name}
            placeholder="Enter Name"
            onInput={(e) => setName(e.target.value)}
          />
        </div>
        <div className="appealMain">
          <label>Student/Staff ID:</label>
          <input
            required
            type="text"
            style={{ paddingLeft: "15px" }}
            value={idNum}
            placeholder="Enter student/staff ID"
            onInput={(e) => setIdNum(e.target.value)}
          />
        </div>
        <div className="appealMain">
          <label>Module Number:</label>
          <input
            required
            type="text"
            style={{ paddingLeft: "15px" }}
            value={unit}
            placeholder="Enter unit/module number"
            onInput={(e) => setUnit(e.target.value)}
          />
        </div>
        <div className="appealMain">
          {/* Create textfield for email with requirements */}
          <label>Email:</label>
          <input
            required
            type="text"
            aria-describedby="logicHelp"
            value={email}
            placeholder="Enter Email"
            onInput={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="appealMain">
          <label>Type of appeal</label>
          <select
          required
          value={type}
          onChange={(event) => {
            setType(event.target.value);
          }}>
            <option value=""></option>
            <option value="Quiz">Quiz</option>
            <option value="Lab">Lab</option>
            <option value="Assignment 1">Assignment 1</option>
            <option value="Assignment 2">Assignment 2</option>
            <option value="Exam">Exam</option>
          </select>
          </div>
        <div className="appeal2">
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
            type="submit" 
            variant="contained" 
            endIcon={<SendIcon />}
            onClick={()=>{
              makeTicketNumber();
              currentDate();
              setNewStatus();
            }}
            >
              Submit
            </Button>
          </Box>
        </div>
      </form>
    </>
  );
}
