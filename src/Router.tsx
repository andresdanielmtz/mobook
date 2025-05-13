import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './views/Home';
import NavBar from './components/NavBar';

const AppRouter: React.FC = () => {
    return (
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element = {<div> Search </div>}></Route>
                    <Route path="/dashboard" element = {<div> Dashboard </div>}></Route>
                    <Route path="/profile" element = {<div> Profile </div>}></Route>
                </Routes>
            </Router>
        
    );
};

export default AppRouter;