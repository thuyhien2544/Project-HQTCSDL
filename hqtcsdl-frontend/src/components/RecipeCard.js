import React from "react";

const difficultyColors = {
    Intermediate: "#FFA500", // cam
    Advance: "#FF4C4C",      // đỏ
    Beginner: "#3CCF4E",     // xanh lá
    Easy: "#3CCF4E",
    Medium: "#FFA500",
    Hard: "#FF4C4C",
};


const RecipeCard = ({ recipe, isActive, onStartClick }) => {
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
                paddingTop: "60px",
                paddingBottom: "20px",
                textAlign: "center",
                color: "#222",
                margin: "10px",
                boxSizing: "border-box",
                transition: "all 0.3s ease",
                transform: isActive ? "translateY(-15px)" : "translateY(0)",
                zIndex: isActive ? 10 : 1,
                cursor: "default",
            }}
        >
            {/* Ảnh tròn nổi lên trên */}
            <img
                src={recipe.img}
                alt={recipe.name}
                style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    position: "absolute",
                    top: "-60px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    boxShadow: isActive
                        ? "0 0 15px 5px rgba(255,140,0,0.7)"
                        : "0 2px 8px rgba(0,0,0,0.15)",
                    border: isActive ? "3px solid #FF8C00" : "none",
                    backgroundColor: "white",
                }}
            />

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

            {/* Thông tin dinh dưỡng */}
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
                    {/* Icon Veg/Non-veg đơn giản bằng emoji hoặc bạn có thể thay bằng icon svg */}
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
                    borderRadius: "12px",
                    padding: "10px 25px",
                    fontWeight: "700",
                    cursor: "pointer",
                    width: "100%",
                    boxShadow: isActive ? "0 4px 8px rgba(255, 140, 0, 0.4)" : "none",
                    transition: "all 0.3s ease",
                }}
            >
                Start cooking
            </button>
        </div>
    );
};

export default RecipeCard;
