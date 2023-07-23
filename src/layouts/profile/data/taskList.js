/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
 =========================================================
 * Material Dashboard 2 React - v2.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2022 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

  =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDInput from "components/MDInput";

import DateTimePicker from "formikComponents/dateTimePicker";

import { searchTasks, getProfile } from "api/fetch";

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

export default function TasksResult({ searchObj }) {
  const [myRows, setMyRows] = useState([]);

  useEffect(async () => {
    console.log("search obj is");
    setMyRows([]);
    const bodyObj = {
      end_date: searchObj.deadline,
      task_desc: searchObj.taskDesc,
      task_id: searchObj.taskID,
      task_name: searchObj.taskName,
      task_status: null,
      task_tag: null,
    };
    console.log(bodyObj);
    const data = await searchTasks(bodyObj);
    console.log(data.data);
    const allTasks = data.data;
    allTasks.map(async (task) => {
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
  }, [searchObj]);

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

  const userNameFilter = (value) => (params) =>
    params.value.name.toLowerCase().includes(value.toLowerCase()) ||
    params.value.email.toLowerCase().includes(value.toLowerCase());

  return (
    <>
      <Grid item xs={12} md={12} lg={12}>
        <MDBox mt={5} mb={1} textAlign="center">
          <MDTypography variant="button" color="text">
            search results
          </MDTypography>
        </MDBox>
      </Grid>
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
                            sortComparator: userNameComparator,
                            getApplyQuickFilterFn: userNameFilter,
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
                            sortComparator: dateComparator,
                            width: 120,
                          },
                          {
                            field: "deadline",
                            headerName: "DEADLINE",
                            type: "date",
                            sortComparator: dateComparator,
                            width: 120,
                          },
                          {
                            field: "details",
                            headerName: "ACTIONS",
                            sortable: false,
                            filterable: false,
                            width: 150,
                            getApplyQuickFilterFn: undefined,
                            align: "center",
                            headerAlign: "center",
                            type: "actions",
                            getActions: ({ row }) => {
                              const { details } = row;
                              let ret = [
                                <MDTypography
                                  variant="caption"
                                  color="text"
                                  fontWeight="medium"
                                  // onClick={() => {
                                  //   setDetails(details);
                                  //   setdopen(true);
                                  // }}
                                >
                                  Details
                                </MDTypography>,
                              ];
                              return ret;
                            },
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
                          sorting: {
                            sortModel: [{ field: "deadline", sort: "desc" }],
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
