import React from "react";

const difficultyColors = {
    Easy: "#3CCF4E",
    Medium: "#FFA500",
    Hard: "#FF4C4C",
};

const MyRecipeCard = ({ recipe, isActive, onStartClick, onEdit, onDelete }) => {
    return (
        <div
            style={{
                position: "relative",
                width: "210px",
                backgroundColor: "white",
                borderRadius: "20px",
                boxShadow: isActive
                    ? "0 10px 25px rgba(255,140,0,0.6)"
                    : "0 4px 12px rgba(0,0,0,0.1)",
                padding: "20px",
                paddingTop: "30px",
                textAlign: "center",
                color: "#222",
                margin: "10px",
                boxSizing: "border-box",
                transition: "all 0.3s ease",
                transform: isActive ? "translateY(-10px)" : "translateY(0)",
                zIndex: isActive ? 10 : 1,
                cursor: "default",
            }}
        >
            {/* Icon sửa/xoá góc phải */}
            <div style={{ position: "absolute", top: "10px", right: "12px", display: "flex", gap: "8px" }}>
                <span onClick={onEdit} style={{ cursor: "pointer", fontSize: "14px" }}>✏️</span>
                <span onClick={onDelete} style={{ cursor: "pointer", fontSize: "14px" }}>🗑️</span>
            </div>

            {/* Tên món ăn */}
            <h3 style={{ marginTop: 0, marginBottom: "8px", fontWeight: "700" }}>
                {recipe.name}
            </h3>

            {/* Nhãn độ khó */}
            <div
                style={{
                    display: "inline-block",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    backgroundColor: difficultyColors[recipe.difficulty] || "#999",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "600",
                    marginBottom: "15px",
                    userSelect: "none",
                }}
            >
                {recipe.difficulty}
            </div>

            {/* Dinh dưỡng */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginBottom: "20px",
                    color: "#555",
                    fontSize: "12px",
                }}
            >
                <div>
                    <div style={{ fontWeight: "700", fontSize: "16px" }}>{recipe.time}</div>
                    <div>Min</div>
                </div>
                <div>
                    <div style={{ fontWeight: "700", fontSize: "16px" }}>{recipe.kcal}</div>
                    <div>Kcal</div>
                </div>
                <div>
                    <div style={{ fontWeight: "700", fontSize: "16px" }}>
                        {recipe.veg ? "🥦" : "🍖"}
                    </div>
                    <div>Veg</div>
                </div>
            </div>

            {/* Nút Start cooking */}
            <button
                onClick={onStartClick}
                style={{
                    backgroundColor: isActive ? "#FF8C00" : "white",
                    color: isActive ? "white" : "#FF8C00",
                    border: `2px solid #FF8C00`,
                    borderRadius: "16px 16px 16px 16px", // chỉ bo 2 góc dưới
                    padding: "8px 0",
                    fontWeight: "700",
                    cursor: "pointer",
                    width: "calc(100% + 40px)",  // mở rộng thêm ra 2 bên
                    marginLeft: "-20px",         // đẩy nút sang trái
                    marginRight: "-20px",        // đẩy nút sang phải
                    boxShadow: isActive ? "0 4px 8px rgba(255, 140, 0, 0.4)" : "none",
                    transition: "all 0.3s ease",
                }}
            >
                Start cooking
            </button>

        </div>
    );
};

export default MyRecipeCard;
