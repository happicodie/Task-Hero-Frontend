/* eslint-disable */
/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import * as React from "react";
import { useState, useEffect } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Material Kit 2 React examples
import HorizontalTeamCard from "examples/MKCards/TeamCards/HorizontalTeamCard";

// Images
import team1 from "assets/images/team-5.jpg";
import team2 from "assets/images/bruce-mars.jpg";
import team3 from "assets/images/ivana-squares.jpg";
import team4 from "assets/images/ivana-square.jpg";

import userImg from "assets/images/user.png";

import { recommendationAll } from "api/fetch";

function compare(a, b) {
  if (a.avg_score < b.avg_score) {
    return 1;
  }
  if (a.avg_score > b.avg_score) {
    return -1;
  }
  return 0;
}

function Team() {
  const [profiles, setProfiles] = useState([]);

  useEffect(async () => {
    setProfiles([]);
    let data;
    data = await recommendationAll();
    console.log("data inside the recommendation is");
    console.log(data);
    const realData = data.data;
    realData.sort(compare);
    console.log("real data is");
    console.log(realData);
    const top4 = realData.slice(0, 4);
    top4.map(async (elem) => {
      // eslint-disable-next-line no-shadow
      const metaProfile = {
        userid: elem.userInfoVO.user_id,
        fullName: elem.userInfoVO.user_name,
        mobile: elem.userInfoVO.user_mobile,
        email: elem.userInfoVO.user_email,
        tags: elem.userInfoVO.tags,
        avatar: elem.userInfoVO.user_image,
        description: elem.userInfoVO.user_sentence,
      };
      setProfiles((prev) => [...prev, metaProfile]);
    });
  }, []);

  return (
    <MDBox
      component="section"
      variant="gradient"
      bgColor="dark"
      position="relative"
      py={6}
      px={{ xs: 2, lg: 0 }}
      mx={-2}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} sx={{ mb: 6 }}>
            <MDTypography variant="h3" color="white">
              Top Ranking Users
            </MDTypography>
            <MDTypography variant="body2" color="white" opacity={0.8}>
              Users that are ranking the highest in our platform
            </MDTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {profiles.map((user, idx) => {
            return (
              <Grid item xs={12} lg={6}>
                <MDBox mb={1}>
                  <HorizontalTeamCard
                    image={user.avatar ? user.avatar : userImg}
                    name={user.fullName} 
                    position={{ color: "info", label: user.tags.length > 0 ?  user.tags[0] : "no tags" }}
                    description={user.description === null? "This user doesn't have description" : user.description}
                  />
                </MDBox>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </MDBox>
  );
}

export default Team;
