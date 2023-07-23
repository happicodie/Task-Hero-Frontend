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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React base styles
import typography from "assets/theme/base/typography";

function Footer() {
  // const { href, name } = company;
  const { size } = typography;

  return (
    <MDBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}, made by FiveSigma
        {/* <MDBox fontSize={size.md} color="text" mb={-0.5} mx={0.25}>
          <Icon color="inherit" fontSize="inherit">
            favorite
          </Icon>
        </MDBox>
        by
        <Link href={href} target="_blank">
          <MDTypography variant="button" fontWeight="medium">
            &nbsp;{name}&nbsp;
          </MDTypography>
        </Link>
        for a better web. */}
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Footer
// Footer.defaultProps = {
//   company: { href: "https://www.creative-tim.com/", name: "Creative Tim" },
//   links: [
//     { href: "https://www.creative-tim.com/", name: "Creative Tim" },
//     { href: "https://www.creative-tim.com/presentation", name: "About Us" },
//     { href: "https://www.creative-tim.com/blog", name: "Blog" },
//     { href: "https://www.creative-tim.com/license", name: "License" },
//   ],
// };

// // Typechecking props for the Footer
// Footer.propTypes = {
//   company: PropTypes.objectOf(PropTypes.string),
//   links: PropTypes.arrayOf(PropTypes.object),
// };

export default Footer;
