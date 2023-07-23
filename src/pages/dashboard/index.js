/**
 * Author: Joseph Zhou
 * Created At: 20 Sep 2022
 */

/* eslint-disable */
// @mui material components
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {
  DataGrid,
  gridClasses,
  GridToolbarQuickFilter,
  GridLinkOperator,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// FiveSigma components
import CustomNoRowsOverlay from "components/RowOverlay";

// Data
import Tasks from "pages/dashboard/data/taskData";
import { useState } from "react";

import { postStatus } from "api/fetch";

import CreateTask from "pages/dashboard/components/CreateTasks";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`task-tabpanel-${index}`}
      aria-labelledby={`task-tab-${index}`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `task-tab-${index}`,
    "aria-controls": `task-tabpanel-${index}`,
  };
}

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

function Dashboard() {
  // For create task modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const [tabValue, setValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const processRowUpdate = (newRow, oldRow) => {
    if (oldRow.status === "not started") {
      const now = new Date();
      newRow.start = now.toISOString().split("T")[0];
    }
    newRow.details.accept = true;
    postStatus(newRow.id, newRow.status).then((data) => console.log(data));
    return newRow;
  };

  // Datagrid
  const { columns: myColumns, rows: myRows } = Tasks(true, false);
  const { columns: cpColumns, rows: cpRows } = Tasks(true, true);
  const { columns: otherColumns, rows: otherRows } = Tasks(false, false);
  const { columns: opColumns, rows: opRows } = Tasks(false, true);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDButton onClick={handleOpen}>Create Task</MDButton>
      <CreateTask open={open} handleClose={handleClose} />
      <Box sx={{ width: 500, mx: "auto" }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="Current" {...a11yProps(0)} />
          <Tab label="Completed" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <MDBox pt={6} pb={3}>
        <TabPanel value={tabValue} index={0}>
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
                  <MDTypography variant="h4" component="span" color="white">
                    TASKS ASSIGNED TO ME
                  </MDTypography>
                </MDBox>
                <Grid xs={12} item>
                  <div style={{ height: 500, width: "100%" }}>
                    <div style={{ display: "flex", height: "100%" }}>
                      <div style={{ flexGrow: 1 }}>
                        <DataGrid
                          rows={myRows}
                          columns={myColumns}
                          experimentalFeatures={{ newEditingApi: true }}
                          processRowUpdate={processRowUpdate}
                          getRowHeight={() => "auto"}
                          sx={{
                            [`& .${gridClasses.cell}`]: {
                              py: 1,
                            },
                          }}
                          disableSelectionOnClick
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
              </Card>
            </Grid>
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
                  <MDTypography variant="h4" component="span" color="white">
                    TASKS ASSIGNED TO OTHERS
                  </MDTypography>
                </MDBox>
                <div style={{ height: 500, width: "100%" }}>
                  <div style={{ display: "flex", height: "100%" }}>
                    <div style={{ flexGrow: 1 }}>
                      <DataGrid
                        rows={otherRows}
                        columns={otherColumns}
                        getRowHeight={() => "auto"}
                        sx={{
                          [`& .${gridClasses.cell}`]: {
                            py: 1,
                          },
                        }}
                        disableSelectionOnClick
                        initialState={{
                          filter: {
                            filterModel: {
                              items: [],
                              quickFilterLogicOperator: GridLinkOperator.Or,
                            },
                          },
                          columns: {
                            columnVisibilityModel: {
                              priority: false,
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
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
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
                  <MDTypography variant="h4" component="span" color="white">
                    MY COMPLETED TASKS
                  </MDTypography>
                </MDBox>
                <div style={{ height: 500, width: "100%" }}>
                  <div style={{ display: "flex", height: "100%" }}>
                    <div style={{ flexGrow: 1 }}>
                      <DataGrid
                        rows={cpRows}
                        columns={cpColumns}
                        getRowHeight={() => "auto"}
                        sx={{
                          [`& .${gridClasses.cell}`]: {
                            py: 1,
                          },
                        }}
                        disableSelectionOnClick
                        initialState={{
                          filter: {
                            filterModel: {
                              items: [],
                              quickFilterLogicOperator: GridLinkOperator.Or,
                            },
                          },
                          columns: {
                            columnVisibilityModel: {
                              priority: false,
                              progress: false,
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
              </Card>
            </Grid>
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
                  <MDTypography variant="h4" component="span" color="white">
                    COMPLETED TASKS ASSIGNED TO OTHERS
                  </MDTypography>
                </MDBox>
                <div style={{ height: 500, width: "100%" }}>
                  <div style={{ display: "flex", height: "100%" }}>
                    <div style={{ flexGrow: 1 }}>
                      <DataGrid
                        rows={opRows}
                        columns={opColumns}
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
                              priority: false,
                              progress: false,
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
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
