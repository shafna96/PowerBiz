import React, { useState, useEffect } from "react";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  HomeOutlined,
  Groups2Outlined,
  Inventory,
  ExpandMore,
  ExpandLess,
  Circle,
  CircleOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { FlexBetween } from "components";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Register",
    icon: <HomeOutlined />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Vendors",
    icon: <Groups2Outlined />,
  },
  {
    text: "Products",
    icon: <Inventory />,
  },
  {
    text: "Purchase",
    icon: <Inventory />,
    subItems: [
      {
        text: "Vendor Bill",
      },
    ],
  },
];

const SideBar = ({
  user,
  isNonMobile,
  drawerWidth,
  isSideBarOpen,
  setIsSideBarOpen,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const [openSubItems, setOpenSubItems] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  // const handleItemClick = (path) => {
  //   navigate(path);
  //   setActive(path);
  // };

  const handleSubItemClick = (index) => {
    setOpenSubItems((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !updatedState[index];
      return updatedState;
    });
  };
  const renderSubItems = (text, subItems, index) => {
    const lcText = text.toLowerCase();
    return (
      <Collapse
        in={openSubItems[index]}
        timeout="auto"
        unmountOnExit
        sx={{
          backgroundColor: theme.palette.primary[300],
        }}
      >
        <List component="div" disablePadding>
          {subItems.map((subItem) => {
            const sublcText = subItem.text.replace(/\s+/g, "").toLowerCase();
            return (
              <ListItem key={subItem.text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(`${lcText}/${sublcText}`);
                    setActive(sublcText);
                  }}
                  sx={{
                    backgroundColor:
                      active === sublcText
                        ? theme.palette.secondary[100]
                        : "transparent",
                    color: theme.palette.common.white,
                    // active === sublcText
                    //   ? theme.palette.primary[600]
                    // : theme.palette.common.white,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      paddingX: "15px",
                      color: theme.palette.common.white,
                    }}
                  >
                    {active === sublcText ? (
                      <Circle fontSize="10px" />
                    ) : (
                      <CircleOutlined fontSize="10px" />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={subItem.text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    );
  };

  return (
    <Box component="nav">
      {isSideBarOpen && (
        <Drawer
          open={isSideBarOpen}
          onClose={() => setIsSideBarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 1rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    POWERBIZ
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, subItems }, index) => {
                if (!icon && !subItems) {
                  return (
                    <Typography key={text}>
                      {/* sx={{ m: "2.25rem 0 1rem 3rem" }} */}
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();
                return (
                  <React.Fragment key={text}>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          subItems
                            ? handleSubItemClick(index)
                            : navigate(`/${lcText}`);
                          setActive(lcText);
                        }}
                        sx={{
                          backgroundColor:
                            active === lcText
                              ? theme.palette.secondary[300]
                              : "transparent",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[100],
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            paddingX: "15px",
                            color:
                              active === lcText
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[200],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        {subItems && (
                          <IconButton
                            size="small"
                            // onClick={() => handleSubItemClick(index)}
                          >
                            {openSubItems[index] ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )}
                          </IconButton>
                        )}
                      </ListItemButton>
                    </ListItem>
                    {subItems && renderSubItems(text, subItems, index)}
                  </React.Fragment>
                );
              })}
            </List>
          </Box>
          <Box position="static" bottom="2rem" width={drawerWidth}>
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={user.image}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default SideBar;
