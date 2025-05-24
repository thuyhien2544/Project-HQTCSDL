import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WelcomePage from "./pages/WelcomePage";
import RecipePage from "./pages/RecipePage";
import MyrecipesPage from "./pages/MyrecipesPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/recipes" element={<RecipePage />} />
                <Route path="/my-recipes" element={<MyrecipesPage />} />
            </Routes>
        </Router>
    );
}

export default App;
