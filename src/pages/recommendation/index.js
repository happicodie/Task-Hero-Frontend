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

import DataTable from "examples/Tables/DataTable";
import MDDatePicker from "components/MDDatePicker";
import Select from "@mui/material/Select";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useNavigate } from "react-router-dom";
import * as React from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import HorizontalTeamCard from "examples/MKCards/TeamCards/HorizontalTeamCard";
import team4 from "assets/images/ivana-square.jpg";
import Tasks from "pages/search/data/taskData";
import UsersResult from "pages/recommendation/data/userData.js";
import { useEffect, useState } from "react";

import { editProfile, getProfile, getAvailTags, recommendation } from "api/fetch";

import CustomNoRowsOverlay from "components/RowOverlay";

import {
  DataGrid,
  gridClasses,
  GridToolbarQuickFilter,
  GridLinkOperator,
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

function Recommendation() {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState(false);
  // const { columns: pColumns, rows: pRows } = Tasks(false, "not started");
  const [searchKey, setSearchKey] = React.useState("");
  const [keyValue, setKeyValue] = React.useState("");
  const [userTag, setUserTag] = React.useState("");
  const [userObj, setUserObj] = React.useState({});
  const [tags, setTags] = React.useState([]);

  const handleClick = () => {
    let userObj = {};
    userObj.userTag = userTag;
    setUserObj(userObj);
    setMessage(true);
  };

  useEffect(async () => {
    try {
      const { data: dataTags } = await getAvailTags();
      console.log(dataTags);
      setTags(dataTags.map(({ tag_name }) => tag_name));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3} justifyContent="center" mx="auto">
          <Grid item xs={12} md={12} lg={12}>
            <MDBox textAlign="center">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Tag</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Age"
                  value={userTag}
                  onChange={(e) => setUserTag(e.target.value)}
                >
                  <MenuItem id="tags" value={"All Tags"}>
                    All Tags
                  </MenuItem>
                  {tags.map((tag, idx) => {
                    return <MenuItem value={tag}>{tag}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <MDBox textAlign="center" onClick={handleClick}>
              <MDButton>Recommend</MDButton>
            </MDBox>
            <MDBox mt={5} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                recommendation results
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
        {message && <UsersResult userObj={userObj} />}
      </MDBox>
    </DashboardLayout>
  );
}

export default Recommendation;
