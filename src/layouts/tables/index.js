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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDDatePicker from "components/MDDatePicker";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";


import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDButton onClick={handleOpen}>Create Task</MDButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <MDBox
              bgColor="white"
              borderRadius="xl"
              shadow="lg"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              mt={{ xs: 20, sm: 18, md: 20 }}
              mb={{ xs: 20, sm: 18, md: 20 }}
              mx={3}
            >
              <MDBox
                variant="gradient"
                bgColor="info"
                coloredShadow="info"
                borderRadius="lg"
                p={2}
                mx={2}
                mt={-3}
              >
                <MDTypography variant="h3" color="white">
                  Create a New Task
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <MDTypography variant="body2" color="text" mb={3}>
                  Create a new task by telling us title, description, start date and deadline, and then
                  assign it to yourself or your connected people.
                </MDTypography>
                <MDBox width="100%" component="form" method="post" autocomplete="off">
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <MDInput
                          type="text"
                          label="task title"
                          fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                      <MDInput
                            type="text"
                            label="description"
                            fullWidth
                          />
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <MDDatePicker input={{ placeholder: "Select a start date" }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <MDDatePicker input={{ placeholder: "Select a deadline" }} />
                    </Grid>
                    <Grid item xs={12} >
                      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Assignee</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          label="Age"
                          value={age}
                          onChange={handleChange}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Anna</MenuItem>
                          <MenuItem value={20}>Tom</MenuItem>
                          <MenuItem value={30}>Bob</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <MDInput
                        variant="standard"
                        label="Task description"
                        placeholder="Describe the task"
                        InputLabelProps={{ shrink: true }}
                        multiline
                        fullWidth
                        rows={6}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
                    <MDButton type="submit" variant="gradient" color="info">
                      Create the Task
                    </MDButton>
                  </Grid>
                </MDBox>
              </MDBox>
            </MDBox>
        </Box>
      </Modal>
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
                <MDTypography variant="h6" color="white">
                  Authors Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
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
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted
                  entriesPerPage={5}
                  showTotalEntries
                  noEndBorder
                  canSearch
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
