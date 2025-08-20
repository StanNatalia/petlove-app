import { useEffect } from "react";
import css from "./ModalNotices.module.css";
import { NavLink } from "react-router";

const ModalNotices = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button onClick={onClose}>
          <svg width="24" height="24" className={css.closeIcon}>
            <use href="/public/sprite.svg#icon-cross-small" />
          </svg>
        </button>
        <img src={item.imgURL} alt={item.species} className={css.img} />
        <div className={css.btnWrapper}>
          <NavLink to="/" className={css.link}>
            Add to
          </NavLink>
          <NavLink to="/" className={css.link}>
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ModalNotices;
