import React, { useRef } from 'react';
import {
  Card,
  CardContent,
  Grid,
  type Theme,
  Typography,
  useTheme,
  Box,
} from '@mui/material';
import { type Pet } from 'react-app-env';
import { type NavigateFunction } from 'react-router-dom';

export const createPosts = (
  theme: Theme,
  navigate: NavigateFunction,
  pets: Pet[]
): JSX.Element[] => {
  const handlePostClicked = (
    petId: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    navigate(`/post?petId=${petId}`);
  };

  return pets.map((pet) => (
    <Grid
      item
      key={pet.petId}
      data-key={pet.petId}
      onClick={handlePostClicked.bind(null, pet.petId)}
      sx={{ cursor: 'pointer' }}
    >
      <Grid container>
        <Card>
          <Grid item>
            <Box
              component="img"
              src={pet.petImageUrl}
              sx={{ width: '300px', height: '300px' }}
            />
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              color={theme.palette.secondary.contrastText}
              align="center"
            >
              {pet.name}
            </Typography>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  ));
};
