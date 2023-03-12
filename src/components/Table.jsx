import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { colors } from "../theme";
import CustomToolbar from "./CustomToolbar";

const Table = ({ rows, columns }) => {
  <Box
    m="40px 0 0 0"
    height="75vh"
    sx={{
      "& .MuiDataGrid-root": {
        border: "none",
      },
      "& .MuiDataGrid-cell": {
        borderBottom: "none",
      },
      "& .name-column--cell": {
        color: colors.greenAccent[300],
      },
      "& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
        fontSize: "1rem",
        fontWeight: 700,
      },
      "& .MuiDataGrid-columnHeader": {
        backgroundColor: colors.blueAccent[700],
        border: "none",
        color: colors.grey[100],
      },
      "& .MuiDataGrid-virtualScroller": {
        backgroundColor: colors.primary[400],
      },
      "& .MuiDataGrid-footerContainer": {
        backgroundColor: colors.blueAccent[700],
        borderTop: "none",
        color: colors.blueAccent[700],
      },
      "& .MuiToolbar-gutters": {
        display: "none",
      },
      "& .MuiDataGrid-toolbarContainer .MuiButton-text ": {
        color: `${colors.grey[100]} !important`,
      },
    }}
  >
    <DataGrid
      rows={rows}
      columns={columns}
      disableSelectionOnClick
      components={{ Toolbar: CustomToolbar }}
    />
  </Box>;
};

export default Table;
