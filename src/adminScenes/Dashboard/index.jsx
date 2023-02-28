import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { colors } from "../../theme";

const Dashboard = () => {
  const [pendingProperties, setPendingProperties] = useState([]);
  const fetchData = () => {
    fetch("http://localhost:5000/api/property/pendingproperties") //api for the get request
      .then((response) => response.json())
      .then((data) => setPendingProperties(data.properties));
  };
  useEffect(() => {
    fetchData();
  }, [pendingProperties]);
  const columns = [
    {
      field: "title",
      headerName: "Property",
      flex: 1,
      renderCell: ({ row: { title } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {title}
          </Typography>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      headerAlign: "left",
      type: Date,
      align: "left",
      renderCell: ({ row: { date } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {date}
          </Typography>
        );
      },
    },
    {
      field: "price",
      headerName: "Purchace Price",
      flex: 1,
      renderCell: ({ row: { price } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {price}
          </Typography>
        );
      },
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      renderCell: ({ row: { address } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {address}
          </Typography>
        );
      },
    },
    {
      field: "_id",
      headerName: "Approve",
      flex: 1,
      renderCell: ({ row: { _id } }) => {
        let color = "error";
        let text = "Approve";
        const onClick = async () => {
          const res = await fetch(
            `http://localhost:5000/api/property/approveproperty/${_id}`
          );
          const json = await res.json();
          if (json.msg) {
            alert(json.msg);
            color = "green";
            text = "Approved";
          }
        };
        return (
          <Button
            onClick={() => {
              onClick();
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
    <>
      <Box m="10px 10px 0">
        <Box
          m="40px 0 0 0"
          height="80vh"
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
            "& .MuiToolbar-gutters": {
              display: "none",
            },
          }}
        >
          <DataGrid rows={pendingProperties} columns={columns} />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
