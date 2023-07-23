/**
 * Author: Joseph Zhou
 * Created At: 10 Oct 2022
 */

/* eslint-disable camelcase */
// @mui material components
import Card from "@mui/material/Card";
// Authentication layout components
import CoverLayout from "pages/authentication/components/CoverLayout";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { register } from "api/fetch";
import Textfield from "formikComponents/textfield";
import ButtonWrapper from "formikComponents/buttonWrapper";
import * as React from "react";

const INITIAL_FROMS_STATE = {
  name: "",
  email: "",
  password: "",
  changepassword: "",
};

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required").email("Invalid email."),
  password: Yup.string().required("Required"),
  changepassword: Yup.string().when("password", {
    is: (val) => val && val.length > 0,
    then: Yup.string().oneOf([Yup.ref("password")], "Both password need to be the same"),
  }),
});

function Cover() {
  const navigate = useNavigate();
  const [errorStatus, setErrorStatus] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (values) => {
    setErrorStatus(false);
    setErrorMessage("");
    localStorage.setItem("authToken", undefined);
    localStorage.setItem("userId", undefined);
    const bodyObj = { password: values.password, user_email: values.email, user_name: values.name };
    const data = await register(bodyObj);
    if (data.data === null) {
      setErrorStatus(true);
      setErrorMessage(data.message);
    } else {
      const { token, user_id } = data.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", user_id);
      navigate("/profile/editProfile");
    }
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
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
                <Textfield name="name" type="text" label="name" fullWidth />
              </MDBox>
              <MDBox mb={2}>
                <Textfield name="email" type="email" label="email" fullWidth />
              </MDBox>
              <MDBox mb={2}>
                <Textfield name="password" type="password" label="password" fullWidth />
              </MDBox>
              <MDBox mb={2}>
                <Textfield
                  name="changepassword"
                  type="password"
                  label="confirm password"
                  fullWidth
                />
              </MDBox>
              <MDTypography variant="h6" fontWeight="light" color="error" mt={1}>
                {errorStatus && errorMessage}
              </MDTypography>
              <MDBox mt={4} mb={1}>
                <ButtonWrapper fullWidth>sign up now</ButtonWrapper>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Already have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/authentication/sign-in"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign In
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </Form>
        </Formik>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
