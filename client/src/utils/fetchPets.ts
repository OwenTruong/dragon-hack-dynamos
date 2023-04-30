import { type Pet } from 'react-app-env';

import pets from './pets.json';
import { z } from 'zod';

const validatePets = (obj: unknown): boolean => {
  const schema = z
    .object({
      petId: z.number(),
      name: z.string(),
      description: z.string(),
      adoptionProcess: z.string(),
      species: z.string(),
      breed: z.string().optional(),
      birthDate: z.coerce.date(),
      petImageUrl: z.string(),
      qrUrl: z.string().optional(),
      createdAt: z.coerce.date(),
      updatedAt: z.coerce.date(),
      adoptCenterId: z.number(),
    })
    .array();

  return schema.safeParse(obj).success;
};

export const fetchPets = async (): Promise<Pet[]> => {
  const json = pets;
  if (!validatePets(json.pets)) {
    console.error('Pet object integrity at risk: ', json.pets);
    return [];
  } else return json.pets as unknown as Pet[];
};
