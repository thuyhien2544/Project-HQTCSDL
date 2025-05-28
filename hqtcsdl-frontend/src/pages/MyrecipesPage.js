import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Myrecipecard from "../components/Myrecipecard";
import Searchbar from "../components/Searchbar";
import RecipeFormPopup from "../components/RecipeFormPopup";
import RecipePopup from "../components/RecipePopup";

const MyRecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [activeRecipe, setActiveRecipe] = useState(null); // hiển thị chi tiết
    const [showForm, setShowForm] = useState(false); // form thêm mới
    const [selectedRecipe, setSelectedRecipe] = useState(null); // dữ liệu cần sửa
    const [isEditMode, setIsEditMode] = useState(false);        // flag sửa hay thêm

    const loadRecipes = async () => {
        const res = await fetch("http://localhost:5000/api/my-recipes");
        const data = await res.json();
        setRecipes(data);
    };

    useEffect(() => {
        loadRecipes();
    }, []);

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/my-recipes/${id}`, { method: "DELETE" });
        await loadRecipes();
    };

    const handleEdit = (recipe) => {
        setSelectedRecipe(recipe);
        setIsEditMode(true);
        setShowForm(true);
    };
    const handleSave = async (recipeData) => {
        const isEdit = isEditMode && selectedRecipe;

        const url = isEdit
            ? `http://localhost:5000/api/my-recipes/${selectedRecipe.id}`
            : "http://localhost:5000/api/my-recipes";

        const method = isEdit ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(recipeData),
            });

            if (!res.ok) {
                const resultText = await res.text();
                throw new Error("Lỗi khi thêm/sửa món: " + resultText);
            }

            await loadRecipes();  
            setShowForm(false);
            setSelectedRecipe(null);
            setIsEditMode(false);
        } catch (err) {
            console.error("Save error:", err);
            alert("Could not save the recipe.");
        }
    };
   
    return (
        <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#FFF7EE" }}>
            <Sidebar />

            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                {/* Top search + add button */}
                <div style={{ padding: "30px 40px 0", flexShrink: 0 }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                        }}
                    >
                        <Searchbar placeholder="Search your recipes..." />
                        <button
                            onClick={() => setShowForm(true)}
                            style={{
                                background: "orange",
                                border: "none",
                                borderRadius: "20px",
                                color: "white",
                                padding: "10px 40px",
                                fontWeight: "bold",
                                fontSize: "18px",
                                cursor: "pointer",
                            }}
                        >
                            + ADD
                        </button>
                    </div>
                </div>

                {/* Cards */}
                <div style={{ flex: 1, overflowY: "auto", padding: "0 40px 40px" }}>
                    {recipes.length === 0 ? (
                        <p style={{ textAlign: "center", marginTop: "60px", fontSize: "18px", color: "#888" }}>
                            📬 You haven't added any recipes yet
                        </p>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "30px",
                                marginTop: "20px",
                                justifyContent: "center",
                            }}
                        >
                            {recipes.map(recipe => (
                                <Myrecipecard
                                    key={recipe.id}
                                    recipe={recipe}
                                    onEdit={() => handleEdit(recipe)}
                                    onDelete={() => handleDelete(recipe.id)}
                                    onStartClick={() => {
                                        setActiveRecipe(recipe);
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Popup hiển thị chi tiết */}
                {activeRecipe && (
                    <RecipePopup
                        recipe={activeRecipe}
                        onClose={() => setActiveRecipe(null)}
                    />
                )}

                {/* Popup form thêm mới */}
                {showForm && (
                    <RecipeFormPopup
                        initialData={selectedRecipe}
                        isEdit={isEditMode}
                        onClose={() => {
                            setShowForm(false);
                            setSelectedRecipe(null);
                            setIsEditMode(false);
                        }}
                        onSave={handleSave}
                    />
                )}

            </div>
        </div>
    );
};

export default MyRecipesPage;
