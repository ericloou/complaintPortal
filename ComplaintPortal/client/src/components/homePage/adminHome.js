import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
// import CreateForm from "../createComplaints/createComplaints.js";
import useStyles from "../../styles.js";
import * as React from "react";
import Box from "@mui/material/Box";
import Logout from "../logout/logout.js";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

export default function HomePage() {
  const classes = useStyles();
  const history = useHistory();

  const complaintRoute = () => {
    let path = `/showcomplaints`;
    history.push(path);
  };
  const appealRoute = () => {
    let path = `/showappeals`;
    history.push(path);
  };
  const feedbackRoute = () => {
    let path = `/showfeedbacks`;
    history.push(path);
  };
  const DataVisualisationRoute = () => {
    let path = `/DataVisualisation`;
    history.push(path);
  };

  const home = () => {
    let path = `/`;
    history.push(path);
  };
  return (
    <>
      <div className="adminHome">
      <Grid container direction="row" justifyContent="space-between" alignItems="left">
          <Grid item xs={12} bgcolor="#e02744">
        <item><Logout/></item>
        </Grid>
        <Grid item  xs={12}  sm={12}bgcolor="#e02744">
        <item><img src="/images/MU_Logo.ico" alt=""/></item>
        </Grid>
        </Grid>
      </div>
      <div className="adminHomeBody">
        <Container maxWidth="lg">
          <Typography className={classes.heading} variant="h2" align="center">
            Complaint Portal v4 Admin Page
          </Typography>
          <Box style={{ marginLeft: "auto" }} sx={{ pb: 2, pr: 2 }}></Box>
          <h2>Welcome to the complaint portal v4 Admin Page</h2>
          <h3>Please choose the type of form that you wish to view</h3>
          <Grow in>
            <Container>
              <Grid
                container
                justifyContent="space-between"
                alignItems="stretch"
              ></Grid>
              <Grid item xs={12} sm={20}>
                <Button variant="text" onClick={complaintRoute}>
                  Complaint
                </Button>
                <Button variant="text" onClick={appealRoute}>
                  Appeal
                </Button>
                <Button variant="text" onClick={feedbackRoute}>
                  Feedback
                </Button>
                <Button variant="text" onClick={DataVisualisationRoute}>
                  DataVisualisation
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
    </>
  );
}
