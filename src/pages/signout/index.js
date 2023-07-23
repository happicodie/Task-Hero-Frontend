/**
 * Author: Joseph Zhou
 * Created At: 10 Oct 2022
 */

/* eslint-disable */
// react-router-dom components
import { useNavigate } from "react-router-dom";

// Images
import * as Yup from "yup";

// Utilities
import * as React from "react";
import { useEffect } from "react";

const INITIAL_FROMS_STATE = {
  email: "",
  password: "",
};

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().required("Required").email("Invalid email."),
  password: Yup.string().required("Required"),
});

function SignOut() {
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage.setItem("authToken", undefined);
    // localStorage.setItem("userId", undefined);
    navigate("/");
  }, []);

  return <></>;
}

export default SignOut;
