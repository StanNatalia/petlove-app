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
        <div className={css.mainWrapper}>
          <button onClick={onClose}>
            <svg width="24" height="24" className={css.closeIcon}>
              <use href="/public/sprite.svg#icon-cross-small" />
            </svg>
          </button>
          <div className={css.imgWrapper}>
            <img src={item.imgURL} alt={item.species} className={css.img} />
            <div className={css.category}>{item.category}</div>
          </div>

          <p className={css.name}>{item.name}</p>
          <div className={css.popularityWrapper}>
            <svg className={css.star} width="16" height="16">
              <use href="/public/sprite.svg#icon-star" />
            </svg>
            <svg className={css.star} width="16" height="16">
              <use href="/public/sprite.svg#icon-star" />
            </svg>
            <svg className={css.star} width="16" height="16">
              <use href="/public/sprite.svg#icon-star" />
            </svg>
            <svg className={css.star} width="16" height="16">
              <use href="/public/sprite.svg#icon-star" />
            </svg>
            <svg className={css.star} width="16" height="16">
              <use href="/public/sprite.svg#icon-star" />
            </svg>
            <p className={css.popularity}>{item.popularity}</p>
          </div>
          <div className={css.infoWrapper}>
            <div className={css.infoThumb}>
              <p className={css.infoTitle}>Name</p>
              <p className={css.info}>{item.name}</p>
            </div>
            <div className={css.infoThumb}>
              <p className={css.infoTitle}>Birthday</p>
              <p className={css.info}>{item.birthday}</p>
            </div>
            <div className={css.infoThumb}>
              <p className={css.infoTitle}>Sex</p>
              <p className={css.info}>{item.sex}</p>
            </div>
            <div className={css.infoThumb}>
              <p className={css.infoTitle}>Species</p>
              <p className={css.info}>{item.species}</p>
            </div>
          </div>
          <p className={css.comment}>{item.comment}</p>
        </div>

        <div className={css.btnPriceWrapper}>
          <p className={css.price}>${item.price}</p>
          <div className={css.btnWrapper}>
            <NavLink to="/" className={css.link}>
              <span>Add to</span>
              <svg width="18" height="18" className={css.heartIcon}>
                <use href="/public/sprite.svg#icon-heart" />
              </svg>
            </NavLink>

            <NavLink to="/" className={css.link}>
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalNotices;
