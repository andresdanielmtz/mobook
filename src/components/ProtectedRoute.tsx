import { useAuth } from "@/context/AuthContext";
import { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "./ui/loading";

// Component made to protect routes that require authentication

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user, loading } = useAuth();
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
