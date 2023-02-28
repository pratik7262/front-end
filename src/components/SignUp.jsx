import React, { useContext, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import userContext from "../contexts/userContext/userContext";

const Signup = () => {
  let userContextVars=useContext(userContext)
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    userContextVars.signUp(credentials.name,credentials.email,credentials.password,navigate)
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  return (
    <Grid mt={4}>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlined />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <form onSubmit={onSubmit}>
          <TextField
            fullWidth
            name="name"
            required
            value={credentials.name}
            onChange={onChange}
            label="Name"
            placeholder="Enter your name"
            sx={{ my: 1 }}
          />
          <TextField
            fullWidth
            required
            label="Email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            placeholder="Enter your email"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            required
            value={credentials.password}
            onChange={onChange}
            sx={{ my: 1 }}
            placeholder="Enter your password"
          />
          <TextField
            fullWidth
            sx={{ my: 1 }}
            name="cpassword"
            type="password"
            required
            value={credentials.cpassword}
            onChange={onChange}
            label="Confirm Password"
            placeholder="Confirm your password"
          />

          <Button type="submit" variant="contained" color="primary">
            Sign up
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Signup;
