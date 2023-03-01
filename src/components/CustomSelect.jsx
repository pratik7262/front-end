import { MenuItem, TextField } from "@mui/material";
import React from "react";

const CustomSelect = ({ value, onChange, label, name, arr }) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      label={label}
      name={name}
      sx={{
        width: "180px",
        "& .css-d9oaum-MuiSelect-select-MuiInputBase-input-MuiFilledInput-input.MuiSelect-select":
          {
            bgcolor: "#e8f0fe",
            fontSize: "1rem",
          },
        "& .css-1gvrjsy-MuiFormLabel-root-MuiInputLabel-root": {
          color: "black",
          fontSize: "1rem",
        },
        "& .css-16qgwi8-MuiFormLabel-root-MuiInputLabel-root": {
          color: "black",
          fontSize: "1rem",
        },
      }}
      variant="filled"
      select
    >
      {arr.map((item) => {
        return (
          <MenuItem key={item.objectId} value={item.name}>
            {item.name}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default CustomSelect;
