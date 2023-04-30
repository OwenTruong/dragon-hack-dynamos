import { type AdoptionCenter, type Pet } from 'react-app-env';

import { z } from 'zod';

const validateShelter = (obj: unknown): boolean => {
  const schema = z.object({
    adoptCenterId: z.number(),
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    phone: z.string(),
    websiteURL: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });

  return schema.safeParse(obj).success;
};

export const fetchShelter = async (
  adoptCenterId: number
): Promise<AdoptionCenter | undefined> => {
  const json = {
    adoptCenterId: 2,
    name: "Jerry's Shelter",
    email: 'info@adoptme.com',
    password: 'password123',
    phone: '5555555555',
    websiteURL: 'https://www.adoptme.com',
    createdAt: new Date('2022-01-01T00:00:00.000Z'),
    updatedAt: new Date('2022-01-01T00:00:00.000Z'),
  };
  if (!validateShelter(json)) {
    console.error('Shelter object integrity at risk: ', json);
    return undefined;
  } else return json as unknown as AdoptionCenter;
};
