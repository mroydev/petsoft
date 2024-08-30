'use client';

import { addPet, deletePet, editPet } from '@/actions/pet.actions';
import { PetEssentials } from '@/lib/types';
import { PetsoftPet } from '@prisma/client';
import React, {
  createContext,
  useContext,
  useOptimistic,
  useState,
} from 'react';
import { toast } from 'sonner';

type PetContextProviderProps = {
  data: PetsoftPet[];
  children: React.ReactNode;
};

type TPetContext = {
  pets: PetsoftPet[];
  selectedPetId: PetsoftPet['id'] | null;
  selectedPet: PetsoftPet | undefined;
  numberOfPets: number;
  handleAddPet: (newPet: PetEssentials) => Promise<void>;
  handleEditPet: (
    petId: PetsoftPet['id'],
    newPetData: PetEssentials
  ) => Promise<void>;
  handleDeletePet: (id: PetsoftPet['id']) => Promise<void>;
  handleChangeSelectedPetId: (id: PetsoftPet['id']) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  // state
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case 'add':
          return [...state, { ...payload, id: Math.random().toString() }];
        case 'edit':
          return state.map((pet) => {
            if (pet.id === payload.id) {
              return { ...pet, ...payload.newPetData };
            }
            return pet;
          });
        case 'delete':
          return state.filter((pet) => pet.id !== payload);
        default:
          return state;
      }
    }
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  // event handlers / actions
  const handleAddPet = async (newPet: PetEssentials) => {
    setOptimisticPets({ action: 'add', payload: newPet });
    try {
      const petAdded = await addPet(newPet);
      if (petAdded) {
        toast.success('Pet added successfully');
      } else {
        toast.warning('Could not add pet');
      }
    } catch (error: any) {
      toast.warning(error?.message);
    }
  };

  const handleEditPet = async (
    petId: PetsoftPet['id'],
    newPetData: PetEssentials
  ) => {
    setOptimisticPets({ action: 'edit', payload: { id: petId, newPetData } });

    try {
      const petEdited = await editPet(petId, newPetData);
      if (petEdited) {
        toast.success('Pet edited successfully');
      } else {
        toast.warning('Could not edit pet');
      }
    } catch (error: any) {
      toast.warning(error?.message);
    }
  };
  const handleDeletePet = async (petId: PetsoftPet['id']) => {
    setOptimisticPets({ action: 'delete', payload: petId });
    try {
      const petDeleted = await deletePet(petId);
      if (petDeleted) {
        toast.success('Pet deleted successfully');
      } else {
        toast.warning('Could not delete pet');
      }
    } catch (error: any) {
      toast.warning(error?.message);
    }
    setSelectedPetId(null);
  };
  const handleChangeSelectedPetId = (id: PetsoftPet['id']) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        selectedPet,
        numberOfPets,
        handleAddPet,
        handleEditPet,
        handleDeletePet,
        handleChangeSelectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}

export function usePetContext() {
  const context = useContext(PetContext);

  if (!context) {
    throw new Error('usePetContext must be used within a PetContextProvider');
  }

  return context;
}
