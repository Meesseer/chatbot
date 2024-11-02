import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import bot from "../../Assets/bot.png";
import edit from "../../Assets/edit.png";

export default function ResponsiveDrawer({ onShowPastConversations, onNewChat }) {
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = React.useState(isMediumUp);

  React.useEffect(() => {
    setOpen(isMediumUp);
  }, [isMediumUp]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const drawerWidth = 250;

  const DrawerList = (
    <Box sx={{ width: drawerWidth }} role="presentation" onClick={!isMediumUp ? toggleDrawer(false) : undefined}>
      <Box>
        <Button
          sx={{
            width: "100%",
            background: "#D7C7F4",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 16px",
          }}
          onClick={onNewChat} 
        >
          <Box component="img" src={bot} alt="icon" sx={{ width: 24, height: 24, mr: 1 }} />
          <Box sx={{ flexGrow: 1, textAlign: "center" }}>New Chat</Box>
          <Box component="img" src={edit} alt="icon" sx={{ width: 24, height: 24, ml: 1 }} />
        </Button>
        <Box sx={{ ml: 5, mt: 2 }}>
          <Button
            sx={{
              background: "#D7C7F4",
              color: "black",
            }}
            variant="contained"
            onClick={onShowPastConversations} 
          >
            Past Conversations
          </Button>
        </Box>
      </Box>
    </Box>
  );


  return (
    <Box sx={{ display: 'flex' }}>
      {!isMediumUp && (
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon />
        </Button>
      )}
      <Drawer
        variant={isMediumUp ? 'permanent' : 'temporary'}
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            position: isMediumUp ? 'fixed' : 'absolute',
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </Box>
  );
}
