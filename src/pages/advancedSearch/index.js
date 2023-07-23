/* 
Author: Yue Wu
Created At: 05/11/2022
*/

/* eslint-disable */
import * as React from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import TabPanel from "components/TabPanel";
import DataTable from "examples/Tables/DataTable";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDDatePicker from "components/MDDatePicker";
import Select from "@mui/material/Select";

import { useEffect, useState, useRef } from "react";
// import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import TasksResult from "pages/advancedSearch/data/taskData.js";
import UsersResult from "pages/advancedSearch/data/userData.js";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import { getAvailTags } from "api/fetch";
import { TagSharp } from "@mui/icons-material";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function AdvancedSearch() {
  const [value, setValue] = React.useState(0);
  const [change, setChange] = React.useState(false);
  const [taskID, setTaskID] = React.useState("");
  const [taskName, setTaskName] = React.useState("");
  const [taskDesc, setTaskDesc] = React.useState("");
  const [message, setMessage] = React.useState(false);
  const [deadline, setDeadline] = React.useState("");
  const [searchObj, setSearchObj] = React.useState({});
  const [userID, setUserID] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userTag, setUserTag] = React.useState("");
  const [userObj, setUserObj] = React.useState({});
  const [showUser, setShowUser] = React.useState(false);
  const [tags, setTags] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(async () => {
    try {
      const { data: dataTags } = await getAvailTags();
      setTags(dataTags.map(({ tag_name }) => tag_name));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleClick = () => {
    let searchObj = {};
    searchObj.taskID = taskID === "" ? null : taskID;
    searchObj.taskName = taskName === "" ? null : taskName;
    searchObj.taskDesc = taskDesc === "" ? null : taskDesc;
    searchObj.deadline = deadline === "" ? null : deadline;
    setSearchObj(searchObj);
    setMessage(true);
  };

  const handleUserClick = () => {
    let userObj = {};
    console.log(userID);
    console.log(userName);
    console.log(userTag);
    console.log(userEmail);

    userObj.userID = userID === "" ? null : userID;
    userObj.userName = userName === "" ? null : userName;
    userObj.userEmail = userEmail === "" ? null : userEmail;
    userObj.userTag = userTag === "" ? null : userTag;
    setUserObj(userObj);
    setShowUser(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Search Tasks" {...a11yProps(0)} />
                  <Tab label="Search Users" {...a11yProps(1)} />
                </Tabs>
              </MDBox>
              <MDBox pt={3}>
                <TabPanel value={value} index={0}>
                  <Grid
                    container
                    spacing={3}
                    justifyContent="center"
                    sx={{ width: "50%" }}
                    mx="auto"
                  >
                    <Grid item xs={12} md={12} lg={12}>
                      <MDBox textAlign="center">
                        <MDInput
                          label="Task ID"
                          value={taskID}
                          onChange={(e) => setTaskID(e.target.value)}
                          fullWidth
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <MDBox textAlign="center">
                        <MDInput
                          label="Task Name"
                          value={taskName}
                          onChange={(e) => setTaskName(e.target.value)}
                          fullWidth
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <MDBox textAlign="center">
                        <MDInput
                          label="Task Description"
                          value={taskDesc}
                          onChange={(e) => setTaskDesc(e.target.value)}
                          fullWidth
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <MDBox textAlign="center">
                        <TextField
                          id="date"
                          label="deadline"
                          defaultValue=""
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          size="small"
                          onChange={(e) => setDeadline(e.target.value)}
                          fullWidth
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <MDBox textAlign="center" onClick={handleClick}>
                        <MDButton variant="contained" color="info">
                          Search
                        </MDButton>
                      </MDBox>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Grid
                    container
                    spacing={3}
                    justifyContent="center"
                    sx={{ width: "50%" }}
                    mx="auto"
                  >
                    <Grid item xs={12} md={12} lg={12}>
                      <MDBox textAlign="center">
                        <MDInput
                          label="User ID"
                          value={userID}
                          onChange={(e) => setUserID(e.target.value)}
                          fullWidth
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <MDBox textAlign="center">
                        <MDInput
                          label="User Name"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          fullWidth
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <MDBox textAlign="center">
                        <MDInput
                          label="user Email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          fullWidth
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <MDBox textAlign="center">
                        <FormControl variant="standard" sx={{ minWidth: 120 }}>
                          <InputLabel id="demo-simple-select-standard-label">Tag</InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Age"
                            value={userTag}
                            onChange={(e) => setUserTag(e.target.value)}
                          >
                            {tags.map((tag, idx) => {
                              return <MenuItem value={tag}>{tag}</MenuItem>;
                            })}
                          </Select>
                        </FormControl>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <MDBox textAlign="center" onClick={handleUserClick}>
                        <MDButton variant="contained" color="info">
                          Search
                        </MDButton>
                      </MDBox>
                    </Grid>
                  </Grid>
                </TabPanel>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
        {message && value === 0 && <TasksResult searchObj={searchObj} />}
        {showUser && value === 1 && <UsersResult userObj={userObj} />}
      </MDBox>
    </DashboardLayout>
  );
}

export default AdvancedSearch;
