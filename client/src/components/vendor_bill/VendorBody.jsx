import React, { useState } from "react";
import {
  Box,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  TextField,
  useTheme,
  Autocomplete,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useGetItemsQuery } from "state/api";
import { tableHeadList } from "data/data";

const VendorBody = () => {
  const { data } = useGetItemsQuery({ isActive: true });
  const theme = useTheme();

  const activeItems = data ? data.filter((item) => item.isActive) : [];

  console.log(
    "activeItems",
    activeItems.map((item) => item.itemName)
  );
  const [items, setItems] = useState([]);
  const [showAddItem, setShowAddItem] = useState(true);
  const [newItem, setNewItem] = useState({
    itemCode: "",
    itemName: "",
    unitPrice: "",
    quantity: "",
  });

  const handleAddItem = () => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    setNewItem({
      itemCode: "",
      itemName: "",
      quantity: "",
      unitPrice: "",
    });
    setShowAddItem(true);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (event, newValue, newItem) => {
    if (newValue) {
      setNewItem(newValue);
    } else {
      setNewItem({
        itemCode: "",
        itemName: "",
        quantity: newItem.quantity,
        unitPrice: newItem.unitPrice,
      });
    }
  };

  return (
    <Box>
      <Box
        sx={{ backgroundColor: theme.palette.background.alt, marginY: "25px" }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {tableHeadList.map((head, index) => (
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.dark,
                      color: theme.palette.common.white,
                    }}
                    key={index}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: (theme) => theme.palette.action.hover,
                    },
                  }}
                >
                  <TableCell>{item.itemCode}</TableCell>
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unitPrice}</TableCell>
                  <TableCell>
                    {parseFloat(item.quantity) * parseFloat(item.unitPrice)}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDeleteItem(index)}
                      color="secondary"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {!showAddItem && (
                <TableRow>
                  <TableCell sx={{ width: "25%" }}>
                    <Autocomplete
                      options={activeItems}
                      getOptionLabel={(item) => item.itemCode}
                      value={newItem}
                      onChange={handleOptionChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="itemCode"
                          label="Item Code"
                          variant="standard"
                          fullWidth
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell sx={{ width: "25%" }}>
                    <Autocomplete
                      options={activeItems}
                      getOptionLabel={(item) => item.itemName}
                      value={newItem}
                      onChange={handleOptionChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="itemName"
                          label="Description"
                          variant="standard"
                          fullWidth
                        />
                      )}
                    />
                  </TableCell>

                  <TableCell sx={{ width: "15%" }}>
                    <TextField
                      name="unitPrice"
                      label="Unit price"
                      value={newItem.unitPrice}
                      onChange={handleInputChange}
                      fullWidth
                      variant="standard"
                    />
                  </TableCell>
                  <TableCell sx={{ width: "15%" }}>
                    <TextField
                      name="quantity"
                      label="Quantity"
                      value={newItem.quantity}
                      onChange={handleInputChange}
                      fullWidth
                      variant="standard"
                    />
                  </TableCell>
                  <TableCell sx={{ width: "15%" }}></TableCell>
                  <TableCell sx={{ width: "5%" }}>
                    <Button
                      variant="contained"
                      onClick={handleAddItem}
                      sx={{
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.common.white,
                        fontWeight: "bold",
                      }}
                    >
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {showAddItem && (
          <Button
            sx={{
              marginY: "10px",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
            color="secondary"
            onClick={() => setShowAddItem(false)}
          >
            Add Item
          </Button>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box sx={{ flex: 1 }}></Box>
        <Box
          sx={{
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography fontSize={14} sx={{ flex: 1, marginRight: "10px" }}>
              Sub Total
            </Typography>
            <Typography fontSize={14}>0000.00</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography fontSize={14} sx={{ flex: 1, marginRight: "10px" }}>
              Discount
            </Typography>
            <Typography fontSize={14}>0000.00</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography fontSize={14} sx={{ flex: 1, marginRight: "10px" }}>
              Tax{" "}
            </Typography>{" "}
            <Typography fontSize={14}>0000.00</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography fontSize={14} sx={{ flex: 1, marginRight: "10px" }}>
              Advance
            </Typography>
            <Typography fontSize={14}>0000.00</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              fontSize={14}
              sx={{ flex: 1, marginRight: "10px", fontWeight: "bold" }}
            >
              Grand Total
            </Typography>
            <Typography fontSize={14} fontWeight={"bold"}>
              0000.00
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VendorBody;
