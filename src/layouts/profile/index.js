/* eslint-disable */
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

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

// @mui icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";
import MDProgress from "components/MDProgress";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import { getProfile } from "api/fetch";
import { useState, useEffect } from "react";

import CustomNoRowsOverlay from "components/RowOverlay";

import userImg from "assets/images/user.png";

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
function Overview({ description, info, relation, tags, imgs, connectionMsg, taskList }) {
  const [myRows, setMyRows] = useState([]);
  const [toShow, setToShow] = useState(false);

  useEffect(() => {
    setMyRows([]);
    console.log(taskList);
    if (relation === "self") {
      setToShow(false);
    } else {
      setToShow(true);
      taskList.map(async (task) => {
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
    }
  }, [taskList]);

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
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header info={info} tags={tags} relation={relation} imgs={imgs} connectionMsg={connectionMsg}>
        <MDBox mt={5} mb={3} sx={{ width: "100%" }}>
          <Grid container sx={{ ml: 10 }}>
            <Grid item xs={12} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="profile information"
                description={description}
                info={info}
                social={[]}
                action={{ route: "/profile/editProfile", tooltip: "Edit Profile" }}
                shadow={false}
                relation={relation}
              />
            </Grid>
          </Grid>
        </MDBox>
        {toShow && (
          <MDBox sx={{ width: "100%", pl: 3, pr: 3, mt: 3 }}>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Assigned Tasks List</Typography>
              </AccordionSummary>
              <AccordionDetails>
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
                            ortComparator: userNameComparator,
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
                            width: 120,
                            sortComparator: dateComparator,
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
                            sortModel: [{ field: "deadline", sort: "asc" }],
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
                {/*
              <MDBox
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <img src={emptybox} alt="empty" style={{ width: "35%" }} />
                <Typography sx={{ position: "relative", bottom: "5rem" }}>
                  Seems like this person doesn&apos;t have any assigned task.
                </Typography>
              </MDBox>
              */}
              </AccordionDetails>
            </Accordion>
          </MDBox>
        )}
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

Overview.defaultProps = {
  description: "",
  tags: [],
  relation: "self",
};

// Typechecking props for the Header
Overview.propTypes = {
  description: PropTypes.string,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  relation: PropTypes.string,
  imgs: PropTypes.objectOf(PropTypes.string).isRequired,
  connectionMsg: PropTypes.string.isRequired,
  taskList: PropTypes.arrayOf(PropTypes.object),
};

export default Overview;
