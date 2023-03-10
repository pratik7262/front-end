import { Button, Grid, Modal, Paper } from "@mui/material";
import React, { useContext, useState } from "react";
import investContext from "../contexts/investContext/investContext";
import modalContext from "../contexts/modalContext/modalContext";
import { colors } from "../theme";
import CustomTextField from "./CustomTextField";

const InvestModal = ({ propertyInfo, url }) => {
  const { open, handleClose } = useContext(modalContext);
  const { disabled, setDisabled, invest } = useContext(investContext);
  const { name, price, user, propertyId } = propertyInfo;
  const paperStyle = {
    padding: 20,
    height: "30vh",
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

  const [units, setUnits] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    invest(name, price, user, units, propertyId, url, handleClose);
  };

  const onChange = (e) => {
    setUnits(e.target.value);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid mt={4}>
          <Paper elevation={10} sx={paperStyle}>
            <form onSubmit={onSubmit}>
              {/* <TextField
                label="Units"
                placeholder="Enter No Of Units"
                fullWidth
                required
                sx={{ my: 1 }}
                name="units"
                onChange={onChange}
              /> */}
              <CustomTextField
                value={units}
                onChange={onChange}
                fullWidth={true}
                maxWidth="340px"
                label="Units"
                name="units"
              />
              <Button
                disabled={disabled}
                type="submit"
                color="primary"
                variant="contained"
                sx={{ margin: "8px 0" }}
                fullWidth
              >
                Invest
              </Button>
            </form>
          </Paper>
        </Grid>
      </Modal>
    </>
  );
};

export default InvestModal;
