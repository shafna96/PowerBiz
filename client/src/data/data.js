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

const contactPerson = [
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

/* export columns */

export const customerColumns = [
  ...commonFields,
  {
    field: "customerType",
    headerName: "Customer Type",
    flex: 0.5,
  },
  ...contactPerson,
];

export const supplierColumns = [
  ...commonFields,
  {
    field: "supplierType",
    headerName: "Supplier Type",
    flex: 0.5,
  },
  ...contactPerson,
];

export const itemColumns = [
  {
    field: "_id",
    headerName: "#",
    flex: 0.125,
    renderCell: (index) => index.api.getRowIndex(index.row._id) + 1,
  },
  {
    field: "itemName",
    headerName: "Item Name",
    flex: 0.5,
  },
  { field: "itemCode", headerName: "Item Code", flex: 0.5 },
  { field: "image", headerName: "Image", flex: 0.5 },
  {
    field: "unitPrice",
    headerName: "Unit Price",
    flex: 0.5,
    valueGetter: (params) => {
      if (params.value === undefined || params.value === null) {
        return "";
      }
      return params.value.toFixed(2);
    },
  },
  {
    field: "unitCost",
    headerName: "Unit Cost",
    flex: 0.5,
    valueGetter: (params) => {
      if (params.value === undefined || params.value === null) {
        return "";
      }
      return params.value.toFixed(2);
    },
  },
  {
    field: "discount",
    headerName: "Discount",
    flex: 0.5,
    valueGetter: (params) => {
      if (params.value === undefined || params.value === null) {
        return "";
      }
      return params.value.toFixed(2);
    },
  },
  { field: "size", headerName: "Size", flex: 0.5 },
  { field: "comments", headerName: "Comments", flex: 0.5 },
];
