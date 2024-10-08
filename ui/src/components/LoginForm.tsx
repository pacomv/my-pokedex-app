import { IonButton, IonInput, IonText, IonTitle, IonToast } from "@ionic/react";
import { css } from "../../styled-system/css";
import { Link } from "react-router-dom";
import { FormEvent, useContext, useState } from "react";
import { AuthContext, LoginParams } from "../contexts/AuthContext";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isOpen = !!errorMessage;
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const entries = formData.entries();
    const params = Object.fromEntries(entries);
    try {
      await login(params as unknown as LoginParams);
    } catch (error) {
      setErrorMessage((error as any).response.data.message);
    }
  };
  return (
    <div>
      <IonTitle
        className={css({ mb: 2, fontSize: "md", fontWeight: "semibold" })}
      >
        Login
      </IonTitle>
      <form onSubmit={onSubmit}>
        <div
          className={css({
            spaceY: 4,
          })}
        >
          <IonInput
            fill="outline"
            clearInput
            name="username"
            label="Username"
          />
          <IonInput
            fill="outline"
            type="password"
            name="password"
            label="Password"
          />
          <IonButton expand="block" color="primary" type="submit">
            Send
          </IonButton>
        </div>
      </form>
      <div
        className={css({
          borderTopWidth: 1,
          borderColor: "var(--ion-color-light-shade)",
          mt: 6,
          pt: 4,
        })}
      >
        <IonText>
          Do you have an account? <Link to="/register">Register</Link>
        </IonText>
      </div>
      <IonToast
        isOpen={isOpen}
        message={errorMessage ?? ""}
        onDidDismiss={() => setErrorMessage(null)}
        duration={5000}
      />
    </div>
  );
};

export default LoginForm;
