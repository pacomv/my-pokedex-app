import { Injectable } from '@nestjs/common';
import {
  PaginatedData,
  PaginatedResults,
  Pokemon,
  PokemonData,
  Types,
} from './pokemon.entity';
import { PokemonDto } from './dto/pokemons.dto';

@Injectable()
export class PokemonsService {
  getPokemonDto(pokemonData: PokemonData) {
    const types: Types[] = pokemonData.types.map((type) => type.type.name);
    const pokemonDto: PokemonDto = {
      id: pokemonData?.id,
      imageUrl: pokemonData?.sprites?.front_default,
      name: pokemonData?.name,
      types,
    };
    return pokemonDto;
  }
  async getAllPokemons(params?: { page?: number; size?: number }) {
    const { page = 0, size = -1 } = params ?? {};
    let offset = size * page;
    let limit = size;

    if (size === -1) {
      limit = 100000;
      offset = 0;
    }

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    );
    const paginatedPokemon: PaginatedResults<Pokemon> = await response.json();
    const pokemonListPromises = paginatedPokemon.results.map((pokemon) =>
      fetch(pokemon.url),
    );
    const pokemonList = await Promise.all(pokemonListPromises);
    const pokemonDataListPromises = pokemonList.map((resp) => resp.json());
    const pokemonDataList: PokemonData[] = await Promise.all(
      pokemonDataListPromises,
    );
    const count = paginatedPokemon?.count;
    const totalPages = Math.ceil(count / size);
    const data = pokemonDataList?.map(this.getPokemonDto);
    const paginatedPokemonData: PaginatedData<PokemonDto> = {
      count,
      data,
      page,
      size,
      totalPages,
    };
    return paginatedPokemonData;
  }
}
