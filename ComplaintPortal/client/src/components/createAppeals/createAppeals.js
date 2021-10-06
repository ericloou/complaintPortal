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
    message: "",
    ticketNumber: "A",
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
  return (
    <>
      <Box bgcolor="black">
        <img src="/images/MU_Logo.ico" alt="" />
        <Box>
          <Button onClick={routeChange}>Home</Button>
        </Box>
      </Box>
      <h2>Appeals Form</h2>
      <Box style={{ marginLeft: "auto" }} sx={{ pb: 2, pr: 2 }}>
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
              <TextField
                required
                id="outlined-disabled"
                label="Name"
                value={appeal.name}
                onChange={(event) => {
                  setAppeals({ ...appeal, name: event.target.value });
                }}
              />

              <TextField
                required
                id="outlined-disabled"
                label="Student/Staff Number"
                value={appeal.idNum}
                onChange={(event) => {
                  setAppeals({ ...appeal, idNum: event.target.value });
                }}
              />

              {/* Create textfield for email with requirements */}
              <TextField
                required
                id="outlined-required"
                label="Module Number"
                value={appeal.unit}
                onChange={(event) => {
                  setAppeals({ ...appeal, unit: event.target.value });
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
              value={appeal.message}
              onChange={(event) => {
                setAppeals({ ...appeal, message: event.target.value });
              }}
            />
          </Box>

          {/* Create submit button with top and bottom padding*/}
          <Box sx={{ py: 2 }}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => {
                createAppeal();
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
