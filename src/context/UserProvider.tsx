import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export type User = {
  name: string;
  email: string;
};

type UserContextType = {
  user: User | null;
  loggedIn: boolean;
  login: (newUser: User) => void;
  logout: () => void;
};

const defaultContext: UserContextType = {
  user: null,
  loggedIn: false,
  login: () => {},
  logout: () => {},
};

const UserContext = createContext<UserContextType>(defaultContext);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const loggedIn = !!user;

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (newUser: User) => setUser(newUser);

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, loggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
