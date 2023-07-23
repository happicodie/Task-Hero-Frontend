/**
 * Author: Joseph Zhou
 * Created At: 2 Oct 2022
 */

/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import { Fragment, useEffect, useState } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// MUI components
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Formik components
import { useField } from "formik";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// API helper functions
import { connected, getProfile } from "api/fetch";

// images
import user from "assets/images/user";

// eslint-disable-next-line react/prop-types
function Author({ image, name, email }) {
  return (
    <MDBox display="flex" alignItems="center" lineHeight={1} sx={{ flexGrow: 1 }}>
      <MDAvatar src={image || user} name={name} size="md" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium" sx={{ fontSize: 20 }}>
          {name}
        </MDTypography>
        <MDTypography variant="caption" sx={{ fontSize: 15 }}>
          {email}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

function Trait({ tags }) {
  return (
    <MDBox display="flex" sx={{ flexDirection: "column" }}>
      <Stack direction="row" spacing={1}>
        {tags.map((tag) => (
          <Chip label={tag} key={tag} size="small" variant="outlined" color="primary" />
        ))}
      </Stack>
    </MDBox>
  );
}

export default function SelectUser({ name, ...props }) {
  const [field, mata, helper] = useField(name);
  const [profiles, setProfiles] = useState([]);

  useEffect(async () => {
    const { data: otherData } = await connected();
    const myid = localStorage.getItem("userId");
    const data = [{ user_id: myid }, ...otherData];
    data.map(async (elem) => {
      // eslint-disable-next-line no-shadow
      const { data } = await getProfile(elem.user_id);
      const metaProfile = {
        userid: data.user_id,
        fullName: data.user_id === myid ? "Me" : data.user_name,
        email: data.user_email,
        tags: data.tags,
        avatar: data.user_image,
      };
      setProfiles((prev) => [...prev, metaProfile]);
    });
  }, []);

  const config = {
    ...field,
    ...props,
    options: profiles,
    renderInput: (props) => (
      <TextField
        label="Assignee"
        {...props}
        helperText={mata.error}
        error={mata && mata.touched && mata.error}
      />
    ),
    renderTags: (value) => (
      <Author image={value.avatar} name={value.fullName} email={value.email} />
    ),
    onChange: (_, value) => helper.setValue(value),
    // onBlur: () => helper.setTouched(true),
    getOptionLabel: (option) => option.fullName || "",
    isOptionEqualToValue: (option, value) => option.userid === value.userid,
    renderOption: (props, option) => (
      <Fragment key={option.userid}>
        <Box component="li" sx={{ display: "flex" }} {...props}>
          <Author image={option.avatar} name={option.fullName} email={option.email} />
          <Trait tags={option.tags} />
        </Box>
        <Divider />
      </Fragment>
    ),
  };

  return <Autocomplete {...config} disableClearable />;
}

SelectUser.propTypes = {
  name: PropTypes.string.isRequired,
};
