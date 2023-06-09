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

    console.log(signUpRef.current);
    postNewAccount(data.email, data.password).catch(() => {
      setError('Sign up failed');
    });
  };

  const changesignUpRef = (
    dataType: 'email' | 'password' | 'confirmPassword',
    e: ChangeInputEvent
  ): void => {
    switch (dataType) {
      case 'email':
        signUpRef.current.email = e.target.value;
        break;
      case 'password':
        signUpRef.current.password = e.target.value;
        break;
      case 'confirmPassword':
        signUpRef.current.confirmPassword = e.target.value;
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
          Sign Up
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
          type="password"
          label="Password"
          defaultValue={signUpRef.current.password}
          onChange={changesignUpRef.bind(null, 'password')}
        />
      </Grid>
      <Grid item>
        <TextField
          variant="standard"
          type="password"
          label="Confirm Password"
          defaultValue={signUpRef.current.confirmPassword}
          onChange={changesignUpRef.bind(null, 'confirmPassword')}
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
            navigate('/login');
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
          Start Adopting
        </Button>
      </Grid>
    </Grid>
  );
}
