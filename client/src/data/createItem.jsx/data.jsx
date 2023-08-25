import { MenuItem } from "@mui/material";
import { currencyOptions } from "data/data";

// Raw material/WIP/Finished goods/maintainance & repair/seasonal inventory/consignment inventory/consumable inventory/pipeline inventory
const inventoryTypeOptions = [
  { id: 1, value: "Raw Material" },
  { id: 2, value: "WIP" },
  { id: 3, value: "Finished Goods" },
  { id: 4, value: "Maintainance & Repair" },
  { id: 5, value: "Seasonal Inventory" },
  { id: 6, value: "Consignment Inventory" },
  { id: 7, value: "Consumable Inventory" },
  { id: 8, value: "Pipeline Inventory" },
];

export const accordionData = [
  {
    id: "classification",
    label: "Item Classification",
    data: [
      {
        label: "Inventory Type",
        width: 4,
        required: true,
        select: true,
        renderMenu: () => (
          <>
            {inventoryTypeOptions.map((option) => (
              <MenuItem key={option.id} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </>
        ),
      },
      {
        label: "Category",
        width: 4,
        required: true,
        select: true,
        renderMenu: () => <MenuItem></MenuItem>,
      },
      {
        label: "SubCategory",
        width: 4,
        required: true,
        select: true,
        renderMenu: () => <MenuItem></MenuItem>,
      },
    ],
  },
  {
    id: "details",
    label: "Item Details",
    data: [
      {
        label: "Item Code",
        width: 4,
        required: true,
      },
      { label: "Description", width: 4, required: true },
      { label: "Barcode/SKU", width: 4 },
      { label: "Comments", width: 4 },
      { label: "Location", width: 4, required: true },
      { label: "Sub Item", width: 4 },
      { label: "Part No", width: 4 },
      {
        label: "currency",
        width: 4,
        required: true,
        select: true,
        renderMenu: () => (
          <>
            {currencyOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </>
        ),
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing & Measuring",
    data: [
      { label: "Selling price", width: 4, required: true },
      { label: "Unit Cost", width: 4, required: true },
      { label: "Selling UoM", width: 4, required: true },
      { label: "Purchasing UoM", width: 4, required: true },
      { label: "Inventory UoM", width: 4, required: true },
      { label: "MRP", width: 4 },
    ],
  },
  {
    id: "specification",
    label: "Item Specification",
    data: [
      { label: "Size", width: 4 },
      { label: "Color", width: 4 },
      { label: "Brand", width: 4 },
      { label: "Gender", width: 4 },
      { label: "Diamention", width: 4 },
    ],
  },
  {
    id: "discount",
    label: "Discount & Promotions",
    data: [
      { label: "Discount", width: 4 },
      { label: "Warranty Period", width: 4 },
    ],
  },
  {
    id: "quantity",
    label: "Item Quantity Detail",
    data: [
      { label: "Reorder level", width: 4, required: true },
      { label: "Max ", width: 4, required: true },
      { label: "Min", width: 4, required: true },
      { label: "OnHand", width: 4, required: true },
    ],
  },
  {
    id: "additional",
    label: "Additional Details",
    data: [
      { label: "Prefered Supplier", width: 4 },
      { label: "As of Date", width: 4, required: true },
    ],
  },
];
