import css from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + 2);

  if (endPage - startPage < 2) {
    startPage = Math.max(1, endPage - 2);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className={css.wrapper}>
      {/* FIRST */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={css.navBtn}
      >
        <svg width="24" height="24" style={{ display: "flex" }}>
          <use href="/sprite.svg#icon-left_arrow" x="-4" />
          <use href="/sprite.svg#icon-left_arrow" x="4" />
        </svg>
      </button>

      {/* PREV */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={css.navBtn}
      >
        <svg width="24" height="24">
          <use href="/public/sprite.svg#icon-left_arrow" />
        </svg>
      </button>

      {/* NUMBERS */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={
            page === currentPage ? `${css.pageBtn} ${css.active}` : css.pageBtn
          }
        >
          {page}
        </button>
      ))}

      {/* NEXT */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={css.navBtn}
      >
        <svg width="24" height="24">
          <use href="/public/sprite.svg#icon-right_arrow" />
        </svg>
      </button>

      {/* LAST */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={css.navBtn}
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
