export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetails {
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

export interface Filters {
  type: string;
  ability: string;
  weight: string;
  height: string;
  sortOrder: string;
}
