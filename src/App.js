import React, { useState } from 'react';
import './App.css';
import { Box, Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import SideAppBar from './components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

function App() {
  const [chat, setChat] = useState([]);

  return (
    <>
      <CssBaseline />
      <Grid container>
        <Grid item xs={3}>
          <Box>
            <SideAppBar setChat={setChat}  />
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Outlet context={{ chat, setChat }} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
