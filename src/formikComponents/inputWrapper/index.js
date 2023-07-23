/**
 * Author: Yue Wu, Joseph Zhou
 * Created At: 2 Oct 2022
 */

import React from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
// import TextField from "@mui/material/TextField";
import MDInput from "components/MDInput";

function InputWrapper({ name, ...otherProps }) {
  const [field, mata] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
  };

  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  return <MDInput {...configTextfield} />;
}

InputWrapper.defaultProps = {
  name: "name",
};

// Typechecking props for the MDInput
InputWrapper.propTypes = {
  name: PropTypes.string,
};

export default InputWrapper;
