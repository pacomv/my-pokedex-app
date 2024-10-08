import { IsArray, IsNumber } from 'class-validator';

export class DeletePokemonDto {
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[];
}
