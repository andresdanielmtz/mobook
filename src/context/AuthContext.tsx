import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "../config/firebase";
import { getUserDisplayNames } from "@/services/authServices";

interface AuthContextType {
  user: User | null;
  displayName: string | null;
  loading: boolean;
  logout: () => void;
}

// This context provides authentication state and methods to the application
// Gives us the ability to access the current user, their display name, and a logout function

// eslint-disable-next-line react-refresh/only-export-components
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

// Custom hook to use the AuthContext in components

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
