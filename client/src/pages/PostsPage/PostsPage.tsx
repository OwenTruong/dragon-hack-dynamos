import { Container, Grid, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createPosts } from './createPosts';
import { z } from 'zod';
import { type Pet } from 'react-app-env';
import { useNavigate } from 'react-router-dom';
import { fetchPets } from 'utils/fetchPets';

export function PostsPage(): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    (async () => {
      setPets(await fetchPets());
    })().catch((err) => {
      console.error(err);
    });
  }, [0]);

  return (
    <Grid
      container
      className="posts"
      direction="row"
      spacing={1}
      pt={3}
      pb={3}
      style={{
        overflow: 'scroll',
        margin: 0,
      }}
      justifyContent="center"
    >
      {createPosts(theme, navigate, pets)}
    </Grid>
  );
}
