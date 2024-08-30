import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import Breadcrumbs from "../components/Breadcrumbs";

const userColumns = [
  { field: "firstName", headerName: "First Name" },
  { field: "lastName", headerName: "Last Name" },
  { field: "maidenName", headerName: "Maiden Name" },
  { field: "age", headerName: "Age" },
  { field: "birthDate", headerName: "Birth Date" },
  { field: "gender", headerName: "Gender" },
  { field: "email", headerName: "Email" },
  { field: "username", headerName: "Username" },
  { field: "bloodGroup", headerName: "Blood Group" },
  { field: "eyeColor", headerName: "Eye Color" },
];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [nameQuery, setNameQuery] = useState("");
  const [emailQuery, setEmailQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [birthDateRange, setBirthDateRange] = useState("");
  const [filterDropdown, setFilterDropdown] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);

  // Fetch all users or filtered users based on the search query
  const fetchUsers = async (pageSize, currentPage) => {
    setLoading(true);
    try {
      const response = await axios.get("https://dummyjson.com/users/search", {
        params: {
          limit: pageSize,
          skip: (currentPage - 1) * pageSize,
          q: searchQuery,
        },
      });
      setUsers(response.data.users);
      setFilteredUsers(response.data.users);
      setTotalUsers(response.data.total || 0);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch filtered users based on filter criteria
  const fetchFilteredUsers = async (pageSize, currentPage) => {
    setLoading(true);
    let params = {
      limit: pageSize,
      skip: (currentPage - 1) * pageSize,
    };
    if (selectedGender) {
      params.key = "gender";
      params.value = selectedGender;
    } else if (nameQuery) {
      params.key = "name";
      params.value = nameQuery;
    } else if (emailQuery) {
      params.key = "email";
      params.value = emailQuery;
    } else if (birthDateRange) {
      params.key = "birthDate";
      params.value = birthDateRange;
    }
    try {
      const response = await axios.get("https://dummyjson.com/users/filter", {
        params: params,
      });
      setUsers(response.data.users);
      setFilteredUsers(response.data.users);
      setTotalUsers(response.data.total || 0);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to handle fetching users or filtered users when searchQuery or filter criteria change
  useEffect(() => {
    if (selectedGender || birthDateRange || emailQuery || nameQuery) {
      fetchFilteredUsers(pageSize, currentPage);
    } else {
      fetchUsers(pageSize, currentPage);
    }
  }, [pageSize, currentPage, searchQuery, selectedGender, birthDateRange, emailQuery, nameQuery]);

  // Handle changing the page size
  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  // Handle search input change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    resetFilters();
  };

  // Handle email input change
  const handleEmailChange = (query) => {
    setEmailQuery(query);
    resetFilters("email");
  };

  // Handle page change for pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle filter dropdown changes
  const handleFilterChange = (filterType, value) => {
    resetFilters(filterType);
    switch (filterType) {
      case "name":
        setNameQuery(value);
        break;
      case "email":
        setEmailQuery(value);
        break;
      case "birthDate":
        setBirthDateRange(value);
        break;
      case "gender":
        setSelectedGender(value);
        break;
      default:
        break;
    }
    setCurrentPage(1);
    setFilterDropdown(null); // Close dropdown after selection
  };

  const handleDropdownToggle = (filterType) => {
    setFilterDropdown((prev) => (prev === filterType ? null : filterType));
  };

  // Reset other filters when one is applied
  const resetFilters = (exclude = "") => {
    if (exclude !== "name") setNameQuery("");
    if (exclude !== "email") setEmailQuery("");
    if (exclude !== "birthDate") setBirthDateRange("");
    if (exclude !== "gender") setSelectedGender("");
    setSearchQuery("");
  };

  const totalPages = Math.ceil(totalUsers / pageSize);

  const filters = useMemo(() => {
    return [
      {
        label: "Name",
        type: "name",
        value: nameQuery,
        onChange: (name, value) => handleFilterChange(name, value),
        options: users.map((user) => user.firstName),
        placeholder: "Search by name",
      },
      {
        label: "Email",
        type: "email",
        placeholder: "Search by email",
        key: "email",
        options: users.map((user) => user.email),
        value: emailQuery,
        onChange: (name, value) => handleFilterChange(name, value),
      },
      {
        label: "Birth Date",
        type: "birthDate",
        value: birthDateRange,
        onChange: (name, value) => handleFilterChange(name, value),
      },
      {
        label: "Gender",
        options: ["male", "female"],
        selectedValue: selectedGender,
        onChange: (name, value) => handleFilterChange(name, value),
        type: "gender",
      },
    ];
  }, [nameQuery, emailQuery, birthDateRange, selectedGender, users]);

  return (
    <div style={styles.container}>
      <Breadcrumbs
        items={[
          { label: "Home", link: "/" },
          { label: "Users", link: "/users" },
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
      <DataTable columns={userColumns} rows={filteredUsers} loading={loading} />
      {totalPages > 1 && (
        <Pagination
          pageCount={totalPages}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
};

export default Users;
