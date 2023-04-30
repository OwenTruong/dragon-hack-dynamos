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
  age: number;
  petImageUrl: string;
  qrUrl: string | undefined;
  createdAt: Date;
  updatedAt: Date;
  adoptCenterId: number;
}

interface AdoptionCenter {
  adoptCenterId: number;
  email: string;
  password: string;
  phone: string;
  websiteURL: string | undefined;
  createdAt: string;
  updatedAt: string;
}

interface Adopter {
  adopterId: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
