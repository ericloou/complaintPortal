import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function BasicTable() {
  const [counter, setCounter] = useState(0);
  const [complaintList, setComplaintList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/complaints").then((allComplaints) => {
      setComplaintList(allComplaints.data);
    });
  }, []);

  //get persistent object from localStorage and parsing it in
  useEffect(() => {
    const data = localStorage.getItem("Total-Count");
    if (data) {
      setCounter(JSON.parse(data));
    }
  }, []);

  return (
    <>
      <h2>Total Number of complaints: {counter}</h2>
      <h2>All Complaints and Appeals</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Ticket Number</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Student/Staff Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complaintList.map((complaint, key) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {complaint.ticketNumber}
                </TableCell>
                <TableCell align="right">{complaint.type}</TableCell>
                <TableCell align="right">{complaint.name}</TableCell>
                <TableCell align="right">{complaint.idNum}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
