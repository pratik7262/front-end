import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { colors } from "../../theme";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export const History = () => {
  const [history, setHistory] = useState([]);

  const getHistory = async () => {
    let res = await axios.get("http://localhost:5000/api/history/gethistory");
    setHistory(res.data.history);
  };

  useEffect(() => {
    getHistory();
  }, [history]);

  const columns = [
    // { field: "id", headerName: "ID",flex:0.5 },
    {
      field: "userName",
      headerName: "User",
      cellClassName: "name-column--cell",
      flex: 1,
      renderCell: ({ row: { userName } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {userName}
          </Typography>
        );
      },
    },
    {
      field: "added",
      headerName: "Added Property",
      cellClassName: "name-column--cell",
      flex: 1,
      renderCell: ({ row: { added } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {added}
          </Typography>
        );
      },
    },
    {
      field: "invested",
      headerName: "Invested Proprty",
      cellClassName: "name-column--cell",
      flex: 1,
      renderCell: ({ row: { invested } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {invested}
          </Typography>
        );
      },
    },
    {
      field: "listed",
      headerName: "Listed Property",
      cellClassName: "name-column--cell",
      flex: 1,
      renderCell: ({ row: { listed } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {listed}
          </Typography>
        );
      },
    },
    {
      field: "units",
      headerName: "Units",
      cellClassName: "name-column--cell",
      flex: 1,
      renderCell: ({ row: { units } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {units}
          </Typography>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      cellClassName: "name-column--cell",
      flex: 1,
      renderCell: ({ row: { price } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {price}
          </Typography>
        );
      },
    },
  ];
  return (
    <Box margin="20px">
      <Header title="History" />
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
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            border: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: colors.blueAccent[700],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text ": {
            color: `${colors.grey[100]} !important`,
          },
          "& .MuiDataGrid-panelFooter": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={history}
          columns={columns}
          disableSelectionOnClick
          components={{ Toolbar: CustomToolbar }}
        />
      </Box>
    </Box>
  );
};
