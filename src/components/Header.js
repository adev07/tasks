// components/Header.js
import React from 'react';
import SearchBar from './SearchBar';
import Filter from './Filters';

const Header = ({
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
  onFilterToggle,
  filterDropdown,
  pageSize,
  onPageSizeChange
}) => {
  return (
    <div style={styles.headerContainer}>
      <div style={styles.headerItems}>
        <div style={styles.leftSection}>
          <div style={styles.pageSizeWrapper}>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              style={styles.pageSizeSelect}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span style={styles.entriesText}>Entries</span>
          </div>
          <div style={styles.filtersContainer}>
            <div style={styles.separator}></div> {/* Separator before SearchBar */}
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              placeholder="Search..."
            />
            <div style={styles.separator}></div> {/* Separator after SearchBar */}
            {filters.map((filter) => (
              <Filter
                key={filter.label}
                type={filter.type}
                label={filter.label}
                options={filter.options}
                selectedValue={filter.selectedValue}
                onChange={(value) => onFilterChange(filter.type, value)}
                isOpen={filterDropdown === filter.type}
                onToggle={() => onFilterToggle(filter.type)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  headerContainer: {
    marginBottom: '20px',
  },
  headerItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
  },
  pageSizeWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '20px',
  },
  pageSizeSelect: {
    padding: '5px',
    marginRight: '10px',
    border: 'none',
  },
  entriesText: {
    marginLeft: '5px',
  },
  filtersContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  separator: {
    width: '1px',
    height: '24px', // Adjust based on the height of your header
    backgroundColor: '#ccc',
    margin: '0 10px', // Adjust spacing as needed
  },
};

export default Header;
