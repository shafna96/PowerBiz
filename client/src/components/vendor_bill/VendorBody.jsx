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
import { AddCircleOutline, Delete } from "@mui/icons-material";
import { useGetItemsQuery } from "state/api";
import { tableHeadList } from "data/data";
import FlexBetween from "components/FlexBetween";

const TableBodyCell = ({ children, right }) => {
  return (
    <TableCell align={right ? "right" : "left"} sx={{ padding: "5px" }}>
      {children}
    </TableCell>
  );
};

const TextFieldRow = (props) => {
  const { align } = props;
  return (
    <TextField
      {...props}
      fullWidth
      variant="standard"
      sx={{
        "& input::placeholder": {
          textAlign: align,
        },
      }}
    />
  );
};

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
      unitPrice: "",
      quantity: "",
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
                {tableHeadList.map((head) => (
                  <TableCell
                    align={head.align}
                    sx={{
                      backgroundColor: theme.palette.secondary.dark,
                      color: theme.palette.common.white,
                      width: head.width,
                      padding: "5px",
                      paddingTop: head.paddingTop,
                    }}
                    key={head.id}
                  >
                    {head.name}
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
                  <TableBodyCell>#</TableBodyCell>
                  <TableBodyCell>{item.itemCode}</TableBodyCell>
                  <TableBodyCell>{item.itemName}</TableBodyCell>
                  <TableBodyCell right>{item.unitPrice}</TableBodyCell>
                  <TableBodyCell right>{item.quantity}</TableBodyCell>
                  <TableBodyCell right>
                    {parseFloat(item.unitPrice) * parseFloat(item.quantity)}
                  </TableBodyCell>
                  <TableBodyCell>
                    <IconButton
                      size="small"
                      sx={{ align: "right" }}
                      onClick={() => handleDeleteItem(index)}
                      color="secondary"
                    >
                      <Delete />
                    </IconButton>
                  </TableBodyCell>
                </TableRow>
              ))}
              {!showAddItem && (
                <TableRow>
                  <TableBodyCell></TableBodyCell>
                  <TableBodyCell>
                    <Autocomplete
                      options={activeItems}
                      getOptionLabel={(item) => item.itemCode}
                      value={newItem}
                      onChange={handleOptionChange}
                      renderInput={(params) => (
                        <TextFieldRow
                          {...params}
                          name="itemCode"
                          placeholder="Item Code"
                        />
                      )}
                    />
                  </TableBodyCell>
                  <TableBodyCell>
                    <Autocomplete
                      options={activeItems}
                      getOptionLabel={(item) => item.itemName}
                      value={newItem}
                      onChange={handleOptionChange}
                      renderInput={(params) => (
                        <TextFieldRow
                          {...params}
                          name="itemName"
                          placeholder="Description"
                        />
                      )}
                    />
                  </TableBodyCell>

                  <TableBodyCell right>
                    <TextFieldRow
                      name="unitPrice"
                      placeholder="Unit Price"
                      value={newItem.unitPrice}
                      onChange={handleInputChange}
                      align="right"
                    />
                  </TableBodyCell>
                  <TableBodyCell right>
                    <TextFieldRow
                      name="quantity"
                      placeholder="Quantity"
                      value={newItem.quantity}
                      onChange={handleInputChange}
                      align="right"
                    />
                  </TableBodyCell>
                  <TableBodyCell></TableBodyCell>
                  <TableBodyCell sx={{ padding: "5px" }}>
                    <IconButton
                      size="small"
                      // variant="contained"
                      onClick={handleAddItem}
                      sx={{
                        // backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.secondary.main,
                        fontWeight: "bold",
                      }}
                    >
                      <AddCircleOutline />
                    </IconButton>
                  </TableBodyCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {showAddItem && (
          <Button
            sx={{
              // marginY: "10px",
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
          paddingRight: "2%",
        }}
      >
        <Box sx={{ flex: 1 }}></Box>
        <Box
          sx={{
            flexDirection: "column",
            alignItems: "flex-end",
            width: "180px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography fontSize={14} sx={{ flex: 1 }}>
              Sub Total
            </Typography>
            <Typography fontSize={14}>0000.00</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography fontSize={14} sx={{ flex: 1 }}>
              Discount
            </Typography>
            <Typography fontSize={14}>0000.00</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography fontSize={14} sx={{ flex: 1 }}>
              Tax
            </Typography>
            <Typography fontSize={14}>0000.00</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography fontSize={14} sx={{ flex: 1 }}>
              Advance
            </Typography>
            <Typography fontSize={14}>0000.00</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography fontSize={14} sx={{ flex: 1, fontWeight: "bold" }}>
              Grand Total
            </Typography>
            <Typography fontSize={14} fontWeight={"bold"}>
              0000.00
            </Typography>
          </Box>
        </Box>
        {/* <Box sx={{ width: "8%" }}></Box> */}
      </Box>
      <Box
        sx={{
          display: "flex",
          paddingRight: "2%",
          marginY: "20px",
        }}
      >
        <Box sx={{ flex: 1 }}></Box>
        <Box
          sx={{
            flexDirection: "column",
            alignItems: "flex-end",
            width: "150px",
          }}
        >
          <FlexBetween>
            <Button
              sx={{
                backgroundColor: theme.palette.secondary.dark,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Save
            </Button>

            <Button
              sx={{
                backgroundColor: theme.palette.secondary.dark,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Confirm
            </Button>
          </FlexBetween>
        </Box>
      </Box>
    </Box>
  );
};

export default VendorBody;
