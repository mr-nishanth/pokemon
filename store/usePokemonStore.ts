// stores/usePokemonStore.ts
import { create } from 'zustand';

import { POKEMON_BASE_URI, DEFAULT_LIMIT } from '@/constants';
import axios from 'axios';
import { fetchWithRetry } from '@/lib/utils';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetails {
  name: string;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  weight: number;
  height: number;
  cries: { legacy: string; latest: string };
  stats: { base_stat: number; stat: { name: string } }[];
  sprites: {
    front_default: string;
    other: {
      home: {
        front_default: string;
        front_shiny: string;
        back_default: string;
        back_shiny: string;
      };
      showdown: {
        front_default: string;
        front_shiny: string;
        back_default: string;
        back_shiny: string;
      };
    };
    front_shiny: string;
    back_default: string;
    back_shiny: string;
  };
  base_experience: number;
  moves: { move: { name: string } }[];
}

interface Filters {
  type: string;
  ability: string;
  weight: string;
  height: string;
  sortOrder: string;
}

interface PokemonState {
  loading: boolean;
  pokemonList: Pokemon[];
  pokemonListDetails: PokemonDetails[];
  activePokemon: PokemonDetails | null;
  searchQuery: string;
  filters: Filters;
  currentPage: number;
  allPokemon: Pokemon[];
  originalPokemonListDetails: PokemonDetails[];
  fetchPokemon: (page?: number) => Promise<void>;
  fetchAllPokemon: () => Promise<void>;
  fetchPokemonDetails: (pokemonList: Pokemon[]) => Promise<void>;
  fetchPokemonByName: (name: string) => Promise<void>;
  handleSearchChange: (query: string) => void;
  handleFilterChange: (key: keyof Filters, value: string) => void;
  filterPokemon: () => void;
  loadMore: () => void;
  clearFilters: () => void;
}

export const usePokemonStore = create<PokemonState>()((set, get) => ({
  loading: false,
  pokemonList: [],
  pokemonListDetails: [],
  activePokemon: null,
  searchQuery: '',
  filters: {
    type: '',
    ability: '',
    weight: '',
    height: '',
    sortOrder: '',
  },
  currentPage: 1,
  allPokemon: [],
  originalPokemonListDetails: [],

  fetchAllPokemon: async () => {
    try {
      const res = await axios.get(`${POKEMON_BASE_URI}/pokemon?limit=1118`);
      set({ allPokemon: res.data.results });
    } catch (error) {
      console.error(error);
    }
  },

  fetchPokemon: async (page = 1) => {
    set({ loading: true });
    try {
      console.log('Fetching page:', page);

      const offset = (page - 1) * DEFAULT_LIMIT;
      const res = await axios.get(
        `${POKEMON_BASE_URI}/pokemon?offset=${offset}&limit=${DEFAULT_LIMIT}`
      );

      set((state) => ({
        pokemonList:
          page === 1
            ? res.data.results
            : [...state.pokemonList, ...res.data.results],
        loading: false,
        currentPage: page,
      }));

      get().fetchPokemonDetails(res.data.results);
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  fetchPokemonDetails: async (newPokemonList: Pokemon[]) => {
    set({ loading: true });
    try {
      const details: (PokemonDetails | null)[] = await Promise.all(
        newPokemonList.map(async (pokemon) => {
          const data = await fetchWithRetry<PokemonDetails>(pokemon.url);
          return data ? data : null; // Only return valid data
        })
      );

      const validDetails: PokemonDetails[] = details.filter(
        (detail) => detail !== null
      ) as PokemonDetails[];

      const existingPokemonNames = new Set(
        get().pokemonListDetails.map((detail) => detail.name)
      );

      const newDetails: PokemonDetails[] = validDetails.filter(
        (newDetail) => !existingPokemonNames.has(newDetail.name)
      );

      set((state) => ({
        pokemonListDetails: [...state.pokemonListDetails, ...newDetails],
        originalPokemonListDetails: [
          ...state.originalPokemonListDetails,
          ...newDetails,
        ],
        loading: false,
      }));
    } catch (error) {
      console.error('Error fetching pokemon details', error);
      set({ loading: false });
    }
  },

  fetchPokemonByName: async (name: string) => {
    set({ loading: true });
    try {
      const res = await axios.get(`${POKEMON_BASE_URI}/pokemon/${name}`);
      set({ activePokemon: res.data, loading: false });
    } catch (error) {
      console.error('Error fetching pokemon by name', error);
      set({ loading: false });
    }
  },

  handleSearchChange: (query) => {
    set({ searchQuery: query });
  },

  handleFilterChange: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    }));

    get().filterPokemon();
  },

  filterPokemon: () => {
    const state = get();
    const { type, ability, weight, height, sortOrder } = state.filters;
    const query = state.searchQuery.toLowerCase();
    let filteredPokemon = state.originalPokemonListDetails;

    if (type) {
      filteredPokemon = filteredPokemon.filter((pokemon) =>
        pokemon.types.some((t) => t.type.name === type)
      );
    }

    if (ability) {
      filteredPokemon = filteredPokemon.filter((pokemon) =>
        pokemon.abilities.some((a) => a.ability.name === ability)
      );
    }

    if (weight) {
      filteredPokemon = filteredPokemon.filter(
        (pokemon) => pokemon.weight >= parseInt(weight)
      );
    }

    if (height) {
      filteredPokemon = filteredPokemon.filter(
        (pokemon) => pokemon.height >= parseInt(height)
      );
    }

    if (query) {
      filteredPokemon = filteredPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query)
      );
    }

    console.log({ filteredPokemon });

    if (sortOrder) {
      filteredPokemon =
        sortOrder === 'asc'
          ? [...filteredPokemon].sort((a, b) => a.name.localeCompare(b.name))
          : [...filteredPokemon].sort((a, b) => b.name.localeCompare(a.name));
    }

    set({
      pokemonListDetails: filteredPokemon,
    });
  },

  loadMore: () => {
    const state = get();
    state.fetchPokemon(state.currentPage + 1);
  },

  clearFilters: () => {
    set({
      filters: {
        type: '',
        ability: '',
        weight: '',
        height: '',
        sortOrder: '',
      },
      searchQuery: '',
      pokemonListDetails: get().originalPokemonListDetails,
    });
  },
}));
