import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomeView } from "./views/Home";
import NavBar from "./components/NavBar";
import { ProfileView } from "./views/Profile";
import { SearchView } from "./views/Search";
import DetailsView from "./views/Details";
import LoginView from "./views/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUpView from "./views/Signup";

const AppRouter: React.FC = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomeView />
            </ProtectedRoute>
          }
        />
        <Route path="/search" element={<SearchView />}></Route>
        <Route
          path="/profile/:userId"
          element={
            <ProtectedRoute>
              <ProfileView />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/books/:id" element={<DetailsView />}></Route>
        <Route path="/login" element={<LoginView />}></Route>
        <Route path="/signup" element={<SignUpView />}></Route>

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
};

export default AppRouter;
