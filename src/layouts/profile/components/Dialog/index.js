/**
 * Author: Joseph Zhou
 * Created At: 23 Oct 2022
 * Discription: A modal for connection request.
 */

import * as React from "react";

// @mui material components
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Material Dashboard 2 React components
import MDButton from "components/MDButton";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// react-router components
import { useParams } from "react-router-dom";

// api helper functions
import { sendConnection, acceptConnection } from "api/fetch";

export default function ConnectionDialog({ open, setOpen, setRel, send, connectionMsg }) {
  const { userid } = useParams();
  const [msg, setMsg] = React.useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const connect = () => sendConnection(userid, msg);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Connect the user</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {send
            ? "Leave a message to the user:"
            : "The user left a message and want to connect with you."}
        </DialogContentText>
        <TextField
          autoFocus
          value={send ? msg : connectionMsg}
          onChange={(evt) => {
            if (send && evt.target.value.length <= 300) {
              setMsg(evt.target.value);
            }
          }}
          margin="dense"
          id="name"
          label="Message"
          type="text"
          fullWidth
          multiline
          helperText={send ? "Limit: 300 characters." : undefined}
          rows={5}
        />
      </DialogContent>
      <DialogActions>
        <MDButton onClick={handleClose} color="primary">
          Cancel
        </MDButton>
        <MDButton
          color="success"
          onClick={() => {
            if (send) {
              connect().then(() => {
                setRel("connecting");
                setOpen(false);
              });
            } else {
              acceptConnection(userid).then(() => {
                setRel("connected");
                setOpen(false);
              });
            }
          }}
        >
          Connect
        </MDButton>
      </DialogActions>
    </Dialog>
  );
}

ConnectionDialog.defaultProps = {
  open: false,
  send: true,
};

// Typechecking props for the ConnectionDialog
ConnectionDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  setRel: PropTypes.func.isRequired,
  send: PropTypes.bool,
  connectionMsg: PropTypes.string.isRequired,
};
