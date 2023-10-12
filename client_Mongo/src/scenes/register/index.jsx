import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Grid,
  Paper,
  useTheme,
} from "@mui/material";
import { ContainedButton, Header } from "components";

const Register = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contactNo: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to a server or validate here
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: theme.spacing(8),
        }}
      >
        <Header title={"Register"} />
        <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="username"
                label="Username"
                name="username"
                onChange={handleChange}
                value={formData.username}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="contactNo"
                label="Contact Number"
                name="contactNo"
                onChange={handleChange}
                value={formData.contactNo}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                onChange={handleChange}
                value={formData.confirmPassword}
                required
              />
            </Grid>
          </Grid>
          <ContainedButton
            type="submit"
            fullWidth
            //variant="contained"
            //color="primary"
            sx={{ mt: 3 }}
          >
            Register
          </ContainedButton>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
