import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import axios from 'axios';
import { SERVER_URL } from 'config';
import React, { useEffect, useRef, useState } from 'react';
import z from 'zod';
import { SignUp } from './SignUp';

type AuthType = 'signup' | 'login';

const AUTH_PAGE_STYLE = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  width: '250px',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,

  outline: 'none',
  padding: 2,
  borderRadius: 3,
};

function Login(): JSX.Element {
  return <Grid container></Grid>;
}

export function AuthPage({ mode }: { mode: AuthType }): JSX.Element {
  return (
    <Container sx={AUTH_PAGE_STYLE}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>{mode === 'signup' ? <SignUp /> : <Login />}</Grid>
      </Grid>
    </Container>
  );
}
