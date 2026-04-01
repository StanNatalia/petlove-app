import React from "react";
import { formatDate } from "../../utils/formatDate";
import css from "./PetCard.module.css";
import { NavLink } from "react-router";
import { toast } from "react-toastify";

const PetCard = ({
  item,
  isFavorite,
  handleHeartClick,
  handleLearnMoreClick,
  showFavoritesButton = true,
  showDeleteButton = false,
  handleDeleteClick,
  variant = "default",
}) => {
  return (
    <li
      className={`${css.item} ${css[variant]}`}
      onClick={(e) => {
        if (e.target.closest(`.${css.btnWrapper}`)) return;

        if (handleLearnMoreClick) {
          handleLearnMoreClick(item, e);
        }
      }}
    >
      <div>
        <img src={item.imgURL} alt={item.species} className={css.img} />
        <div className={css.titleWrapper}>
          <p className={css.title}>{item.title}</p>
          <div className={css.popularityWrapper}>
            <svg width="16" height="16">
              <use href="/sprite.svg#icon-star" />
            </svg>
            <p className={css.popularity}>{item.popularity}</p>
          </div>
        </div>
        <div className={css.infoWrapper}>
          <div className={css.infoThumb}>
            <p className={css.infoTitle}>Name</p>
            <p className={css.info}>
              {item.name.length > 6 ? item.name.slice(0, 6) : item.name}
            </p>
          </div>
          <div className={css.infoThumb}>
            <p className={css.infoTitle}>Birthday</p>
            <p className={css.info}>
              {item.birthday ? formatDate(item.birthday) : "-"}
            </p>
          </div>
          <div className={css.infoThumb}>
            <p className={css.infoTitle}>Sex</p>
            <p className={css.info}>{item.sex}</p>
          </div>
          <div className={css.infoThumb}>
            <p className={css.infoTitle}>Species</p>
            <p className={css.info}>{item.species}</p>
          </div>
          <div className={css.infoThumb}>
            <p className={css.infoTitle}>Category</p>
            <p className={css.info}>{item.category}</p>
          </div>
        </div>
        <p className={css.comment}>{item.comment}</p>
      </div>
      <div className={css.priceWrapper}>
        <p className={css.price}>{item.price ? `$${item.price}` : "Free"}</p>
        <div className={css.btnWrapper}>
          <NavLink
            to="/"
            onClick={(e) => handleLearnMoreClick?.(item, e)}
            className={`${css.btn} ${!showFavoritesButton && !showDeleteButton ? css.fullWidthBtn : ""}`}
          >
            Learn more
          </NavLink>
          {showFavoritesButton && (
            <div
              className={`${css.circle} ${isFavorite ? css.activeHeart : ""}`}
              onClick={(e) => handleHeartClick(item, e)}
            >
              <svg width="18" height="18">
                <use href="/sprite.svg#icon-heart" />
              </svg>
            </div>
          )}
          {showDeleteButton && (
            <div
              className={css.circle}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick(item, e);
                toast.success("You have successfully deleted the card!");
              }}
            >
              <svg width="18" height="18">
                <use href="/sprite.svg#icon-trash" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default React.memo(PetCard);
