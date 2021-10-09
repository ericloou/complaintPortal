import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from "@mui/material/FormHelperText";
// import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { Container, Grow, Grid, AppBar } from "@material-ui/core";
import useStyles from "../../styles.js";
import { useHistory } from "react-router-dom";

export default function CreateAppealForm() {
  const history = useHistory();

  const routeChange = () => {
    let path = `/`;
    history.push(path);
  };
  const classes = useStyles();
  const [type, setType] = useState("");
  const [counter, setCounter] = useState(0);
  const [appeal, setAppeals] = useState({
    name: "",
    idNum: "",
    unit: "",
    email: "",
    message: "",
    type:"",
    ticketNumber: 0,
  });
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

  const handleChange = (event) => {
    setType(event.target.value);
    console.log(event.target.value);
  };

  const createAppeal = () => {
    axios.post("http://localhost:5000/appeals", appeal);
    window.location.reload(false); //refresh the entie page when submit button is clicked
  };

  function totalCount() {
    setCounter((currentCount) => currentCount + 1);
  }
  //generate ticket number upon click submit button
  function makeTicketNumber() {
    setAppeals(...appeal, (ticketNumber) => ticketNumber + 1);
  }

  function handleSubmit() {
    createAppeal();
    totalCount();
    makeTicketNumber();
    // randomNumberGenerator();
  }

  return (
    <>
      <div className="appealHeader">
        <Box bgcolor="black">
          <img src="/images/MU_Logo.ico" alt="" />
          <Box>
            <Button onClick={routeChange}>Home</Button>
          </Box>
        </Box>
        <h2>Appeals Form</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="appealMain">
          <label>Name:</label>
          <input
            required
            type="text"
            value={appeal.name}
            onChange={(event) => {
              setAppeals({ ...appeal, name: event.target.value });
            }}
          />
        </div>
        <div className="appealMain">
          <label>Student/Staff ID:</label>
          <input
            required
            type="text"
            style={{ paddingLeft: "15px" }}
            value={appeal.idNum}
            onChange={(event) => {
              setAppeals({ ...appeal, idNum: event.target.value });
            }}
          />
        </div>
        <div className="appealMain">
          <label>Module Number:</label>
          <input
            required
            type="text"
            style={{ paddingLeft: "15px" }}
            value={appeal.unit}
            onChange={(event) => {
              setAppeals({ ...appeal, unit: event.target.value });
            }}
          />
        </div>
        <div className="appealMain">
          {/* Create textfield for email with requirements */}
          <label>Email:</label>
          <input
            required
            type="text"
            aria-describedby="logicHelp"
            value={appeal.email}
            onChange={(event) => {
              setAppeals({ ...appeal, email: event.target.value });
            }}
          />
        </div>
        <div className="appealMain">
          <label>Type of appeal</label>
          <select
          required
          value={appeal.type}
          onChange={(event) => {
            setAppeals({ ...appeal, type: event.target.value });
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
            value={appeal.message}
            onChange={(event) => {
              setAppeals({ ...appeal, message: event.target.value });
            }}
          ></textarea>

          {/* Create submit button with top and bottom padding*/}
          <Box sx={{ py: 2 }}>
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Submit
            </Button>
          </Box>
        </div>
      </form>
    </>
  );
}
