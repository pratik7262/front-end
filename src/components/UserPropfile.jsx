import {
    Button,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Menu,
    Typography,
    Box,
  } from "@mui/material";
  import React, { useContext } from "react";
  import { AccountCircleOutlined, Logout } from "@mui/icons-material";
  import { useToggle } from "../hooks/useToggle";
  import { useEffect } from "react";
  import { colors } from "../theme";
import userContext from "../contexts/userContext/userContext";
  
  export const UserProfile = () => {
    const { el, open, onClick, onClose } = useToggle();
    const {user,setUser}=useContext(userContext)
    const getUser = async () => {
      const res = await fetch("http://localhost:5000/api/auth/fetchuser", {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await res.json();
      setUser(json.user);
    };
    useEffect(() => {
      getUser();
      // eslint-disable-next-line
    }, []);
  
    const logOut = () => {
      localStorage.removeItem("token");
      window.location.reload();
      alert("logged Out Successfully");
    };
    return (
      <Box sx={{ px: 1, mt: 1 }}>
        <Button id="basic-button" onClick={onClick}>
          <AccountCircleOutlined
            sx={{ color: "neutral.light", fontSize: "30px" }}
          />
          <Typography
            ml={1}
            fontWeight={600}
            sx={{ color: colors.grey[100] }}
            variant="h3"
          >
            {user.name}
          </Typography>
        </Button>
        <Menu
          anchorEl={el}
          id="basic-menu"
          open={open}
          onClose={onClose}
          MenuListProps={{ "aria-labelledby": "basic-button" }}
        >
          <ListItem onClick={logOut} sx={{ pt: 1, pb: 1 }} alignItems="center">
            <ListItemAvatar>
              <Logout sx={{ color: colors.primary[400], fontSize: "30px" }} />
            </ListItemAvatar>
            <ListItemText primary="Log Out" />
          </ListItem>
        </Menu>
      </Box>
    );
  };
  