const { Box, TextField } = require("@mui/material");
const { styled } = require("@mui/system");

const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const TextFieldRow = styled(TextField)(({ width, align }) => ({
  width: width,
  "& input::placeholder": {
    textAlign: align,
  },
}));

export { FlexBetween, TextFieldRow };
