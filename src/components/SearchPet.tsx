'use client';

import { useSearchContext } from '@/contexts/SearchContextProvider';

export default function SearchPet() {
  const { searchQuery, updateSearchQuery } = useSearchContext();
  return (
    <form className="size-full">
      <input
        className="size-full rounded-md bg-white/20 px-5 outline-none transition placeholder:text-white/50 hover:bg-white/30 focus:bg-white/50"
        placeholder="Search pets"
        type="search"
        value={searchQuery}
        onChange={(e) => updateSearchQuery(e.target.value)}
      />
    </form>
  );
}
