/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDProgress from "components/MDProgress";
import MDAvatar from "components/MDAvatar";

// Images
import team2 from "assets/images/team-2.jpg";

export default function data() {
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
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "task id", accessor: "id", width: "5%", align: "left" },
      { Header: "task name", accessor: "name", width: "10%", align: "left" },
      { Header: "assignee", accessor: "assignee", width: "5%", align: "left" },
      { Header: "description", accessor: "description", width: "25%", align: "justify" },
      { Header: "status", accessor: "status", width: "3%", align: "left" },
      { Header: "start date", accessor: "start", width: "3%", align: "left" },
      { Header: "deadline", accessor: "deadline", width: "3%", align: "left" },
      { Header: "completion", accessor: "completion", width: "5%", align: "left" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        id: "1794629172ABCSE",
        name: "UI design",

        assignee: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        description: (
          <MDBox
            variant="button"
            display="block"
            color="text"
            fontWeight="medium"
            sx={{ maxWidth: 350, maxHeight: 80, overflow: "auto" }}
          >
            Lorem Ipsum comes from a latin text written in 45BC by Roman statesman, lawyer, scholar,
            and philosopher, Marcus Tullius Cicero. The text is titled "de Finibus Bonorum et
            Malorum" which means "The Extremes of Good and Evil". The most common form of Lorem
            ipsum is the following: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
            aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </MDBox>
        ),
        status: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Not started
          </MDTypography>
        ),
        start: "2021/10/31",
        deadline: "2022/11/5",
        completion: <Progress color="info" value={60} />,
        action: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Details
          </MDTypography>
        ),
      },
      {
        id: "1794629172ABCSE",
        name: "UX design",

        assignee: <Author image={team2} name="Sam Michael" email="john@creative-tim.com" />,
        description: (
          <MDBox
            variant="button"
            display="block"
            color="text"
            fontWeight="medium"
            sx={{ maxWidth: 350, maxHeight: 80, overflow: "auto" }}
          >
            Lorem Ipsum comes from a latin text written in 45BC by Roman statesman, lawyer, scholar,
            and philosopher, Marcus Tullius Cicero. The text is titled "de Finibus Bonorum et
            Malorum" which means "The Extremes of Good and Evil". The most common form of Lorem
            ipsum is the following: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
            aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </MDBox>
        ),
        status: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Not started
          </MDTypography>
        ),
        start: "2020/10/31",
        deadline: "2020/11/5",
        completion: <Progress color="info" value={60} />,
        action: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Details
          </MDTypography>
        ),
      },
      {
        id: "1794629172ABCSE",
        name: "Backend",

        assignee: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        description: (
          <MDBox
            variant="button"
            display="block"
            color="text"
            fontWeight="medium"
            sx={{ maxWidth: 350, maxHeight: 80, overflow: "auto" }}
          >
            Lorem Ipsum comes from a latin text written in 45BC by Roman statesman, lawyer, scholar,
            and philosopher, Marcus Tullius Cicero. The text is titled "de Finibus Bonorum et
            Malorum" which means "The Extremes of Good and Evil". The most common form of Lorem
            ipsum is the following: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
            aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </MDBox>
        ),
        status: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Not started
          </MDTypography>
        ),
        start: " ",
        deadline: "2022/11/5",
        completion: <Progress color="info" value={60} />,
        action: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Details
          </MDTypography>
        ),
      },
    ],
  };
}
