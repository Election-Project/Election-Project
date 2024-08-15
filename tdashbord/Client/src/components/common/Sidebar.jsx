// Sidebar.jsx
import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography, colors , Drawer } from '@mui/material';
import { DashboardCustomizeOutlined as DashboardIcon, NotificationsOutlined as NotificationsIcon, } from '@mui/icons-material';
import Animate from './Animate';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import PeopleIcon from '@mui/icons-material/People';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import RecentActorsIcon from '@mui/icons-material/RecentActors';

const menus = [
  {
    title: "نظرة عامه",
    icon: <DashboardIcon />,
    state: "overview"
  },
  {
    title: "اشعارات",
    icon: <NotificationsIcon />,
    state: "notification"
  }
];

const serviceMenus = [
  {
    title: "القوائم",
    icon: <AutoAwesomeMotionIcon />,
    state: "ElectionList"
  },
  {
    title: "المرشحين",
    icon: <PeopleIcon />,
    state: "candidates"
  },
  {
    title: "مقترعين",
    icon: <HowToVoteIcon />,
    state: "voters"
  }
];

const investmentMenus = [
  {
    title: "اعلانات المرشحين",
    icon: <RecentActorsIcon />,
    state: "mortgage"
  },
  {
    title: "طلب جديد للقوائم",
    icon: <RequestQuoteIcon />,
    state: "newlist"
  },
  {
    title: "الرد على الاستفسارات",
    icon: <MoveToInboxIcon />,
    state: "queries"
  }
];

const Sidebar = ({ sidebarWidth, activeTab, setActiveTab }) => {
  const MenuItem = (props) => {
    return (
      <ListItem key={props.index} disableGutters disablePadding sx={{ py: 0.5 }}>
        <ListItemButton 
          onClick={() => setActiveTab(props.item.state)} // Change activeTab
          sx={{
            borderRadius: "10px",
            bgcolor: props.isActive ? colors.green[600] : "",
            color: props.isActive ? colors.common.white : "",
            "&:hover": {
              bgcolor: props.isActive ? colors.green[600] : "",
              color: props.isActive ? colors.common.white : "",
            }
          }}
        >
          <ListItemIcon sx={{
            minWidth: "40px",
            color: props.isActive ? colors.common.white : ""
          }}>
            {props.item.icon}
          </ListItemIcon>
          <ListItemText primary={
            <Typography fontWeight={600}>
              {props.item.title}
            </Typography>
          } />
        </ListItemButton>
      </ListItem>
    );
  };

  const drawer = (
    <Box
      padding={3}
      paddingBottom={0}
      display="flex"
      flexDirection="column"
      height="100vh"
      sx={{
        "::-webkit-scrollbar": {
          display: "none"
        }
      }}
    >
      {/* logo */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Animate type="fade" delay={1}>
          {/* <img src={images.logo} alt="" height={60} /> */}
        </Animate>
      </Box>
      {/* logo */}

      <Animate sx={{ flexGrow: 1 }}>
        <Paper
          elevation={0}
          square
          sx={{
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px",
            p: 2,
            height: "100%",
            boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px"
          }}
        >
          {/* menu group 1 */}
          <List>
            {menus.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                isActive={item.state === activeTab} // Check activeTab
              />
            ))}
          </List>
          {/* menu group 1 */}

          {/* menu group 2 */}
          <List>
            {serviceMenus.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                isActive={item.state === activeTab} // Check activeTab
              />
            ))}
          </List>
          {/* menu group 2 */}

          {/* menu group 3 */}
          <List>
            {investmentMenus.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                isActive={item.state === activeTab} // Check activeTab
              />
            ))}
          </List>
          {/* menu group 3 */}
        </Paper>
      </Animate>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: sidebarWidth },
        flexShrink: { md: 0 }
      }}
    >
      {/* large screen */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: sidebarWidth,
            borderWidth: 0,
            bgcolor: "transparent",
            "::-webkit-scrollbar": {
              display: "none"
            }
          }
        }}
        open
      >
        {drawer}
      </Drawer>
      {/* large screen */}
    </Box>
  );
};

export default Sidebar;
