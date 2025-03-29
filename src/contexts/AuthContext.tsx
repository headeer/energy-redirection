import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { User, AuthStatus } from "../types/types";
import { formatUser } from "../firebase/auth";

interface AuthContextType {
  user: User | null;
  status: AuthStatus;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  status: "idle",
  error: null,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setStatus("loading");

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: any) => {
        if (firebaseUser) {
          const formattedUser = formatUser(firebaseUser);
          setUser(formattedUser);
          setStatus("authenticated");
        } else {
          setUser(null);
          setStatus("unauthenticated");
        }
        setError(null);
      },
      (error: any) => {
        console.error("Auth state change error:", error);
        setStatus("unauthenticated");
        setError(error.message);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, status, error }}>
      {children}
    </AuthContext.Provider>
  );
};
