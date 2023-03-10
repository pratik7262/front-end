import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import CustomToolbar from "../../../components/CustomToolbar";
import { Header } from "../../../components/Header";
import InvestModal from "../../../components/InvestModal";
import modalContext from "../../../contexts/modalContext/modalContext";
import userContext from "../../../contexts/userContext/userContext";
import { colors } from "../../../theme";

function Marketplace() {
  const { handleOpen } = useContext(modalContext);
  const contextVars = useContext(userContext);
  const [propertyInfo, setPropertyInfo] = useState({});
  const [listedProperties, setListedProperties] = useState([]);
  const getProperties = async () => {
    const resp = await fetch(
      "http://localhost:5000/api/listed/alllistedproperty",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await resp.json();
    setListedProperties(json.listedProperty);
  };
  useEffect(() => {
    getProperties();
  }, [listedProperties]);

  const columns = [
    {
      field: "genaratedPropertyId",
      headerName: "id",
      flex: 1,
      renderCell: ({ row: { genaratedPropertyId } }) => {
        return (
          <Typography variant="h6" color={colors.grey[100]}>
            {genaratedPropertyId}
          </Typography>
        );
      },
    },
    {
      field: "name",
      headerName: "Property",
      flex: 1,
      renderCell: ({ row: { name } }) => {
        return (
          <Typography variant="h6" color={colors.grey[100]}>
            {name}
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
          <Typography variant="h6" color={colors.grey[100]}>
            {date.slice(0, 10)}
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
          <Typography variant="h6" color={colors.grey[100]}>
            {userName}
          </Typography>
        );
      },
    },
    {
      field: "units",
      headerName: "Units",
      headerAlign: "left",
      type: Date,
      align: "left",
      renderCell: ({ row: { units } }) => {
        return (
          <Typography variant="h6" color={colors.grey[100]}>
            {units}
          </Typography>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      headerAlign: "left",
      type: Date,
      align: "left",
      renderCell: ({ row: { price } }) => {
        return (
          <Typography variant="h6" color={colors.grey[100]}>
            {price}
          </Typography>
        );
      },
    },
    {
      field: "details",
      headerName: "Details",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { propertyId } }) => {
        return (
          <Button color="blue" variant="contained">
            details
          </Button>
        );
      },
    },
    {
      field: "invest",
      headerName: "Invest Property",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { propertyId, name, user, price } }) => {
        // let isOwner = false;
        // const setIsOwner = () => {
        //   if (user === localStorage.getItem("userId")) {
        //     isOwner = true;
        //     return isOwner;
        //   }
        //   return false;
        // };
        return (
          <Button
            // disabled={setIsOwner()}
            onClick={() => {
              setPropertyInfo({ propertyId, name, user, price });
              handleOpen();
            }}
            color="blue"
            variant="contained"
            disabled={contextVars.user.isAdmin }
          >
            Invest
          </Button>
        );
      },
    },
  ];
  return (
    <>
      <Box m={2}>
        <Header title="Marketplace" />
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
              fontWeight: 600,
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
            "& .MuiToolbar-gutters": {
              display: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text ": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <DataGrid
            rows={listedProperties}
            columns={columns}
            disableSelectionOnClick
            components={{ Toolbar: CustomToolbar }}
          />
          <InvestModal
            propertyInfo={propertyInfo}
            url="http://localhost:5000/api/invested/investinlistedproperty"
          />
        </Box>
      </Box>
    </>
  );
}

export default Marketplace;
