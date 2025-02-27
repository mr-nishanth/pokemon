export const initialState = {
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
};
