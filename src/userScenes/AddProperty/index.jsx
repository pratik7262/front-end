import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import CustomSelect from "../../components/CustomSelect";
import CustomTextField from "../../components/CustomTextField";
import investContext from "../../contexts/investContext/investContext";
import propertyContext from "../../contexts/propertyContext/propertyContext";
import { resizeFile } from "../../resizer";
import { colors } from "../../theme";

const AddProperty = () => {
  const { addProperty } = useContext(propertyContext);
  const { disabled, setDisabled } = useContext(investContext);
  const [img, setImg] = useState("");
  const [subtypeArr, setSubtyArr] = useState([{name:"Select Type First",objectId:'dkjsfinw',disabled:true}]);
  const [countries, setCountries] = useState([]);
  const [details, setDetails] = useState({
    title: "",
    description: "",
    address: "",
    country: "",
    zipCode: "",
    state: "",
    rentalIncome: "",
    city: "",
    price: "",
    area: "",
    type: "",
    subtype: "",
  });

  const type = [
    { name: "Residential", objectId:"type1" },
    { name: "Commercial" , objectId:"type2"},
    { name: "Land" , objectId:"type3"},
  ];

  const formData = new FormData();
  formData.append("type", details.type);
  formData.append("subtype", details.subtype);
  formData.append("title", details.title);
  formData.append("description", details.description);
  formData.append("address", details.address);
  formData.append("city", details.city);
  formData.append("price", details.price);
  formData.append("area", details.area);
  formData.append("rentalIncome", details.rentalIncome);
  formData.append("country", details.country);
  formData.append("zipCode", details.zipCode);

  formData.append("img", img);
  const onSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    addProperty(formData, setDisabled);
  }; // on submit the data to our api

  const getCountries = async () => {
    const response = await fetch(
      "https://parseapi.back4app.com/classes/Country?limit=250&keys=name",
      {
        headers: {
          "X-Parse-Application-Id": "mxsebv4KoWIGkRntXwyzg6c6DhKWQuit8Ry9sHja", // This is the fake app's application id
          "X-Parse-Master-Key": "TpO0j3lG2PmEVMXlKYQACoOXKQrL3lwM0HwR9dbH", // This is the fake app's readonly master key
        },
      }
    );
    const data = await response.json(); // Here you have the data that you need

    setCountries(data.results);
  }; //gets the all countries

  const onChange = (e) => {
    if (e.target.name === "type") {
      if (e.target.value === "Residential") {
        setSubtyArr([
          { name: "Individual Home", objectId:'sadfwrfcvs'},
          { name: "Apartment" , objectId:'wefwfds'},
          { name: "Townhouse", objectId:'dfsfew' },
          { name: "Villa" , objectId:'d;kwe'},
        ]);
      } else if (e.target.value === "Commercial") {
        setSubtyArr([
          { name: "Single Shop", objectId:'weqdsdq1' },
          { name: "Complex" , objectId:'weqdsdq2'},
          { name: "Warehouse", objectId:'weqdsdq3' },
          { name: "Storage House", objectId:'weqdsdq4' },
        ]);
      } else if (e.target.value === "Land") {
        setSubtyArr([
          { name: "Agricultural" ,objectId:'formawoefk1' },
          { name: "Commericial"  ,objectId:'formawoefk2'},
          { name: "Residential"  ,objectId:'formawoefk3'},
          { name: "Industrial",objectId:'formawoefk4' },
        ]);
      }
      setDetails({ ...details, [e.target.name]: e.target.value });
    } else {
      setDetails({ ...details, [e.target.name]: e.target.value });
    }
  };

  const imageOnchange = async (e) => {
    try {
      const file = e.target.files[0];
      const image = await resizeFile(file);
      setImg(image);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <>
      <Box m="10px 10px 0">
        <Container>
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <Box
              my={4}
              borderRadius={1}
              p={2}
              sx={{ bgcolor: colors.primary[400] }}
            >
              <Typography variant="h3" mb={2} color={colors.grey[100]}>
                Property Details
              </Typography>
              <Stack spacing={3} alignItems="center" direction="row">
                <CustomSelect
                  value={details.type}
                  onChange={onChange}
                  label="Type"
                  name="type"
                  arr={type}
                />
                <CustomSelect
                  value={details.subtype}
                  onChange={onChange}
                  label="Subtype"
                  name="subtype"
                  arr={subtypeArr}
                />
              </Stack>
              <Stack spacing={3} mt={1} alignItems="center" direction="row">
                <CustomTextField
                  value={details.title}
                  onChange={onChange}
                  label="Title"
                  name="title"
                />
                <CustomTextField
                  value={details.description}
                  onChange={onChange}
                  label="Description"
                  name="description"
                />
                <CustomTextField
                  value={details.address}
                  onChange={onChange}
                  label="Address"
                  name="address"
                />
              </Stack>

              <Stack spacing={3} alignItems="center" direction="row">
                <CustomTextField
                  value={details.price}
                  onChange={onChange}
                  label="Price"
                  name="price"
                />
                <CustomTextField
                  value={details.area}
                  onChange={onChange}
                  label="Area"
                  name="area"
                />
                <CustomTextField
                  value={details.rentalIncome}
                  onChange={onChange}
                  label="Rental Income"
                  name="rentalIncome"
                />
              </Stack>

              <Stack mt={1} spacing={3} alignItems="center" direction="row">
                <CustomSelect
                  value={details.country}
                  onChange={onChange}
                  label="Country"
                  name="country"
                  arr={countries}
                />
                <CustomTextField onChange={onChange} label="City" name="city" />
                <CustomTextField
                  onChange={onChange}
                  label="Zip Code"
                  name="zipCode"
                />
              </Stack>
              <Box mt={3} display="flex" alignItems="center">
                <Typography variant="h4" mr={2} color={colors.grey[100]}>
                  Add Picture :
                </Typography>
                <TextField
                  sx={{
                    my: 1,
                    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                      {
                        color: colors.grey[100],
                      },
                    "& .css-4zl7km-MuiFormLabel-root-MuiInputLabel-root": {
                      color: colors.grey[100],
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: colors.grey[100],
                      },
                    },
                  }}
                  type="file"
                  onChange={imageOnchange}
                  // onChange={
                  //   (e) => {
                  //     setImg(e.target.files[0]);
                  //   }}
                />
              </Box>
              <Button
                disabled={disabled}
                type="submit"
                sx={{ mt: 2 }}
                variant="contained"
                size="large"
              >
                Send For Approval
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default AddProperty;
