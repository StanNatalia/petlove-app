import { useEffect, useState } from "react";
import css from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 410);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 410);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (totalPages <= 1) return null;

  const maxVisiblePages = isMobile ? 2 : 3;

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + (maxVisiblePages - 1));

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - (maxVisiblePages - 1));
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
          <use href="/sprite.svg#icon-left_arrow" />
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
          <use href="/sprite.svg#icon-right_arrow" />
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
