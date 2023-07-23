/* 
Author: Joseph Zhou
Created At: 28/10/2022
*/

/* eslint-disable */
import { useEffect, useState } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import MDProgress from "components/MDProgress";
// @mui components

import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

// Images
import userImg from "assets/images/user.png";

// Icons
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

// react-router components
import { NavLink } from "react-router-dom";

// api helper functions
import { connected, getProfile, declineConnection, busyEstimate } from "api/fetch";

export default function allConnections(change, setChange) {
  const [profiles, setProfiles] = useState([]);

  useEffect(async () => {
    setProfiles([]);
    const { data } = await connected();
    data.map(async (elem) => {
      // eslint-disable-next-line no-shadow
      const { data } = await getProfile(elem.user_id);
      const metaProfile = {
        userid: data.user_id,
        fullName: data.user_name,
        mobile: data.user_mobile,
        email: data.user_email,
        tags: data.tags,
        avatar: data.user_image,
        workload: 0,
      };
      console.log(data.user_id);
      const bodyObj = { user_id: data.user_id };
      const { data: busyRate } = await busyEstimate(bodyObj);
      console.log("busy rate is");
      console.log(busyRate.user_busy);
      metaProfile.workload = Math.round(busyRate.user_busy * 100);
      setProfiles((prev) => [...prev, metaProfile]);
    });
  }, [change]);

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

  // Handle tags rendering
  const renderTags = (tags) =>
    tags.map((tag) => (
      <Chip label={tag} key={tag} size="small" variant="outlined" color="primary" />
    ));

  return {
    columns: [
      { Header: "user", accessor: "author", width: "20%", align: "left" },
      { Header: "tags", accessor: "tags", width: "25%", align: "left" },
      { Header: "action", accessor: "action", align: "center" },
      { Header: "workload", accessor: "workload", align: "left" },
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
          <MDButton
            size="small"
            onClick={() => {
              declineConnection(user.userid);
              setChange((prev) => !prev);
            }}
          >
            Disconnect
          </MDButton>
        </Stack>
      ),
      workload: <Progress color="info" value={user.workload} />,
    })),
  };
}
