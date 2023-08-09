import React, { useEffect, useState } from "react";
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

const TableBodyCell = ({ children, right }) => {
  return (
    <TableCell align={right ? "right" : "left"} sx={{ padding: "5px" }}>
      {children}
    </TableCell>
  );
};

const TextFieldRow = (props) => {
  const { align, width } = props;
  return (
    <TextField
      {...props}
      fullWidth
      variant="standard"
      sx={{
        width: width,
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

  const defaultNewItem = {
    itemCode: "",
    itemName: "",
    unitPrice: "",
    quantity: "",
  };

  const [items, setItems] = useState([]);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState(defaultNewItem);

  useEffect(() => console.log(newItem), [newItem]);

  const handleAddItem = () => {
    if (
      newItem.itemCode &&
      newItem.itemName &&
      newItem.unitPrice &&
      newItem.quantity
    ) {
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      setNewItem({
        itemCode: newItem.itemCode,
        itemName: newItem.itemName,
        unitPrice: "",
        quantity: "",
      });
      setShowAddItem(true);
    }
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
      const { itemCode, itemName, unitPrice } = newValue;
      setNewItem({ itemCode, itemName, unitPrice });
    } else {
      setNewItem(defaultNewItem);
    }
  };

  return (
    <Box sx={{ marginBottom: "10px" }}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.alt,
          marginY: "25px",
        }}
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
                      autoHighlight
                      getOptionLabel={(item) =>
                        item.itemCode && item.itemName
                          ? `${item.itemCode} | ${item.itemName}`
                          : ""
                      }
                      value={newItem}
                      onChange={handleOptionChange}
                      //  placeholder="Description"
                      isOptionEqualToValue={(option, value) =>
                        option.itemCode === value.itemCode &&
                        option.itemName === value.itemName
                      }
                      renderInput={(params) => (
                        <TextFieldRow
                          {...params}
                          //  name="itemCode|itemName"
                          placeholder="Description"
                          width={"200%"}
                          // InputProps={{
                          //   ...params.InputProps,
                          //   type: "search",
                          // }}
                        />
                      )}
                      renderOption={(props, item) => (
                        <Box
                          {...props}
                          component={"li"}
                          sx={{
                            width: "100%",
                            padding: "0.5rem",
                            // borderBottom: "1px solid #ccc",
                          }}
                          key={item.itemCode}
                        >
                          {item.itemCode} | {item.itemName}
                        </Box>
                      )}
                    />
                  </TableBodyCell>
                  <TableBodyCell></TableBodyCell>
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
    </Box>
  );
};

export default VendorBody;
