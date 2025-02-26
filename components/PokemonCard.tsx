// pokemon-explorer/components/PokemonCard.tsx

'use client';

import { motion } from 'framer-motion'; // Import motion for animations
import { typeColor } from '@/utils/colors';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PokemonCardProps {
  pokemon: any;
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  const router = useRouter();

  return (
    <motion.div
      className="relative p-4 bg-white rounded-xl shadow-sm flex flex-col gap-2 cursor-pointer"
      onClick={() => router.push(`/pokemon/${pokemon?.name}`)}
      whileHover={{ scale: 1.05 }} // Scale the card up on hover
      transition={{ type: 'spring', stiffness: 300 }} // Smooth spring effect
    >
      <div className="flex gap-4 py-4">
        <div className="flex-1">
          <Image
            src={
              pokemon?.sprites?.other?.home?.front_default ||
              pokemon?.sprites?.front_default
            }
            alt="pokemon image"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="mb-2 flex gap-2">
            <p className="text-xs uppercase font-semibold text-gray-500">
              {pokemon?.height} m,
            </p>
            <p className="text-xs uppercase font-semibold text-gray-500">
              {pokemon?.weight} kg,
            </p>
            <p className="text-xs uppercase font-semibold text-gray-500">
              {pokemon?.base_experience} xp
            </p>
          </div>
          <h2 className="text-2xl text-gray-800 capitalize font-bold text-center">
            {pokemon?.name}
          </h2>

          <div className="flex justify-center gap-2">
            {pokemon?.types?.map((type: any, index: number) => (
              <p
                key={index}
                className="text-xs uppercase font-semibold text-white px-5 py-1 rounded-full"
                style={{ backgroundColor: typeColor[type?.type?.name] }}
              >
                {type.type.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PokemonCard;
