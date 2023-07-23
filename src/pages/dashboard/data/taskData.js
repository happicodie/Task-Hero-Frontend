/**
 * Author: Joseph Zhou
 * Created At: 20 Sep 2022
 */

/* eslint-disable */
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

import { useState, useEffect } from "react";

// MUI data grid components
import { gridStringOrNumberComparator } from "@mui/x-data-grid";

// API helper function
import { getTasks, getTasksOther, getProfile, acceptTask, declineTask } from "api/fetch";

import { Link } from "react-router-dom";

// Images
import userImg from "assets/images/user.png";

export default function Data(self, complete) {
  const [rows, setRows] = useState([]);
  const myid = localStorage.getItem("userId");

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
  const userNameComparator = (v1, v2, param1, param2) =>
    gridStringOrNumberComparator(v1.name, v2.name, param1, param2);

  const dateComparator = (v1, v2) => {
    if (!v1) {
      return 1;
    }

    if (!v2) {
      return -1;
    }
    const d1 = new Date(v1);
    const d2 = new Date(v2);
    return d1 - d2;
  };
  const userNameFilter = (value) => (params) =>
    params.value.name.toLowerCase().includes(value.toLowerCase()) ||
    params.value.email.toLowerCase().includes(value.toLowerCase());

  const handleAccept = (id) => {
    acceptTask(id).then(() => {
      setRows(
        rows.map((row) => {
          if (row.id === id) {
            row.details.accept = true;
            if (new Date(row.start) <= Date.now()) {
              row.status = "in progress";
            }
          }
          return row;
        })
      );
    });
  };
  const handleDecline = (id) => {
    acceptTask(id).then(() => {
      declineTask(id).then(() => {
        setRows(rows.filter((row) => row.id !== id));
      });
    });
  };

  const getTasksHelper = (s) => (s ? getTasks : getTasksOther);

  useEffect(() => {
    getTasksHelper(self)(complete)
      .then(({ data }) => {
        const sample = {
          image: userImg,
          name: "",
          email: "",
        };
        const users = new Set();
        if (complete === false) {
          data = data.filter((task) => task.task_status !== "completed");
        }
        setRows(
          data.map((task) => {
            const newTask = {
              id: task.task_id,
              name: task.task_name,
              label: task.task_tag,
              assigneeid: task.assignee_id,
              assignee: sample,
              assignerid: task.assigner_id,
              assigner: sample,
              description: task.task_desc,
              status: task.task_status,
              priority: task.task_priority,
              start: task.start_date,
              deadline: task.end_date,
              progress: task.checkListList.length
                ? Math.round(
                    (task.checkListList.reduce((prev, curr) => {
                      if (curr.bool_check) {
                        return prev + 1;
                      }
                      return prev;
                    }, 0) *
                      100) /
                      task.checkListList.length
                  )
                : 100,
              details: task,
            };
            users.add(task.assignee_id);
            users.add(task.assigner_id);
            return newTask;
          })
        );
        return Promise.all(Array.from(users).map((user) => getProfile(user)));
      })
      .then((values) => {
        console.log("values", values);
        const users = new Map();
        values.forEach(({ data }) => {
          users.set(data.user_id, {
            image: data.user_image,
            name: data.user_name,
            email: data.user_email,
          });
        });
        setRows((prev) =>
          prev.map((task) => {
            task.assignee = users.get(task.assigneeid);
            task.assigner = users.get(task.assignerid);
            return task;
          })
        );
      });
  }, []);
  return {
    columns: [
      {
        field: "id",
        headerName: "TASK ID",
        whiteSpace: "normal",
        width: 120,
      },
      {
        field: "name",
        headerName: "TASK NAME",
        width: self && !complete ? 300 : 150,
      },
      {
        field: "label",
        headerName: "LABEL",
      },
      {
        field: self ? "assigner" : "assignee",
        headerName: self ? "ASSIGNER" : "ASSIGNEE",
        width: 200,
        sortComparator: userNameComparator,
        getApplyQuickFilterFn: userNameFilter,
        filterable: false,
        renderCell: (params) =>
          self ? (
            <Author
              image={params.row.assigner.image ? params.row.assigner.image : userImg}
              name={params.row.assigner.name}
              email={params.row.assigner.email}
            />
          ) : (
            <Author
              image={params.row.assignee.image ? params.row.assignee.image : userImg}
              name={params.row.assignee.name}
              email={params.row.assignee.email}
            />
          ),
      },
      {
        field: "description",
        headerName: "DESCRIPTION",
        sortable: false,
        width: 350,
        renderCell: (params) => (
          <MDBox sx={{ maxHeight: 120, overflow: "auto" }}>{params.row.description}</MDBox>
        ),
      },
      {
        field: "status",
        headerName: "STATUS",
        description: self ? "Double click the cell to edit." : undefined,
        width: 120,
        editable: self,
        filterable: !self,
        getApplyQuickFilterFn: undefined,
        type: self ? "singleSelect" : "string",
        valueOptions: self ? ["in progress", "blocked"] : undefined,
      },
      {
        field: "priority",
        headerName: "PRIORITY",
        type: "singleSelect",
        align: "center",
        valueOptions: ["Critical", "High", "Medium", "Low", "None"],
      },
      {
        field: "start",
        headerName: "START DATE",
        type: "date",
        width: 120,
        sortComparator: dateComparator,
      },
      {
        field: "deadline",
        headerName: "DEADLINE",
        type: "date",
        width: 120,
        sortComparator: dateComparator,
      },
      {
        field: "progress",
        headerName: "PROGRESS",
        width: 110,
        type: "number",
        renderCell: (params) => <Progress color="info" value={params.row.progress} />,
      },
      {
        field: "details",
        headerName: "ACTIONS",
        sortable: false,
        filterable: false,
        width: 150,
        getApplyQuickFilterFn: undefined,
        align: "center",
        headerAlign: "center",
        type: "actions",
        getActions: ({ row }) => {
          const { details } = row;
          let ret = [
            <MDTypography
              variant="caption"
              color="text"
              fontWeight="medium"
              component={Link}
              to={`/dashboard/taskDetail/${row.id}`}
            >
              Details
            </MDTypography>,
          ];
          if (!details.accept && self) {
            ret = [
              ...ret,
              <MDTypography
                variant="caption"
                color="success"
                fontWeight="medium"
                onClick={() => {
                  handleAccept(row.id);
                }}
                sx={{ cursor: "pointer" }}
              >
                Accept
              </MDTypography>,
              <MDTypography
                variant="caption"
                color="error"
                fontWeight="medium"
                onClick={() => {
                  handleDecline(row.id);
                }}
                sx={{ cursor: "pointer" }}
              >
                Decline
              </MDTypography>,
            ];
          }
          if (row.progress === 100 && details.assigner_id === myid && !complete) {
            ret = [
              ...ret,
              <MDTypography
                variant="caption"
                color="success"
                fontWeight="medium"
                component={Link}
                to={`/dashboard/reviewTask/${row.id}`}
                sx={{ cursor: "pointer" }}
              >
                Review
              </MDTypography>,
            ];
          }
          return ret;
        },
      },
    ],
    rows,
  };
}
