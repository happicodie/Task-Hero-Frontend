/**
 * Author: Yue Wu, Joseph Zhou
 * Created At: 2 Oct 2022
 */

import { forwardRef } from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
import fileToDataUrl from "utilities/imageLoader";

const ImagePicker = forwardRef(({ name, ...otherProps }, ref) => {
  // eslint-disable-next-line no-unused-vars
  const [field, _mata, helper] = useField(name);
  const handleChange = async (evt) => {
    try {
      const img = await fileToDataUrl(evt.target.files[0]);
      helper.setValue(img);
    } catch (err) {
      helper.setError("err.toString()");
    }
  };

  const config = {
    name: field[name],
    ...otherProps,
    onChange: handleChange,
    type: "file",
    accept: "image/*",
  };

  return <input {...config} ref={ref} />;
});

// Typechecking props for the MDInput
ImagePicker.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ImagePicker;
