// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="react-scripts" />

import { string } from 'zod';

interface Pet {
  petId: number;
  name: string;
  description: string;
  adoptionProcess: string;
  species: string;
  breed: string | undefined;
  birthDate: Date;
  petImageUrl: string;
  qrUrl: string | undefined;
  createdAt: Date;
  updatedAt: Date;
  adoptCenterId: number;
}

interface AdoptionCenter {
  adoptCenterId: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  websiteURL: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}

interface Adopter {
  adopterId: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
