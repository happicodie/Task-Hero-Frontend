/* 
  Author: Joseph Zhou, Yue Wu
  Created At: 12/10/2022
*/

/* eslint-disable */

/* eslint-disable camelcase */

import { useEffect, useState, useRef } from "react";

// @mui material components
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Badge from "@mui/material/Badge";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// React router dom
import { useNavigate } from "react-router-dom";

// Images
import user from "assets/images/user";

// Page components
import SelectTags from "formikComponents/tagSelect";

// Formik
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ButtonWrapper from "formikComponents/buttonWrapper";
import InputWrapper from "formikComponents/inputWrapper";
import ImagePicker from "formikComponents/imagePicker";

// API helper function
import { editProfile, getProfile, getAvailTags, changeAvailableHours } from "api/fetch";

const INITIAL_FROMS_STATE = {
  fullName: "",
  company: "",
  mobile: "",
  tags: [],
  aboutMe: "",
  image: "",
  workload: 20,
};

const FORM_VALIDATION = Yup.object().shape({
  fullName: Yup.string().required("Required"),
  company: Yup.string().required("Required"),
  mobile: Yup.number()
    .integer()
    .typeError("Please enter a valid phone number")
    .required("Required"),
  aboutMe: Yup.string(),
  workload: Yup.number()
    .min(0, "workload is between 0 to 84 hours per week.")
    .max(84, "workload is between 0 to 84 hours per week."),
});

function EditProfile() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState(INITIAL_FROMS_STATE);
  const [tags, setTags] = useState([]);
  const uploadInputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(async () => {
    try {
      const { data: dataTags } = await getAvailTags();
      setTags(dataTags.map(({ tag_name }) => tag_name));
      const userID = localStorage.getItem("userId");
      const { data: dataProfile } = await getProfile(userID);
      setFormState({
        fullName: dataProfile.user_name,
        company: dataProfile.user_comp,
        mobile: dataProfile.user_mobile,
        tags: dataProfile.tags,
        aboutMe: dataProfile.user_sentence,
        image: dataProfile.user_image || user,
        workload: dataProfile.taskProfileVO.available_hours,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = async (values) => {
    try {
      editProfile({
        tags: values.tags,
        user_sentence: values.aboutMe.trim(),
        user_mobile: values.mobile,
        user_name: values.fullName,
        user_comp: values.company,
        user_image: values.image,
      });
      if (values.workload) {
        console.log("workload is");
        console.log(values.workload);
        const bodyObj = { ava_hour: values.workload };
        changeAvailableHours(bodyObj);
      }
      console.log(values.image);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Card
          sx={{
            minHeight: "70vh",
            margin: "auto",
            marginBottom: "4.2rem",
            width: "80%",
            maxWidth: "60rem",
            padding: "2rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid
            container
            gap={1}
            sx={{
              m: 1,
            }}
          >
            <Grid item sx={{ marginTop: 1 }}>
              <Typography variant="body2" gutterBottom>
                Profile picture
              </Typography>
              <Badge
                color="secondary"
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                sx={{ cursor: "pointer", "& .MuiBadge-badge": { fontSize: 15, height: 15, p: 2 } }}
                badgeContent={
                  <>
                    <EditOutlinedIcon />
                    &nbsp;Edit
                  </>
                }
                onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
              >
                <Avatar alt="Remy Sharp" src={formState.image} sx={{ width: 150, height: 150 }} />
              </Badge>
              <input type="file" style={{ display: "none" }} />
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Grid
              item
              md={9}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 1,
              }}
            >
              <Formik
                innerRef={formRef}
                enableReinitialize
                initialValues={formState}
                validationSchema={FORM_VALIDATION}
                validateOnBlur={false}
                validateOnChange
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
              >
                <Form>
                  <FormControl sx={{ my: 1 }} fullWidth variant="standard">
                    <InputWrapper name="fullName" label="fullName" type="name" />
                  </FormControl>
                  <FormControl sx={{ my: 1 }} fullWidth variant="standard">
                    <InputWrapper name="company" type="text" label="company" />
                  </FormControl>
                  <FormControl sx={{ my: 1 }} fullWidth variant="standard">
                    <InputWrapper name="mobile" label="mobile" />
                  </FormControl>
                  <SelectTags
                    sx={{ my: 1 }}
                    name="tags"
                    options={tags}
                    multiple
                    textFieldProps={{ label: "Choose your tags." }}
                  />
                  <InputWrapper
                    name="workload"
                    type="number"
                    label="workload (hours/week)"
                    variant="outlined"
                    fullWidth
                  />
                  <InputWrapper
                    sx={{ my: 1 }}
                    fullWidth
                    rows={6}
                    multiline
                    name="aboutMe"
                    label="About me"
                  />
                  <ImagePicker
                    sx={{ my: 1 }}
                    name="image"
                    ref={uploadInputRef}
                    style={{ display: "none" }}
                  />
                  <MDBox sx={{ my: 2, display: "flex", flexDirection: "row-reverse" }}>
                    <ButtonWrapper variant="contained" color="success">
                      Update profile
                    </ButtonWrapper>
                  </MDBox>
                </Form>
              </Formik>
            </Grid>
          </Grid>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EditProfile;
