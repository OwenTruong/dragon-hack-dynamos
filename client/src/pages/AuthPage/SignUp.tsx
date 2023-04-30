import { Button, Grid, TextField, Typography, useTheme } from '@mui/material';
import axios from 'axios';
import { SERVER_URL } from 'config';
import React, { useEffect, useRef, useState } from 'react';
import z from 'zod';

import { type ChangeInputEvent } from './sharedType';

interface SignUpField {
  email: string;
  password: string;
  confirmPassword: string;
}

const validateSignUp = (signupObj: SignUpField): boolean => {
  const schema = z.object({
    email: z.string().min(1).email(),
    password: z.string(),
    confirmPassword: z.string(),
  });

  return schema.safeParse(signupObj).success;
};

const postNewAccount = async (
  email: string,
  password: string
): Promise<void> => {
  // TODO: if result in an error,
  // const result = await instance.post('/login', {
  //   email,
  //   password,
  // });
  // if (result goes bad) return result;
};

export function SignUp(): JSX.Element {
  const setError = (message: string): void => {
    setErrorFieldState(true);
    setErrorMessage(message);
  };

  const handleSignUp = (data: SignUpField): void => {
    if (!validateSignUp(data) || data.password !== data.confirmPassword) {
      setError('Incorrect Email or Password');
      return;
    }

    console.log(loginRef.current);
    postNewAccount(data.email, data.password).catch(() => {
      setError('Sign up failed');
    });
  };

  const changeLoginRef = (
    dataType: 'email' | 'password' | 'confirmPassword',
    e: ChangeInputEvent
  ): void => {
    switch (dataType) {
      case 'email':
        loginRef.current.email = e.target.value;
        break;
      case 'password':
        loginRef.current.password = e.target.value;
        break;
      case 'confirmPassword':
        loginRef.current.confirmPassword = e.target.value;
    }
  };

  const instance = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
  });

  const theme = useTheme();
  const loginRef = useRef({
    email: '',
    password: '',
    confirmPassword: '',
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
          Login
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          variant="standard"
          label="Email"
          defaultValue={loginRef.current.email}
          onChange={changeLoginRef.bind(null, 'email')}
        />
      </Grid>
      <Grid item>
        <TextField
          variant="standard"
          type="password"
          label="Password"
          defaultValue={loginRef.current.password}
          onChange={changeLoginRef.bind(null, 'password')}
        />
      </Grid>
      <Grid item>
        <TextField
          variant="standard"
          type="password"
          label="Confirm Password"
          defaultValue={loginRef.current.confirmPassword}
          onChange={changeLoginRef.bind(null, 'confirmPassword')}
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
      <Grid item style={{ textAlign: 'center', paddingTop: 20 }}>
        <Button
          variant="contained"
          onClick={handleSignUp.bind(null, loginRef.current)}
          style={{ backgroundColor: theme.palette.primary.light }}
        >
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
}
