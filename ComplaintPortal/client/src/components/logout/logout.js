import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

export default function Logout() {

    const history = useHistory();

    const routeChange = () => {
        let path = `/`;
        history.push(path);
      };

  return (
    <div>
      <Button
        onClick={() => {
          localStorage.removeItem("userInfo");
          routeChange();
        }}
        variant="contained" color="inherit" href="#contained-button"
        style={{ float: "right",border:"1px solid #000000" }}
        sx={{ py: 2, pr: 5 }}
      >
        Logout
      </Button>
    </div>
  );
}
