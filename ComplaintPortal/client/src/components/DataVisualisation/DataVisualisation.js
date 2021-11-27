import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import {Box,Grid,Container} from "@material-ui/core";
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

    return (
        <>
          <div className="ComparsionData">
          <Grid container direction="row" justifyContent="space-between" alignItems="left">
          <Grid item xs={12} bgcolor="#e02744">
          <img src="/images/MU_Logo.ico" alt="" />
          </Grid>
          <Grid border="1px solid #000000" item xs={12} bgcolor="#e02744"> 
            <Button variant="contained" color="error" href="#contained-button" type="button" onClick={routeChange}>
              Back
            </Button>
          </Grid>
        </Grid>
        <Container maxWidth="md">
                <Box style={{ align: "center" }} >
                <div className="col-md-6">
                <h2>Comparison of Complaint/Appeal/Feedback</h2>
                <div className="chart-wrapper">
                <CChart
                  type='doughnut'
                  data={{
                    labels: [
                      'Pending Complaint',
                      'Pending Appeal',
                      'Pending Feedback',
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
                        </Container>
                </div>
              </>
            );
    }