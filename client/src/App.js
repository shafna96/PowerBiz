import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import {
  Customers,
  Dashboard,
  Layout,
  LoginScreen,
  NewVendorBill,
  Products,
  Suppliers,
  VendorBill,
} from "scenes";
import { selectIsAuthenticated, setIsAuthenticated, setUserId } from "state";
import { themeSettings } from "theme";
import jwtDecode from "jwt-decode";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there is an authentication token stored
    const token = localStorage.getItem("token");
    console.log(token);

    if (token) {
      // Decode the JWT token to access the payload
      const decodedToken = jwtDecode(token);

      // Extract the userId from the decoded token
      const userId = decodedToken.id;

      // Update the isAuthenticated state in the Redux store
      dispatch(setUserId(userId));
      dispatch(setIsAuthenticated(true));
      //  navigate("/");
    } else {
      // No authentication token found, set isAuthenticated to false
      dispatch(setIsAuthenticated(false));
      navigate("/login");
    }
  }, [dispatch, navigate]);

  // const history = createBrowserHistory();

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {isAuthenticated ? (
            <Route element={<Layout />}>
              <Route
                path="/"
                element={<Navigate to={"/dashboard"} replace />}
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/products" element={<Products />} />
              {/* <Route path="/purchase" element={<VenderBill />} /> */}
              <Route path="/purchase/vendorbill" element={<VendorBill />} />
              <Route
                path="/purchase/newvendorbill"
                element={<NewVendorBill />}
              />
            </Route>
          ) : (
            <Route path="/login" element={<LoginScreen />} />
          )}
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
