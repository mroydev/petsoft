'use server';

import { auth } from '@/auth';
import prisma from '@/lib/db';
import { petFormSchema, petIdSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function addPet(pet: z.infer<typeof petFormSchema>) {
  const session = await auth();

  // Validate the pet data
  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      error: 'Invalid pet data.',
    };
  }

  try {
    const newPet = await prisma.petsoftPet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session?.user?.id,
          },
        },
      },
    });
    revalidatePath('/', 'layout');
    return {
      success: 'Pet added successfully.',
      data: newPet,
    };
  } catch (error) {
    console.log(error);
    return {
      error: 'Could not add pet.',
    };
  }
}

export async function editPet(petId: unknown, newPetData: unknown) {
  // authentication check
  const session = await auth();

  // Validate the pet data
  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPetData);

  if (!validatedPetId.success || !validatedPet.success) {
    return {
      error: 'Invalid pet data.',
    };
  }

  // authorization check
  const pet = await prisma.petsoftPet.findUnique({
    where: {
      id: validatedPetId.data,
    },
  });

  if (!pet) {
    return {
      message: 'Pet not found.',
    };
  }
  if (pet.userId !== session?.user?.id) {
    return {
      message: 'Not authorized.',
    };
  }

  // database mutation

  try {
    await prisma.petsoftPet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });
    revalidatePath('/', 'layout');
    return {
      success: 'Pet updated successfully.',
    };
  } catch (error) {
    console.log(error);
    return {
      error: 'Could not edit pet.',
    };
  }
}

export async function deletePet(petId: unknown) {
  // authentication check
  const session = await auth();

  // Validate the pet data
  const validatedPetId = petIdSchema.safeParse(petId);

  if (!validatedPetId.success) {
    return {
      error: 'Invalid pet data.',
    };
  }
  // authorization check
  const pet = await prisma.petsoftPet.findUnique({
    where: {
      id: validatedPetId.data,
    },
  });

  if (!pet) {
    return {
      message: 'Pet not found.',
    };
  }
  if (pet.userId !== session?.user?.id) {
    return {
      message: 'Not authorized.',
    };
  }

  // database mutation
  try {
    await prisma.petsoftPet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
    revalidatePath('/', 'layout');
    return {
      success: 'Pet deleted successfully.',
    };
  } catch (error) {
    return {
      error: 'Could not delete pet.',
    };
  }
}
