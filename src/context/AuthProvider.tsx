import { useCallback, useEffect, useState } from "react";
import type { User } from "../types/user";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Inicialmente true para comprobar la sesión

  // Efecto para comprobar si hay un token guardado en localStorage al cargar la app
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const initSession = async () => {
      if (storedToken) {
        setToken(storedToken);
        setIsLoggedIn(true);
        try {
          const userData = await fetchUserProfile(storedToken);
          setUser(userData);
        } catch (err) {
          console.error("Error al obtener el perfil:", err);
          logout(); // En caso de fallo, cerramos sesión
        }
      }
      setIsLoading(false);
    };

    initSession();
  },     [] );


  const login = useCallback(
    async (usernameParam: string, passwordParam: string): Promise<boolean> => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://fakestoreapi.com/auth/login",
          { username: usernameParam, password: passwordParam }
        );
        const fetchedToken = response.data.token;
        setToken(fetchedToken);
        localStorage.setItem("authToken", fetchedToken);
        setIsLoggedIn(true);

        const userData = await fetchUserProfile(fetchedToken);
        setUser( userData);

        return true;
      } catch (error) {
        console.error("Login failed:", error);
        setToken(null);
        setIsLoggedIn(false);
        setUser(null);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const register = useCallback(
    async (
      usernameParam: string,
      emailParam: string,
      passwordParam: string
    ): Promise<boolean> => {
      setIsLoading(true);
      try {
        await axios.post("https://fakestoreapi.com/users", {
          username: usernameParam,
          email: emailParam,
          password: passwordParam,
        });
        return true;
      } catch (error) {
        console.error("Registration failed:", error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  const fetchUserProfile = async (token: string): Promise<User> => {
    const response = await axios.get("https://fakestoreapi.com/users/1", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const value = {
    user,
    token,
    isLoggedIn,
    isLoading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
