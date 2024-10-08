import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonText,
} from "@ionic/react";
import { css } from "../../styled-system/css";
import { Pokemon, Types } from "../models/Pokemon";
import { useContext } from "react";
import { PokemonsContext } from "../contexts/PokemonsContext";
import { starOutline, star } from "ionicons/icons";
import { AuthContext } from "../contexts/AuthContext";

import { icons } from "../icons/icons";

import "./../index.css";

export const PokemonCard = ({ pokemon: pokemonData }: { pokemon: Pokemon }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { isFavoritePokemon, toggleFavoritePokemon } =
    useContext(PokemonsContext);

  const pokemonIcons = pokemonData?.types;
  const renderIcons = (type: Types) => (
    <div title={type} className={css({ width: "18px", height: "18px" })}>
      {icons?.[type]}
    </div>
  );

  return (
    <IonCard
      className={css({
        height: "200px",
        padding: 5,
      })}
    >
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        })}
      >
        <IonText className={css({ flex: 1 })}>#{pokemonData.id}</IonText>
        {isAuthenticated && (
          <IonButton
            fill="clear"
            size="small"
            shape="round"
            color="warning"
            onClick={() => {
              toggleFavoritePokemon(pokemonData);
            }}
          >
            {isFavoritePokemon(pokemonData.id) ? (
              <IonIcon icon={star} />
            ) : (
              <IonIcon icon={starOutline} />
            )}
          </IonButton>
        )}
      </div>
      <img
        className={css({
          height: "96px",
          width: "96px",
          margin: "auto",
          filter: "drop-shadow(0 0 3px rgba(0, 0, 0, 0.7))",
        })}
        title={pokemonData.name}
        alt={pokemonData.name}
        src={
          pokemonData?.imageUrl ||
          "https://via.placeholder.com/150?text=No+image"
        }
      />

      <IonCardHeader>
        <IonCardTitle
          className={css({
            textTransform: "capitalize",
            textAlign: "center",
          })}
        >
          {pokemonData.name}
        </IonCardTitle>

        <IonCardSubtitle>
          <div
            className={css({
              display: "flex",
              width: "100%",
              gap: 1,
            })}
          >
            {pokemonIcons.map(renderIcons)}
          </div>
        </IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
};
