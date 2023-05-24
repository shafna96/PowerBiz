const commonFields = [
  {
    field: "_id",
    headerName: "#",
    flex: 0.125,
    renderCell: (index) => index.api.getRowIndex(index.row._id) + 1,
  },

  {
    field: "name",
    headerName: "Name",
    flex: 0.5,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 0.5,
  },
  {
    field: "address",
    headerName: "Address",
    flex: 0.75,
  },
  {
    field: "phone",
    headerName: "Phone Number",
    flex: 0.5,
    renderCell: (params) => {
      return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
    },
  },
];

export const customerColumns = [
  ...commonFields,
  {
    field: "customerType",
    headerName: "Customer Type",
    flex: 0.5,
  },
  {
    field: "contactPerson",
    headerName: "Contact Person",
    flex: 0.5,
    renderCell: (params) => {
      if (params.value === undefined) {
        return "";
      }
      return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
    },
  },
];

export const supplierColumns = [
  ...commonFields,
  {
    field: "supplierType",
    headerName: "Supplier Type",
    flex: 0.5,
  },
  {
    field: "contactPerson",
    headerName: "Contact Person",
    flex: 0.5,
    renderCell: (params) => {
      if (params.value === undefined) {
        return "";
      }
      return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
    },
  },
];
