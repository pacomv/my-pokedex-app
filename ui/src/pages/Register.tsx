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
import { Link } from "react-router-dom";
import { PokedexAppLogo } from "../components/PokedexAppLogo";
import RegisterForm from "../components/RegisterForm";

const Register: React.FC = () => {
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
          <RegisterForm />
        </AuthContainer>
      </IonContent>
    </IonPage>
  );
};

export default Register;
