import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { PaginatedData, Pokemon } from "../models/Pokemon";
import apiClient from "../api/axios";
import { AuthContext } from "./AuthContext";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "@tanstack/react-query";

interface PokemonsState {
  pokemons: InfiniteData<PaginatedData<Pokemon>> | undefined;
  favoritePokemons: Pokemon[];
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<PaginatedData<Pokemon>>>
  >;
  toggleFavoritePokemon: (pokemonData: Pokemon) => Promise<void>;
  isFavoritePokemon: (id: number) => boolean;
}

export const PokemonsContext = createContext({} as PokemonsState);

export const PokemonsProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [favoritePokemons, setFavoritePokemons] = useState<Pokemon[]>([]);

  const getPreviousPageParam = (
    paginatedPokemonData: PaginatedData<Pokemon>
  ) => {
    if (!paginatedPokemonData.page) return null;
    return Number(paginatedPokemonData.page) - 1;
  };

  const getNextPageParam = (paginatedPokemonData: PaginatedData<Pokemon>) => {
    if (!paginatedPokemonData.page) return null;
    return Number(paginatedPokemonData.page) + 1;
  };

  const getPokemonList = async (params?: { page?: number; size?: number }) => {
    const { page = 0, size = 25 } = params ?? {};
    const resp = await apiClient.get<PaginatedData<Pokemon>>("/pokemons", {
      params: { page, size },
    });
    const paginatedPokemonData = resp?.data;
    return paginatedPokemonData;
  };

  const {
    data: pokemons,
    fetchNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: async ({ pageParam }) => {
      const pokemonList = await getPokemonList({ page: pageParam });
      return pokemonList;
    },
    initialPageParam: 0,
    getPreviousPageParam: getPreviousPageParam,
    getNextPageParam: getNextPageParam,
  });

  const toggleFavoritePokemon = async (pokemonData: Pokemon) => {
    const favoritePokemon = favoritePokemons.find(
      (pokemon) => pokemon.id === pokemonData.id
    );
    let newFavoritePokemons: Pokemon[] = favoritePokemons;
    if (!!favoritePokemon) {
      newFavoritePokemons = favoritePokemons.filter(
        (pokemon) => pokemon.id !== pokemonData.id
      );
      apiClient.post("/users/removeFavorites", { ids: [pokemonData.id] });
    } else {
      newFavoritePokemons = [...newFavoritePokemons, pokemonData];

      apiClient.post("/users/favorites", { pokemons: [pokemonData] });
    }

    setFavoritePokemons(newFavoritePokemons);
  };

  const isFavoritePokemon = (id: number) => {
    return favoritePokemons.some((pokemon) => pokemon.id === id);
  };

  useEffect(() => {
    if (isAuthenticated) {
      apiClient
        .get<PaginatedData<Pokemon>>("/users/favorites")
        .then((resp) => setFavoritePokemons(resp.data.data));
    }
  }, [isAuthenticated]);

  return (
    <PokemonsContext.Provider
      value={{
        isLoading,
        fetchNextPage,
        pokemons,
        favoritePokemons,
        toggleFavoritePokemon,
        isFavoritePokemon,
      }}
    >
      {children}
    </PokemonsContext.Provider>
  );
};
