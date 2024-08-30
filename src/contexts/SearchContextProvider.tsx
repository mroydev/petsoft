'use client';

import React, { createContext, useContext, useState } from 'react';

type SearchContextProviderProps = {
  children: React.ReactNode;
};

type TSearchContext = {
  searchQuery: string;
  updateSearchQuery: (query: string) => void;
};

export const SearchContext = createContext<TSearchContext | null>(null);

const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  // state to store the pets data
  const [searchQuery, setSearchQuery] = useState('');

  // event handlers/actions
  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, updateSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;

// custom hook to use the context
export function useSearchContext() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error(
      'useSearchContext must be used within a SearchContextProvider'
    );
  }

  return context;
}
