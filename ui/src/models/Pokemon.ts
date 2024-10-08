export interface PaginatedData<T> {
  count: number;
  data: T[];
  page: number;
  size: number;
  totalPages: number;
}

export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: Types[];
}

interface Type {
  slot: number;
  type: {
    name: Types;
    url: string;
  };
}

export enum Types {
  NORMAL = "normal",
  FIRE = "fire",
  WATER = "water",
  ELECTRIC = "electric",
  GRASS = "grass",
  ICE = "ice",
  FIGHTING = "fighting",
  POISON = "poison",
  GROUND = "ground",
  FLYING = "flying",
  PSYCHIC = "psychic",
  BUG = "bug",
  ROCK = "rock",
  GHOST = "ghost",
  DRAGON = "dragon",
  DARK = "dark",
  STEEL = "steel",
  FAIRY = "fairy",
}
