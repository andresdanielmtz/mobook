import { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, type User, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { getUserDisplayNames } from "@/services/authenticationServices";

interface AuthContextType {
  user: User | null;
  displayName: string | null;
  loading: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: () => {},
  displayName: null,
  loading: true, // True until auth state is determined
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (user) {
        const userDisplayName = await getUserDisplayNames(user.uid);
        setDisplayName(userDisplayName);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  function logout() {
    signOut(auth);
  }
  return (
    <AuthContext.Provider value={{ user, logout, loading, displayName }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
