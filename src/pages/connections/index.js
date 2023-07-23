/* 
Author: Joseph Zhou
Created At: 28/10/2022
*/

import * as React from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import TabPanel from "components/TabPanel";
import DataTable from "examples/Tables/DataTable";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Connection data
import Connected from "pages/connections/data/connectedTableData";
import Requested from "pages/connections/data/requestTableData";
import Sent from "pages/connections/data/sentTableData";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Connections() {
  const [value, setValue] = React.useState(0);
  const [change, setChange] = React.useState(false);
  const { columns: columns1, rows: rows1 } = Connected(change, setChange);
  const { columns: columns2, rows: rows2 } = Requested(change, setChange);
  const { columns: columns3, rows: rows3 } = Sent(change, setChange);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
                  <Tab label="Connected Users" {...a11yProps(0)} />
                  <Tab label="Received Requests" {...a11yProps(1)} />
                  <Tab label="Sent Requests" {...a11yProps(2)} />
                </Tabs>
              </MDBox>
              <MDBox pt={3}>
                <TabPanel value={value} index={0}>
                  <DataTable
                    table={{ columns: columns1, rows: rows1 }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <DataTable
                    table={{ columns: columns2, rows: rows2 }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <DataTable
                    table={{ columns: columns3, rows: rows3 }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </TabPanel>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Connections;
