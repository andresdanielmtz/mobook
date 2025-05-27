import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, type User, signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export const AuthContext = createContext<{
  user: User | null;
  logout: () => void;
}>({
  user: null,
  logout: () => {},
});
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  function logout() {
    signOut(auth);
  }
  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
