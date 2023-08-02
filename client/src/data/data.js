import { MoreVert } from "@mui/icons-material";
import React from "react";

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
    required: true,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 0.5,
    required: true,
  },
  {
    field: "address",
    headerName: "Address",
    flex: 0.75,
  },
  {
    field: "phone",
    headerName: "Phone Number",
    type: "tel",
    // inputMode: "numeric",
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
    required: true,
  },
  { field: "itemCode", headerName: "Item Code", flex: 0.5, required: true },
  {
    field: "image",
    headerName: "Image",
    flex: 0.5,
    renderCell: (params) => (
      <img
        src={`./uploads/${params.value}`}
        alt="Customer"
        style={{ width: "35px", height: "35px" }}
      />
    ),
  },
  {
    field: "unitPrice",
    headerName: "Unit Price",
    flex: 0.5,
    required: true,

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
  { field: "size", headerName: "Size", flex: 0.5, required: true },
  { field: "comments", headerName: "Comments", flex: 0.5 },
];

export const vendorbillFields = [
  { field: "vendor", headerName: "Vendor", flex: 0.5 },
  { field: "billDate", headerName: "Bill Date", flex: 0.5 },
  { field: "billNo", headerName: "Bill No", flex: 0.5 },
];

export const tableHeadList = [
  { id: 1, name: "#", align: "left", width: "2%" },
  { id: 2, name: "Item Code", align: "left", width: "25%" },
  { id: 3, name: "Description", align: "left", width: "25%" },
  { id: 4, name: "Unit Price", align: "right", width: "16%" },
  { id: 5, name: "Quantity", align: "right", width: "16%" },
  { id: 6, name: "Amount", align: "right", width: "16%" },
  {
    id: 7,
    name: <MoreVert />,
    align: "center",
    width: "2%",
    paddingTop: "10px",
  },
];

export const vendorTabs = [
  {
    id: 1,
    label: "detail",
  },
  {
    id: 2,
    label: "other",
  },
];
