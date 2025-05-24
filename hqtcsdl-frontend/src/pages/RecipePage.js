import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import RecipeCard from "../components/RecipeCard";
import RecipePopup from "../components/RecipePopup";
import Searchbar from "../components/Searchbar";

const RecipePage = () => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchKeyword = queryParams.get("search")?.toLowerCase() || "";

    useEffect(() => {
        const fetchRecipes = () => {
            fetch("http://localhost:5000/api/recipes")
                .then((res) => {
                    if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);
                    return res.json();
                })
                .then((data) => {
                    setRecipes(data);
                })
                .catch((error) => {
                    setErrorMsg(error.message);
                });
        };

        fetchRecipes(); // Gọi 1 lần khi trang load

        const interval = setInterval(fetchRecipes, 5000); // Cập nhật mỗi 5s

        return () => clearInterval(interval); // Clear interval khi rời trang
    }, []);

    useEffect(() => {
        console.log("Search keyword:", searchKeyword);
        console.log("All recipes:", recipes);

        if (searchKeyword && recipes.length > 0) {
            const filtered = recipes.filter(recipe =>
                recipe.name.toLowerCase().includes(searchKeyword) ||
                (Array.isArray(recipe.ingredients) ? recipe.ingredients : recipe.ingredients.split(',')).some(ing =>
                    ing.toLowerCase().includes(searchKeyword)
                )
            );
            console.log("Filtered recipes:", filtered);
            setFilteredRecipes(filtered);
        } else {
            setFilteredRecipes(recipes);
        }
    }, [searchKeyword, recipes]);
    const openPopup = (id) => {
        setActiveId(id);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setActiveId(null);
    };

    if (errorMsg) return <p>Error: {errorMsg}</p>;

    const activeRecipe = recipes.find((r) => r.id === activeId) || null;

    return (
        <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            <Sidebar />
            <div
                style={{
                    flex: 1,
                    backgroundColor: "#FFF4E8",
                    borderTopRightRadius: "30px",
                    borderBottomRightRadius: "30px",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden"   // tránh scroll tràn lồng nhau
                }}
            >
                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",    // scroll chỉ ở vùng này
                        padding: "30px 40px"
                    }}
                >
                    <Header />

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "40px",
                            marginBottom: "30px",
                            paddingLeft: "20px", // đẩy chữ Recipe vào chút
                        }}
                    >
                        <h2 style={{ fontWeight: "700", fontSize: "28px", margin: 0 }}>
                            Recipes {searchKeyword && `with "${searchKeyword}"`}
                        </h2>

                        <div style={{ marginLeft: "auto", width: "300px", paddingRight: "30px" }}>
                            <Searchbar placeholder="Search recipes..." />
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            rowGap: "40px",
                            columnGap: "30px",
                            paddingBottom: "40px",
                            marginTop: "100px",   
                        }}
                    >

                        {filteredRecipes.length > 0 ? (
                            filteredRecipes.map((recipe) => (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                    isActive={recipe.id === activeId}
                                    onStartClick={() => openPopup(recipe.id)}
                                />
                            ))
                        ) : (
                            <p>No recipes found.</p>
                        )}
                    </div>
                </div>
                {showPopup && activeRecipe && (
                    <RecipePopup
                        recipe={activeRecipe}
                        onClose={closePopup}
                    />
                )}
            </div>
        </div>
    );
};

export default RecipePage;
