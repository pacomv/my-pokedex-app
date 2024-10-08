import { PokemonData, Types } from '../pokemon.entity';
import { PokemonDto } from './pokemons.dto';

export function getPokemonDto(pokemonData: PokemonData) {
  const types: Types[] = pokemonData.types.map(
    (type) => type.type as unknown as Types,
  );
  const pokemonDto: PokemonDto = {
    id: pokemonData?.id,
    imageUrl: pokemonData?.sprites?.front_default,
    name: pokemonData?.name,
    types,
  };
  return pokemonDto;
}
