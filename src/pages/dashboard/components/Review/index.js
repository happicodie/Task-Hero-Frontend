/* 
Author: Joseph Zhou, Yue Wu
Created At: 2/11/2022
*/

/* eslint-disable camelcase */

// MUI components
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";

// Formik components
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "formikComponents/textfield";
import RatingWrapper from "formikComponents/rating";
import ButtonWrapper from "formikComponents/buttonWrapper";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// API helper functions
import { postFeedback } from "api/fetch";

import { useNavigate, useParams } from "react-router-dom";

export default function ReviewTask() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { taskid } = useParams();

  const handleClose = () => {
    navigate("/dashboard");
  };

  const INITIAL_FROMS_STATE = {
    rating: 0,
    review: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    rating: Yup.number().required("Required").min(0).max(5),
    review: Yup.string(),
  });

  const handleSubmit = (values, { resetForm }) => {
    postFeedback({
      task_feedback: values.review,
      task_id: taskid,
      task_score: values.rating,
    }).then(() => {
      resetForm(INITIAL_FROMS_STATE);
      handleClose();
    });
  };

  return (
    <Formik
      initialValues={INITIAL_FROMS_STATE}
      validationSchema={FORM_VALIDATION}
      onSubmit={handleSubmit}
    >
      <Form>
        <Dialog
          fullWidth
          maxWidth="md"
          scroll="body"
          fullScreen={fullScreen}
          open
          onClose={handleClose}
          aria-labelledby="create-or-edit-task"
          aria-describedby="create-or-edit-task"
          sx={{ "& .MuiPaper-root": { overflowY: "visible" } }}
        >
          <DialogContent sx={{ overflowY: "visible" }}>
            <MDBox
              bgColor="white"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              sx={{ width: "100%" }}
            >
              <MDBox
                variant="gradient"
                bgColor="info"
                coloredShadow="info"
                borderRadius="lg"
                p={2}
                mx={2}
                mt={-3}
              >
                <MDTypography variant="h3" color="white">
                  {`Provide feedback to task (${taskid}).`}
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <MDBox width="100%" component="form">
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1 }}>Ratings</InputLabel>
                      <RatingWrapper name="rating" size="large" />
                    </Grid>
                    <Grid item xs={12}>
                      <Textfield
                        rows={6}
                        multiline
                        name="review"
                        type="text"
                        label="Review"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <ButtonWrapper fullWidth>Submit</ButtonWrapper>
                </MDBox>
              </MDBox>
            </MDBox>
          </DialogContent>
        </Dialog>
      </Form>
    </Formik>
  );
}
