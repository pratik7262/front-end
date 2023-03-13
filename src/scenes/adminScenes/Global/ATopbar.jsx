import { Search } from "@mui/icons-material";
import { Box, IconButton, InputBase } from "@mui/material";
import React from "react";
import { UserProfile } from "../../../components/UserPropfile";
import { colors } from "../../../theme";

export const ATopbar = () => {
  return (
    <>
      <Box
        display="flex"
        position="sticky"
        top="0"
        bgcolor={colors.primary[500]}
        justifyContent="space-between"
        p={2}
        zIndex={2}
      >
        <Box></Box>
        <Box display="flex" sx={{ mr: 2 }}>
          <Box>
            <UserProfile />
          </Box>
        </Box>
      </Box>
    </>
  );
};
