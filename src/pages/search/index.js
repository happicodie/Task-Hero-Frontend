/**
 * Author: Yue Wu
 * Created At: 20 Oct 2022
 */

/* eslint-disable */
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useNavigate } from "react-router-dom";
import * as React from "react";

import DataTable from "examples/Tables/DataTable";

import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import HorizontalTeamCard from "examples/MKCards/TeamCards/HorizontalTeamCard";
import team4 from "assets/images/ivana-square.jpg";
import Tasks from "pages/search/data/taskData";
import TasksResult from "pages/search/data/taskData.js";

import CustomNoRowsOverlay from "components/RowOverlay";

import {
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <QuickSearchToolbar />
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}
function QuickSearchToolbar() {
  return (
    <MDBox
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter
        helperText="Search keywords by using , to split values."
        quickFilterParser={(searchInput) =>
          searchInput
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "")
        }
      />
    </MDBox>
  );
}

function Search() {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState(false);
  const { columns: pColumns, rows: pRows } = Tasks(false, "not started");
  const [taskID, setTaskID] = React.useState("");
  const [taskName, setTaskName] = React.useState("");
  const [searchKey, setSearchKey] = React.useState("");
  const [keyValue, setKeyValue] = React.useState("");

  const handleClick = () => {
    setSearchKey(keyValue);
    setMessage(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3} justifyContent="center" sx={{ width: "50%" }} mx="auto">
          <Grid item xs={12} md={12} lg={12}>
            <MDBox textAlign="center">
              <MDInput
                label="Search for Anything, eg. username, taskname..."
                value={keyValue}
                onChange={(e) => setKeyValue(e.target.value)}
                fullWidth
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <MDBox textAlign="center" onClick={handleClick}>
              <MDButton>Search</MDButton>
            </MDBox>
            <MDBox mt={5} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                search results
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
        {message && <TasksResult searchKey={searchKey} />}
      </MDBox>
    </DashboardLayout>
  );
}

export default Search;
