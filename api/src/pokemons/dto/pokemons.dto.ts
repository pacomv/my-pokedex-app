import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from '../pokemon.entity';

export class GetPokemonsDto {
  @IsOptional()
  page: number;
  @IsOptional()
  size: number;
}

export class AddPokemonsDto {
  pokemons: PokemonDto[];
}

export class PokemonDto {
  @IsNumber()
  id: number;
  @IsString()
  name: string;
  @IsString()
  imageUrl: string;
  @IsArray()
  @IsString()
  types: Types[];
}
