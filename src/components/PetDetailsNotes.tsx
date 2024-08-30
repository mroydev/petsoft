import { usePetContext } from '@/contexts/PetContextProvider';
import React from 'react';

const PetDetailsNotes = () => {
  const { selectedPet } = usePetContext();
  return (
    <section className="mx-8 mb-9 flex-1 rounded-md border border-light  bg-white px-7 py-5">
      {selectedPet?.notes}
    </section>
  );
};

export default PetDetailsNotes;
