import React from "react";

const SearchBar = ({ value, onChange, placeholder = "🔍 Search your recipes…" }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            style={{
                width: "280px",
                padding: "12px 18px",
                borderRadius: "20px",
                border: "1px solid #ccc",
                backgroundColor: "#fff",
                outline: "none",
                fontSize: "15px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                transition: "border-color 0.3s",
            }}
        />
    );
};

export default SearchBar;
