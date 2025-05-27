import { AuthContext } from "@/context/AuthContext";
import { useContext, type JSX } from "react";
import { Navigate } from "react-router-dom";

// Component made to protect routes that require authentication

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
