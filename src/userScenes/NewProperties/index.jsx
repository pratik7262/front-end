import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import InvestModal from "../../components/InvestModal";
import modalContext from "../../contexts/modalContext/modalContext";
import { colors } from "../../theme";

const NewProperties = () => {
  const [property, setProperty] = useState([]);
  const [propertyInfo, setPropertyInfo] = useState({});

  const { handleOpen } = useContext(modalContext);

  const getProperties = async () => {
    let res = await fetch(
      "http://localhost:5000/api/property/approvedproperties"
    );
    let data = await res.json();
    setProperty(data.properties);
  };

  useEffect(() => {
    getProperties();
  }, [property]);

  return (
    <>
      <Grid
        p={2}
        rowSpacing={3}
        direction="row"
        columnSpacing={2}
        container
        width="100%"
      >
        {property.map((item) => {
          return (
            <Grid key={item._id} xs={12} sm={3} item>
              <Card
                sx={{
                  bgcolor: colors.primary[400],
                  width: "100%",
                  maxHeight: 450,
                }}
              >
                <img
                  src={`http://localhost:5000/${item.img}`}
                  alt={item.img}
                  style={{ width: "100%", height: 200 }}
                />
                <CardContent>
                  <Typography
                    color={colors.grey[100]}
                    textAlign="left"
                    variant="h5"
                    fontWeight={700}
                  >
                    Property Id:{item.id}
                  </Typography>
                  <Typography
                    color={colors.grey[100]}
                    textAlign="left"
                    variant="h5"
                    fontWeight={700}
                  >
                    Property:{item.title}
                  </Typography>
                  <Typography
                    color={colors.grey[100]}
                    textAlign="left"
                    variant="h5"
                    fontWeight={700}
                  >
                    Units:{item.units}
                  </Typography>
                  <Typography
                    color={colors.grey[100]}
                    textAlign="left"
                    variant="h5"
                    fontWeight={700}
                  >
                    Price Per Unit: {100}
                  </Typography>
                  <Typography
                    color={colors.grey[100]}
                    textAlign="left"
                    variant="h5"
                    fontWeight={700}
                  >
                    Rental Income: {item.rentalIncome}
                  </Typography>
                  <Typography
                    color={colors.grey[100]}
                    textAlign="left"
                    variant="h5"
                    fontWeight={700}
                  >
                    Owner: {item.userName}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    color="blue"
                    onClick={() => {
                      setPropertyInfo({
                        name: item.title,
                        sellerId: "",
                        propertyId: item._id,
                      });
                      handleOpen();
                    }}
                    variant="contained"
                  >
                    Invest
                  </Button>
                  <Button color="blue" variant="contained">
                    details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <InvestModal
        propertyInfo={propertyInfo}
        url="http://localhost:5000/api/invested/invest"
      />
    </>
  );
};

export default NewProperties;
