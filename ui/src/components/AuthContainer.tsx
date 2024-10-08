import { IonText } from "@ionic/react";
import React, { ReactNode } from "react";
import { css } from "../../styled-system/css";

interface ContainerProps {
  children?: ReactNode;
}

const AuthContainer: React.FC<ContainerProps> = ({
  children,
}: ContainerProps) => {
  return (
    <div
      className={css({
        height: "100%",
        backgroundColor: "var(--ion-color-light-tint)",
        p: 4,
      })}
    >
      <div
        className={css({
          maxWidth: "400px",
          margin: "auto",
        })}
      >
        <IonText
          className={css({
            marginBottom: 1,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          })}
        >
          Welcome
        </IonText>
        <div
          className={css({
            borderWidth: 1,
            borderRadius: "md",
            borderColor: "var(--ion-color-light-shade)",
            padding: 4,
            background: "white",
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
