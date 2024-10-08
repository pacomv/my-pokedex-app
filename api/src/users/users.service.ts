import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { PaginatedData } from 'src/pokemons/pokemon.entity';
import { CreateUserDto, GetUserDto } from './dto/user.dto';
import { v4 } from 'uuid';
import { PokemonDto } from 'src/pokemons/dto/pokemons.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      username: 'john',
      password: 'changeme',
      favoritePokemons: [],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async create(user: CreateUserDto): Promise<GetUserDto> {
    const newUserDto: GetUserDto = {
      id: v4(),
      name: user.name,
      username: user?.username,
    };
    const newUser: User = {
      ...newUserDto,
      password: user?.password,
      favoritePokemons: [],
    };
    this.users.push(newUser);
    return newUserDto;
  }

  async getFavoritePokemons(params: {
    username: string;
    page?: number;
    size?: number;
  }) {
    const { username, page = 0, size = -1 } = params ?? {};
    const user = await this.findOne(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const count = user?.favoritePokemons?.length ?? 0;

    const start = size < 0 ? 0 : page * size;
    const end = size < 0 ? 100000 : start + size + 1;
    const pokemons = user.favoritePokemons ?? [];
    const data = pokemons.sort((a, b) => a.id - b.id).slice(start, end);
    const totalPages =
      size <= 0 ? 1 : data?.length > 0 ? Math.ceil(data?.length / size) : 0;
    const paginatedPokemons: PaginatedData<PokemonDto> = {
      count,
      data,
      page,
      size,
      totalPages,
    };
    return paginatedPokemons;
  }

  async addFavoritePokemons(params: {
    username: string;
    pokemons: PokemonDto[];
  }) {
    const { username, pokemons } = params ?? {};
    const user = await this.findOne(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const favoritePokemonIds = new Set(user.favoritePokemons.map((p) => p.id));
    const newFavoritePokemons = pokemons?.filter(
      (pokemon) => !favoritePokemonIds.has(pokemon.id),
    );
    if (newFavoritePokemons.length > 0) {
      const favoritePokemons = [
        ...user.favoritePokemons,
        ...newFavoritePokemons,
      ];
      const updatedUser = {
        ...user,
        favoritePokemons,
      };
      this.users = this.users.map((user) =>
        user.username === username ? updatedUser : user,
      );
    }
  }

  async removeFavoritePokemons(params: {
    username: string;
    pokemonIds: number[];
  }) {
    const { username, pokemonIds } = params ?? {};
    const user = await this.findOne(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const favoritePokemons = user.favoritePokemons;

    const newFavoritePokemons = favoritePokemons.filter(
      (pokemon) => !pokemonIds.some((id) => id === pokemon.id),
    );
    if (newFavoritePokemons.length > 0) {
      const updatedUser = {
        ...user,
        favoritePokemons: newFavoritePokemons,
      };
      this.users = this.users.map((user) =>
        user.username === username ? updatedUser : user,
      );
    }
  }
}
