import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Navbar, SideBar } from "components";
import React from "react";
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
  const theme = useTheme();

  const [logoutMutation] = useLogoutMutation();

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const isSideBarOpen = useSelector(selectIsSideBarOpen); // Use the isSideBarOpen selector from the Redux store
  const isAttachmentOpen = useSelector(selectIsAttachmentOpen);
  const user_id = useSelector((state) => state.global.user_id);
  const { data } = useGetUserQuery(user_id);

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
      <Box>
        <SideBar
          user={data || {}}
          isNonMobile={isNonMobile}
          drawerWidth="220px"
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={handleSideBarToggle}
          isAttachmentOpen={isAttachmentOpen} // Pass the isAttachmentOpen state to the SideBar
          setIsAttachmentOpen={(value) => dispatch(setIsAttachmentOpen(value))} // Pass the setIsAttachmentOpen function to the SideBar
        />
      </Box>
      <Box
        flexGrow={1}
        display={"flex"}
        flexDirection={"column"}
        // sx={{ backgroundColor: theme.palette.background }}
      >
        <Navbar
          user={data || {}}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={handleSideBarToggle}
          logoutClick={logoutHandler}
        />

        {/* <Box  > */}
        <Box
          sx={{
            flexGrow: 1,
            //  p: "1rem 2.5rem",
            //  m: "1rem",
            position: "sticky",
            top: "64px",
            maxHeight: "calc(100vh - 64px)",
            overflow: "auto",
            // backgroundColor: theme.palette.grey[50],
          }}
        >
          <Outlet />
        </Box>
        {/* </Box> */}
      </Box>
    </Box>
  );
};

export default Layout;
