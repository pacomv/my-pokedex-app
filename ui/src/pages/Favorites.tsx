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
        <FavoritePokemonContainer />
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
