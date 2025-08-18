import css from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 6;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className={css.pagination}>
      <button
        onClick={() => handlePageClick(1)}
        disabled={currentPage === 1}
        className={css.pageBtn}
      >
        {"<<"}
      </button>

      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={css.pageBtn}
      >
        {"<"}
      </button>

      {renderPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={index} className={css.dots}>
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`${css.pageBtn} ${
              currentPage === page ? css.active : ""
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={css.pageBtn}
      >
        {">"}
      </button>

      <button
        onClick={() => handlePageClick(totalPages)}
        disabled={currentPage === totalPages}
        className={css.pageBtn}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
