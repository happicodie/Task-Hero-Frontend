/**
 * Author: Joseph Zhou
 * Created At: 10 Oct 2022
 */

/* eslint-disable camelcase */
// Authentication layout components
import BasicLayout from "pages/authentication/components/BasicLayout";
// @mui material components
import Card from "@mui/material/Card";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Images
import bgImage from "assets/images/sign_in_bg.jpg";
// import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Utilities
import { login } from "api/fetch";
import Textfield from "formikComponents/textfield";
import ButtonWrapper from "formikComponents/buttonWrapper";
import * as React from "react";

const INITIAL_FROMS_STATE = {
  email: "",
  password: "",
};

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().required("Required").email("Invalid email."),
  password: Yup.string().required("Required"),
});

function Basic() {
  const navigate = useNavigate();
  const [errorStatus, setErrorStatus] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (values) => {
    setErrorStatus(false);
    setErrorMessage("");
    try {
      const bodyObj = { user_email: values.email, password: values.password };
      localStorage.removeItem("authToken");
      const data = await login(bodyObj);
      const { token, user_id } = data.data;
      console.log(data.data);
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", user_id);
      navigate("/dashboard");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setErrorStatus(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <Formik
          initialValues={{
            ...INITIAL_FROMS_STATE,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          <Form>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox mb={2}>
                <Textfield name="email" type="text" label="email" fullWidth />
              </MDBox>
              <MDBox mb={2}>
                <Textfield name="password" type="password" label="password" fullWidth />
              </MDBox>
              <MDTypography variant="h6" fontWeight="light" color="error" mt={1}>
                {errorStatus && errorMessage}
              </MDTypography>
              <MDBox mt={4} mb={1}>
                <ButtonWrapper fullWidth>sign in</ButtonWrapper>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Don&apos;t have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/authentication/sign-up"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign up
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </Form>
        </Formik>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
