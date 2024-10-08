import { PokemonDto } from 'src/pokemons/dto/pokemons.dto';

export class User {
  id: string;
  username: string;
  password: string;
  favoritePokemons: PokemonDto[];
}
