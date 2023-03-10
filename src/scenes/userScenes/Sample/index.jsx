import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
// import DetailsModal from "./DetailsModal";
// import SellModal from "./SellModal";
import modalContext from "../../contexts/modalContext/modalContext";
import { Header } from "../../components/Header";
import { colors } from "../../theme";
import DetailsModal from "../../components/DetailsModal";
import SellModal from "../../components/SellModal";

function Holdings() {
  const { handleOpen, handlesOpen } = useContext(modalContext);
  const [propertyInfo, setPropertyInfo] = useState({}); //sets property info of details and invest modal
  const [investedProperties, setInvestedProperties] = useState([]); //states all invested properties

  const isSold = async (propertyId, name, id) => {
    const res = await fetch(
      `http://localhost:5000/api/property/issold/${propertyId}`
    );
    const json = await res.json();
    if (!json.sold) {
      alert("Property Is Not Sold Yet.");
    } else {
      setPropertyInfo({ propertyId: propertyId, name: name, id: id });
      handlesOpen();
    }
  };

  const getProperties = async () => {
    const resp = await fetch(
      "http://localhost:5000/api/invested/specificinvestedproperty",
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    const json = await resp.json();
    setInvestedProperties(json.investedProperty);
  };

  //function for getting details
  const getDetails = async (propertyId) => {
    const responce = await fetch(
      `http://localhost:5000/api/property/propertyinfo/${propertyId}`
    );

    const json = await responce.json();
    setPropertyInfo(json);
  };

  useEffect(() => {
    getProperties();
  }, [investedProperties]);

  const columns = [
    {
      field: "genaratedPropertyId",
      headerName: "id",
      flex: 1,
      renderCell: ({ row: { genaratedPropertyId } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
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
          <Typography variant="h5" color={colors.grey[100]}>
            {name}
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
          <Typography variant="h5" color={colors.grey[100]}>
            {units}
          </Typography>
        );
      },
    },
    {
      field: "price",
      headerName: "Price Per Unit",
      headerAlign: "left",
      type: Date,
      align: "left",
      renderCell: ({ row: { price } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
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
          <Button
            color="blue"
            onClick={() => {
              handleOpen();
              getDetails(propertyId);
            }}
            variant="contained"
          >
            details
          </Button>
        );
      },
    },
    {
      field: "sell",
      headerName: "Sell Property",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { propertyId, name, id } }) => {
        return (
          <Button
            onClick={() => {
              isSold(propertyId, name, id);
            }}
            color="blue"
            variant="contained"
          >
            sell
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Box m="10px 10px 0">
        <Header title="Holdings" />
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
            "& .MuiToolbar-gutters": {
              display: "none",
            },
          }}
        >
          <DataGrid rows={investedProperties} columns={columns} />
          <SellModal propertyInfo={propertyInfo} />
          <DetailsModal property={propertyInfo} />
        </Box>
      </Box>
    </>
  );
}

export default Holdings;