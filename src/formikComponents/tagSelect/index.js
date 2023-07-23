/**
 * Author: Joseph Zhou
 * Created At: 2 Oct 2022
 */

/* eslint-disable no-shadow */
import * as React from "react";

// MUI components
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

// Formik components
import { useField } from "formik";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

export default function SelectTags({ name, textFieldProps, ...props }) {
  const [field, mata, helper] = useField(name);
  const config = {
    ...field,
    ...props,
    renderInput: (props) => (
      <TextField
        {...props}
        {...textFieldProps}
        helperText={mata.error}
        error={mata && mata.touched && mata.error}
      />
    ),
    onChange: (_, value) => helper.setValue(value),
    onBlur: () => helper.setTouched(true),
  };

  return <Autocomplete {...config} />;
}

SelectTags.defaultProps = {
  textFieldProps: {},
};

SelectTags.propTypes = {
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  textFieldProps: PropTypes.object,
};
