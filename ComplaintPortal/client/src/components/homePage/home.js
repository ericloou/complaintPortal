import logo from "../../logo.svg";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import CreateForm from "../createComplaints/createComplaints.js";
import useStyles from "../../styles.js";
import * as React from "react";
import Box from '@mui/material/Box';
import Login from "../login/login.js";

export default function HomePage() {
    const classes = useStyles();
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

        <Grow in>
          <Container>
            <Grid container justifyContent="space-between" alignItems="stretch">
            </Grid>
            <Grid item xs={12} sm={10}>
              <AppBar
                className={classes.appBar}
                position="static"
                color="inherit"
              >
                <CreateForm />
              </AppBar>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </div>
  );
}
