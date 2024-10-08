import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { css } from "../../styled-system/css";
import AuthContainer from "../components/AuthContainer";
import "./../index.css";
import LoginForm from "../components/LoginForm";
import { PokedexAppLogo } from "../components/PokedexAppLogo";

const Login: React.FC = () => {
  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar
          className={css({
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          })}
        >
          <IonTitle className={css({ paddingLeft: 2 })}>
            <PokedexAppLogo />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <AuthContainer>
          <LoginForm />
        </AuthContainer>
      </IonContent>
    </IonPage>
  );
};

export default Login;
