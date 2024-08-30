import { PetsoftPet } from '@prisma/client';

export type PetEssentials = Omit<
  PetsoftPet,
  'id' | 'createdAt' | 'updatedAt' | 'userId'
>;
