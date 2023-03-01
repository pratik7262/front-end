import { TextField } from "@mui/material";
import React from "react";

const CustomTextField = ({
  label,
  name,
  fullWidth,
  onChange,
  value,
  select,
}) => {
  return (
    <TextField
      select={select}
      label={label}
      fullWidth={fullWidth}
      value={value}
      color="neutral"
      variant="filled"
      sx={{
        maxWidth: "180px",
        fontSize: "3rem",
        my: 1,
        "& .css-1iur4r6-MuiFormLabel-root-MuiInputLabel-root ": {
          color: "black",
          fontSize: "1rem",
        },
        "& .css-1b4tj95-MuiFormLabel-root-MuiInputLabel-root": {
          color: "black",
          fontSize: "1rem",
        },
        "& .css-10botns-MuiInputBase-input-MuiFilledInput-input": {
          fontSize: "1rem",
          color: "black",
          bgcolor: "#e8f0fe",
        },
      }}
      name={name}
      onChange={onChange}
    />
  );
};

export default CustomTextField;
