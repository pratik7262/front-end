import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../scenes/userScenes/Home";
import  NewProperties  from "../scenes/userScenes/NewProperties";
import SampleTextFields from "../scenes/userScenes/Sample";
import AddProperty from "../scenes/userScenes/AddProperty";
import  ApprovedProperties from "../scenes/userScenes/ApprovedProperties";
import  ListedProperties  from "../scenes/userScenes/ListedProperties";
import  Marketplace from "../scenes/userScenes/Marketplace";
import  AssetManagement from "../scenes/userScenes/AssetManagement";
import  Login  from "../components/Login";
import  Signup  from "../components/SignUp";
import { UTopbar} from "../scenes/userScenes/Global/UTopbar";
import USidebar from "../scenes/userScenes/Global/USidebar";
import Approval from "../scenes/userScenes/Approval/inedex";


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

          <Route path="/sample" element={<SampleTextFields />} />
        </Routes>
      </main>
    </div>
  );
};

export default User;
