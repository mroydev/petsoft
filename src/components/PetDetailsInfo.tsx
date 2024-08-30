import { usePetContext } from '@/contexts/PetContextProvider';
import React from 'react';

const PetDetailsInfo = () => {
  const { selectedPet } = usePetContext();
  return (
    <>
      <div className="flex justify-around px-5 py-10 text-center">
        <div>
          <h3 className="text-[13px] font-medium uppercase text-zinc-700">
            Owner name
          </h3>
          <p className="mt-1 text-lg text-zinc-800">{selectedPet?.ownerName}</p>
        </div>

        <div>
          <h3 className="text-[13px] font-medium uppercase text-zinc-700">
            Age
          </h3>
          <p className="mt-1 text-lg text-zinc-800">{selectedPet?.age}</p>
        </div>
      </div>
    </>
  );
};

export default PetDetailsInfo;
