import React from "react";
import PropTypes from "prop-types";
import TableItem from "./TableItem";

const Table = ({ data = [{}], onSortClick }) => {
  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>№</th>
            <th>
              <span aria-label="name" role="button" onClick={onSortClick}>
                Name
              </span>
            </th>
            <th>
              <span aria-label="surname" role="button" onClick={onSortClick}>
                Surname
              </span>
            </th>
            <th>
              <span aria-label="sex" role="button" onClick={onSortClick}>
                Sex
              </span>
            </th>
            <th>
              <span aria-label="age" role="button" onClick={onSortClick}>
                Age
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((personObj, index) => (
            <TableItem
              number={index + 1}
              name={personObj.name}
              surname={personObj.surname}
              sex={personObj.sex}
              age={personObj.age}
              key={`TableRow${index}`}
            />
          ))}
        </tbody>
      </table>
      {!data.length && <div className="text-center">There's no match</div>}
    </>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  onSortClick: PropTypes.func,
};

export default Table;
