import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import SearchInput from "../components/SearchInput";
import { useAppNavigation } from "../utils/navigation";

const WelcomePage = () => {
    const [keyword, setKeyword] = useState("");
    const [activeSidebar, setActiveSidebar] = useState("Home");
    const { goToRecipePage, goToHomePage } = useAppNavigation();

    const handleSidebarSelect = (name) => {
        setActiveSidebar(name);
        if (name === "Recipe") goToRecipePage();
        else if (name === "Home") goToHomePage();
    };

    const handleStart = () => {
        // Nếu keyword rỗng hoặc chỉ toàn khoảng trắng
        if (!keyword.trim()) {
            goToRecipePage(""); // Điều hướng tới /recipes (hiển thị tất cả)
        } else {
            goToRecipePage(keyword);
        }
        setActiveSidebar("Recipe");
    };

    return (
        <div style={{ display: "flex", height: "100vh", position: "relative" }}>
            <Sidebar onSelect={handleSidebarSelect} activeItem={activeSidebar} />

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    padding: "40px",
                    backgroundColor: "#fff5e6",
                    gap: "40px",
                }}
            >
                {/* Cột bên trái: chữ lớn + input + nút */}
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            textAlign: "center",
                            fontSize: "3.8rem",
                            color: "#ff8c00",
                            fontWeight: "bold",
                            marginBottom: "20px",
                            lineHeight: 1.1,
                            marginTop: "-30px",
                        }}
                    >
                        <div>Cooking by your</div>
                        <div style={{ marginTop: "-20px" }}>own ways!</div>
                    </div>

                    <p
                        style={{
                            fontSize: "20px",
                            marginBottom: "30px",
                            color: "#555",
                            fontWeight: "bold",
                            width: "80%",
                            marginLeft: "60px",       
                            textAlign: "left",
                        }}
                    >
                        What we eat today?
                    </p>

                    <div style={{ marginBottom: "20px", width: "60%" }}>
                        <SearchInput
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Write something (ingredients, meals, ...)"
                        />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                        <button
                            onClick={handleStart}
                            style={{
                                padding: "20px 60px",
                                backgroundColor: keyword.trim() ? "#ff8c00" : "#ffa94d",
                                color: "#fff",
                                fontSize: "18px",
                                border: "none",
                                borderRadius: "60px",
                                cursor: "pointer",
                                boxShadow: "0 6px 16px rgba(255,140,0,0.7)",
                                width: "fit-content",
                            }}
                        >
                            Start
                        </button>
                    </div>
                </div>

                {/* Cột bên phải: ảnh */}
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <img
                        src="/images/pho.png"
                        alt="Dish"
                        style={{ width: "90%", borderRadius: "20px", objectFit: "cover" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
