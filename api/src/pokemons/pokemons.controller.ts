import { Controller, Get, Query } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { GetPokemonsDto } from './dto/pokemons.dto';

@Controller('pokemons')
export class PokemonsController {
  constructor(private PokemonsService: PokemonsService) {}
  @Public()
  @Get()
  getAllPokemons(@Query() { page, size }: GetPokemonsDto) {
    return this.PokemonsService.getAllPokemons({ page, size });
  }
}
