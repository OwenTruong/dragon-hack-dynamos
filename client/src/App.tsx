import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, ThemeProvider, createTheme } from '@mui/material';
import React, { useContext, useState } from 'react';

import { PostsPage } from 'pages/PostsPage/PostsPage';
import { AuthPage } from 'pages/AuthPage/AuthPage';
import { ShelterAuthPage } from 'pages/ShelterAuthPage/ShelterAuthPage';
import { PostPage } from 'pages/PostPage/PostPage';

// TODO: zoom embed
// TODO: twilio messaging with calendar

const colorTheme = createTheme({
  palette: {
    primary: {
      light: '#30006B',
      main: '#1C0049',
      dark: '#0D0026',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#97FBDC',
      main: '#67F3BF',
      dark: '#0A8541',
      contrastText: '#000000',
    },
    background: {
      paper: '#0A8541',
    },
  },
});

export function App(): JSX.Element {
  return (
    <Container className="App" sx={{ height: '100vh' }}>
      <ThemeProvider theme={colorTheme}>
        <Router>
          <Routes>
            <Route path="/" element={<PostsPage />} />
            <Route path="/login" element={<AuthPage mode="login" />} />
            <Route path="/signup" element={<AuthPage mode="signup" />} />
            <Route
              path="/shelter/signup"
              element={<ShelterAuthPage mode="signup" />}
            />
            <Route
              path="/shelter/login"
              element={<ShelterAuthPage mode="login" />}
            />
            <Route path="/post" element={<PostPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Container>
  );
}
