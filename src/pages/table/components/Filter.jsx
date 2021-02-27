import React from "react";
import PropTypes from "prop-types";

const Filter = ({ value, onFilterChange }) => {
  return (
    <input
      type="text"
      className="form-control mb-4"
      placeholder="Find by name"
      onChange={onFilterChange}
      value={value}
      aria-label="table filter"
    />
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onFilterChange: PropTypes.func,
};

export default Filter;
