import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomeView } from "./views/Home";
import NavBar from "./components/NavBar";
import { ProfileView } from "./views/Profile";
import { SearchView } from "./views/Search";
import DetailsView from "./views/Details";

const AppRouter: React.FC = () => {
  return (
    <Router basename="/mobook">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/search" element={<SearchView />}></Route>
        <Route path="/dashboard" element={<div> Dashboard </div>}></Route>
        <Route path="/profile" element={<ProfileView />}></Route>
        <Route path="/books/:id" element={<DetailsView />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
