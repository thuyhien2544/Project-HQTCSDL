import React from 'react';

const Header = () => {
    return (
        <header
            style={{
                maxWidth: '1000px',          
                margin: '0 auto',             
                padding: '28px 32px',
                backgroundColor: '#ff8c00',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                borderRadius: '20px',
                fontFamily: 'Segoe UI, Tahoma, sans-serif',
                fontWeight: '700',
                fontSize: '30px',
                color: '#fff',
                userSelect: 'none',
                textAlign: 'center',    
            }}
        >
            Welcome to Meal Planner
        </header>
    );
};

export default Header;
