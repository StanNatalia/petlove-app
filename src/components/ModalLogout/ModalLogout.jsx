import { useEffect } from "react";
import css from "./ModalLogout.module.css";

const ModalLogout = ({ onClose, onConfirm }) => {
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
        <button className={css.closeIcon} onClick={onClose}>
          <svg width="14" height="14">
            <use href="/sprite.svg#icon-cross-small" />
          </svg>
        </button>
        <div className={css.circle}>
          <img src="/images/🐈.png" alt="cat" />
        </div>
        <p className={css.text}>Already leaving</p>
        <div className={css.btnWrapper}>
          <button className={css.btn} onClick={onConfirm}>
            Yes
          </button>
          <button className={css.btn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalLogout;
