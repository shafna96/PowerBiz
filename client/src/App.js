import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { Layout, LoginScreen } from "scenes";
import {
  selectIsAuthenticated,
  setIsAuthenticated,
  setToken,
  setUserId,
} from "state";
import { themeSettings } from "theme";
import jwtDecode from "jwt-decode";
import { Finance, HRM, Home, Inventory, Procument, Sales } from "navigations";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // const token = useSelector(selectToken); // Get the token
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there is an authentication token stored
    const token = localStorage.getItem("token");
    dispatch(setToken(token));
    console.log("token", token);
    if (token) {
      // Decode the JWT token to access the payload
      const decodedToken = jwtDecode(token);

      // Extract the userId from the decoded token
      const userId = decodedToken.id;
      // Update the isAuthenticated state in the Redux store
      dispatch(setUserId(userId));
      dispatch(setIsAuthenticated(true));
      //  navigate("/");
      console.log("id", userId);
    } else {
      // No authentication token found, set isAuthenticated to false
      dispatch(setIsAuthenticated(false));
      // navigate("/login");
    }
  }, [dispatch, navigate]);

  // const history = createBrowserHistory();

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {isAuthenticated ? (
            <>
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to={"/home"} replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/procument" element={<Procument />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/finance" element={<Finance />} />
                <Route path="/hrm" element={<HRM />} />

                {/* <Route path="/customers" element={<Customers />} /> */}
              </Route>
            </>
          ) : (
            <Route path="/login" element={<LoginScreen />} />
          )}
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
