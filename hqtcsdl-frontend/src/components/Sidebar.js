import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Xác định active dựa vào đường dẫn
    let active = null;
    if (location.pathname === '/recipes') {
        active = 'recipes';
    } else if (location.pathname === '/' || location.pathname === '/home') {
        active = 'home';
    } else if (location.pathname === '/my-recipes') {
        active = 'my-recipes';
    }
      
    

    const handleClick = (name, path) => {
        navigate(path);
    };

    const getWrapperStyle = (name) => ({
        padding: '5px',
        borderRadius: '50%',
        marginBottom: '25px',
        cursor: 'pointer',
        border: active === name ? '3px solid orange' : '3px solid transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '38px',
        height: '38px',
    });

    return (
        <div style={{
            width: '80px',
            height: '100vh',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '20px',
            boxShadow: '2px 0 5px rgba(0,0,0,0.05)'
        }}>
            {/* Logo (không có vòng tròn active, không click được) */}
            <div style={{ marginBottom: '40px' }} title="Logo">
                <img
                    src="/images/logo-icon.png"
                    alt="Logo"
                    style={{ width: '30px', height: '30px' }}
                />
            </div>

            {/* Home (có vòng tròn active, click được) */}
            <div
                style={getWrapperStyle('home')}
                onClick={() => handleClick('home', '/')}
                title="Home"
            >
                <img
                    src="/images/home-icon.png"
                    alt="Home"
                    style={{ width: '25px', height: '25px' }}
                />
            </div>

            {/* Recipe (có vòng tròn active, click được) */}
            <div
                style={getWrapperStyle('recipes')}
                onClick={() => handleClick('recipes', '/recipes')}
                title="Recipe"
            >
                <img
                    src="/images/recipe-icon.png"
                    alt="Recipe"
                    style={{ width: '25px', height: '25px' }}
                />
            </div>
            {/* My Recipes (có vòng tròn active, click được) */}
            <div
                style={getWrapperStyle('my-recipes')}
                onClick={() => handleClick('my-recipes', '/my-recipes')}
                title="My Recipes"
            >
                <img
                    src="/images/myrecipes-icon.png" 
                    alt="My Recipes"
                    style={{ width: '25px', height: '25px' }}
                />
            </div>
        
        </div>
    );
};

export default Sidebar;
