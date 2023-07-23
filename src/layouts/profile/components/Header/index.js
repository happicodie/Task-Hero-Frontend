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

import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Fivesigma components
import ConnectionDialog from "layouts/profile/components/Dialog";

// Images
import backgroundImage from "assets/images/bg-profile.jpeg";
import userImg from "assets/images/user.png";

// react-router components
import { useParams } from "react-router-dom";

// api helper functions
import { declineConnection } from "api/fetch";

function Header({ info, tags, relation, children, imgs, connectionMsg }) {
  const { userid } = useParams();
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /**
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  // Handle the opening state of the connection request modal
  const [open, setOpen] = useState(false);

  // Handle the state of relation
  const [rel, setRel] = useState(relation);
  useEffect(() => {
    setRel(relation);
  }, [relation]);

  // Handle tags rendering
  const renderTags = tags.map((tag) => (
    <Chip label={tag} key={tag} size="small" variant="outlined" color="primary" />
  ));

  const connectionButton = () => {
    switch (rel) {
      case "stranger":
        return (
          <MDButton
            variant="contained"
            color="success"
            sx={{ height: "50px", mt: 2 }}
            onClick={() => setOpen(true)}
          >
            Connect
          </MDButton>
        );
      case "requested":
        return (
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <MDButton
              variant="contained"
              color="success"
              sx={{ height: "50px" }}
              onClick={() => setOpen(true)}
            >
              Accept
            </MDButton>
            <MDButton
              variant="contained"
              color="secondary"
              sx={{ height: "50px" }}
              onClick={() => {
                declineConnection(userid).then(() => setRel("stranger"));
              }}
            >
              Decline
            </MDButton>
          </Stack>
        );
      case "connecting":
        return (
          <MDButton variant="contained" color="success" disabled sx={{ height: "50px", mt: 2 }}>
            Connect
          </MDButton>
        );
      case "connected":
        return (
          <MDButton
            variant="contained"
            color="secondary"
            sx={{ height: "50px", mt: 2 }}
            onClick={() => {
              declineConnection(userid).then(() => setRel("stranger"));
            }}
          >
            Disconnect
          </MDButton>
        );
      default:
    }
    return undefined;
  };

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
          alignItems: "center",
        }}
      >
        <MDBox sx={{ width: "100%", display: "flex", justifyContent: "space-between", pr: 5 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <MDAvatar
                src={imgs.avatar ? imgs.avatar : userImg}
                alt="profile-image"
                size="xl"
                shadow="sm"
              />
            </Grid>
            <Grid item>
              <MDBox height="100%" mt={0.5} lineHeight={1}>
                <MDTypography variant="h5" fontWeight="medium">
                  {info.fullName}
                </MDTypography>
                <Stack direction="row" spacing={1}>
                  {renderTags}
                </Stack>
              </MDBox>
            </Grid>
          </Grid>
          {connectionButton()}
        </MDBox>
        {children}
        <ConnectionDialog
          open={open}
          setOpen={setOpen}
          setRel={setRel}
          send={rel === "stranger"}
          connectionMsg={connectionMsg}
        />
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  tags: [],
  relation: "self",
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  relation: PropTypes.string,
  children: PropTypes.node,
  imgs: PropTypes.objectOf(PropTypes.string).isRequired,
  connectionMsg: PropTypes.string.isRequired,
};

export default Header;
