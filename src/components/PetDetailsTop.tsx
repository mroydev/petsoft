import { usePetContext } from '@/contexts/PetContextProvider';
import Image from 'next/image';
import React from 'react';
import PetButton from './PetButton';

const PetDetailsTop = () => {
  const { selectedPet, handleDeletePet } = usePetContext();

  if (!selectedPet) {
    return null;
  }

  return (
    <div className="flex items-center border-b border-light bg-white px-8 py-5">
      <Image
        src={selectedPet?.imageUrl || ''}
        alt="Selected pet image"
        height={75}
        width={75}
        className="size-[75px] rounded-full object-cover"
      />

      <h2 className="ml-5 text-3xl font-semibold leading-7">
        {selectedPet?.name}
      </h2>

      <div className="ml-auto space-x-2">
        <PetButton actionType="edit" variant="secondary" />
        <PetButton
          actionType="remove"
          variant="secondary"
          onClick={async () => await handleDeletePet(selectedPet.id)}
          petId={selectedPet.id}
        />
      </div>
    </div>
  );
};

export default PetDetailsTop;
