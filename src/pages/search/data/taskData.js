/**
 * Author: Yue Wu
 * Created At: 20 Oct 2022
 */

/* eslint-disable */
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDInput from "components/MDInput";
import * as React from "react";
import DataTable from "examples/Tables/DataTable";

import { globalSearch, getProfile } from "api/fetch";

// react-router components
import { NavLink } from "react-router-dom";
import Chip from "@mui/material/Chip";

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

// MUI components
import Stack from "@mui/material/Stack";

// MUI data grid components
import { gridStringOrNumberComparator } from "@mui/x-data-grid";

import { useState, useEffect } from "react";

// API helper function
import { getTasks, getTasksOther } from "api/fetch";

// Images
import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";
import userImg from "assets/images/user.png";

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

export default function TasksResult({ searchKey }) {
  const [myRows, setMyRows] = useState([]);
  const [profiles, setProfiles] = React.useState([]);

  useEffect(async () => {
    if (searchKey != undefined) {
      setProfiles([]);
      let allTasks = [];
      setMyRows([]);
      const data = await globalSearch(searchKey);
      const dataObj = data.data;
      console.log(dataObj);
      allTasks = allTasks.concat(
        dataObj.taskInfosToOther,
        dataObj.taskInfosToMe,
        dataObj.taskInfosToMyself
      );
      console.log(allTasks);
      allTasks.map(async (task) => {
        console.log("task desc is ");
        console.log(task.task_desc);
        let newTask = {
          id: task.task_id,
          name: task.task_name,
          label: task.task_tag,
          descriptionTask: task.task_desc,
          status: task.task_status,
          priority: task.task_priority,
          start: task.start_date,
          deadline: task.end_date,
          progress: 100,
          details: task,
        };
        const { data } = await getProfile(task.assigner);
        newTask.assigner = { image: userImg, name: data.user_name, email: data.user_email };
        setMyRows((prevState) => [...prevState, newTask]);
      });
      dataObj.userInfoVOS.map(async (elem) => {
        // eslint-disable-next-line no-shadow
        const metaProfile = {
          userid: elem.user_id,
          fullName: elem.user_name,
          mobile: elem.user_mobile,
          email: elem.user_email,
          tags: elem.tags,
          avatar: elem.user_image,
        };
        setProfiles((prev) => [...prev, metaProfile]);
      });
      console.log("here I am");
      console.log(dataObj);
      console.log(searchKey);
    }
  }, [searchKey]);

  const renderTags = (tags) =>
    tags.map((tag) => (
      <Chip label={tag} key={tag} size="small" variant="outlined" color="primary" />
    ));

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="5rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );
  const userNameComparator = (v1, v2, param1, param2) =>
    gridStringOrNumberComparator(v1.name, v2.name, param1, param2);

  const userNameFilter = (value) => (params) =>
    params.value.name.toLowerCase().includes(value.toLowerCase()) ||
    params.value.email.toLowerCase().includes(value.toLowerCase());

  const dateComparator = (v1, v2) => {
    if (!v1) {
      return 1;
    }

    if (!v2) {
      return -1;
    }
    const d1 = new Date(v1);
    const d2 = new Date(v2);
    return d1 - d2;
  };

  return (
    <>
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
                <MDTypography variant="h4" color="white">
                  Users Found
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "user", accessor: "author", width: "20%", align: "left" },
                      { Header: "tags", accessor: "tags", width: "25%", align: "left" },
                      { Header: "action", accessor: "action", align: "center" },
                    ],
                    rows: profiles.map((user) => ({
                      author: (
                        <Author
                          image={user.avatar ? user.avatar : userImg}
                          name={user.fullName}
                          email={user.email}
                          mobile={user.mobile}
                          userid={user.userid}
                        />
                      ),
                      tags: (
                        <MDBox
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.5,
                            maxWidth: "380px",
                          }}
                        >
                          {renderTags(user.tags)}
                        </MDBox>
                      ),
                      action: (
                        <Stack direction="row" spacing={0.5}>
                          <MDButton size="small" component={NavLink} to={`/profile/${user.userid}`}>
                            Show profile
                          </MDButton>
                        </Stack>
                      ),
                    })),
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h4" color="white">
                TASKS Found
              </MDTypography>
            </MDBox>
            <Grid container pt={3} pl={5} spacing={3} display="relative">
              <Grid xs={12} item>
                <MDTypography variant="h5" gutterBottom>
                  Not Started
                </MDTypography>
                <div style={{ height: 500, width: "100%" }}>
                  <div style={{ display: "flex", height: "100%" }}>
                    <div style={{ flexGrow: 1 }}>
                      <DataGrid
                        rows={myRows}
                        columns={[
                          {
                            field: "id",
                            headerName: "TASK ID",
                            whiteSpace: "normal",
                            width: 120,
                          },
                          {
                            field: "name",
                            headerName: "TASK NAME",
                            width: 300,
                          },
                          {
                            field: "label",
                            headerName: "LABEL",
                          },
                          {
                            field: "descriptionTask",
                            headerName: "DESCRIPTION",
                            width: 200,
                          },
                          {
                            field: "assigner",
                            headerName: "ASSIGNER",
                            width: 200,
                            renderCell: (params) => (
                              <Author
                                image={
                                  params.row.assigner.image ? params.row.assigner.image : userImg
                                }
                                name={params.row.assigner.name}
                                email={params.row.assigner.email}
                              />
                            ),
                          },
                          {
                            field: "status",
                            headerName: "STATUS",
                            width: 120,
                            editable: self,
                            filterable: !self,
                            getApplyQuickFilterFn: undefined,
                          },
                          {
                            field: "priority",
                            headerName: "PRIORITY",
                            type: "singleSelect",
                            align: "center",
                            valueOptions: ["Critical", "High", "Medium", "Low", "None"],
                          },
                          {
                            field: "start",
                            headerName: "START DATE",
                            type: "date",
                            width: 120,
                          },
                          {
                            field: "deadline",
                            headerName: "DEADLINE",
                            type: "date",
                            width: 120,
                            sortComparator: dateComparator,
                          },
                        ]}
                        getRowHeight={() => "auto"}
                        sx={{
                          [`& .${gridClasses.cell}`]: {
                            py: 1,
                          },
                        }}
                        disableSelectionOnClick
                        getRowId={(row) => row.id}
                        initialState={{
                          filter: {
                            filterModel: {
                              items: [],
                              quickFilterLogicOperator: GridLinkOperator.Or,
                            },
                          },
                          columns: {
                            columnVisibilityModel: {
                              description: false,
                            },
                          },
                        }}
                        components={{
                          Toolbar: CustomToolbar,
                          NoRowsOverlay: CustomNoRowsOverlay,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
