import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  const fetchData = async (endpoint) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://dummyjson.com/${endpoint}`, {
        params: {
          ...filters,
          limit: pageSize,
          ...filters,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        loading,
        pageSize,
        setPageSize,
        searchTerm,
        setSearchTerm,
        filters,
        setFilters,
        fetchData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
