/**
 * Author: Yue Wu
 * Created At: 20 Oct 2022
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

import { searchUsers, getProfile, recommendation, recommendationAll } from "api/fetch";

function compare(a, b) {
  if (a.avg_score < b.avg_score) {
    return 1;
  }
  if (a.avg_score > b.avg_score) {
    return -1;
  }
  return 0;
}

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
    console.log("user object is");
    console.log(userObj);
    let data;
    console.log(userObj.userTag === "All Tags");
    if (userObj.userTag === "All Tags") {
      data = await recommendationAll();
    } else {
      console.log("I'm here");
      data = await recommendation(userObj.userTag);
    }
    console.log("data inside the recommendation is");
    console.log(data);
    const realData = data.data;
    realData.sort(compare);
    let top5 = realData.slice(0, 5);
    console.log("real data is");
    console.log(realData);
    top5.map((elem) => {
      const metaProfile = {
        userid: elem.userInfoVO.user_id,
        fullName: elem.userInfoVO.user_name,
        mobile: elem.userInfoVO.user_mobile,
        email: elem.userInfoVO.user_email,
        tags: elem.userInfoVO.tags,
        avatar: elem.userInfoVO.user_image,
        score: elem.avg_score.toFixed(2),
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
            >
              <MDTypography variant="h4" color="white">
                Recommendation Results
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <DataTable
                table={{
                  columns: [
                    { Header: "user", accessor: "author", width: "20%", align: "left" },
                    { Header: "tags", accessor: "tags", width: "25%", align: "left" },
                    { Header: "score", accessor: "score", align: "center" },
                  ],
                  rows: profiles.map((user, idx) => ({
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
                    score: (
                      <Stack direction="row" spacing={0.5}>
                        <MDButton
                          size="small"
                          onClick={() => {
                            declineConnection(user.userid);
                            setChange((prev) => !prev);
                          }}
                        >
                          {user.score}
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
