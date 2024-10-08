import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import PokemonContainer from "../components/PokemonContainer";
import { css } from "../../styled-system/css";
import { PokedexAppLogo } from "../components/PokedexAppLogo";

const Home: React.FC = () => {
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
        <PokemonContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
