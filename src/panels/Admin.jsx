import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AssetManagement from "../adminScenes/AssetManagement";
import Dashboard from "../adminScenes/Dashboard";
import ASidebar from "../adminScenes/Global/ASidebar";
import { ATopbar } from "../adminScenes/Global/ATopbar";
import Login from "../components/Login";
import Signup from "../components/SignUp";

const Admin = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="app">
      <ASidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        className="content"
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflowY: "scroll",
        }}
      >
        <ATopbar />
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/assetmanagement" element={<AssetManagement/>}/>
        </Routes>
      </main>
    </div>
  );
};

export default Admin;
