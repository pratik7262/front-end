import { Button, Grid, Modal, Paper, } from "@mui/material";
import React, { useContext, useState } from "react";
import investContext from "../contexts/investContext/investContext";
import modalContext from "../contexts/modalContext/modalContext";
import { colors } from "../theme";
import CustomTextField from "./CustomTextField";

const SellModal = ({ propertyInfo }) => {
  const paperStyle = {
    padding: 20,
    height: "35vh",
    margin: "20px auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: colors.primary[400],
    borderRadius: "5px",
    p: 4,
  };

  const [details, setDetails] = useState({ units: '', price: '' });
  const { disabled, setDisabled } = useContext(investContext);
  const { handleClose, sOpen } = useContext(modalContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    const response = await fetch(
      "http://localhost:5000/api/listed/listproperty",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          propertyId: propertyInfo.propertyId,
          name: propertyInfo.name,
          units: parseInt(details.units),
          price: parseInt(details.price),
          id: propertyInfo.id,
        }),
      }
    );

    const json = await response.json();

    if (json.resMSG) {
      alert(json.resMSG);
      setDisabled(false);
      handleClose();
    } else {
      alert("Some Error Occured");
      setDisabled(false);
    }
  };

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Modal
        open={sOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid
          sx={{
            bgcolor: colors.primary[400],
          }}
          mt={4}
        >
          <Paper elevation={10} sx={paperStyle}>
            <form onSubmit={onSubmit}>
              <CustomTextField
                value={details.units}
                onChange={onChange}
                fullWidth={true}
                maxWidth='340px'
                label="Units"
                name="units"
              />
               <CustomTextField
                value={details.price}
                onChange={onChange}
                fullWidth={true}
                maxWidth='340px'
                label="Price"
                name="price"
              />
              {/* <TextField
                label="Units"
                placeholder="Enter No Of Units"
                fullWidth
                required
                sx={{ my: 1 }}
                name="units"
                onChange={onChange}
              />
              <TextField
                label="Price"
                placeholder="Enter Price At which You Want To Sell"
                fullWidth
                required
                sx={{ my: 1 }}
                name="price"
                onChange={onChange}
              /> */}
              <Button
                disabled={disabled}
                type="submit"
                color="primary"
                variant="contained"
                sx={{ margin: "8px 0" }}
                fullWidth
              >
                Add To Marketplace
              </Button>
            </form>
          </Paper>
        </Grid>
      </Modal>
    </>
  );
};

export default SellModal;
