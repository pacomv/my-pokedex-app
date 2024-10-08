import {
  IonCol,
  IonGrid,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRow,
  IonSpinner,
} from "@ionic/react";
import React, { useContext } from "react";
import { css } from "../../styled-system/css";
import { PokemonsContext } from "../contexts/PokemonsContext";
import { PokemonCard } from "./PokemonCard";

interface ContainerProps {}

const FavoritePokemonContainer: React.FC<ContainerProps> = () => {
  const { favoritePokemons, isLoading, fetchNextPage } =
    useContext(PokemonsContext);

  if (isLoading)
    return (
      <div
        className={css({
          display: "flex",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        })}
      >
        <IonSpinner />
      </div>
    );

  return (
    <>
      <IonGrid
        className={css({
          maxWidth: "900px",
          margin: "auto",
          p: 2,
        })}
      >
        <IonRow>
          {favoritePokemons.map((pokemonData) => (
            <IonCol
              key={pokemonData?.name}
              size="6"
              size-md="4"
              size-lg="4"
              className={css({ padding: 2.5 })}
            >
              <PokemonCard pokemon={pokemonData} />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
      <IonInfiniteScroll
        onIonInfinite={async (ev) => {
          await fetchNextPage();
          ev.target.complete();
        }}
      >
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </>
  );
};

export default FavoritePokemonContainer;
