import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ label, options = [], selectedValue, onChange, isOpen, onToggle, type }) => {
  if(type === 'birthDate'){
    return (
      <div style={styles.filterWrapper}>
        <label onClick={onToggle} style={styles.filterLabel}>
          {selectedValue || label}
          <span style={styles.arrow}>▼</span>
        </label>
        {isOpen && (
          <div style={styles.filterOptions}>
            <input type="date" value={selectedValue} onChange={(e) => {
              console.log(e.target.value)
              onChange(e.target.value)
            }} style={styles.filterSelect} />
          </div>
        )}
      </div>
    )
  }
  return (
    <div style={styles.filterWrapper}>
      <label onClick={onToggle} style={styles.filterLabel}>
        {selectedValue || label}
        <span style={styles.arrow}>▼</span>
      </label>
      {isOpen && (
        <div style={styles.filterOptions}>
          <select
            value={selectedValue}
            onChange={(e) => onChange(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
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
  filterOptions: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  },
  filterSelect: {
    width: '100%',
    padding: '5px',
  },
};

export default Filter;
