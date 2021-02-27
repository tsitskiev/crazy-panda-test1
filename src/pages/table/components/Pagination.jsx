import React from "react";
import PropTypes from "prop-types";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";
const range = (from, to, step = 1) => {
  const range = [];
  for (let i = from; i <= to; i += step) {
    range.push(i);
  }
  return range;
};

const Pagination = ({
  totalRecords = 0,
  pageLimit = 20,
  pageNeighbours = 0,
  currentPage = 1,
  onPageChanged,
  onSelect,
}) => {
  const totalPages = Math.ceil(totalRecords / pageLimit);

  const gotoPage = (page) => {
    const currentPage = Math.max(0, Math.min(page, totalPages));
    onPageChanged(currentPage);
  };

  const handleClick = (page) => {
    gotoPage(page);
  };

  const handleMoveLeft = () => {
    gotoPage(currentPage - 1);
  };

  const handleMoveRight = () => {
    gotoPage(currentPage + 1);
  };

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;
      let pages = range(startPage, endPage);
      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;
      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  };

  const pages = fetchPageNumbers();

  return (
    <>
      {totalPages !== 0 && totalRecords && (
        <div className="d-flex flex-column align-items-center">
          <nav aria-label="data pagination">
            <ul className="pagination justify-content-center">
              {pages.map((page, index) => {
                if (page === LEFT_PAGE) {
                  return (
                    <li key={index} className="page-item">
                      <a
                        className="page-link"
                        href="#/"
                        aria-label="Previous"
                        onClick={handleMoveLeft}
                      >
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                      </a>
                    </li>
                  );
                }

                if (page === RIGHT_PAGE) {
                  return (
                    <li key={index} className="page-item">
                      <a
                        className="page-link"
                        href="#/"
                        aria-label="Next"
                        onClick={handleMoveRight}
                      >
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                      </a>
                    </li>
                  );
                }

                return (
                  <li
                    key={index}
                    className={`page-item${
                      currentPage === page ? " active" : ""
                    }`}
                  >
                    <a
                      className="page-link"
                      href="#/"
                      onClick={() => handleClick(page)}
                    >
                      {page}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="row">
            <label htmlFor="select">Items per page:</label>
            <select
              id="select"
              className="form-select mb-3 ml-2"
              aria-label="Page items limit"
              defaultValue={20}
              onChange={onSelect}
            >
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      )}
    </>
  );
};

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number.isRequired,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func,
};

export default Pagination;
