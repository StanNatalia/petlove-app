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
        pages.push(1, 2, 3, "...");
      } else if (currentPage >= totalPages - 2) {
        pages.push("...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1, "...");
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
        <svg width="24" height="24" style={{ display: "flex" }}>
          <use href="/sprite.svg#icon-left_arrow" x="-4" />
          <use href="/sprite.svg#icon-left_arrow" x="4" />
        </svg>
      </button>

      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={css.pageBtn}
      >
        <svg width="24" height="24">
          <use href="/sprite.svg#icon-left_arrow" />
        </svg>
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
        <svg width="24" height="24">
          <use href="/sprite.svg#icon-right_arrow" />
        </svg>
      </button>

      <button
        onClick={() => handlePageClick(totalPages)}
        disabled={currentPage === totalPages}
        className={css.pageBtn}
      >
        <svg width="24" height="24" style={{ display: "flex" }}>
          <use href="/sprite.svg#icon-right_arrow" x="4" />
          <use href="/sprite.svg#icon-right_arrow" x="-4" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
