'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import PetForm from './PetForm';
import { flushSync } from 'react-dom';

type PetButtonProps = {
  actionType: 'add' | 'edit' | 'remove';
  variant: 'default' | 'secondary';
  size?: 'default' | 'icon';
  disabled?: boolean;
  onClick?: (id?: string) => void;
  petId?: string;
};

const PetButton = ({
  actionType,
  variant,
  size,
  disabled,
  onClick,
  petId,
}: PetButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogClose = () => {
    flushSync(() => setIsOpen(false));
  };

  const handleClick = () => {
    if (actionType === 'remove' && onClick) {
      onClick(petId);
    }
  };

  return (
    <>
      {actionType === 'remove' ? (
        <Button
          variant={variant}
          size={size}
          disabled={disabled}
          onClick={handleClick}
        >
          Remove
        </Button>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant={variant} size={size} disabled={disabled}>
              {actionType === 'add' && <PlusIcon className="size-6" />}
              {actionType === 'edit' && 'Edit'}
            </Button>
          </DialogTrigger>

          {['add', 'edit'].includes(actionType) && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="pb-3 text-center">
                  {actionType === 'add' && (
                    <h2 className="text-2xl font-semibold">Add a new pet</h2>
                  )}
                  {actionType === 'edit' && (
                    <h2 className="text-2xl font-semibold">
                      Update your pet details
                    </h2>
                  )}
                </DialogTitle>
                <PetForm
                  actionType={actionType === 'add' ? 'add' : 'edit'}
                  onDialogClose={handleDialogClose}
                />
              </DialogHeader>
            </DialogContent>
          )}
        </Dialog>
      )}
    </>
  );
};

export default PetButton;
