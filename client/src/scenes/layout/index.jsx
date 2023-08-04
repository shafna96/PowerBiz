import { Box, useMediaQuery } from "@mui/material";
import { Navbar, SideBar } from "components";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
  setIsAuthenticated,
  setUserId,
  setIsSideBarOpen,
  setIsAttachmentOpen,
  selectIsSideBarOpen,
  selectIsAttachmentOpen,
} from "state";
import { useGetUserQuery, useLogoutMutation } from "state/api";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutMutation] = useLogoutMutation();

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  // const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const isSideBarOpen = useSelector(selectIsSideBarOpen); // Use the isSideBarOpen selector from the Redux store
  const isAttachmentOpen = useSelector(selectIsAttachmentOpen);
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

  const handleSideBarToggle = () => {
    dispatch(setIsSideBarOpen(!isSideBarOpen)); // Dispatch the action to toggle isSideBarOpen
    if (isAttachmentOpen) {
      dispatch(setIsAttachmentOpen(false)); // Close the attachment when the sidebar is opened
    }
  };

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <SideBar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={handleSideBarToggle}
        isAttachmentOpen={isAttachmentOpen} // Pass the isAttachmentOpen state to the SideBar
        setIsAttachmentOpen={(value) => dispatch(setIsAttachmentOpen(value))} // Pass the setIsAttachmentOpen function to the SideBar
      />
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={handleSideBarToggle}
          logoutClick={logoutHandler}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
