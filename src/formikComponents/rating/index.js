/**
 * Author: Yue Wu, Joseph Zhou
 * Created At: 2 Oct 2022
 */

import React from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";

function RatingWrapper({ name, ...otherProps }) {
  const [field, mata] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
  };

  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  return <Rating {...configTextfield} />;
}

RatingWrapper.defaultProps = {
  name: "name",
};

// Typechecking props for the MDInput
RatingWrapper.propTypes = {
  name: PropTypes.string,
};

export default RatingWrapper;
