/**
 * Author: Yue Wu
 * Created At: 2 Oct 2022
 */

import React from "react";
import { useFormikContext } from "formik";
import MDButton from "components/MDButton";
import PropTypes from "prop-types";

function ButtonWrapper({ children, ...otherProps }) {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const configButton = {
    ...otherProps,
    onClick: handleSubmit,
  };

  return (
    <MDButton variant="gradient" color="info" {...configButton}>
      {children}
    </MDButton>
  );
}

ButtonWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ButtonWrapper;
