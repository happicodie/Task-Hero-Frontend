/* 
Author: Joseph Zhou, Yue Wu
Created At: 2/11/2022
*/

/* eslint-disable camelcase */
import { useEffect, useState } from "react";

// MUI components
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

// Formik components
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Select from "formikComponents/select";
import Textfield from "formikComponents/textfield";
import DateTimePicker from "formikComponents/dateTimePicker";
import ButtonWrapper from "formikComponents/buttonWrapper";
import SelectUser from "formikComponents/selectUser";
import CheckList from "formikComponents/checkList";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// API helper functions
import { taskCreation, getAvailTags } from "api/fetch";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function CreateTask({ open, handleClose }) {
  const [tags, setTags] = useState({});
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const priorities = {
    Critical: "Critical",
    High: "High",
    Medium: "Medium",
    Low: "Low",
    None: "None",
  };

  const INITIAL_FROMS_STATE = {
    title: "",
    assignee: { userid: localStorage.getItem("userId"), fullName: "Me" },
    priority: "None",
    startDate: "",
    deadline: "",
    tag: "",
    workload: 0,
    description: "",
    checkList: [],
  };

  useEffect(async () => {
    const { data } = await getAvailTags();
    data.map((tag) => setTags((prev) => ({ ...prev, [tag.tag_name]: tag.tag_name })));
  }, []);

  const FORM_VALIDATION = Yup.object().shape({
    title: Yup.string().required("Required"),
    assignee: Yup.object().required("Required").nullable(),
    priority: Yup.string(),
    startDate: Yup.date()
      .nullable()
      .required("Required")
      .test("date_test", "input date cannot be the past", (value) => {
        const now = new Date();
        return new Date(value) >= now.setHours(0, 0, 0, 0);
      }),
    deadline: Yup.date()
      .nullable()
      .test("date_test", "input date cannot be the past", (value) => {
        const now = new Date();
        return new Date(value) >= now.setHours(0, 0, 0, 0) || !value;
      }),
    tag: Yup.string().required("Required"),
    workload: Yup.number()
      .min(0, "workload is between 0 to 84 hours per week.")
      .max(84, "workload is between 0 to 84 hours per week."),
    description: Yup.string().required("Required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const cl = values.checkList.map(({ bool_check, check_detail }) => ({
      bool_check,
      check_detail,
    }));
    taskCreation({
      assignee_id: values.assignee.userid,
      checkListList: cl,
      end_date: values.deadline,
      start_date: values.startDate,
      task_desc: values.description,
      task_name: values.title,
      task_priority: values.priority,
      task_tag: values.tag,
      task_workload: values.workload,
    }).then(() => {
      resetForm(INITIAL_FROMS_STATE);
      handleClose();
      navigate(0);
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
          open={open}
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
                  Create a New Task
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <MDTypography variant="body2" color="text" mb={3}>
                  Create a new task by telling us title, description, start date and deadline, and
                  then assign it to yourself or your connected people.
                </MDTypography>
                <MDBox width="100%" component="form">
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Textfield
                        name="title"
                        type="text"
                        label="title"
                        variant="standard"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <SelectUser name="assignee" sx={{ width: 500 }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <DateTimePicker name="startDate" label="startDate" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <DateTimePicker name="deadline" label="deadline" />
                    </Grid>
                    <Grid item xs={12}>
                      <Textfield
                        name="workload"
                        type="number"
                        label="workload (hours/week)"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Select name="priority" fullWidth label="Priority" options={priorities} />
                    </Grid>
                    <Grid item xs={12}>
                      <Select name="tag" fullWidth label="tag" options={tags} />
                    </Grid>
                    <Grid item xs={12}>
                      <Textfield
                        rows={6}
                        multiline
                        name="description"
                        type="text"
                        label="description"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <MDTypography variant="caption" fontSize="1rem">
                        Checklist:
                        <CheckList name="checkList" autoHeight />
                      </MDTypography>
                    </Grid>
                  </Grid>
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <ButtonWrapper fullWidth>Create Task</ButtonWrapper>
                </MDBox>
              </MDBox>
            </MDBox>
          </DialogContent>
        </Dialog>
      </Form>
    </Formik>
  );
}

CreateTask.defaultProps = {
  open: false,
};

// Typechecking props for the MDInput
CreateTask.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
};
