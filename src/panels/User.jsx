import React, { useState } from "react";
import USidebar from "../userScenes/Global/USidebar";
import { Route, Routes } from "react-router-dom";
import { UTopbar } from "../userScenes/Global/UTopbar";
import Home from "../userScenes/Home";
import NewProperties from "../userScenes/NewProperties";
import Login from "../components/Login";
import Signup from "../components/SignUp";
import Holdings from "../userScenes/Holdings";
import AddProperty from "../userScenes/AddProperty";
import Approval from "../userScenes/Aproval/inedex";
import ApprovedProperties from "../userScenes/ApprovedProperties";
import ListedProperties from "../userScenes/ListedProperties";
import Marketplace from "../userScenes/Marketplace.jsx";
import AssetManagement from "../userScenes/AssetManagement";
import SampleTextFields from "../userScenes/Sample";

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
          <Route path="/properties" element={<NewProperties />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/properties/holdings" element={<Holdings />} />
          <Route path="/properties/sell" element={<AddProperty />} />
          <Route path="/properties/pendingapproval" element={<Approval />} />
          <Route
            path="/properties/approvedproperties"
            element={<ApprovedProperties />}
          />
          <Route
            path="/properties/listedproperties"
            element={<ListedProperties />}
          />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/assetmanagement" element={<AssetManagement />} />
          
          
          <Route path="/sample" element={<SampleTextFields/>} />
        </Routes>
      </main>
    </div>
  );
};

export default User;
