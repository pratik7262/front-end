import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import CustomToolbar from "../../../components/CustomToolbar";
import { Header } from "../../../components/Header";
import { colors } from "../../../theme";

const AssetManagement = () => {
  const [approvedProperties, setApprovedProperties] = useState([]);
  const fetchData = async () => {
    const responce = await fetch(
      "http://localhost:5000/api/rental/specificrentalincome",
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    const json = await responce.json();
    setApprovedProperties(json.rental);
  };

  useEffect(() => {
    fetchData();
  }, [approvedProperties]);

  const columns = [
    {
      field: "id",
      headerName: "id",
      flex: 1,
      renderCell: ({ row: { genaratedId } }) => {
        return (
          <Typography variant="h6" color={colors.grey[100]}>
            {genaratedId}
          </Typography>
        );
      },
    },
    // {
    //   field: "title",
    //   headerName: "Property",
    //   flex: 1,
    //   renderCell: ({ row: { title } }) => {
    //     return (
    //       <Typography variant="h6" color={colors.grey[100]}>
    //         {title}
    //       </Typography>
    //     );
    //   },
    // },
    {
      field: "InvestedDate",
      headerName: "Date",
      flex: 1,
      renderCell: ({ row: { investedDate } }) => {
        return investedDate ? (
          <Typography variant="h6" color={colors.grey[100]}>
            {investedDate.slice(0, 10)}
          </Typography>
        ) : (
          <Typography variant="h6" color={colors.grey[100]}>
            Not Sold
          </Typography>
        );
      },
    },
    {
      field: "units",
      headerName: "Units",
      flex: 1,
      renderCell: ({ row: { units } }) => {
        return (
          <Typography variant="h6" color={colors.grey[100]}>
            {units}
          </Typography>
        );
      },
    },
    {
      field: "rentalIncome",
      headerName: "Pending Rental Income",
      flex: 1,
      renderCell: ({
        row: { rentalIncome, units, rentalIncomePerSecPerUnit, investedDate },
      }) => {
        let date = new Date();
        let oldDate = new Date(investedDate);
        let dif = (date.getTime() - oldDate.getTime()) / 1000;

        let currentRentalIncome =
          rentalIncome + dif * units * rentalIncomePerSecPerUnit;
        return (
          <Typography variant="h6" color={colors.grey[100]}>
            {currentRentalIncome.toString().slice(0, 7)}
          </Typography>
        );
      },
    },
    {
      field: "paidRentalIncome",
      headerName: "Paid Rental Income",
      flex: 1,
      renderCell: ({ row: { paidRentalIncome } }) => {
        return (
          <Typography variant="h6" color={colors.grey[100]}>
            {paidRentalIncome}
          </Typography>
        );
      },
    },
  ];

  return (
    <Box m={2}>
      <Header title="Rental Income" />
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
            color: colors.grey[100],
            fontSize: "1rem",
            fontWeight: 600,
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: colors.blueAccent[700],
            borderTop: "none",
            color: colors.blueAccent[700],
          },
          "& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
            fontSize: "1rem",
            fontWeight: 600,
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
          rows={approvedProperties}
          columns={columns}
          disableSelectionOnClick
          components={{ Toolbar: CustomToolbar }}
        />
      </Box>
    </Box>
  );
};

export default AssetManagement;
