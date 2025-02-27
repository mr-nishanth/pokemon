// pokemon-explorer/app/page.tsx

'use client';
import Filters from '@/components/Filters';
import Header from '@/components/Header';
import PokemonCard from '@/components/PokemonCard';
import { usePokemonStore } from '@/store/usePokemonStore';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function Home() {
  const { pokemonListDetails, loading, loadMore, fetchPokemon, isHydrated } =
    usePokemonStore(
      useShallow((state) => ({
        pokemonListDetails: state.pokemonListDetails,
        loading: state.loading,
        loadMore: state.loadMore,
        fetchPokemon: state.fetchPokemon,
        isHydrated: state.isHydrated,
      }))
    );

  console.log({ pokemonListDetails });

  const observerRef = useRef<IntersectionObserver | null>(null);

  // Optimized Infinite Scroll Observer with Debounce
  const lastPokemonCallback = useCallback(
    (node: HTMLDivElement | null) => {
      // Prevent new API calls while loading
      if (loading) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !loading) {
            // Call loadMore function if the last card is in view
            loadMore();
          }
        },
        { rootMargin: '300px' } // Load earlier
      );

      if (node) observerRef.current.observe(node);
    },
    [loading, loadMore] // Dependencies to watch for loading state changes
  );

  useEffect(() => {
    if (!isHydrated) {
      // Wait until the store is hydrated before performing any logic
      console.log('Hydration in progress...');
    } else {
      fetchPokemon();
    }
  }, [isHydrated, fetchPokemon]);

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
            alt="poke-ball"
            width={100}
            height={100}
            className="animate-spin"
          />
        </motion.div>
      )}
    </main>
  );
}
