/* 
Author: Joseph Zhou, Yue Wu
Created At: 2/11/2022
*/

/* eslint-disable */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";

import userImg from "assets/images/user.png";
import { getProfile, getTask, putTask } from "api/fetch";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// eslint-disable-next-line react/prop-types
function Author({ image, name, email, id }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      lineHeight={1}
      component={NavLink}
      to={`/profile/${id}`}
    >
      <Avatar src={image} name={name} size="sm" />
      <Box ml={2} lineHeight={1}>
        <Typography display="block" variant="button" fontWeight="medium">
          {name}
        </Typography>
        <Typography variant="caption">{email}</Typography>
      </Box>
    </Box>
  );
}

function Log(elem, i) {
  const { content } = elem;
  return (
    <Paper elevation={1} key={i} sx={{ width: "100%" }}>
      <MDTypography variant="body2" sx={{ fontSize: 12 }}>
        {content}
      </MDTypography>
    </Paper>
  );
}

export default function TaskDetails() {
  const [data, setData] = useState({});
  const [assigner, setAssigner] = useState("");
  const [assignee, setAssignee] = useState("");
  const [rows, setRows] = useState([]);
  const [logs, setLogs] = useState([]);
  const theme = useTheme();
  const { taskid } = useParams();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const myid = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleClose = () => navigate("/dashboard");

  useEffect(async () => {
    const { data: data0 } = await getTask(taskid);
    setData(data0);
    const { data: data1 } = await getProfile(data0.assigner_id);
    setAssigner(data1);
    const { data: data2 } = await getProfile(data0.assignee_id);
    setAssignee(data2);
    setRows(
      data0.checkListList.map((elem, i) => ({
        id: i,
        check: elem.bool_check,
        item: elem.check_detail,
      }))
    );
    setLogs(data0.logs.map(Log));
  }, []);

  const columns = [
    {
      field: "check",
      headerName: "Check",
      editable: data.assignee_id === myid && data.accept,
      type: "boolean",
    },
    { field: "item", headerName: "Item", flex: 1 },
  ];

  const processRowUpdate = (newRow) => {
    const rowid = newRow.id;
    const checkListList = rows.map(({ id, check, item }) => ({
      bool_check: rowid === id ? newRow.check : check,
      check_detail: item,
    }));
    setRows(
      checkListList.map((elem, i) => ({
        id: i,
        check: elem.bool_check,
        item: elem.check_detail,
      }))
    );
    const dataCopy = { ...data };
    delete dataCopy.checkListList;
    // eslint-disable-next-line no-shadow
    putTask(taskid, { ...dataCopy, checkListList }).then(({ data }) => {
      setLogs(data.map(Log));
    });
    return newRow;
  };

  return (
    <div>
      <Dialog
        fullWidth
        open
        onClose={handleClose}
        maxWidth="lg"
        fullScreen={fullScreen}
        aria-labelledby="task-dialog-title"
      >
        <Grid container>
          <Grid item xs={7}>
            <DialogTitle id="task-dialog-title">{data.task_name}</DialogTitle>
            <DialogContent>
              <Grid container gap={2}>
                <Grid item xs={12} sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      gap: "10%",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="caption"
                        fontWeight="medium"
                        fontSize="1rem"
                        display="block"
                      >
                        Assigner:
                      </Typography>
                      <Author
                        image={assigner.user_image ? assigner.user_image : userImg}
                        name={assigner.user_name}
                        email={assigner.user_email}
                        id={assigner.user_id}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="caption"
                        fontWeight="medium"
                        fontSize="1rem"
                        display="block"
                      >
                        Assignee:
                      </Typography>
                      <Author
                        image={assignee.user_image ? assignee.user_image : userImg}
                        name={assignee.user_name}
                        email={assignee.user_email}
                        id={assignee.user_id}
                      />
                    </Box>
                  </Box>
                  <Chip label={data.task_tag} size="small" variant="outlined" color="primary" />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" fontWeight="medium" fontSize="1rem" display="block">
                    Description:
                  </Typography>
                  <Typography variant="body2">{data.task_desc}</Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    gap: "10%",
                  }}
                >
                  <Box>
                    <Typography variant="caption" fontWeight="medium" fontSize="1rem">
                      Start date:&nbsp;
                    </Typography>
                    {data.start_date}
                  </Box>
                  <Box>
                    <Typography variant="caption" fontWeight="medium" fontSize="1rem">
                      Deadline:&nbsp;
                    </Typography>
                    {data.end_date}
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    gap: "10%",
                  }}
                >
                  <Box>
                    <Typography variant="caption" fontWeight="medium" fontSize="1rem">
                      Priority:&nbsp;
                    </Typography>
                    {data.task_priority}
                  </Box>
                  <Box>
                    <Typography variant="caption" fontWeight="medium" fontSize="1rem">
                      Workload:&nbsp;
                    </Typography>
                    {data.task_workload} hours/week
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" fontWeight="medium" fontSize="1rem">
                    Checklist:
                    <div style={{ height: 300, width: "100%" }}>
                      <div style={{ display: "flex", height: "100%" }}>
                        <div style={{ flexGrow: 1 }}>
                          <DataGrid
                            rows={rows}
                            columns={columns}
                            experimentalFeatures={{ newEditingApi: true }}
                            processRowUpdate={processRowUpdate}
                            disableColumnSelector
                            getRowHeight={() => "auto"}
                            sx={{
                              [`& .${gridClasses.cell}`]: {
                                py: 1,
                              },
                            }}
                            disableSelectionOnClick
                          />
                        </div>
                      </div>
                    </div>
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              {myid === data.assigner_id && (
                <Button
                  onClick={() => {
                    navigate(`/dashboard/editTask/${taskid}`);
                  }}
                >
                  Edit
                </Button>
              )}
            </DialogActions>
          </Grid>
          <Divider orientation="vertical" variant="middle" sx={{ height: "auto" }} />
          <Grid item xs={4.5} sx={{ position: "relative" }}>
            <MDBox
              sx={{
                height: "100%",
                width: "100%",
                overflow: "auto",
                position: "absolute",
                my: 2,
              }}
            >
              <MDTypography variant="caption" sx={{ fontSize: 15, fontWeight: "bold" }}>
                Logs
              </MDTypography>
              <MDBox
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  gap: 1,
                  mt: 2,
                  position: "relative",
                }}
              >
                {logs}
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
