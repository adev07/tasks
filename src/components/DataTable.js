// src/components/DataTable.js
import React from 'react';

const DataTable = ({ columns, rows, loading }) => {
  if (loading) return <div>Loading...</div>;

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.field} style={styles.th}>{col.headerName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? (
          rows.map((row, index) => (
            <tr key={index}>
              {columns.map(col => (
                <td key={col.field} style={styles.td}>{row[col.field]}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} style={styles.td}>No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #ebebeb',
  },
  th: {
    border: '1px solid #ebebeb',
    backgroundColor: '#c0e3e5',
    padding: '8px',
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: "'Neutra Text Alt', sans-serif",
  },
  td: {
    border: '1px solid #ebebeb',
    padding: '8px',
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: "'Neutra Text Alt', sans-serif",
  },
};

export default DataTable;
