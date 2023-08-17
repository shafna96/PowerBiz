const { Box, TextField, IconButton, Button } = require("@mui/material");
const { styled } = require("@mui/system");

const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const FlexEvenly = styled(Box)({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
});
const TextFieldRow = styled(TextField)(({ width, align }) => ({
  width: width,
  "& input::placeholder": {
    textAlign: align,
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.primary[700],
  },
  backgroundColor: theme.palette.primary[200],
  color: "white",
  margin: "2px",
  borderRadius: "10px",
}));

const OutlinedButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.primary[700],
    borderColor: theme.palette.primary[500],
  },
  color: theme.palette.primary[500],
  borderColor: theme.palette.primary[500],
  fontWeight: "bold",
}));

const ContainedButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.primary[700],
  },
  backgroundColor: theme.palette.primary[500],
  color: "white",
}));

export {
  FlexBetween,
  FlexEvenly,
  TextFieldRow,
  StyledIconButton,
  OutlinedButton,
  ContainedButton,
};
