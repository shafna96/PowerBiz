export const columns = [
  {
    field: "_id",
    headerName: "#",
    flex: 0.25,
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
    flex: 1,
  },
  {
    field: "address",
    headerName: "Address",
    flex: 1,
  },
  {
    field: "phone",
    headerName: "Phone Number",
    flex: 0.5,
    renderCell: (params) => {
      return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
    },
  },
  {
    field: "customerType",
    headerName: "Customer Type",
    flex: 1,
  },
  {
    field: "contactPerson",
    headerName: "Contact Person",
    flex: 1,
  },
];
