import { IonButton, IonInput, IonText, IonToast } from "@ionic/react";
import { css } from "../../styled-system/css";
import { Link } from "react-router-dom";
import { FormEvent, useContext, useState } from "react";
import { AuthContext, RegisterParams } from "../contexts/AuthContext";

const RegisterForm = () => {
  const { register } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isOpen = !!errorMessage;
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const entries = formData.entries();
    const params = Object.fromEntries(entries) as unknown as RegisterParams;
    try {
      await register(params);
    } catch (error) {
      setErrorMessage((error as any).response.data.message);
    }
  };
  return (
    <div>
      <IonText
        className={css({ mb: 2, fontSize: "md", fontWeight: "semibold" })}
      >
        Register
      </IonText>
      <form onSubmit={onSubmit}>
        <div
          className={css({
            spaceY: 4,
          })}
        >
          <IonInput
            fill="outline"
            autoFocus
            clearInput
            name="name"
            label="Full name"
          />
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
          New to Pokédex App? <Link to="/login">Login</Link>
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

export default RegisterForm;
