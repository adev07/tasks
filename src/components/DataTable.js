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
            <tr
              key={index}
              style={styles.tr}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ebebeb'} // Apply gray shade on hover
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''} // Remove gray shade on hover leave
            >
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
    fontWeight: '900',
    fontFamily: "'Neutra Text Alt', sans-serif",
    color: '#322625',
  },
  td: {
    border: '1px solid #ebebeb',
    padding: '8px',
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: "'Neutra Text Alt', sans-serif",
    color: '#322625',
  },
  tr: {
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default DataTable;
