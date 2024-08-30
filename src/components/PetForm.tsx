'use client';

import React from 'react';
import { DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

import { petFormSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DEFAULT_PET_IMAGE } from '@/lib/constants';
import { z } from 'zod';
import { usePetContext } from '@/contexts/PetContextProvider';

type PetFormProps = {
  actionType: 'add' | 'edit';
  onDialogClose: () => void;
};

const PetForm = ({ actionType, onDialogClose }: PetFormProps) => {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof petFormSchema>>({
    resolver: zodResolver(petFormSchema),
    defaultValues:
      actionType === 'edit'
        ? {
            name: selectedPet?.name,
            ownerName: selectedPet?.ownerName,
            imageUrl: selectedPet?.imageUrl,
            age: selectedPet?.age,
            notes: selectedPet?.notes,
          }
        : undefined,
  });

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <form
      action={async () => {
        const result = await trigger();
        if (!result) return;

        onDialogClose();

        const petData = getValues();
        petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE;

        if (actionType === 'add') {
          await handleAddPet(petData);
        } else if (actionType === 'edit') {
          await handleEditPet(selectedPet!.id, petData);
        }
      }}
      className="flex flex-col rounded-lg bg-white p-5 shadow-md "
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register('name')} onKeyDown={handleKeyPress} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            {...register('ownerName')}
            onKeyDown={handleKeyPress}
          />
          {errors.ownerName && (
            <p className="text-red-500">{errors.ownerName.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input
            id="imageUrl"
            {...register('imageUrl')}
            onKeyDown={handleKeyPress}
          />
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" {...register('age')} onKeyDown={handleKeyPress} />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            {...register('notes')}
            rows={3}
            onKeyDown={handleKeyPress}
          />
          {errors.notes && (
            <p className="text-red-500">{errors.notes.message}</p>
          )}
        </div>
      </div>

      <DialogFooter className="self-end pt-5">
        <Button type="submit">
          {actionType === 'add' && 'Add Pet'}
          {actionType === 'edit' && 'Save changes'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default PetForm;
