import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ label, options = [], selectedValue, onChange, isOpen, onToggle, type }) => {
  // Handling birthDate filter separately
  if (type === 'birthDate') {
    return (
      <div style={styles.filterWrapper}>
        <label onClick={onToggle} style={styles.filterLabel}>
          {selectedValue || label}
          <span style={styles.arrow}>▼</span>
        </label>
        {isOpen && (
          <div style={styles.filterOptions}>
            <input
              type="date"
              value={selectedValue}
              onChange={(e) => onChange(e.target.value)}
              style={styles.filterSelect}
            />
          </div>
        )}
      </div>
    );
  }

  // Default dropdown behavior for other types
  const handleOptionClick = (option) => {
    onChange(option);  // Update the selected value
    onToggle();        // Close the dropdown
  };

  return (
    <div style={styles.filterWrapper}>
      <label onClick={onToggle} style={styles.filterLabel}>
        {selectedValue || label}
        <span style={styles.arrow}>▼</span>
      </label>
      {isOpen && (
        <div style={styles.customDropdown}>
          {options.map((option) => (
            <div
              key={option}
              style={styles.dropdownItem}
              onClick={() => handleOptionClick(option)} // Close on select
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Filter.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array,
  selectedValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  type: PropTypes.string, // Optional prop type for filter type
};

const styles = {
  filterWrapper: {
    position: 'relative',
    marginRight: '20px',
  },
  filterLabel: {
    cursor: 'pointer',
  },
  arrow: {
    marginLeft: '5px',
  },
  customDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  },
  dropdownItem: {
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '1px solid #ddd',
    transition: 'background-color 0.2s ease',
  },
  filterSelect: {
    width: '100%',
    padding: '5px',
  },
};

export default Filter;
