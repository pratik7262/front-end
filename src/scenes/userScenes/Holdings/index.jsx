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
import SellModal from "../../../components/SellModal";
import { colors } from "../../../theme";
import modalContext from "../../../contexts/modalContext/modalContext";
import { Header } from "../../../components/Header";

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const tableCellSX = { color: "black", fontSize: "0.8rem", fontWeight: 600 };
  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset", bgcolor: "green.main" } }}
      >
        <TableCell sx={{ color: "white" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon sx={tableCellSX} />
            ) : (
              <KeyboardArrowDownIcon sx={tableCellSX} />
            )}
          </IconButton>
        </TableCell>
        <TableCell sx={tableCellSX} align="center">
          {row.genaratedPropertyId}
        </TableCell>
        <TableCell sx={tableCellSX} align="center">
          {row.name}
        </TableCell>
        <TableCell sx={tableCellSX} align="center">
          {row.type}
        </TableCell>
        <TableCell sx={tableCellSX} align="center">
          {row.subtype}
        </TableCell>
        <TableCell sx={tableCellSX} align="center">
          {row.area}
        </TableCell>
        <TableCell sx={tableCellSX} align="center">
          {row.city}
        </TableCell>
        <TableCell sx={tableCellSX} align="center">
          {row.country}
        </TableCell>
      </TableRow>
      <TableRow
        sx={{
          "& .css-1dbhpuz-MuiTableCell-root": {
            border: "none",
          },
        }}
      >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table sx={{ ml: "9vw" }} size="small" aria-label="purchases">
                <TableHead sx={{ bgcolor: "#3e4396" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>Date</TableCell>
                    <TableCell sx={{ color: "white" }}>Units</TableCell>
                    <TableCell sx={{ color: "white" }} align="center">
                      Price Per Unit
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="center">
                      Sell
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ border: "none" }}>
                  {row.investments.map((investment) => {
                    return (
                      <TableRow
                        sx={{
                          border:'none'
                        }}
                        key={investment._id}
                      >
                        <TableCell
                          sx={{ color: "white" }}
                          component="th"
                          scope="row"
                        >
                          {investment.date.slice(0, 10)}
                        </TableCell>
                        <TableCell sx={{ color: "white" }}>
                          {investment.units}
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="center">
                          {investment.price}
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="center">
                          <Button
                            disabled={!row.isSold}
                            color="blue"
                            variant="contained"
                            onClick={() => {
                              props.setPropertyInfo({
                                propertyId: row.propertyId,
                                name: row.name,
                                id: investment.id,
                              });
                              props.handlesOpen();
                            }}
                          >
                            sell
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const Holdings = () => {
  const [investedProperties, setInvestedProperties] = useState([]);
  const { handlesOpen } = useContext(modalContext);
  const [propertyInfo, setPropertyInfo] = useState({});

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
    <Box m={2}>
      <Header title="Holdings" />
      <TableContainer
        sx={{ bgcolor: colors.primary[400], m: "40px 0 0 0", height: "75vh" }}
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
              return (
                <Row
                  setPropertyInfo={setPropertyInfo}
                  handlesOpen={handlesOpen}
                  key={row.name}
                  row={row}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <SellModal propertyInfo={propertyInfo} />
    </Box>
  );
};

export default Holdings;
