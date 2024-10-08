import { ReactNode, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Redirect } from "react-router-dom";

export const Guest = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useContext(AuthContext);
  if (isAuthenticated) return <Redirect to="/" />;
  return <>{children}</>;
};
