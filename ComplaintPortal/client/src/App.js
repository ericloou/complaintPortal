// import logo from './logo.svg';
import * as React from "react";
// import Stack from '@mui/material/Stack';
import ShowComplaint from "./components/showComplaints/showComplaints.js";
import ShowAppeal from "./components/showAppeals/showAppeals.js";
import ShowFeedback from "./components/showFeedbacks/showFeedbacks.js";
import CreateComplaintForm from "./components/createComplaints/createComplaints.js";
import CreateAppealForm from "./components/createAppeals/createAppeals.js";
import CreateFeedbackForm from "./components/createFeedbacks/createFeedbacks.js";
import "./App.css";
import useStyles from "./styles.js";
// import Login from "./components/login/login.js";
import { Route } from "react-router-dom";
import HomePage from "./components/homePage/home.js";
import AdminHomePage from "./components/homePage/adminHome.js";

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <Route exact path="/" component={HomePage} />
      {/* Admin pages */}
      <Route exact path="/adminhome" component={AdminHomePage} />
      <Route exact path="/showcomplaints" component={ShowComplaint} />
      <Route exact path="/showappeals" component={ShowAppeal} />
      <Route exact path="/showfeedbacks" component={ShowFeedback} />
      {/* Form pages */}
      <Route exact path="/createcomplaints" component={CreateComplaintForm} />
      <Route exact path="/createappeals" component={CreateAppealForm} />
      <Route exact path="/createfeedbacks" component={CreateFeedbackForm} />
    </div>
  );
}

export default App;
