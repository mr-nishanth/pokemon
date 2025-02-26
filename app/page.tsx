// pokemon-explorer/app/page.tsx

'use client';
import Filters from '@/components/Filters';
import Header from '@/components/Header';
import PokemonCard from '@/components/PokemonCard';
import { usePokemon } from '@/hooks/usePokemon';
import { usePokemonV2 } from '@/hooks/usePokemonV2';
import { usePokemonStore } from '@/store/usePokemonStore';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function Home() {
  // const { pokemonListDetails, loading, loadMore } = usePokemon();
  // const { pokemonListDetails, loading, loadMore } = usePokemonV2();

  const { pokemonListDetails, loading, loadMore, fetchPokemon } =
    usePokemonStore(
      useShallow((state) => ({
        pokemonListDetails: state.pokemonListDetails,
        loading: state.loading,
        loadMore: state.loadMore,
        fetchPokemon: state.fetchPokemon,
      }))
    );

  console.log({ pokemonListDetails });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  // Optimized Infinite Scroll Observer with Debounce
  const lastPokemonCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || isFetching) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsFetching(true);
            setTimeout(() => {
              loadMore();
              setIsFetching(false);
            }, 500); // Debounce API calls
          }
        },
        { rootMargin: '300px' } // Load earlier
      );

      if (node) observerRef.current.observe(node);
    },
    [loading, loadMore, isFetching]
  );

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);
  return (
    <main className="homepage-background">
      <Header />
      <section>
        <Filters />
      </section>

      <section className="min-h-[91vh]">
        <div className="px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pokemonListDetails.map((pokemon, index) => (
            <motion.div
              key={index}
              ref={
                index === pokemonListDetails.length - 1
                  ? lastPokemonCallback
                  : null
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              // transition={{ duration: 0.5, delay: index * 0.1 }} // Delay based on the index for staggered animation
            >
              <PokemonCard pokemon={pokemon} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Optimized Loader */}
      {loading && (
        <motion.div
          className="flex justify-center items-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/pokemon.gif"
            alt="pokeball"
            width={100}
            height={100}
            className="animate-spin"
          />
        </motion.div>
      )}
    </main>
  );
}
