'use client';
import { usePetContext } from '@/contexts/PetContextProvider';
import { useSearchContext } from '@/contexts/SearchContextProvider';
import { cn } from '@/lib/utils';
import Image from 'next/image';

import React from 'react';

const PetList = () => {
  const { pets, selectedPetId, handleChangeSelectedPetId } = usePetContext();
  const { searchQuery } = useSearchContext();

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ul className=" border-b border-light bg-white">
      {filteredPets.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => handleChangeSelectedPetId(pet.id)}
            className={cn(
              'flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#e3e3e3] focus:bg-[#EFF1F2] transition',
              {
                'bg-[#EFF1F2]': selectedPetId === pet.id,
              }
            )}
          >
            <Image
              src={pet.imageUrl}
              alt="Pet image"
              width={45}
              height={45}
              className="size-[45px] rounded-full object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default PetList;
