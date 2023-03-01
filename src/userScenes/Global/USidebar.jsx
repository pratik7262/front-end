import {
  AddBusinessOutlined,
  BallotOutlined,
  CheckCircleOutline,
  MenuOutlined,
  PendingOutlined,
  VolunteerActivismOutlined,
} from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import { colors } from "../../theme";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      icon={icon}
      style={{ color: colors.grey[100], margin: "20px 0" }}
      onClick={() => {
        setSelected(title);
      }}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const USidebar = ({ isCollapsed, setIsCollapsed }) => {
  const [selected, setSelected] = useState("Dashboard");
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
            icon={isCollapsed ? <MenuOutlined /> : undefined}
            style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h4" fontWeight={700}>
                  Comapny Name
                </Typography>
                <IconButton
                  onClick={() => {
                    setIsCollapsed(!isCollapsed);
                  }}
                  sx={{ color: colors.grey[100] }}
                >
                  <MenuOutlined />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Box
            sx={{
              mt: "50px",
            }}
            paddingLeft={isCollapsed ? undefined : "10%"}
          >
            <Item
              to="/properties/sell"
              icon={<AddBusinessOutlined sx={{ color: colors.grey[100] }} />}
              title="Add Property"
              selected={selected}
                setSelected={setSelected}
            />
            <Item
              to="/properties/pendingapproval"
              icon={<PendingOutlined sx={{ color: colors.grey[100] }} />}
              title="Pending Approvals"
              selected={selected}
                setSelected={setSelected}
            />
            <Item
              to="/properties/approvedproperties"
              icon={<CheckCircleOutline sx={{ color: colors.grey[100] }} />}
              title="Approved Properties"
              selected={selected}
                setSelected={setSelected}
            />
            <Item
              to="/properties/holdings"
              icon={
                <VolunteerActivismOutlined sx={{ color: colors.grey[100] }} />
              }
              title="Holdings"
              selected={selected}
                setSelected={setSelected}
            />
            <Item
              to="/properties/listedproperties"
              icon={<BallotOutlined sx={{ color: colors.grey[100] }} />}
              title="Listed Properties"
              selected={selected}
                setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default USidebar;
