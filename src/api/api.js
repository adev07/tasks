import axios from 'axios';

const API_URL = 'https://dummyjson.com';

export const fetchUsers = (pageSize, searchText) => {
  return axios.get(`${API_URL}/users`, { params: { limit: pageSize, q: searchText } });
};

export const fetchProducts = (pageSize, searchText) => {
  return axios.get(`${API_URL}/products`, { params: { limit: pageSize, q: searchText } });
};
