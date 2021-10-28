import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Container, Grow, Grid } from "@material-ui/core";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import {CChart} from "@coreui/react-chartjs";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  

  export default function BasicTable() {
    const history = useHistory();
  
    const routeChange = () => {
      let path = `/adminhome`;
      history.push(path);
    };

    const [complaintList, setComplaintList] = useState([]);
    const [ComplaintCounter, setComplaintCounter] = useState(0);
    const [AppealCounter, setAppealCounter] = useState(0);
    const [FeedbackCounter, setFeedbackCounter] = useState(0);

    //geting total complaints from local storage and parsing it in
  useEffect(() => {
    const data = localStorage.getItem("Total-Complaint");
    if (data) {
      setComplaintCounter(JSON.parse(data));
    }
  }, []);

  //geting total feedback from local storage and parsing it in
  useEffect(() => {
    const fdata = localStorage.getItem("Total-Feedback");
    if (fdata) {
      setFeedbackCounter(JSON.parse(fdata));
    }
  }, []);

  //geting total feedback from local storage and parsing it in
  useEffect(() => {
    const adata = localStorage.getItem("Total-Appeal");
    if (adata) {
      setAppealCounter(JSON.parse(adata));
    }
  }, []);
  
  //set persistent object by converting into string and storing in localStorage
  /*
  useEffect(() => {
    localStorage.setItem("Total-Complaint", JSON.stringify(ComplaintCounter));
  });
    
    useEffect(() => {
        axios.get("http://localhost:5000/complaints").then((allComplaints) => {
          setComplaintList(allComplaints.data);
           //console.log(allComplaints.status);
        });
      }, []);*/

    return (
        <>
          <div className="ComparsionData">
            <Box bgcolor="black">
              <img src="/images/MU_Logo.ico" alt="" />
              <Box>
                <Button variant="text" onClick={routeChange}>
                  Back
                </Button>
                </Box>
                </Box>
                <Box style={{ marginLeft: "auto" }} sx={{ pb: 60, pr: 60, width: 900, height: 300}}>
                <div className="col-md-6">
                <h2>Comparison of Complaint/Appeal/Feedback</h2>
                <div className="chart-wrapper">
                <CChart
                  type='doughnut'
                  data={{
                    labels: [
                      'Complaint',
                      'Appeal',
                      'Feedback',
                    ],
                    datasets: [
                      {
                        data: [ComplaintCounter, FeedbackCounter, AppealCounter],
                        backgroundColor: [
                          '#FF6384',
                          '#36A2EB',
                          '#FFCE56',
                        ],
                        hoverBackgroundColor: [
                          '#FF6384',
                          '#36A2EB',
                          '#FFCE56',
                        ],
                      }],
                    }}
                  options={{
                    aspectRatio: 1.5,
                    tooltips: {
                     
                      enabled: true
                    }
                   
                  }} />
                          </div>
                          <hr />
                        </div>
                        </Box>
                </div>
              </>
            );
    }