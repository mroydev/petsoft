'use client';

import React from 'react';

import PetDetailsTop from './PetDetailsTop';
import PetDetailsInfo from './PetDetailsInfo';
import PetDetailsNotes from './PetDetailsNotes';
import PetDetailsEmpty from './PetDetailsEmpty';
import { usePetContext } from '@/contexts/PetContextProvider';

const PetDetails = () => {
  const { selectedPet } = usePetContext();
  return (
    <>
      {!selectedPet ? (
        <PetDetailsEmpty />
      ) : (
        <section className="flex size-full flex-col ">
          <PetDetailsTop />
          <PetDetailsInfo />
          <PetDetailsNotes />
        </section>
      )}
    </>
  );
};

export default PetDetails;
