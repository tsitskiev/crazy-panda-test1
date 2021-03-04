import React, { useState, useEffect } from 'react';
import { Table, Pagination, Filter } from './components';
import PropTypes from 'prop-types';

const TablePage = ({ data = [] }) => {
  const [filter, setFilter] = useState('');
  const [pageLimit, setPageLimit] = useState(20);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState({
    field: '',
    order: 'asc',
  });

  const makeSort = () => {
    const { order, field } = sort;
    const sorted = filteredData.sort((a, b) => {
      if (a[field] < b[field]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setFilteredData(sorted);
  };

  const onResetClick = () => {
    setSort({ field: '', order: 'asc' });
    setFilter('');
    setCurrentPage(1);
    setFilteredData(data);
  };

  const handleSortClick = (e) => {
    const fieldName = e.target.ariaLabel;
    setSort({
      field: fieldName,
      order: sort.field === fieldName && sort.order === 'asc' ? 'desc' : 'asc',
    });
    makeSort();
  };

  const filterHandler = (e) => {
    const value = e.target.value;
    const regeXp = new RegExp(value, 'i');
    const filtered = data.filter((obj) => Object.keys(obj).some((key) => regeXp.test(obj[key])));
    setFilter(value);
    setFilteredData(filtered);
  };

  const handlePageLimitSelect = (e) => {
    setPageLimit(parseInt(e.target.value));
  };

  const onPageChanged = (currentPage) => {
    setCurrentPage(currentPage);
  };

  useEffect(() => {
    const offset = (currentPage - 1) * pageLimit;
    const currentPageData = filteredData.slice(offset, offset + pageLimit);
    setCurrentPageData(currentPageData);
  }, [filteredData, currentPage, pageLimit, sort]);

  return (
    <>
      <h1 className="text-center">Welcome to the table</h1>
      <div className="d-flex flex-row mb-4">
        <Filter value={filter} onFilterChange={filterHandler} />
        <button onClick={onResetClick} type="button" className="btn btn-light">
          Reset
        </button>
      </div>
      <Table onSortClick={handleSortClick} data={currentPageData} sortBy={sort} />
      <Pagination
        totalRecords={filteredData.length}
        pageNeighbours={1}
        pageLimit={pageLimit}
        onSelect={handlePageLimitSelect}
        onPageChanged={onPageChanged}
        currentPage={currentPage}
      />
    </>
  );
};

TablePage.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default TablePage;
