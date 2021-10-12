import React from "react";
import Alert from '@mui/material/Alert';

const ErrorMessage = ({ children }) => {
  return (
    <Alert severity="error">{children}</Alert>
  );
};

export default ErrorMessage;
