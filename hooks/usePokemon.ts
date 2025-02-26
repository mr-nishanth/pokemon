// pokemon-explorer/hooks/usePokemon.ts

'use client';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { POKEMON_BASE_URI } from '@/constants';

// // Define the types for Pokemon data
// interface Pokemon {
//   name: string;
//   url: string;
// }

// interface PokemonDetails {
//   name: string;
//   types: { type: { name: string } }[];
//   abilities: { ability: { name: string } }[];
//   weight: number;
//   height: number;
// }

// interface Filters {
//   type: string;
//   ability: string;
//   weight: string;
//   height: string;
//   sortOrder: string;
// }

// interface PokemonState {
//   loading: boolean;
//   pokemonList: Pokemon[];
//   pokemonListDetails: PokemonDetails[];
//   activePokemon: PokemonDetails | null;
//   searchQuery: string;
//   filters: Filters;
//   currentPage: number;
//   allPokemon: Pokemon[];
//   originalPokemonListDetails: PokemonDetails[];
// }

// export const usePokemon = () => {
//   const [state, setState] = useState<PokemonState>({
//     loading: false,
//     pokemonList: [],
//     pokemonListDetails: [],
//     activePokemon: null,
//     searchQuery: '',
//     filters: {
//       type: '',
//       ability: '',
//       weight: '',
//       height: '',
//       sortOrder: '',
//     },
//     currentPage: 1,
//     allPokemon: [],
//     originalPokemonListDetails: [],
//   });

//   // Fetch Pokemon list
//   const fetchPokemon = async (page: number = 1): Promise<void> => {
//     setState((prevState) => ({ ...prevState, loading: true }));
//     try {
//       const offset = (page - 1) * 50;
//       const res = await axios.get(
//         `${POKEMON_BASE_URI}/pokemon?offset=${offset}&limit=40`
//       );
//       setState((prevState) => ({
//         ...prevState,
//         pokemonList: [...prevState.pokemonList, ...res.data.results],
//         loading: false,
//         currentPage: page,
//       }));
//     } catch (error) {
//       console.error(error);
//       setState((prevState) => ({ ...prevState, loading: false }));
//     }
//   };

//   // Fetch all Pokemon
//   const fetchAllPokemon = async (): Promise<void> => {
//     try {
//       const res = await axios.get(`${POKEMON_BASE_URI}/pokemon?limit=1118`);
//       setState((prevState) => ({ ...prevState, allPokemon: res.data.results }));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Fetch Pokemon details
//   const fetchPokemonDetails = async (): Promise<void> => {
//     setState((prevState) => ({ ...prevState, loading: true }));
//     try {
//       const details = await Promise.all(
//         state.pokemonList.map(async (pokemon) => {
//           const res = await axios.get(pokemon.url);
//           return res.data;
//         })
//       );
//       setState((prevState) => ({
//         ...prevState,
//         pokemonListDetails: details,
//         originalPokemonListDetails: details,
//         loading: false,
//       }));
//     } catch (error) {
//       console.log('Error fetching pokemon details', error);
//       setState((prevState) => ({ ...prevState, loading: false }));
//     }
//   };

//   // Fetch Pokemon by name
//   const fetchPokemonByName = async (name: string): Promise<void> => {
//     setState((prevState) => ({ ...prevState, loading: true }));
//     try {
//       const res = await axios.get(`${POKEMON_BASE_URI}/pokemon/${name}`);
//       setState((prevState) => ({
//         ...prevState,
//         activePokemon: res.data,
//         loading: false,
//       }));
//     } catch (error) {
//       console.error('Error fetching pokemon by name', error);
//       setState((prevState) => ({ ...prevState, loading: false }));
//     }
//   };

//   // Handle search query
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     const query = e.target.value;
//     setState((prevState) => ({
//       ...prevState,
//       searchQuery: query,
//     }));
//   };

//   // Filter Pokemon based on selected filters
//   const filterPokemon = (): void => {
//     const { type, ability, weight, height, sortOrder } = state.filters;
//     const query = state.searchQuery.toLowerCase();
//     let filteredPokemon = state.originalPokemonListDetails;

//     // Apply type filter
//     if (type) {
//       filteredPokemon = filteredPokemon.filter((pokemon) =>
//         pokemon.types.some((t) => t.type.name === type)
//       );
//     }

//     // Apply ability filter
//     if (ability) {
//       filteredPokemon = filteredPokemon.filter((pokemon) =>
//         pokemon.abilities.some((a) => a.ability.name === ability)
//       );
//     }

//     // Apply weight filter
//     if (weight) {
//       filteredPokemon = filteredPokemon.filter(
//         (pokemon) => pokemon.weight >= parseInt(weight)
//       );
//     }

//     // Apply height filter
//     if (height) {
//       filteredPokemon = filteredPokemon.filter(
//         (pokemon) => pokemon.height >= parseInt(height)
//       );
//     }

//     // Apply search query filter
//     if (query) {
//       filteredPokemon = filteredPokemon.filter((pokemon) =>
//         pokemon.name.toLowerCase().includes(query)
//       );
//     }

//     // Apply sorting
//     if (sortOrder) {
//       filteredPokemon =
//         sortOrder === 'asc'
//           ? [...filteredPokemon].sort((a, b) => a.name.localeCompare(b.name))
//           : [...filteredPokemon].sort((a, b) => b.name.localeCompare(a.name));
//     }

//     setState((prevState) => ({
//       ...prevState,
//       pokemonListDetails: filteredPokemon,
//     }));
//   };

//   // Filter change handler
//   const handleFilterChange = (key: keyof Filters, value: string): void => {
//     setState((prevState) => ({
//       ...prevState,
//       filters: { ...prevState.filters, [key]: value },
//     }));
//   };

//   // Load more Pokemon
//   const loadMore = (): void => {
//     fetchPokemon(state.currentPage + 1);
//   };

//   // Clear filters
//   const clearFilters = (): void => {
//     setState((prevState) => ({
//       ...prevState,
//       filters: {
//         type: '',
//         ability: '',
//         weight: '',
//         height: '',
//         sortOrder: '',
//       },
//       searchQuery: '',
//       pokemonListDetails: prevState.originalPokemonListDetails,
//     }));
//   };

//   // UseEffect for initial fetches
//   useEffect(() => {
//     fetchPokemon();
//     fetchAllPokemon();
//   }, []);

//   useEffect(() => {
//     if (state.pokemonList.length > 0) {
//       fetchPokemonDetails();
//     }
//   }, [state.pokemonList]);

//   useEffect(() => {
//     filterPokemon();
//   }, [state.filters, state.searchQuery]);

//   return {
//     loading: state.loading,
//     pokemonList: state.pokemonList,
//     pokemonListDetails: state.pokemonListDetails,
//     activePokemon: state.activePokemon,
//     searchQuery: state.searchQuery,
//     filters: state.filters,
//     fetchPokemonByName,
//     handleSearchChange,
//     loadMore,
//     clearFilters,
//     handleFilterChange,
//   };
// };

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { DEFAULT_LIMIT, POKEMON_BASE_URI } from '@/constants';

// interface Pokemon {
//   name: string;
//   url: string;
// }

// interface PokemonDetails {
//   name: string;
//   types: { type: { name: string } }[];
//   abilities: { ability: { name: string } }[];
//   weight: number;
//   height: number;
//   cries: { legacy: string; latest: string };
//   stats: { base_stat: number; stat: { name: string } }[];
//   sprites: {
//     front_default: string;
//     other: {
//       home: {
//         front_default: string;
//         front_shiny: string;
//         back_default: string;
//         back_shiny: string;
//       };
//       showdown: {
//         front_default: string;
//         front_shiny: string;
//         back_default: string;
//         back_shiny: string;
//       };
//     };
//     front_shiny: string;
//     back_default: string;
//     back_shiny: string;
//   };
//   base_experience: number;
// }

// interface Filters {
//   type: string;
//   ability: string;
//   weight: string;
//   height: string;
//   sortOrder: string;
// }

// interface PokemonState {
//   loading: boolean;
//   pokemonList: Pokemon[];
//   pokemonListDetails: PokemonDetails[];
//   activePokemon: PokemonDetails | null;
//   searchQuery: string;
//   filters: Filters;
//   currentPage: number;
//   allPokemon: Pokemon[];
//   originalPokemonListDetails: PokemonDetails[];
// }

// export const usePokemon = () => {
//   const [state, setState] = useState<PokemonState>({
//     loading: false,
//     pokemonList: [],
//     pokemonListDetails: [],
//     activePokemon: null,
//     searchQuery: '',
//     filters: {
//       type: '',
//       ability: '',
//       weight: '',
//       height: '',
//       sortOrder: '',
//     },
//     currentPage: 1,
//     allPokemon: [],
//     originalPokemonListDetails: [],
//   });

//   const [isMounted, setIsMounted] = useState(false); // Track client-side mounting

//   // Ensure logic runs only after mounting the component on the client
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // Fetch Pokemon list
//   const fetchPokemon = async (page: number = 1): Promise<void> => {
//     if (!isMounted) return; // Prevent SSR errors

//     setState((prevState) => ({ ...prevState, loading: true }));
//     try {
//       const offset = (page - 1) * DEFAULT_LIMIT;
//       const res = await axios.get(
//         `${POKEMON_BASE_URI}/pokemon?offset=${offset}&limit=${DEFAULT_LIMIT}`
//       );
//       setState((prevState) => ({
//         ...prevState,
//         pokemonList: [...prevState.pokemonList, ...res.data.results],
//         loading: false,
//         currentPage: page,
//       }));
//     } catch (error) {
//       console.error(error);
//       setState((prevState) => ({ ...prevState, loading: false }));
//     }
//   };

//   // Fetch all Pokemon
//   const fetchAllPokemon = async (): Promise<void> => {
//     if (!isMounted) return; // Prevent SSR errors

//     try {
//       const res = await axios.get(`${POKEMON_BASE_URI}/pokemon?limit=1118`);
//       setState((prevState) => ({ ...prevState, allPokemon: res.data.results }));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Fetch Pokemon details
//   const fetchPokemonDetails = async (): Promise<void> => {
//     if (!isMounted) return; // Prevent SSR errors

//     setState((prevState) => ({ ...prevState, loading: true }));
//     try {
//       const details = await Promise.all(
//         state.pokemonList.map(async (pokemon) => {
//           const res = await axios.get(pokemon.url);
//           return res.data;
//         })
//       );
//       setState((prevState) => ({
//         ...prevState,
//         pokemonListDetails: details,
//         originalPokemonListDetails: details,
//         loading: false,
//       }));
//     } catch (error) {
//       console.log('Error fetching pokemon details', error);
//       setState((prevState) => ({ ...prevState, loading: false }));
//     }
//   };

//   // Fetch Pokemon by name
//   const fetchPokemonByName = async (name: string): Promise<void> => {
//     if (!isMounted) return; // Prevent SSR errors

//     setState((prevState) => ({ ...prevState, loading: true }));
//     try {
//       const res = await axios.get(`${POKEMON_BASE_URI}/pokemon/${name}`);
//       setState((prevState) => ({
//         ...prevState,
//         activePokemon: res.data,
//         loading: false,
//       }));
//     } catch (error) {
//       console.error('Error fetching pokemon by name', error);
//       setState((prevState) => ({ ...prevState, loading: false }));
//     }
//   };

//   // Handle search query change
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     const query = e.target.value;
//     setState((prevState) => ({
//       ...prevState,
//       searchQuery: query,
//     }));
//   };

//   // Filter Pokemon based on selected filters
//   const filterPokemon = (): void => {
//     const { type, ability, weight, height, sortOrder } = state.filters;
//     const query = state.searchQuery.toLowerCase();
//     let filteredPokemon = state.originalPokemonListDetails;

//     if (type) {
//       filteredPokemon = filteredPokemon.filter((pokemon) =>
//         pokemon.types.some((t) => t.type.name === type)
//       );
//     }

//     if (ability) {
//       filteredPokemon = filteredPokemon.filter((pokemon) =>
//         pokemon.abilities.some((a) => a.ability.name === ability)
//       );
//     }

//     if (weight) {
//       filteredPokemon = filteredPokemon.filter(
//         (pokemon) => pokemon.weight >= parseInt(weight)
//       );
//     }

//     if (height) {
//       filteredPokemon = filteredPokemon.filter(
//         (pokemon) => pokemon.height >= parseInt(height)
//       );
//     }

//     if (query) {
//       filteredPokemon = filteredPokemon.filter((pokemon) =>
//         pokemon.name.toLowerCase().includes(query)
//       );
//     }

//     if (sortOrder) {
//       filteredPokemon =
//         sortOrder === 'asc'
//           ? [...filteredPokemon].sort((a, b) => a.name.localeCompare(b.name))
//           : [...filteredPokemon].sort((a, b) => b.name.localeCompare(a.name));
//     }

//     console.log({ filteredPokemon });

//     setState((prevState) => ({
//       ...prevState,
//       pokemonListDetails: filteredPokemon,
//     }));
//   };

//   // Filter change handler
//   const handleFilterChange = (key: keyof Filters, value: string): void => {
//     console.log({ key, value });

//     setState((prevState) => ({
//       ...prevState,
//       filters: { ...prevState.filters, [key]: value },
//     }));
//   };

//   // Load more Pokemon
//   const loadMore = (): void => {
//     fetchPokemon(state.currentPage + 1);
//   };

//   // Clear filters
//   const clearFilters = (): void => {
//     setState((prevState) => ({
//       ...prevState,
//       filters: {
//         type: '',
//         ability: '',
//         weight: '',
//         height: '',
//         sortOrder: '',
//       },
//       searchQuery: '',
//       pokemonListDetails: prevState.originalPokemonListDetails,
//     }));
//   };

//   // UseEffect for initial fetches
//   useEffect(() => {
//     if (isMounted) {
//       fetchPokemon();
//       fetchAllPokemon();
//     }
//   }, [isMounted]);

//   useEffect(() => {
//     if (state.pokemonList.length > 0 && isMounted) {
//       fetchPokemonDetails();
//     }
//   }, [state.pokemonList, isMounted]);

//   useEffect(() => {
//     if (isMounted) {
//       console.log('Filtering Pokemon');

//       filterPokemon();
//     }
//   }, [state.filters, state.searchQuery, isMounted]);
//   console.log({ pokemonListDetails:state.pokemonListDetails });

//   return {
//     loading: state.loading,
//     pokemonList: state.pokemonList,
//     pokemonListDetails: state.pokemonListDetails,
//     activePokemon: state.activePokemon,
//     searchQuery: state.searchQuery,
//     filters: state.filters,
//     fetchPokemonByName,
//     handleSearchChange,
//     loadMore,
//     clearFilters,
//     handleFilterChange,
//   };
// };

import { useState, useEffect } from 'react';
import axios from 'axios';
import { DEFAULT_LIMIT, POKEMON_BASE_URI } from '@/constants';

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
}

export const usePokemon = () => {
  const [state, setState] = useState<PokemonState>({
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
  });

  const [isMounted, setIsMounted] = useState(false); // Track client-side mounting
  const [debouncedFilters, setDebouncedFilters] = useState<Filters>(
    state.filters
  ); // Debounced filters

  // Debouncing function to optimize filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(state.filters);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [state.filters]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fetchPokemon = async (page: number = 1): Promise<void> => {
    if (!isMounted) return;

    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const offset = (page - 1) * DEFAULT_LIMIT;
      const res = await axios.get(
        `${POKEMON_BASE_URI}/pokemon?offset=${offset}&limit=${DEFAULT_LIMIT}`
      );
      setState((prevState) => ({
        ...prevState,
        pokemonList: [...prevState.pokemonList, ...res.data.results],
        loading: false,
        currentPage: page,
      }));
    } catch (error) {
      console.error(error);
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const fetchAllPokemon = async (): Promise<void> => {
    if (!isMounted) return;

    try {
      const res = await axios.get(`${POKEMON_BASE_URI}/pokemon?limit=1118`);
      setState((prevState) => ({ ...prevState, allPokemon: res.data.results }));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPokemonDetails = async (): Promise<void> => {
    if (!isMounted) return;

    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const details = await Promise.all(
        state.pokemonList.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return res.data;
        })
      );
      setState((prevState) => ({
        ...prevState,
        pokemonListDetails: details,
        originalPokemonListDetails: details,
        loading: false,
      }));
    } catch (error) {
      console.log('Error fetching pokemon details', error);
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const query = e.target.value;
    setState((prevState) => ({
      ...prevState,
      searchQuery: query,
    }));
  };

  const filterPokemon = (): void => {
    const { type, ability, weight, height, sortOrder } = debouncedFilters; // Use debounced filters
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

    if (sortOrder) {
      filteredPokemon =
        sortOrder === 'asc'
          ? [...filteredPokemon].sort((a, b) => a.name.localeCompare(b.name))
          : [...filteredPokemon].sort((a, b) => b.name.localeCompare(a.name));
    }

    setState((prevState) => ({
      ...prevState,
      pokemonListDetails: filteredPokemon,
    }));
  };

  const handleFilterChange = (key: keyof Filters, value: string): void => {
    setState((prevState) => ({
      ...prevState,
      filters: { ...prevState.filters, [key]: value },
    }));
  };

  // Fetch Pokemon by name
  const fetchPokemonByName = async (name: string): Promise<void> => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const res = await axios.get(`${POKEMON_BASE_URI}/pokemon/${name}`);
      setState((prevState) => ({
        ...prevState,
        activePokemon: res.data,
        loading: false,
      }));
    } catch (error) {
      console.error('Error fetching pokemon by name', error);
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const loadMore = (): void => {
    fetchPokemon(state.currentPage + 1);
  };

  const clearFilters = (): void => {
    console.log(`Clearing filters`);
    console.log({ state });

    setState((prevState) => ({
      ...prevState,
      filters: {
        type: '',
        ability: '',
        weight: '',
        height: '',
        sortOrder: '',
      },
      searchQuery: '',
      pokemonListDetails: prevState.originalPokemonListDetails,
    }));
  };

  useEffect(() => {
    if (isMounted) {
      fetchPokemon();
      fetchAllPokemon();
    }
  }, [isMounted]);

  useEffect(() => {
    if (state.pokemonList.length > 0 && isMounted) {
      fetchPokemonDetails();
    }
  }, [state.pokemonList, isMounted]);

  useEffect(() => {
    if (isMounted) {
      filterPokemon();
    }
  }, [debouncedFilters, state.searchQuery, isMounted]); // Apply debounced filters

  console.log({ state });

  return {
    loading: state.loading,
    pokemonList: state.pokemonList,
    pokemonListDetails: state.pokemonListDetails,
    activePokemon: state.activePokemon,
    searchQuery: state.searchQuery,
    filters: state.filters,
    fetchPokemonByName,
    handleSearchChange,
    loadMore,
    clearFilters,
    handleFilterChange,
  };
};
