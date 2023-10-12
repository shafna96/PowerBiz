import React from "react";
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
import { FlexBetween } from "components";

const TableBodyCell = ({ children, right }) => {
  return (
    <TableCell align={right ? "right" : "left"} sx={{ padding: "0px 5px" }}>
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

const VendorBody = ({
  handleAddItem,
  handleDeleteItem,
  handleInputChange,
  handleOptionChange,
  items,
  newItem,
}) => {
  const { data } = useGetItemsQuery({ isActive: true });
  const theme = useTheme();

  const activeItems = data ? data.filter((item) => item.isActive) : [];
  const activeItemOptions = activeItems.map((item) => ({
    itemCode: item.itemCode,
    itemName: item.itemName,
    unitPrice: item.unitPrice,
  }));
  console.log("activeItemsOptions", activeItemOptions);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.alt,
      }}
    >
      <TableContainer
        sx={{
          borderBottom: "1px solid #ccc",
        }}
      >
        <Table>
          <TableHead
            sx={{
              backgroundColor: theme.palette.secondary.dark,
            }}
          >
            <TableRow>
              {tableHeadList.map((head) => (
                <TableCell
                  align={head.align}
                  sx={{
                    width: head.width,
                    padding: "5px",
                    color: "white",
                  }}
                  key={head.id}
                >
                  {head.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody
            sx={{
              // display: "block",
              overflowY: "auto",
            }}
          >
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
                <TableBodyCell right>{item.discount}</TableBodyCell>
                <TableBodyCell right>{item.tax}</TableBodyCell>

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
            <TableRow>
              <TableBodyCell>#</TableBodyCell>
              <TableBodyCell>
                <Autocomplete
                  options={activeItemOptions}
                  autoHighlight
                  getOptionLabel={(item) =>
                    item.itemCode && item.itemName
                      ? `${item.itemCode} | ${item.itemName}`
                      : ""
                  }
                  value={newItem}
                  defaultValue={activeItemOptions[0]}
                  onChange={handleOptionChange}
                  //  placeholder="Description"
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  renderInput={(params) => (
                    <TextFieldRow
                      {...params}
                      //  name="itemCode|itemName"
                      placeholder="Search Item"
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
              <TableBodyCell right>
                <TextFieldRow
                  name="discount"
                  placeholder="Discount"
                  value={newItem.discount}
                  onChange={handleInputChange}
                  align="right"
                />
              </TableBodyCell>
              <TableBodyCell right>
                <TextFieldRow
                  name="tax"
                  placeholder="Tax"
                  value={newItem.tax}
                  onChange={handleInputChange}
                  align="right"
                />
              </TableBodyCell>
              <TableBodyCell />
              <TableBodyCell />
            </TableRow>
          </TableBody>
        </Table>
        <Button
          sx={{
            // marginY: "10px",
            //textAlign: "left",
            justifyContent: "left",
            width: "100%",
            fontWeight: "bold",
            textDecoration: "underline",
            borderBottom: "1px solid #ccc",
          }}
          color="secondary"
          onClick={handleAddItem}
        >
          Add Item
        </Button>
        <FlexBetween sx={{ marginX: "2%" }}>
          <Box></Box>
          <Box
            sx={{
              //   flexDirection: "column",
              //  alignItems: "flex-end",
              width: "180px",
            }}
          >
            <FlexBetween>
              <Typography fontSize={14}>Sub Total</Typography>
              <Typography fontSize={14}>0000.00</Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography fontSize={14}>Discount</Typography>
              <Typography fontSize={14}>0000.00</Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography fontSize={14}>Tax</Typography>
              <Typography fontSize={14}>0000.00</Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography fontSize={14}>Advance</Typography>
              <Typography fontSize={14}>0000.00</Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography fontSize={14} sx={{ fontWeight: "bold" }}>
                Grand Total
              </Typography>
              <Typography fontSize={14} fontWeight={"bold"}>
                0000.00
              </Typography>
            </FlexBetween>
          </Box>
        </FlexBetween>
      </TableContainer>
    </Box>
  );
};

export default VendorBody;
