import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../scenes/adminScenes/Dashboard";
import AssetManagement from "../scenes/adminScenes/AssetManagement";
import  ASidebar from "../scenes/adminScenes/Global/ASidebar";
import { ATopbar } from "../scenes/adminScenes/Global/ATopbar";
import { History } from "../components/History";


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
          <Route path="/" element={<Dashboard />} />
          <Route path="/assetmanagement" element={<AssetManagement />} />
          <Route path="/history" element={<History url="http://localhost:5000/api/history/gethistory"/>} />
        </Routes>
      </main>
    </div>
  );
};

export default Admin;
