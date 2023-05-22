import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  // Avatar,
  Button,
  TextField,
  Typography,
  Container,
  useTheme,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useLoginMutation } from "state/api";
import { useDispatch } from "react-redux";
import { setUserId, setIsAuthenticated } from "state";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginScreen = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loginMutation, { isLoading, isError }] = useLoginMutation();

  const handleChange = (setState) => (event) => {
    setState(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginMutation({
        email,
        password,
      }).unwrap();
      setEmail("");
      setPassword("");

      if (result.token) {
        // Store the token in localStorage
        localStorage.setItem("token", result.token);
        console.log(result.token);
        // Update isAuthenticated state
        dispatch(setUserId(result.userId));
        dispatch(setIsAuthenticated(true));
        console.log(result.userId);
        // Redirect to home page
        navigate("/");
      }
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        backgroundColor: theme.palette.primary.light,
        borderRadius: "10px",
      }}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        sx={{
          padding: "15px",
          marginTop: theme.spacing(8),
          //  backgroundColor: theme.palette.primary.light,
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box
          component={"form"}
          style={{
            width: "100%", // Fix IE 11 issue.
            //marginTop: theme.spacing(1),
            marginTop: "25px",
          }}
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextField
            sx={{ marginBottom: 2 }}
            required
            fullWidth
            // id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleChange(setEmail)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            //sx={{ marginBottom: 2 }}
            required
            fullWidth
            name="password"
            // id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={handleChange(setPassword)}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            style={{
              margin: theme.spacing(3, 0, 2),
            }}
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
          {isError && (
            <Typography color="error" variant="subtitle1">
              Error: {isError.message}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginScreen;
