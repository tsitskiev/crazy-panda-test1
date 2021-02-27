import React from 'react';
import PropTypes from 'prop-types';

const TableItem = ({ number, name, surname, sex, age }) => {
  return (
    <tr>
      <td>{number}</td>
      <td>{name}</td>
      <td>{surname}</td>
      <td>{sex}</td>
      <td>{age}</td>
    </tr>
  );
};

TableItem.propTypes = {
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};

export default TableItem;
