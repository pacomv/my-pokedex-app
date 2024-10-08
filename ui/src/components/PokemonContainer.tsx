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

const PokemonContainer: React.FC<ContainerProps> = () => {
  const { pokemons, isLoading, fetchNextPage } = useContext(PokemonsContext);

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
          {pokemons?.pages.map(({ page, data }) => (
            <React.Fragment key={page}>
              {data.map((pokemonData) => (
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
            </React.Fragment>
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

export default PokemonContainer;
