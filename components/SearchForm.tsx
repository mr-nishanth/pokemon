// pokemon-explorer/components/SearchForm.tsx

'use client';

import { usePokemon } from '@/hooks/usePokemon';
import { usePokemonV2 } from '@/hooks/usePokemonV2';
import { usePokemonStore } from '@/store/usePokemonStore';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useShallow } from 'zustand/react/shallow';

function SearchForm() {
  // const { searchQuery, handleSearchChange } = usePokemon();
  // const { searchQuery, handleSearchChange } = usePokemonV2();

  const { searchQuery, loading, handleSearchChange } = usePokemonStore(
    useShallow((state) => ({
      searchQuery: state.searchQuery,
      loading: state.loading,
      handleSearchChange: state.handleSearchChange,
    }))
  );

  return (
    <form className="relative w-[80%] md:w-[40%] mx-auto ">
      <div className="relative flex items-center justify-between w-full h-16 rounded-full bg-[#ee9c30] shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out ">
        <Image
          src="/pokemon.gif"
          alt="poke-ball"
          width={48}
          height={48}
          className="absolute left-4 w-12 h-12 poke-ball animate-swing"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search Pokemon by name"
          className="ml-18 w-4/5 mx-auto  h-full pl-12 pr-16 rounded-full text-lg text-gray-800 bg-white outline-none placeholder-gray-400 placeholder-opacity-80 focus:ring-0 z-20"
        />
        <button
          type="submit"
          className="absolute right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600"
        >
          <Search />
        </button>
        <div className="absolute inset-0 border-4 border-white rounded-full"></div>{' '}
        {/* White circle divider */}
      </div>
    </form>
  );
}

export default SearchForm;
