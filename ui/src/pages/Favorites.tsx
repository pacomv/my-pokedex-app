import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { css } from "../../styled-system/css";
import { PokedexAppLogo } from "../components/PokedexAppLogo";
import FavoritePokemonContainer from "../components/FavoritePokemonContainer";

const Favorites: React.FC = () => {
  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle className={css({ paddingLeft: 2 })}>
            <PokedexAppLogo />
          </IonTitle>
          <IonButtons slot="end">
            <IonMenuButton color="light" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="light">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className={css({ paddingLeft: 5 })}>
              Pokédex App
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <FavoritePokemonContainer />
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
