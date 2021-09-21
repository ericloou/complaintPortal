import logo from './logo.svg';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import Complaint from './components/showComplaints/showComplaints.js';
import CreateForm from './components/createComplaints/createComplaints.js';
import './App.css';
import useStyles from './styles.js';

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Container maxWidth="lg">
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className= {classes.heading} variant="h2" align="center">
            Complaint Portal v4
          </Typography>
        </AppBar>

        <Grow in>
          <Container>
            <Grid container justifyContent = "space-between" alignItems = "stretch">
              
              <Grid item xs = {12} sm = {10}>
                <AppBar className= {classes.appBar} position="static" color="inherit">
                  <Complaint/>
                </AppBar>
              </Grid>
            </Grid>
            <Grid item xs = {12} sm = {10}>
                <AppBar className= {classes.appBar} position="static" color="inherit">
                  <CreateForm/>
                </AppBar>
              </Grid>
          </Container>
        </Grow>
      </Container>
    </div>
  );
}

export default App;
