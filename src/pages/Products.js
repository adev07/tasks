import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';
import Header from '../components/Header';
import Breadcrumbs from '../components/Breadcrumbs';

const productColumns = [
  { field: 'id', headerName: 'ID' },
  { field: 'title', headerName: 'Name' },
  { field: 'price', headerName: 'Price' },
  { field: 'availabilityStatus', headerName: 'Availability' },
  { field: 'category', headerName: 'Category' },
  { field: 'brand', headerName: 'Brand' },
  { field: 'rating', headerName: 'Rating' },
  { field: 'warrantyInformation', headerName: 'Waranty' },
  { field: 'discountPercentage', headerName: 'Discount' },
  {field: 'shippingInformation', headerName: 'Delivery Information'},
  {field: 'returnPolicy', headerName: 'Return Policy'},
  {field: 'stock', headerName: 'Stock'},
  
 
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [filterDropdown, setFilterDropdown] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]); // New state for brands

  const getCategoryOptions = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products/categories');
      setCategoryOptions(response.data);

    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  useEffect(() => {
    getCategoryOptions();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://dummyjson.com/products', {
        params: {
          limit: pageSize,
          skip: (currentPage - 1) * pageSize,
        }
      });

      const products = response.data.products;

      // Extract unique brands from products
      const uniqueBrands = [...new Set(products.map(product => product.brand))];
      setBrandOptions(uniqueBrands);

      setProducts(products);
      setFilteredProducts(products);
      setTotalProducts(response.data.total);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredUsers = async (pageSize, currentPage) => {
    setLoading(true);
    let params = {
      limit: pageSize,
      skip: (currentPage - 1) * pageSize,
      q: searchQuery,
    };

    // if(selectedBrand){
    //   params.key = 'brand';
    //   params.value = selectedBrand;
    // }
    // else if(selectedCategory){
    //   params.key = 'category';
    //   params.value = selectedCategory;
    // }
    // else if(selectedPriceRange){
    //   params.key = 'price';
    //   params.value = selectedPriceRange;
    // }
    // else if(selectedBrand){
    //   params.key = 'brand';
    //   params.value = selectedBrand;
    // }
    try {
      const response = await axios.get('https://dummyjson.com/products/search', {
        params: params,
      });
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
      setTotalProducts(response.data.total);
    } catch (error) {
      console.error('Error fetching Products:', error);
    } finally {
      setLoading(false);
    }
  }

  const fetchProductsByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
      setTotalProducts(response.data.total);
    } catch (error) {
      console.error('Error fetching products by category:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(pageSize, currentPage);
  }, [searchQuery]);

  useEffect(() => {
    fetchFilteredUsers(pageSize, currentPage);
  }, [pageSize, currentPage, selectedPriceRange, selectedBrand, searchQuery]);

  useEffect(() => {
    fetchProductsByCategory(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [])

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'category':
        setSelectedCategory(value);
        setSelectedPriceRange('');
        setSelectedBrand('');
        break;
      case 'brand':
        setSelectedBrand(value);
        setSelectedCategory('');
        setSelectedPriceRange('');
        break;
      default:
        setSearchQuery(value);
        setSelectedCategory('');
        break;
    }
    setCurrentPage(1);
  };

  const handleDropdownToggle = (filterType) => {
    setFilterDropdown(prev => prev === filterType ? null : filterType);
  };

  const totalPages = Math.ceil(totalProducts / pageSize);

  const filters = [
    {
      label: 'Category',
      options: categoryOptions.map(category => category.slug),
      selectedValue: selectedCategory,
      type: 'category'
    },
    {
      label: 'Price Range',
      options: ['0-50', '50-100'],
      selectedValue: selectedPriceRange,
      type: 'priceRange'
    },
    {
      label: 'Brand',
      options: brandOptions, // Use dynamic brand options here
      selectedValue: selectedBrand,
      type: 'brand'
    }
  ];

  return (
    <div style={styles.container}>
      <Breadcrumbs
        items={[
          { label: 'Home', link: '/' },
          { label: 'Products', link: '/products' }
        ]}
      />
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        filters={filters}
        onFilterChange={handleFilterChange}
        onFilterToggle={handleDropdownToggle}
        filterDropdown={filterDropdown}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
      />
      <DataTable
        columns={productColumns}
        rows={filteredProducts}
        loading={loading}
      />
      <Pagination
        pageCount={totalPages}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: "'Neutra Text Alt', sans-serif",
  },
};

export default Products;
