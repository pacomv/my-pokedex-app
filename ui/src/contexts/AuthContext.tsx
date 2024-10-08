import { createContext, ReactNode, useState } from "react";
import { User } from "../models/Users";
import apiClient from "../api/axios";

export enum AUTH_KEYS {
  ACCESS_TOKEN = "accessToken",
  USER_ID = "userId",
  USERNAME = "username",
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface RegisterParams {
  name: string;
  username: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  login: (parms: LoginParams) => Promise<void>;
  logout: () => Promise<void>;
  register: (params: RegisterParams) => Promise<void>;
}

export const AuthContext = createContext({} as AuthState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const accessToken = localStorage.getItem(AUTH_KEYS.ACCESS_TOKEN);
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);

  const login = async (params: LoginParams) => {
    const { accessToken, userId, username } = (
      await apiClient.post<AuthData>("/auth/login", params)
    ).data;
    setIsAuthenticated(true);
    localStorage.setItem(AUTH_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(AUTH_KEYS.USER_ID, userId);
    localStorage.setItem(AUTH_KEYS.USERNAME, username);
  };

  const register = async (params: RegisterParams) => {
    const { name, ...loginParams } = params;
    await apiClient.post<User>("/auth/register", params);
    await login(loginParams);
  };

  const logout = async () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(AUTH_KEYS.USER_ID);
    localStorage.removeItem(AUTH_KEYS.USERNAME);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
