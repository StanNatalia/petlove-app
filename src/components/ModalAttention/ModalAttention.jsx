import { NavLink } from "react-router";
import css from "./ModalAttention.module.css";
import { useEffect } from "react";

const ModalAttention = ({ onClose }) => {
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
        <div className={css.circle}>
          <img src="/images/🐶.png" alt="dog" className={css.img} />
        </div>
        <h3 className={css.title}>Attention</h3>
        <p className={css.info}>
          We would like to remind you that certain functionality is available
          only to authorized users.If you have an account, please log in with
          your credentials. If you do not already have an account, you must
          register to access these features.
        </p>
        <div className={css.btnWrapper}>
          <NavLink to="/login" className={css.link}>
            Log In
          </NavLink>
          <NavLink to="/registration" className={css.link}>
            Registration
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ModalAttention;
