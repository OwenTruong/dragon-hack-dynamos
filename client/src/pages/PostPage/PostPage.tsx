import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { type AdoptionCenter, type Pet } from 'react-app-env';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchPets } from 'utils/fetchPets';
import { fetchShelter } from 'utils/fetchShelter';

const calculateAge = (birthDate: Date): string => {
  const then = new Date(birthDate);
  const now = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  const days = Math.floor((now.getTime() - then.getTime()) / oneDay);

  if (days > 365) {
    const years = Math.floor(days / 365);
    const rDays = days % 365;
    if (rDays === 0) return `${years} ${years > 1 ? 'years' : 'year'}`;
    return `${years} ${years > 1 ? 'years' : 'year'} and ${rDays} ${
      rDays > 1 ? 'days' : 'day'
    }`;
  } else if (days > 14) {
    const weeks = Math.floor(days / 7);
    const rDays = days % 7;
    if (rDays === 0) return `${weeks} 'weeks'`;
    else return `${weeks} weeks and ${rDays} ${rDays > 1 ? 'days' : 'day'}`;
  } else return `${days} ${days > 1 ? 'days' : 'day'}`;
};

export function PostPage(): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pet, setPet] = useState<Pet | undefined>();
  const [shelter, setShelter] = useState<AdoptionCenter | undefined>();

  const petId: string | null = searchParams.get('petId');

  useEffect(() => {
    if (petId === null) navigate('/');

    const fetchPetShelter = async (): Promise<void> => {
      const pets = await fetchPets();
      const pet = pets.find((res) => res.petId === Number(petId));
      if (pet === undefined) {
        console.error('Pet not found in database');
        navigate('/');
        return;
      }
      setPet(pet);

      const shelter = await fetchShelter(pet.adoptCenterId);
      if (shelter === undefined) {
        console.error('Shelter not found in database');
        navigate('/');
        return;
      }
      setShelter(shelter);
    };

    fetchPetShelter().catch(console.error);
  }, [0]);

  if (pet === undefined || shelter === undefined)
    return <Grid container></Grid>;

  return (
    <Container
      sx={{
        backgroundColor: theme.palette.secondary.light,
        borderRadius: 5,
        padding: 3,
        position: 'relative',
      }}
    >
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
      <Grid container direction="row" spacing={1} justifyContent="center">
        <Grid item xs={9}>
          <Grid container direction="column" gap={2}>
            <Grid item>
              <Grid container direction="row" justifyContent="center">
                <Grid item>
                  <Box
                    component="img"
                    src={pet.petImageUrl}
                    sx={{ width: '300px', height: '300px' }}
                  />
                </Grid>
                <Grid item>
                  <Box
                    component="img"
                    src={pet.qrUrl}
                    sx={{ width: '200px', height: '200px' }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={12}>
              <Typography variant="h4" align="center">
                {pet.name}
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Typography>Description:</Typography>
              <Typography>{pet.description}</Typography>
            </Grid>
            <Grid item md={6}>
              <Typography>Adoption Process:</Typography>
              <Typography>{pet.adoptionProcess}</Typography>
            </Grid>
            <Grid item md={4}>
              <Typography>Species:</Typography>
              <Typography>{pet.species}</Typography>
            </Grid>
            <Grid item md={4}>
              <Typography>Breed:</Typography>
              <Typography>{pet.breed}</Typography>
            </Grid>
            <Grid item md={4}>
              <Typography>Age:</Typography>
              <Typography>{calculateAge(pet.birthDate)}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container direction="column">
            <Grid item>
              <Typography>{shelter.name}</Typography>
            </Grid>
            <Grid item>
              <Typography>{shelter.email}</Typography>
            </Grid>
            <Grid item>
              <Typography>{shelter.phone}</Typography>
            </Grid>
            <Grid item>
              <Link
                sx={{ cursor: 'pointer', fontSize: '0.90rem' }}
                href={shelter.websiteURL}
              >
                {shelter.websiteURL}
              </Link>
            </Grid>
            <Grid item>
              <Button>Make Appointment</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
