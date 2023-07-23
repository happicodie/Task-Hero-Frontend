/* 
Author: Joseph Zhou
Created At: 28/10/2022
*/

/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { useEffect, useState } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
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
import { sentRequests, getProfile, declineConnection } from "api/fetch";

export default function allConnections(change, setChange) {
  const [profiles, setProfiles] = useState([]);

  useEffect(async () => {
    setProfiles([]);
    const { data } = await sentRequests();
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
        msg: data.connection_message,
      };
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

  // Handle tags rendering
  const renderTags = (tags) =>
    tags.map((tag) => (
      <Chip label={tag} key={tag} size="small" variant="outlined" color="primary" />
    ));

  return {
    columns: [
      { Header: "user", accessor: "author", width: "20%", align: "left" },
      { Header: "tags", accessor: "tags", width: "25%", align: "left" },
      { Header: "message", accessor: "message", width: "30%", align: "left" },
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
      message: (
        <MDBox component="div" sx={{ maxWidth: "450px", textOverflow: "ellipsis" }}>
          {user.msg}
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
            Withdraw
          </MDButton>
        </Stack>
      ),
    })),
  };
}
