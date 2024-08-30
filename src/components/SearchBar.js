// src/components/SearchBar.js
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={styles.container}>
      {isOpen && (
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => onSearchChange(e.target.value)} 
          placeholder="Search..."
          style={styles.input}
        />
      )}
      <div 
        onClick={handleSearchClick}
        style={styles.searchIcon}
      >
        <FaSearch />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    padding: '10px',
    border: '1px solid #ebebeb',
    borderRadius: '4px',
    width: '200px',
    fontFamily: "'Neutra Text Alt', sans-serif",
    marginRight: '10px',
  },
  searchIcon: {
    cursor: 'pointer',
    color: '#888',
  },
};

export default SearchBar;
