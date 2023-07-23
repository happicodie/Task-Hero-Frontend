/**
 * Author: Yue Wu, Joseph Zhou
 * Created At: 2 Oct 2022
 */

/* eslint-disable */
import React from "react";
import TextField from "@mui/material/TextField";
import { useField } from "formik";

const DateTimePicker = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configDateTimePicker = {
    ...field,
    ...otherProps,
    type: "date",
    variant: "outlined",
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return <TextField {...configDateTimePicker} />;
};

export default DateTimePicker;
