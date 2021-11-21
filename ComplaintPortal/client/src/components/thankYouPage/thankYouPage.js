import { Container, AppBar, Typography, Grow, Grid,Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function thankYouPage(){
    
    const history = useHistory();

    const [complaintList, setComplaintList] = useState([]);
  
    const routeChange = () => {
      let path = `/`;
      history.push(path);
    };

    useEffect(() => {
        axios.get("http://localhost:5000/complaints").then((allComplaints) => {
          setComplaintList(allComplaints.data);
          // console.log(allComplaints.data);
        });
      }, []);

return (
    <>
    <div className="thankYouPage">
    <Grid item  xs={12}  sm={20}bgcolor="#e02744">
        <item><img src="/images/MU_Logo.ico" alt=""/></item>
        <Grid  item xs={12} sm={15}bgcolor="#e02744">
              <Button variant="contained" color="error" href="#contained-button" type="button" onClick={(e) => {
                e.preventDefault();
                window.location.href='https://www.murdoch.edu.au/';}
              }>
                Home
                </Button>
              <Button variant="contained" color="error" href="#contained-button" type="button" onClick={(e) => {
                e.preventDefault();
                window.location.href='https://www.murdoch.edu.au/about-us';}
              }>
                About us
              </Button>
              <Button variant="contained" color="error" href="#contained-button" type="button" onClick={(e) => {
                e.preventDefault();
                window.location.href='https://www.murdoch.edu.au/contact-us';}}>
                Contact us
              </Button>
              </Grid>
        <Grid border="1px solid #000000" item xs={12} sm={15}bgcolor="fffff2">
          
          <Button variant="contained" color="error" href="#contained-button" type="button" onClick={routeChange}>Back</Button>
          </Grid>
        </Grid>
        

        <h2>Thank you for submitting!</h2>
        <h2>We value your feedback.</h2>
        {complaintList.map((complaint, key) => (
            
        <h3 key={key}>Your ticket number is:{complaint.ticketNumber}</h3>
        ))};
              </div>
        </>
    );
}

