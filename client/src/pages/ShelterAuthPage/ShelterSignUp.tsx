import {
  Button,
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

import { type ChangeInputEvent } from './sharedType';
import { useNavigate } from 'react-router-dom';

interface SignUpField {
  email: string;
  phone: string;
}

const validateSignUp = (signupObj: SignUpField): boolean => {
  const schema = z.object({
    email: z.string().min(1).email(),
    phone: z.string(),
  });

  return schema.safeParse(signupObj).success;
};

const requestNewAccount = async (
  email: string,
  phone: string
): Promise<void> => {
  // TODO: if result in an error,
  // const result = await instance.post('/login', {
  //   email,
  //   password,
  // });
  // if (result goes bad) return result;
};

export function ShelterSignUp(): JSX.Element {
  const setError = (message: string): void => {
    setErrorFieldState(true);
    setErrorMessage(message);
  };

  const handleSignUp = (data: SignUpField): void => {
    if (!validateSignUp(data)) {
      setError('Incorrect Email or Phone Number');
      return;
    }

    console.log(signUpRef.current);
    requestNewAccount(data.email, data.phone).catch(() => {
      setError('Sign up failed');
    });
  };

  const changesignUpRef = (
    dataType: 'email' | 'phone',
    e: ChangeInputEvent
  ): void => {
    switch (dataType) {
      case 'email':
        signUpRef.current.email = e.target.value;
        break;
      case 'phone':
        signUpRef.current.phone = e.target.value;
    }
  };

  const instance = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
  });

  const theme = useTheme();
  const navigate = useNavigate();
  const signUpRef = useRef({
    email: '',
    phone: '',
  });

  const [errorFieldState, setErrorFieldState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setTimeout(() => {
      if (errorFieldState) setErrorFieldState(false);
    }, 2000);
  });

  return (
    <Grid container direction="column" justifyContent="center" gap={1}>
      <Grid item>
        <Typography variant="h5" align="center">
          Shelter Sign Up
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          variant="standard"
          label="Email"
          defaultValue={signUpRef.current.email}
          onChange={changesignUpRef.bind(null, 'email')}
        />
      </Grid>
      <Grid item>
        <TextField
          variant="standard"
          label="Phone Number"
          defaultValue={signUpRef.current.phone}
          onChange={changesignUpRef.bind(null, 'phone')}
        />
      </Grid>
      {errorFieldState ? (
        <Grid item style={{ textAlign: 'center' }}>
          <Typography color="error" fontSize={14}>
            {errorMessage}
          </Typography>
        </Grid>
      ) : (
        ''
      )}
      <Grid item style={{ textAlign: 'right' }}>
        <Link
          onClick={() => {
            navigate('/shelter/login');
          }}
          sx={{ cursor: 'pointer', fontSize: '0.90rem' }}
        >
          Login?
        </Link>
      </Grid>
      <Grid item style={{ textAlign: 'center', paddingTop: 0 }}>
        <Button
          variant="contained"
          onClick={handleSignUp.bind(null, signUpRef.current)}
          style={{ backgroundColor: theme.palette.primary.light }}
        >
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
}
