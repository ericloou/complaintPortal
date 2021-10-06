import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Container, Grow, Grid} from "@material-ui/core";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";

export default function BasicTable() {
  const [counter, setCounter] = useState(0);
  const [appealList, setAppealList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/appeals").then((allAppeals) => {
        setAppealList(allAppeals.data);
    //   console.log(allAppeals.data);
    });
  }, []);

  //get persistent object from localStorage and parsing it in
  useEffect(() => {
    const adata = localStorage.getItem("Total-Appeal");
    if (adata) {
      setCounter(JSON.parse(adata));
    }
  }, []);

  const history = useHistory();

  const routeChange = () => {
    let path = `/adminhome`;
    history.push(path);
  };

  return (
    <>
    <Box bgcolor="black">
        <img src="/images/MU_Logo.ico" alt="" />
        <Box>
          <Button variant="text" onClick={routeChange}>Back</Button>
        </Box>
      </Box>
      <h2>Total Number of Appeals: {counter}</h2>
      <h2>All Appeals</h2>
      <Box style={{ marginLeft: "auto" }} sx={{ pb: 2, pr: 2 }}>
      </Box>
      <Grow in>
        <Container maxWidth="lg">
        <Grid container justifyContent="space-between" alignItems="stretch"></Grid>
        <Grid item xs={12} sm={10}> 
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
                {appealList.map((appeal, key) => (
                  <TableRow
                    key={key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {appeal.ticketNumber}
                    </TableCell>
                    <TableCell align="right">{appeal.type}</TableCell>
                    <TableCell align="right">{appeal.name}</TableCell>
                    <TableCell align="right">{appeal.idNum}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Grid>
        </Container>
      </Grow>
    </>
  );
}
