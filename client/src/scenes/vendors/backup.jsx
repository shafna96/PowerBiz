import React, { useRef, useState } from "react";
import { Box, MenuItem } from "@mui/material";
import { DataGridComp, FormComp, Header } from "components";
import ActionsCell from "components/ActionsCell";
import { supplierColumns } from "data/data";
import { useSelector } from "react-redux";
import {
  useCreateSupplierMutation,
  useDeleteSupplierMutation,
  useEditSupplierMutation,
  useGetSuppliersQuery,
} from "state/api";

const Suppliers = () => {
  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetSuppliersQuery({ isActive: true });

  const [deleteSupplier] = useDeleteSupplierMutation();
  const [editSupplier] = useEditSupplierMutation();

  const activeSuppliers = data
    ? data.filter((supplier) => supplier.isActive)
    : [];

  const [createSupplier, { isLoading: isCreating }] =
    useCreateSupplierMutation();

  const filteredFields = supplierColumns.filter(
    (column) => column.field !== "_id"
  );

  const [formFields, setFormFields] = useState(
    supplierColumns.reduce((acc, { field }) => ({ ...acc, [field]: "" }), {})
  );
  const formFieldsRef = useRef(formFields);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    formFieldsRef.current = { ...formFieldsRef.current, [name]: value };
    setFormFields(formFieldsRef.current);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isCreating) {
      return;
    }
    try {
      if (!userId) {
        return;
      }
      const updatedFormFields = { ...formFields, userId }; // Include the userId in the request payload
      await createSupplier(updatedFormFields).unwrap(); //   console.log("formData:", { customer: formFields, userId: userId }); // Pass the updated formData
      setFormFields(
        supplierColumns.reduce(
          (acc, { field }) => ({ ...acc, [field]: "" }),
          {}
        )
      );
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log("submit error", error.response.data.error);
      } else {
        console.log("submit error", error);
      }
    }
  };

  const filteredColumns = [
    ...supplierColumns,
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.6,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <ActionsCell
          params={params}
          filteredFields={filteredFields}
          editMutation={editSupplier}
          deleteMutation={deleteSupplier}
          entity="supplier"
          option={"supplierType"}
          menuItem={[
            <MenuItem key="individual" value="individual">
              Individual
            </MenuItem>,
            <MenuItem key="company" value="company">
              Company
            </MenuItem>,
          ]}
        />
      ),
    },
  ];

  return (
    <Box>
      <Header title="SUPPLIERS" subTitle="Create Supplier" /> {/* */}
      <FormComp
        data={filteredFields}
        value={formFields}
        handleChange={(event) => handleChange(event)}
        handleSubmit={(event) => handleSubmit(event)}
        option={"supplierType"}
        menuItem={[
          <MenuItem key="individual" value="individual">
            Individual
          </MenuItem>,
          <MenuItem key="company" value="company">
            Company
          </MenuItem>,
        ]}
      />
      <DataGridComp
        subTitle="Supplier Table"
        loading={isLoading || !data}
        getRowId={(row) => row._id}
        rows={activeSuppliers}
        columns={filteredColumns}
      />
    </Box>
  );
};

export default Suppliers;

// import { Close } from "@mui/icons-material";
// import {
//   Box,
//   Checkbox,
//   FormControl,
//   FormControlLabel,
//   Grid,
//   IconButton,
//   MenuItem,
//   Paper,
//   Select,
// } from "@mui/material";
// import { FlexBetween, Header, TextFieldComp } from "components";
// import ShrinkablePaper from "components/ShrinkablePaper";
// import { useCloseComponent } from "components/useCloseComponent";
// import React, { useState } from "react";

// const CreateVendor = () => {
//   const [individualChecked, setIndividualChecked] = useState(true);
//   const [companyChecked, setCompanyChecked] = useState(false);
//   const handleIndividualChange = () => {
//     setIndividualChecked(!individualChecked);
//     if (companyChecked) {
//       setCompanyChecked(false);
//     }
//   };

//   const handleCompanyChange = () => {
//     setCompanyChecked(!companyChecked);
//     if (individualChecked) {
//       setIndividualChecked(false);
//     }
//   };
//   const handleClose = useCloseComponent();
//   return (
//     <Box>
//       <FlexBetween
//         sx={{
//           position: "sticky",
//           top: 0,
//           zIndex: 2,
//           backgroundColor: "white",
//           height: "50px",
//         }}
//       >
//         <Header title={"New Vendor"} sx={{ paddingLeft: "1rem" }} />
//       </FlexBetween>
//       <Paper
//         elevation={6}
//         sx={{
//           //  backgroundColor: theme.palette.grey[100],
//           m: "1rem",
//         }}
//       >
//         <FlexBetween>
//           <Box flex={1} />
//           <IconButton
//             size="small"
//             onClick={handleClose}
//             sx={{
//               borderRadius: 0, // Make the Button circular
//               backgroundColor: "red",
//             }}
//           >
//             <Close
//               sx={{
//                 color: "white",
//                 fontSize: "16px", // Adjust the font size of the icon as needed
//               }}
//             />
//           </IconButton>
//         </FlexBetween>
//         <Box
//           sx={{
//             p: "1rem",
//             overflowY: "auto",
//             paddingY: "10px", // Add appropriate spacing
//             display: "flex",
//             //flexDirection: "column",
//             minHeight: "calc(100vh - 220px)", // Set minimum height of the page to 100vh
//           }}
//         >
//           <Box sx={{ flex: 1 }}>
//             <Grid container spacing={4}>
//               <Grid item xs={12}>
//                 <TextFieldComp id="vendor_id" label="Vendor Id" width="25%" />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       defaultChecked
//                       color="secondary"
//                       checked={individualChecked}
//                       onChange={handleIndividualChange}
//                       name="individual"
//                     />
//                   }
//                   label="Individual"
//                 />
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       color="secondary"
//                       checked={companyChecked}
//                       onChange={handleCompanyChange}
//                       name="company"
//                     />
//                   }
//                   label="Company"
//                 />
//               </Grid>
//               <Grid item xs={6} rowSpacing={6} columnSpacing={4}>
//                 <Grid>
//                   <TextFieldComp
//                     id="title-select"
//                     defaultValue={"Mr."}
//                     select
//                     label="Title"
//                     width="20%"
//                     //  onChange={(e) => setTitle(e.target.value)}
//                   >
//                     <MenuItem value={"Mr."}>Mr.</MenuItem>
//                     <MenuItem value={"Mrs."}>Mrs.</MenuItem>
//                     <MenuItem value={"Mss."}>Mss.</MenuItem>
//                   </TextFieldComp>
//                   <TextFieldComp
//                     id="vendor_name"
//                     label="Vendor Name"
//                     width="70%"
//                     sx={{
//                       marginLeft: "10px",
//                     }}
//                   />
//                 </Grid>
//                 <Grid spacing={2}>
//                   <TextFieldComp
//                     id="address"
//                     label="Address"
//                     multiline
//                     rows={4}
//                     width="92%"
//                   />
//                   <TextFieldComp
//                     id="other_Name"
//                     label="Other Name"
//                     width="92%"
//                   />
//                 </Grid>
//               </Grid>
//               <Grid item xs={6}>
//                 <TextFieldComp id="mobile" label="Mobile" width="92%" />
//                 <TextFieldComp id="fax" label="Fax" width="92%" />
//                 <TextFieldComp id="email" label="Email" width="92%" />
//                 <TextFieldComp id="website" label="Website" width="92%" />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextFieldComp id="nic" label="NIC" width="40%" />
//               </Grid>
//               <Grid item xs={4}>
//                 <TextFieldComp id="vat" label="VAT" />
//               </Grid>
//               <Grid item xs={4}>
//                 <TextFieldComp id="vat" label="TIN" />
//               </Grid>
//               <Grid item xs={4}>
//                 <TextFieldComp id="business_field" label="Business field" />
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default CreateVendor;
