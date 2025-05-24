import React from 'react';

const SearchInput = ({ value, onChange }) => {
    return (
        <input
            type="text"
            placeholder="Search for a meal..."
            value={value}
            onChange={onChange}
            style={{
                padding: '15px 30px',
                width: '500px',
                borderRadius: '45px',
                border: '1px solid #ccc',
                fontSize: '20px',
                boxSizing: 'border-box',
                marginLeft: '50px',
            }}
        />
    );
};

export default SearchInput;
