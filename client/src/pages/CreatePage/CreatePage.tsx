import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useRef } from 'react';

const CENTER_STYLE = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const INPUT_STYLE = {
  width: '80%',
};

export function CreatePage(): JSX.Element {
  const handleChange = (
    attribute:
      | 'name'
      | 'description'
      | 'adoptionProcess'
      | 'species'
      | 'breed'
      | 'month'
      | 'day'
      | 'year'
      | 'petImageUrl'
      | 'qrUrl',
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    switch (attribute) {
      case 'name':
        petRef.current.name = e.target.value;
        break;
      case 'description':
        petRef.current.description = e.target.value;
        break;
      case 'adoptionProcess':
        petRef.current.adoptionProcess = e.target.value;
        break;
      case 'species':
        petRef.current.species = e.target.value;
        break;
      case 'breed':
        petRef.current.breed = e.target.value;
        break;
      case 'month':
        petRef.current.birthDate.month = Number(e.target.value);
        break;
      case 'day':
        petRef.current.birthDate.day = Number(e.target.value);
        break;
      case 'year':
        petRef.current.birthDate.year = Number(e.target.value);
        break;
      case 'petImageUrl':
        petRef.current.petImageUrl = e.target.value;
        break;
      case 'qrUrl':
        petRef.current.qrUrl = e.target.value;
        break;
      default:
        console.log(`Unhandled attribute: ${attribute as string}`);
        break;
    }
  };

  const handleSubmit = (): void => {
    const birthDate = new Date(
      `${petRef.current.birthDate.year}-${petRef.current.birthDate.month}-${petRef.current.birthDate.day}`
    );

    // TODO: send petref to database
  };

  const theme = useTheme();
  const petRef = useRef({
    name: '',
    description: '',
    adoptionProcess: '',
    species: '',
    breed: '',
    birthDate: {
      month: 1,
      day: 1,
      year: 2023,
    },
    petImageUrl: '',
    qrUrl: '',
  });
  return (
    <Container
      style={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: theme.palette.secondary.dark,
        padding: '20px',
        borderRadius: 5,
        maxWidth: '500px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Grid container direction="column" justifyContent="center" gap={2}>
        <Grid item sx={CENTER_STYLE}>
          <Typography variant="h4">Create Pet Listing</Typography>
        </Grid>

        <Grid item sx={CENTER_STYLE}>
          <TextField
            variant="standard"
            label="Name"
            defaultValue={petRef.current.name}
            sx={INPUT_STYLE}
            onChange={handleChange.bind(null, 'name')}
          />
        </Grid>
        <Grid item sx={CENTER_STYLE}>
          <TextField
            variant="standard"
            defaultValue={petRef.current.description}
            label="Description"
            sx={INPUT_STYLE}
            multiline
            onChange={handleChange.bind(null, 'description')}
          />
        </Grid>
        <Grid item sx={CENTER_STYLE}>
          <TextField
            variant="standard"
            defaultValue={petRef.current.adoptionProcess}
            label="Adoption Process"
            sx={INPUT_STYLE}
            multiline
            onChange={handleChange.bind(null, 'adoptionProcess')}
          />
        </Grid>
        <Grid item sx={CENTER_STYLE}>
          <TextField
            variant="standard"
            defaultValue={petRef.current.species}
            label="Species"
            sx={INPUT_STYLE}
            onChange={handleChange.bind(null, 'species')}
          />
        </Grid>
        <Grid item sx={CENTER_STYLE}>
          <Box>
            <TextField
              variant="standard"
              defaultValue={petRef.current.breed}
              label="Breed"
              sx={INPUT_STYLE}
              onChange={handleChange.bind(null, 'breed')}
            />
          </Box>
        </Grid>
        <Grid item sx={CENTER_STYLE}>
          <Typography paddingRight={2}>Birth </Typography>
          <TextField
            variant="standard"
            label="Month"
            sx={{ width: '5ch' }}
            defaultValue={petRef.current.birthDate.month}
            onChange={handleChange.bind(null, 'month')}
          />
          <TextField
            variant="standard"
            label="Day"
            sx={{ width: '5ch' }}
            defaultValue={petRef.current.birthDate.day}
            onChange={handleChange.bind(null, 'day')}
          />
          <TextField
            variant="standard"
            label="Year"
            sx={{ width: '5ch' }}
            defaultValue={petRef.current.birthDate.year}
            onChange={handleChange.bind(null, 'year')}
          />
        </Grid>
        <Grid item sx={CENTER_STYLE}>
          <TextField
            variant="standard"
            defaultValue={petRef.current.petImageUrl}
            label="Pet Image URL"
            sx={INPUT_STYLE}
            onChange={handleChange.bind(null, 'petImageUrl')}
          />
        </Grid>
        <Grid item sx={CENTER_STYLE}>
          <TextField
            variant="standard"
            defaultValue={petRef.current.qrUrl}
            label="AR Code URL"
            sx={INPUT_STYLE}
            onChange={handleChange.bind(null, 'qrUrl')}
          />
        </Grid>
        <Grid item sx={CENTER_STYLE}>
          <Button variant="outlined">Submit</Button>
        </Grid>
      </Grid>
    </Container>
  );
}
