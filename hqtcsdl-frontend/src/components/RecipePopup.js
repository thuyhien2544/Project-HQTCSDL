import React from "react";

const RecipePopup = ({ recipe, onClose }) => {
    if (!recipe) return null;

    const ingredients = Array.isArray(recipe.ingredients)
        ? recipe.ingredients
        : recipe.ingredients.split(',').map(i => i.trim()).filter(Boolean);

    const instructions = Array.isArray(recipe.instructions)
        ? recipe.instructions
        : recipe.instructions.split('.').map(i => i.trim()).filter(Boolean);

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 999,
                padding: "20px"
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: "#fff",
                    borderRadius: "16px",
                    padding: "30px",
                    maxWidth: "700px",
                    width: "100%",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    fontFamily: "Segoe UI, sans-serif",
                    boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
                    position: "relative",
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>{recipe.name.toUpperCase()}</h2>

                <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                    {recipe.img && (
                        <img
                            src={recipe.img}
                            alt={recipe.name}
                            style={{
                                width: "200px",
                                height: "200px",
                                objectFit: "cover",
                                borderRadius: "12px",
                                flexShrink: 0
                            }}
                        />
                    )}
                    <div>
                        <h4 style={{ marginBottom: "10px" }}>🧂 Ingredients:</h4>
                        <ul style={{ paddingLeft: "20px", lineHeight: "1.6" }}>
                            {ingredients.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div style={{ marginTop: "30px" }}>
                    <h4 style={{ marginBottom: "10px" }}>👨‍🍳 Instructions:</h4>
                    <ol style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
                        {instructions.map((step, idx) => (
                            <li key={idx}>{step}</li>
                        ))}
                    </ol>
                </div>

                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        right: "25px",
                        top: "25px",
                        background: "#ff4d4d",
                        color: "white",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                >
                    ✖
                </button>
            </div>
        </div>
    );
};

export default RecipePopup;
