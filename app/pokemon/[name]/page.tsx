'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { motion } from 'motion/react';
import { usePokemon } from '@/hooks/usePokemon';
import { typeColor } from '@/utils/colors';
import { Ruler, Star, Volume2, Weight } from 'lucide-react';
import Image from 'next/image';
import { toTitleCase } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Props {
  params: Promise<{ name: string }>;
}

export default function PokemonDetailsPage({ params }: Props) {
  const [currentName, setCurrentName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchPokemonByName, loading, activePokemon } = usePokemon();

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      const name = resolvedParams.name;

      if (name !== currentName) {
        setCurrentName(name);
        fetchPokemonByName(name);
        setIsLoading(true);
      }
    };

    fetchParams();
  }, [params, currentName, fetchPokemonByName]);

  if (!isLoading || !activePokemon) {
    return (
      <motion.div
        className="h-screen w-screen flex justify-center items-center loading-background"
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
    );
  }

  return (
    <main>
      <Header />
      {/* Main section with animations */}
      <motion.section
        className="px-4 py-8 min-h-[90vh] grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
        style={{
          background:
            typeColor[
              activePokemon?.types && activePokemon.types.length > 0
                ? activePokemon.types[
                    Math.floor(Math.random() * activePokemon.types.length)
                  ].type.name
                : 'unknown'
            ],
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Left Section: Pokemon Info */}
        <div className="flex flex-col justify-center gap-6">
          {/* Back Button */}
          <div className="flex justify-start mt-4 ml-4">
            <Button
              className="u-shadow-2 font-bold bg-[#ee9c30] rounded-lg flex items-center gap-1"
              asChild
            >
              <Link href="/">Back to PokeLand</Link>
            </Button>
          </div>
          {/* Pokemon Name and Cry Buttons */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex gap-4">
              <button
                className="px-4 py-2 flex items-center gap-2 text-sm font-bold bg-white text-[#54a0ff] rounded-full hover:bg-white/90 transition-all duration-300 ease-in-out"
                onClick={() => {
                  const audio = new Audio(activePokemon?.cries.legacy);
                  audio.play();
                }}
              >
                <Volume2 /> Old Cry
              </button>
              <button
                className="px-4 py-2 flex items-center gap-2 text-sm font-bold bg-white text-[#54a0ff] rounded-full hover:bg-white/90 transition-all duration-300 ease-in-out"
                onClick={() => {
                  const audio = new Audio(activePokemon?.cries.latest);
                  audio.play();
                }}
              >
                <Volume2 /> New Cry
              </button>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold capitalize text-white drop-shadow-sm mt-4">
              {activePokemon?.name}
            </h1>
          </motion.div>

          {/* Abilities and Types */}
          <motion.div
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-xl md:text-2xl font-bold">Abilities</h2>
              <ul className="flex gap-2 flex-wrap">
                {activePokemon?.abilities.map((ability: any, index: number) => (
                  <li
                    key={index}
                    className="px-4 py-2 flex items-center gap-2 text-sm font-bold bg-white text-[#54a0ff] rounded-full"
                  >
                    {toTitleCase(ability.ability.name)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl md:text-2xl font-bold">Types</h2>
              <ul className="flex flex-wrap gap-2">
                {activePokemon?.types.map((type: any, index: number) => (
                  <li
                    key={index}
                    className="px-4 py-2 flex items-center gap-2 text-sm font-bold bg-zinc-700 text-white rounded-full"
                  >
                    {toTitleCase(type.type.name)}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Base Stats */}
          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h2 className="text-xl md:text-2xl font-bold">Base Stats</h2>
            <ul className="flex flex-col gap-4">
              {activePokemon?.stats.map((stat: any, index: number) => (
                <motion.li
                  key={index}
                  className="flex flex-col gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="flex items-center gap-4">
                    <span className="capitalize">
                      {toTitleCase(stat.stat.name)}
                    </span>
                    <span className="font-bold">{stat.base_stat}</span>
                  </div>

                  <div className="w-full h-3 bg-white/15 rounded-md overflow-hidden mt-1">
                    <motion.div
                      className="h-full rounded-md bg-white"
                      style={{
                        width: `${(stat.base_stat / 200) * 100}%`, // Normalize to max 200
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(stat.base_stat / 200) * 100}%` }}
                      transition={{ delay: 0.3, duration: 1 }}
                    ></motion.div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Height, Weight, Base Experience */}
          <motion.div
            className="mt-2 flex gap-4 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <p className="p-4 flex flex-col items-center justify-center uppercase text-gray-600 font-bold bg-white rounded-lg">
              <span className="text-sm flex items-center gap-2">
                <Ruler size={18} />
                Height
              </span>
              {activePokemon?.height} m
            </p>
            <p className="p-4 flex flex-col items-center justify-center uppercase text-gray-600 font-bold bg-white rounded-lg">
              <span className="text-sm flex items-center gap-2">
                <Weight size={18} />
                Weight
              </span>
              {activePokemon?.weight} kg
            </p>
            <p className="p-4 flex flex-col items-center justify-center uppercase text-gray-600 font-bold bg-white rounded-lg">
              <span className="text-sm flex items-center gap-2">
                <Star size={18} />
                Base Ex
              </span>
              {activePokemon?.base_experience} xp
            </p>
          </motion.div>
        </div>

        {/* Right Section: Pokemon Image */}
        <div className="relative flex justify-center items-center">
          <Image
            src={`/icons/${activePokemon?.types[0].type.name}.svg`}
            alt="pokemon type"
            width={700}
            height={700}
            className="absolute opacity-15 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          />

          <motion.img
            src={
              activePokemon?.sprites?.other?.home?.front_shiny ||
              activePokemon?.sprites?.other?.showdown?.front_default ||
              activePokemon?.sprites?.front_default ||
              '/pokemon.gif'
            }
            alt="pokemon image"
            width={500}
            height={500}
            className="relative z-10 filter drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          />
        </div>
      </motion.section>
    </main>
  );
}
