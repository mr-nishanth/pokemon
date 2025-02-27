// pokemon-explorer/components/SearchForm.tsx

'use client';

import { usePokemonStore } from '@/store/usePokemonStore';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useShallow } from 'zustand/react/shallow';
import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

function SearchForm() {
  const {
    searchQuery,
    loading,
    handleSearchChange,
    filterPokemon,
    isHydrated,
  } = usePokemonStore(
    useShallow((state) => ({
      searchQuery: state.searchQuery,
      loading: state.loading,
      handleSearchChange: state.handleSearchChange,
      filterPokemon: state.filterPokemon,
      isHydrated: state.isHydrated,
    }))
  );

  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  // Debounced function to trigger search only after user stops typing
  const debouncedHandleSearch = useCallback(
    debounce((query: string) => {
      // Update the global search query with the debounced value
      handleSearchChange(query);
      filterPokemon(); // Trigger filter function after updating the search query
    }, 500),
    [handleSearchChange, filterPokemon] // Depend on handleSearchChange and filterPokemon
  );

  // Effect for handling the debounced search query update
  useEffect(() => {
    if (debouncedSearch !== searchQuery) {
      debouncedHandleSearch(debouncedSearch); // Trigger debounced search
    }
  }, [debouncedSearch, debouncedHandleSearch, searchQuery]);

  // Update the local debounced value as user types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebouncedSearch(e.target.value); // Update debounced search state
  };

  // This useEffect ensures that once the store is hydrated, we trigger the first fetch
  useEffect(() => {
    if (isHydrated) {
      // Perform actions after hydration is done (like fetching data if needed)
      filterPokemon(); // Trigger the filter when hydrated
    }
  }, [isHydrated, filterPokemon]);

  return (
    <div className="relative w-[80%] md:w-[40%] mx-auto">
      <div className="relative flex items-center justify-between w-full h-16 rounded-full bg-[#ee9c30] shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
        <Image
          src="/pokemon.gif"
          alt="poke-ball"
          width={48}
          height={48}
          className="absolute left-4 w-12 h-12 poke-ball animate-swing"
        />
        <input
          type="text"
          value={debouncedSearch} // Bind to local debounced state
          onChange={handleChange} // Update the debounced value
          placeholder="Search Pokemon by name"
          className="ml-18 w-4/5 mx-auto h-full pl-12 pr-16 rounded-full text-lg text-gray-800 bg-white outline-none placeholder-gray-400 placeholder-opacity-80 focus:ring-0 z-20"
        />
        <button
          type="submit"
          className="absolute right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600"
          disabled={loading} // Disable search button while loading
        >
          <Search />
        </button>
        <div className="absolute inset-0 border-4 border-white rounded-full"></div>
      </div>
    </div>
  );
}

export default SearchForm;
