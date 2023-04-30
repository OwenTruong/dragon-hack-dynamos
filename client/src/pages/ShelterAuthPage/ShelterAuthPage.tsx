import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import axios from 'axios';
import { SERVER_URL } from 'config';
import React, { useEffect, useRef, useState } from 'react';
import z from 'zod';
import { ShelterSignUp } from './ShelterSignUp';
import { ShelterLogin } from './ShelterLogin';
import { useNavigate } from 'react-router-dom';

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

export function ShelterAuthPage({ mode }: { mode: AuthType }): JSX.Element {
  const navigate = useNavigate();
  return (
    <Container sx={AUTH_PAGE_STYLE}>
      <Link
        style={{
          position: 'absolute' as 'absolute',
          top: '15px',
          left: '15px',
          cursor: 'pointer',
          fontSize: '0.85rem',
        }}
        onClick={() => {
          navigate('/');
        }}
      >
        {'Back'}
      </Link>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          {mode === 'signup' ? <ShelterSignUp /> : <ShelterLogin />}
        </Grid>
      </Grid>
    </Container>
  );
}
