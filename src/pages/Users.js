// pages/Users.js
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
  const [totalUsers, setTotalUsers] = useState(0); // State to track total number of users

  // Fetch data whenever the page size or current page changes
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
      setTotalUsers(response.data.total || 0); // Update totalUsers based on API response
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

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
      setTotalUsers(response.data.total || 0); // Update totalUsers based on API response
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedGender || birthDateRange || emailQuery || nameQuery) {
      fetchFilteredUsers(pageSize, currentPage);
    }
  }, [
    pageSize,
    currentPage,
    selectedGender,
    birthDateRange,
    emailQuery,
    nameQuery,
    pageSize,
    currentPage,
  ]);

  // useEffect(() => {
  //   fetchUsers(pageSize, currentPage);
  // }, [pageSize, currentPage]);

  // useEffect(() => {
  //   let currentPageData = users;

  //   if (searchQuery) {
  //     currentPageData = currentPageData.filter(user =>
  //       `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //   }

  //   if (emailQuery) {
  //     currentPageData = currentPageData.filter(user =>
  //       user.email.toLowerCase().includes(emailQuery.toLowerCase())
  //     );
  //   }

  //   if (selectedGender) {
  //     currentPageData = currentPageData.filter(user => user.gender === selectedGender);
  //   }

  //   if (birthDateRange.start && birthDateRange.end) {
  //     const startDate = new Date(birthDateRange.start);
  //     const endDate = new Date(birthDateRange.end);
  //     currentPageData = currentPageData.filter(user => {
  //       const userBirthDate = new Date(user.birthDate);
  //       return userBirthDate >= startDate && userBirthDate <= endDate;
  //     });
  //   }

  //   setFilteredUsers(currentPageData);
  // }, [searchQuery, emailQuery, users, selectedGender, birthDateRange]);

  useEffect(() => {
    fetchUsers(pageSize, currentPage);
  }, [searchQuery]);

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1); // Reset to the first page when the page size changes
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setNameQuery("");
    setEmailQuery("");
    setBirthDateRange("");
    setSelectedGender("");
  };

  const handleEmailChange = (query) => {
    setEmailQuery(query);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case "name":
        setNameQuery(value);
        setEmailQuery("");
        setBirthDateRange("");
        setSelectedGender("");
        setSearchQuery("");
        break;
      case "email":
        setEmailQuery(value);
        setNameQuery("");
        setBirthDateRange("");
        setSelectedGender("");
        setSearchQuery("");
        break;
      case "birthDate":
        setBirthDateRange(value);
        setNameQuery("");
        setEmailQuery("");
        setSelectedGender("");
        setSearchQuery("");
        break;
      case "gender":
        setSelectedGender(value);
        setNameQuery("");
        setEmailQuery("");
        setBirthDateRange("");
        setSearchQuery("");
        break;
      default:
        break;
    }
    setCurrentPage(1);
  };

  const handleDropdownToggle = (filterType) => {
    setFilterDropdown((prev) => (prev === filterType ? null : filterType));
  };

  // Calculate total pages based on the total number of users and the page size
  const totalPages = Math.ceil(totalUsers / pageSize);

  const filters = useMemo(() => {
    return [
      {
        label: "Name",
        type: "name",
        value: nameQuery,
        onChange: (name, value) => {
          handleFilterChange(name, value);
        },
        options: users.map((user) => `${user.firstName}`),
        placeholder: "Search by name",
      },
      {
        label: "Email",
        type: "email",
        placeholder: "Search by email",
        key: "email",
        options: users.map((user) => `${user.email}`),
        value: emailQuery,
        onChange: (name, value) => {
          handleFilterChange(name, value);
        },
      },
      {
        label: "Birth Date",
        type: "birthDate",
        value: birthDateRange,
        onChange: (name, value) => {
          handleFilterChange(name, value);
        },
      },
      {
        label: "Gender",
        options: ["male", "female"],
        selectedValue: selectedGender,
        onChange: (name, value) => {
          handleFilterChange(name, value);
        },
        type: "gender",
      },
    ];
  }, [nameQuery, emailQuery, birthDateRange, selectedGender]);

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
