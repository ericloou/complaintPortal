// import logo from "../../logo.svg";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
// import CreateForm from "../createComplaints/createComplaints.js";
import useStyles from "../../styles.js";
import * as React from "react";
import Box from "@mui/material/Box";
import Login from "../login/login.js";
import { BrowserRouter, Route, Link, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

export default function HomePage() {
  const classes = useStyles();
  const history = useHistory();

  const complaintRoute = () => {
    let path = `/createcomplaints`;
    history.push(path);
  };
  const appealRoute = () => {
    let path = `/createappeals`;
    history.push(path);
  };
  const feedbackRoute = () => {
    let path = `/createfeedbacks`;
    history.push(path);
  };
  return (
    <div>
      <Container maxWidth="lg">
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className={classes.heading} variant="h2" align="center">
            Complaint Portal v4
          </Typography>
          <Box style={{ marginLeft: "auto" }} sx={{ pb: 2, pr: 2 }}>
            <Login />
          </Box>
        </AppBar>
        <h2>Welcome to the complaint portal v4</h2>
        <h3>Please choose the type of form that you wish to submit</h3>
        <Grow in>
          <Container>
            <Grid
              container
              justifyContent="space-between"
              alignItems="stretch"
            ></Grid>
            <Grid item xs={12} sm={10}>
              <Button variant="text" onClick={complaintRoute}>
                Complaint
              </Button>
              <Button variant="text" onClick={appealRoute}>
                Appeal
              </Button>
              <Button variant="text" onClick={feedbackRoute}>
                Feedback
              </Button>
              <AppBar
                className={classes.appBar}
                position="static"
                color="inherit"
              ></AppBar>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </div>
  );
}
