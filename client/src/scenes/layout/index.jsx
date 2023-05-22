import { Box, useMediaQuery } from "@mui/material";
import { Navbar, SideBar } from "components";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setIsAuthenticated, setUserId } from "state";
import { useGetUserQuery, useLogoutMutation } from "state/api";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutMutation] = useLogoutMutation();

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);
  //console.log(data);

  const logoutHandler = async () => {
    try {
      await logoutMutation();
      // Clear the token from localStorage
      localStorage.removeItem("token");

      // Update the authentication state
      dispatch(setUserId(null));
      dispatch(setIsAuthenticated(false));

      // Redirect to the login page or any other appropriate page
      navigate("/login");
    } catch (error) {
      // Handle logout error
      console.error(error);
    }
  };

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <SideBar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          logoutClick={logoutHandler}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
