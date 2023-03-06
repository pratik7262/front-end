import {
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useContext } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import { useEffect } from "react";
import { colors } from "../../theme";
import modalContext from "../../contexts/modalContext/modalContext";
import SellModal from "../../components/SellModal";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const { handlesOpen } = useContext(modalContext);
  const [propertyInfo, setPropertyInfo] = useState({});
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
  return (
    <React.Fragment>
      
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell sx={{ color: "white" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon sx={{ color: "white" }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </TableCell>
        <TableCell sx={{ color: "white" }} align="center">
          {row.genaratedPropertyId}
        </TableCell>
        <TableCell sx={{ color: "white" }} align="center">
          {row.name}
        </TableCell>
        <TableCell sx={{ color: "white" }} align="center">
          {row.type}
        </TableCell>
        <TableCell sx={{ color: "white" }} align="center">
          {row.subtype}
        </TableCell>
        <TableCell sx={{ color: "white" }} align="center">
          {row.area}
        </TableCell>
        <TableCell sx={{ color: "white" }} align="center">
          {row.city}
        </TableCell>
        <TableCell sx={{ color: "white" }} align="center">
          {row.country}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead sx={{ bgcolor: "green.main" }}>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Units</TableCell>
                    <TableCell align="center">Price Per Unit</TableCell>
                    <TableCell align="center">Sell</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.investments.map((investment) => (
                    <TableRow key={investment._id}>
                      <TableCell
                        sx={{ color: "white" }}
                        component="th"
                        scope="row"
                      >
                        {investment.date.slice(0,10)}
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {investment.units}
                      </TableCell>
                      <TableCell sx={{ color: "white" }} align="center">
                        {investment.price}
                      </TableCell>
                      <TableCell sx={{ color: "white" }} align="center">
                        <Button
                          onClick={() => {
                            isSold(row.propertyId, row.name, investment.id);
                          }}
                          color="blue"
                          variant="contained"
                        >
                          sell
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <SellModal propertyInfo={propertyInfo} />
    </React.Fragment>
  );
}

const SampleTextFields = () => {
  const [investedProperties, setInvestedProperties] = useState([]);

  const getProperties = async () => {
    const resp = await fetch("http://localhost:5000/api/holding/getholdings", {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    const json = await resp.json();
    setInvestedProperties(json.holdings);
  };

  useEffect(() => {
    getProperties();
  }, [investedProperties]);
  return (
    <Box
      sx={{
        m:2,
        Width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TableContainer
        sx={{ bgcolor: colors.primary[400], width: "98vw" }}
        component={Paper}
      >
        <Table aria-label="collapsible table">
          <TableHead sx={{ bgcolor: "#3e4396" }}>
            <TableRow>
              <TableCell />
              <TableCell
                sx={{ fontSize: "1rem", fontWeight: 600, color: "white" }}
                align="center"
              >
                ID
              </TableCell>
              <TableCell
                sx={{ fontSize: "1rem", fontWeight: 600, color: "white" }}
                align="center"
              >
                Name
              </TableCell>
              <TableCell
                sx={{ fontSize: "1rem", fontWeight: 600, color: "white" }}
                align="center"
              >
                Type
              </TableCell>
              <TableCell
                sx={{ fontSize: "1rem", fontWeight: 600, color: "white" }}
                align="center"
              >
                Subtype
              </TableCell>
              <TableCell
                sx={{ fontSize: "1rem", fontWeight: 600, color: "white" }}
                align="center"
              >
                Area
              </TableCell>
              <TableCell
                sx={{ fontSize: "1rem", fontWeight: 600, color: "white" }}
                align="center"
              >
                City
              </TableCell>
              <TableCell
                sx={{ fontSize: "1rem", fontWeight: 600, color: "white" }}
                align="center"
              >
                Country
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {investedProperties.map((row) => {
              return <Row key={row.name} row={row} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SampleTextFields;
