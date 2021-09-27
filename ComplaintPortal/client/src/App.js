// import logo from './logo.svg';
import * as React from "react";
// import Stack from '@mui/material/Stack';
import Complaint from "./components/showComplaints/showComplaints.js";
// import CreateForm from "./components/createComplaints/createComplaints.js";
import "./App.css";
import useStyles from "./styles.js";
// import Login from "./components/login/login.js";
import {Route} from "react-router-dom";
import HomePage from "./components/homePage/home.js";

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <Route exact path ="/" component={HomePage} />
      <Route exact path ="/showcomplaints" component={Complaint} />
    </div>
  );
}

export default App;
