import React from "react";
import { colors } from "./theme";
import { Typography } from "@mui/material";

const User = () => {
  return (
    <div className="app">
      <main
        className="content"
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflowY: "scroll",
        }}
      >
        <Typography sx={{ color: colors.grey[100] }}>this is user</Typography>
      </main>
    </div>
  );
};

export default User;
