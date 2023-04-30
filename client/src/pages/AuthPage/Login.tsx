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

interface LoginField {
  email: string;
  password: string;
}

const validateLogin = (loginField: LoginField): boolean => {
  const schema = z.object({
    email: z.string().min(1).email(),
    password: z.string(),
  });

  return schema.safeParse(loginField).success;
};

const getAccount = async (email: string, password: string): Promise<void> => {
  // TODO: if result in an error,
  // TODO: should signup be get, post or patch?
  // const result = await instance.get('/signup', {
  //   email,
  //   password,
  // });
  // if (result goes bad) return result;
};

export function Login(): JSX.Element {
  const setError = (message: string): void => {
    setErrorFieldState(true);
    setErrorMessage(message);
  };

  const handleLogin = (data: LoginField): void => {
    if (!validateLogin(data)) {
      setError('Incorrect Email or Password');
      return;
    }

    console.log(loginRef.current);
    getAccount(data.email, data.password)
      .then((result) => {
        console.log('set user context and navigate user to root');
      })
      .catch(() => {
        setError('Incorrect Email or Password');
      });
  };

  const changeLoginRef = (
    dataType: 'email' | 'password',
    e: ChangeInputEvent
  ): void => {
    switch (dataType) {
      case 'email':
        loginRef.current.email = e.target.value;
        break;
      case 'password':
        loginRef.current.password = e.target.value;
    }
  };

  const instance = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
  });

  const theme = useTheme();
  const navigate = useNavigate();
  const loginRef = useRef({
    email: '',
    password: '',
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
            navigate('/signup');
          }}
          sx={{ cursor: 'pointer', fontSize: '0.90rem' }}
        >
          Sign Up?
        </Link>
      </Grid>
      <Grid item style={{ textAlign: 'center', paddingTop: 20 }}>
        <Button
          variant="contained"
          onClick={handleLogin.bind(null, loginRef.current)}
          style={{ backgroundColor: theme.palette.primary.light }}
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
}
