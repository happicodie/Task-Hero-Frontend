/**
 * Author: Yue Wu, Joseph Zhou
 * Created At: 2 Oct 2022
 */

/* eslint-disable no-unused-vars */
import { useField } from "formik";
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDButton from "components/MDButton";

// MUI components
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

// MUI datagrid
import { DataGrid, gridClasses, GridToolbarContainer, GridActionsCellItem } from "@mui/x-data-grid";

function EditToolbar(props) {
  const { value, setValue } = props;

  const handleClick = () => {
    const id = Math.floor(Math.random() * 10000);
    setValue([...value, { id, bool_check: false, check_detail: "" }]);
  };

  return (
    <GridToolbarContainer>
      <MDButton color="primary" variant="text" startIcon={<AddIcon />} onClick={handleClick}>
        Add item
      </MDButton>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.array.isRequired,
  setValue: PropTypes.func.isRequired,
};

function CheckList({ name, ...otherProps }) {
  const [field, _meta, helper] = useField(name);
  const { setValue } = helper;
  const { value } = field;

  // console.log(field.value);
  const handleDeleteClick = (id) => () => {
    setValue(field.value.filter((row) => row.id !== id));
  };

  const columns = [
    {
      field: "bool_check",
      headerName: "Check",
      type: "boolean",
    },
    {
      field: "check_detail",
      headerName: "Item",
      editable: true,
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      // eslint-disable-next-line react/no-unstable-nested-components
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ],
    },
  ];
  const processRowUpdate = (newRow) => {
    setValue(field.value.map((row) => (row.id === newRow.id ? newRow : row)));
    return newRow;
  };

  return (
    <DataGrid
      {...otherProps}
      rows={field.value}
      columns={columns}
      experimentalFeatures={{ newEditingApi: true }}
      disableColumnSelector
      disableSelectionOnClick
      getRowHeight={() => "auto"}
      processRowUpdate={processRowUpdate}
      sx={{
        [`& .${gridClasses.cell}`]: {
          py: 1,
        },
      }}
      components={{
        Toolbar: EditToolbar,
      }}
      componentsProps={{
        toolbar: { value, setValue },
      }}
    />
  );
}

CheckList.defaultProps = {
  name: "name",
};

// Typechecking props for the MDInput
CheckList.propTypes = {
  name: PropTypes.string,
};

export default CheckList;
