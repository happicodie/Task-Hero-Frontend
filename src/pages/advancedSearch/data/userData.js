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

import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
// @mui components
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

// Images
import userImg from "assets/images/user.png";

import { NavLink } from "react-router-dom";

// Icons
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import TabPanel from "components/TabPanel";
import DataTable from "examples/Tables/DataTable";
// import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Connection data
import Connected from "pages/connections/data/connectedTableData";
import Requested from "pages/connections/data/requestTableData";
import Sent from "pages/connections/data/sentTableData";

import { useState, useEffect } from "react";

import { searchUsers, getProfile } from "api/fetch";

export default function UsersResult({ userObj }) {
  const [value, setValue] = React.useState(0);
  const [change, setChange] = React.useState(false);
  const [profiles, setProfiles] = React.useState([]);
  // const { columns: columns1, rows: rows1 } = Connected(change, setChange);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(async () => {
    setProfiles([]);
    // console.log(userID);
    //console.log(userName);
    //console.log(userTag);
    //console.log(userEmail);
    let bodyObj = {};
    if (userObj.userTag === null) {
      bodyObj.tags = null;
    } else {
      bodyObj.tags = [userObj.userTag];
    }
    bodyObj.user_comp = null;
    bodyObj.user_id = userObj.userID;
    bodyObj.user_email = userObj.userEmail;
    bodyObj.user_name = userObj.userName;
    const { data } = await searchUsers(bodyObj);
    console.log("data inside the userData is");
    console.log(data);
    data.map(async (elem) => {
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
  }, [userObj]);

  const Author = ({ image, name, email, mobile, userid }) => (
    <MDBox
      display="flex"
      alignItems="center"
      lineHeight={1}
      sx={{ cursor: "pointer" }}
      component={NavLink}
      to={`/profile/${userid}`}
    >
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDBox display="flex" alignItems="center" gap={0.3}>
          <MailOutlineIcon />
          <MDTypography variant="caption">{email}</MDTypography>
        </MDBox>
        <MDBox display="flex" alignItems="center" gap={0.3}>
          <LocalPhoneOutlinedIcon />
          <MDTypography variant="caption">{mobile}</MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  );

  // Handle tags rendering
  const renderTags = (tags) =>
    tags.map((tag) => (
      <Chip label={tag} key={tag} size="small" variant="outlined" color="primary" />
    ));

  return (
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
            ></MDBox>
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
  );
}
