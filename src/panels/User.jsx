import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../scenes/userScenes/Home";
import AddProperty from "../scenes/userScenes/AddProperty";
import ApprovedProperties from "../scenes/userScenes/ApprovedProperties";
import ListedProperties from "../scenes/userScenes/ListedProperties";
import AssetManagement from "../scenes/userScenes/AssetManagement";
import Login from "../components/Login";
import Signup from "../components/SignUp";
import { UTopbar } from "../scenes/userScenes/Global/UTopbar";
import USidebar from "../scenes/userScenes/Global/USidebar";
import Approval from "../scenes/userScenes/Approval/inedex";
import Holdings from "../scenes/userScenes/Holdings";
import { History } from "../scenes/commonScenes/History";
import Marketplace from "../scenes/commonScenes/Marketplace";
import NewProperties from "../scenes/commonScenes/NewProperties";

const User = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="app">
      <USidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        className="content"
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflowY: "scroll",
        }}
      >
        <UTopbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newproperties" element={<NewProperties />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/newproperty/addproperty" element={<AddProperty />} />
          <Route path="/newproperty/pendingapproval" element={<Approval />} />
          <Route
            path="/newproperty/approvedproperties"
            element={<ApprovedProperties />}
          />
          <Route path="/portfolio/holdings" element={<Holdings />} />
          <Route
            path="/portfolio/listedproperties"
            element={<ListedProperties />}
          />
          <Route
            path="assetmanagement/rentalincome"
            element={<AssetManagement />}
          />
          <Route
            path="/assetmanagement/marketplace"
            element={<Marketplace />}
          />
          <Route
            path="/history"
            element={
              <History
                url="http://localhost:5000/api/history/getspecifichistory"
                token={localStorage.getItem("token")}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default User;
