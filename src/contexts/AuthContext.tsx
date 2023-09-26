import { createContext, useContext } from "react";
import { User } from "../@types/user";

interface UserLogged extends User {
    token: string;
}

interface AuthContextProps {
    userLogged?: UserLogged;
}

const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: any) {

    // TODO continuar...
}

export const useAuth = () => useContext(AuthContext)