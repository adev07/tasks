// components/Pagination.js
import React from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css';

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <div className="pagination-container">
      <ReactPaginate
        previousLabel={<span className="arrow-icon">←</span>}
        nextLabel={<span className="arrow-icon">→</span>}
        breakLabel="..."
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={({ selected }) => onPageChange(selected + 1)}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
        disabledClassName="disabled"
      />
    </div>
  );
};

export default Pagination;
