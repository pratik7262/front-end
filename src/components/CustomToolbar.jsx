import {
  GridToolbarContainer,
  GridToolbarExport,
  // GridToolbarFilterButton,
  // GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import React from "react";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
      {/* <GridToolbarFilterButton /> */}
      {/* <GridToolbarQuickFilter /> */}
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
