import React, { useState, useEffect } from "react";

const RecipeFormPopup = ({ onSave, onClose, initialData = null, isEdit = false }) => {
    const [form, setForm] = useState({
        name: "",
        kcal: "",
        time: "",
        difficulty: "Easy",
        ingredients: "",
        instructions: "",
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                name: initialData.name || "",
                kcal: initialData.kcal || "",
                time: initialData.time || "",
                difficulty: initialData.difficulty || "Easy",
                ingredients: Array.isArray(initialData.ingredients)
                    ? initialData.ingredients.join("\n")
                    : initialData.ingredients || "",
                instructions: Array.isArray(initialData.instructions)
                    ? initialData.instructions.join("\n")
                    : initialData.instructions || "",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name: form.name.trim(),
            kcal: parseInt(form.kcal) || 0,
            time: parseInt(form.time) || 0,
            difficulty: form.difficulty,
            ingredients: form.ingredients.split('\n').map(i => i.trim()).filter(Boolean),
            instructions: form.instructions.split('\n').map(i => i.trim()).filter(Boolean),
        };
        console.log("Payload gửi API:", payload); 

        try {
            if (isEdit && initialData?.id) {
                await fetch(`http://localhost:5000/api/my-recipes/${initialData.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
            } else {
                await fetch("http://localhost:5000/api/my-recipes", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
            }

            onSave(payload);;
        } catch (err) {
            alert("Failed to save recipe.");
            console.error(err);
        }
    };

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: "rgba(0,0,0,0.4)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 999,
                fontFamily: "Segoe UI, sans-serif"
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: "white",
                    borderRadius: "20px",
                    padding: "35px 40px",
                    width: "500px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}
            >
                <h2 style={{ marginBottom: "24px", fontSize: "22px", fontWeight: 700, color: "#333" }}>
                    {isEdit ? "✏️ Edit Recipe" : <><span role="img" aria-label="plus">➕</span> Add New Recipe</>}
                </h2>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Dish name"
                        required
                        style={inputStyle}
                    />
                    <input
                        name="kcal"
                        value={form.kcal}
                        onChange={handleChange}
                        placeholder="Calories"
                        type="number"
                        required
                        style={inputStyle}
                    />
                    <input
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        placeholder="Preparation time (minutes)"
                        type="number"
                        required
                        style={inputStyle}
                    />
                    <select
                        name="difficulty"
                        value={form.difficulty}
                        onChange={handleChange}
                        style={{ ...inputStyle, padding: "10px", cursor: "pointer" }}
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                    <textarea
                        name="ingredients"
                        value={form.ingredients}
                        onChange={handleChange}
                        placeholder="Ingredients (one per line)"
                        rows={4}
                        style={textareaStyle}
                    />
                    <textarea
                        name="instructions"
                        value={form.instructions}
                        onChange={handleChange}
                        placeholder="Instructions (one step per line)"
                        rows={5}
                        style={textareaStyle}
                    />

                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                backgroundColor: "#ccc",
                                color: "#333",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "8px",
                                fontWeight: "600",
                                cursor: "pointer"
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{
                                backgroundColor: "#FF8C00",
                                color: "white",
                                border: "none",
                                padding: "10px 24px",
                                borderRadius: "8px",
                                fontWeight: "700",
                                cursor: "pointer",
                                boxShadow: "0 4px 8px rgba(255,140,0,0.4)"
                            }}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const inputStyle = {
    padding: "10px 14px",
    fontSize: "15px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none",
};

const textareaStyle = {
    ...inputStyle,
    fontFamily: "inherit",
    resize: "vertical",
};

export default RecipeFormPopup;
