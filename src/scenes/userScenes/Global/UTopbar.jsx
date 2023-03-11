import { Box, Button,  Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { UserProfile } from "../../../components/UserPropfile";
import { colors } from "../../../theme";

const Pages = ({ to, text, onClick }) => {
  return (
    <Link onClick={onClick} style={{ textDecoration: "none" }} to={to}>
      <Typography
        sx={{ color: colors.grey[100], fontWeight: 700 }}
        variant="h5"
      >
        {text}
      </Typography>
    </Link>
  );
};

export const UTopbar = ({ setDisplayNone, setDisplayBlock }) => {
  return (
    <>
      <Box
        display="flex"
        position="sticky"
        top="0"
        bgcolor={colors.primary[400]}
        justifyContent="space-between"
        alignItems="center"
        p={1}
        zIndex={2}
      >
        <Box
          display="flex"
          width="600px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Pages to="/" text="Home" onClick={setDisplayBlock} />
          <Pages
            to="/properties"
            text="New Properties"
            onClick={setDisplayBlock}
          />
          <Pages
            to="/marketplace"
            text="Marketplace"
            onClick={setDisplayBlock}
          />
          <Pages
            to="/assetmanagement"
            text="Asset Management"
            onClick={setDisplayBlock}
          />
          <Pages to="/about" text="About Us" onClick={setDisplayNone} />
          <Pages to="/help" text="Help" onClick={setDisplayNone} />
        </Box>
        {localStorage.getItem("token") ? (
          <Box>
            <UserProfile />
          </Box>
        ) : (
          <Box display="flex" width="150px" justifyContent="space-between">
            <Link style={{ textDecoration: "none" }} to="/login">
              <Button variant="contained" color="secondary">
                Login
              </Button>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/signup">
              <Button variant="contained" color="success">
                Sign Up
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </>
  );
};
