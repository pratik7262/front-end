import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { colors } from "../../theme";

const AssetManagement = () => {
  const [approvedProperties, setApprovedProperties] = useState([]);
  const fetchData = async () => {
    const responce = await fetch("http://localhost:5000/api/rental/allrental", {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
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
          <Typography variant="h5" color={colors.grey[100]}>
            {genaratedId}
          </Typography>
        );
      },
    },
    {
      field: "userName",
      headerName: "Owner",
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
      field: "InvestedDate",
      headerName: "Date",
      flex: 1,
      renderCell: ({ row: { investedDate } }) => {
        return investedDate ? (
          <Typography variant="h5" color={colors.grey[100]}>
            {investedDate.slice(0, 10)}
          </Typography>
        ) : (
          <Typography variant="h5" color={colors.grey[100]}>
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
          <Typography variant="h5" color={colors.grey[100]}>
            {units}
          </Typography>
        );
      },
    },
    {
      field: "rentalIncome",
      headerName: "rentalIncome",
      flex: 1,
      renderCell: ({
        row: { rentalIncome, units, rentalIncomePerSecPerUnit, investedDate },
      }) => {
        let date = new Date();
        let oldDate = new Date(investedDate);
        let dif = (date.getTime() - oldDate.getTime()) / 1000;
     
        let currentRentalIncome =
          rentalIncome + (dif * units * rentalIncomePerSecPerUnit);
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {currentRentalIncome.toString().slice(0, 7)}
          </Typography>
        );
      },
    },
    {
      field: "_id",
      headerName: "Pay Rent",
      flex: 1,
      renderCell: ({ row: { _id } }) => {
        let color = "green";
        let text = "Pay";
        const onClick = async (_id) => {
          const res = await fetch(
            `http://localhost:5000/api/rental/pay/${_id}`
          );
          const json = await res.json();
          if (json.resMsg) {
            alert(json.resMsg);
          }
        };
        return (
          <Button
            onClick={() => {
              onClick(_id);
              fetchData();
            }}
            color={color}
            variant="contained"
          >
            {text}
          </Button>
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
            fontWeight: 700,
          },
          "& .MuiToolbar-gutters": {
            display: "none",
          },
        }}
      >
        <DataGrid rows={approvedProperties} columns={columns} />
      </Box>
    </Box>
  );
};

export default AssetManagement;
