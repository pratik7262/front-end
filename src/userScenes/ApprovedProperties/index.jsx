import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { colors } from "../../theme";

const ApprovedProperties = () => {
  const [approvedProperties, setApprovedProperties] = useState([]);
  const fetchData = async () => {
    const responce = await fetch(
      "http://localhost:5000/api/property/specificapprovedproperties",
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    const json = await responce.json();
    setApprovedProperties(json.properties);
  };
  useEffect(() => {
    fetchData();
  }, [approvedProperties]);

  const columns = [
    {
      field: "id",
      headerName: "id",
      flex: 1,
      renderCell: ({ row: { id } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {id}
          </Typography>
        );
      },
    },
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
      flex: 1,
      renderCell: ({ row: { date } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {date.slice(0, 10)}
          </Typography>
        );
      },
    },
    {
      field: "units",
      headerName: "Units",
      flex: 1,
      renderCell: ({ row: { price } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {price / 100}
          </Typography>
        );
      },
    },
    {
      field: "type",
      headerName: "Type",
      headerAlign: "center",
      flex: 1,
      type: Date,
      align: "center",
      renderCell: ({ row: { type } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {type}
          </Typography>
        );
      },
    },
    {
      field: "subtype",
      headerName: "Subtype",
      headerAlign: "center",
      flex: 1,
      type: Date,
      align: "center",
      renderCell: ({ row: { subtype } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {subtype}
          </Typography>
        );
      },
    },
    {
      field: "country",
      headerName: "Country",
      headerAlign: "center",
      flex: 1,
      type: Date,
      align: "center",
      renderCell: ({ row: { country } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {country}
          </Typography>
        );
      },
    },
    {
      field: "city",
      headerName: "city",
      headerAlign: "center",
      type: Date,
      align: "center",
      renderCell: ({ row: { city } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {city}
          </Typography>
        );
      },
    },
    {
      field: "area",
      headerName: "Area",
      headerAlign: "center",
      type: Date,
      align: "center",
      renderCell: ({ row: { area } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {area}
          </Typography>
        );
      },
    },
    {
      field: "price",
      headerName: "Seeling Price",
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
      field: "approved",
      headerName: "Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: () => {
        return (
          <Button color="green" variant="contained">
            Approved
          </Button>
        );
      },
    },
  ];

  return (
    <Box m={2}>
      <Header title="Approved Properties" />
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

export default ApprovedProperties;
