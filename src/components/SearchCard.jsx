import React from 'react';
import './SearchCard.css';

const SearchCard = ({staffId, setStaffId, onVerify, isLoading, error, isValid}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (staffId.trim() && isValid) {
            onVerify();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setStaffId(value);
    };

    return (
        <div className="form-section">
            <label>Staff ID:</label>
            <input
                type="text"
                value={staffId}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="Enter Staff"
                disabled={isLoading}
                maxLength={7}
            />
            <button
                onClick={handleSubmit}
                disabled={isLoading || !isValid}
            >
                {isLoading ? 'Checking...' : 'Check My Name'}
            </button>
        </div>
    );
};

export default SearchCard;
