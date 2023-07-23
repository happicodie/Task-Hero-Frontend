/**
 * Author: Joseph Zhou
 * Created At: 10 Oct 2022
 */

import { useEffect } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MDBox";
import MKTypography from "components/MDTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/MKNavbars/DefaultNavbar";
// import DefaultFooter from "examples/MKFooters/DefaultFooter";

// About Us page sections
import Team from "pages/landingPage/sections/Team";
import Featuring from "pages/landingPage/sections/Featuring";
import Footer from "examples/MKFooters/LandingFooter";
import { useMaterialUIController, setLayout } from "context";

// Routes
import routes from "pages/landingPage/sections/NavbarList";

// Images
import bgImage from "assets/images/bg-about-us.jpg";

function LandingPage() {
  const [, dispatch] = useMaterialUIController();

  useEffect(() => {
    setLayout(dispatch, "landingPage");
  }, []);

  return (
    <>
      <DefaultNavbar routes={routes} transparent light />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={8}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ mx: "auto", textAlign: "center" }}
          >
            <MKTypography
              variant="h1"
              color="white"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Great Task Management Platform
            </MKTypography>
            <MKTypography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
              Manage your task easily. Our platform allows you to track process and keeps every team
              member on the same page.
            </MKTypography>

            <MKBox display="flex" justifyContent="center" alignItems="center">
              <MKTypography component="a" variant="body1" color="white" href="#" mr={3}>
                <i className="fab fa-facebook" />
              </MKTypography>
              <MKTypography component="a" variant="body1" color="white" href="#" mr={3}>
                <i className="fab fa-instagram" />
              </MKTypography>
              <MKTypography component="a" variant="body1" color="white" href="#" mr={3}>
                <i className="fab fa-twitter" />
              </MKTypography>
              <MKTypography component="a" variant="body1" color="white" href="#">
                <i className="fab fa-google-plus" />
              </MKTypography>
            </MKBox>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 8,
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Featuring />
        <Team />
      </Card>
      <Footer />
    </>
  );
}

export default LandingPage;
