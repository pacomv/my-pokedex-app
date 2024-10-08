import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { DeletePokemonDto } from './dto/pokemon.dto';
import { AddPokemonsDto, GetPokemonsDto } from 'src/pokemons/dto/pokemons.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('favorites')
  getFavoritePokemons(@Request() req, @Query() { page, size }: GetPokemonsDto) {
    const username = req?.user?.username;
    return this.usersService.getFavoritePokemons({ username, page, size });
  }

  @HttpCode(HttpStatus.OK)
  @Post('favorites')
  addFavoritePokemons(@Request() req, @Body() { pokemons }: AddPokemonsDto) {
    const username = req?.user?.username;
    this.usersService.addFavoritePokemons({ username, pokemons });
  }

  @HttpCode(HttpStatus.OK)
  @Post('removeFavorites')
  removeFavoritePokemons(@Request() req, @Body() { ids }: DeletePokemonDto) {
    const username = req?.user?.username;
    this.usersService.removeFavoritePokemons({ username, pokemonIds: ids });
  }
}
