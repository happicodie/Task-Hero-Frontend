/**
 * Author: Joseph Zhou
 * Created At: 2 Oct 2022
 */

import React from "react";
import { useField } from "formik";
import MDInput from "components/MDInput";
import PropTypes from "prop-types";

function TextfieldWrapper({ name, ...otherProps }) {
  const [field, mata] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
  };

  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  return <MDInput variant="standard" {...configTextfield} />;
}

TextfieldWrapper.defaultProps = {
  name: "name",
};

// Typechecking props for the MDInput
TextfieldWrapper.propTypes = {
  name: PropTypes.string,
};

export default TextfieldWrapper;
