import React from "react";
import { formatDate } from "../../utils/formatDate";
import css from "./PetCard.module.css";
import { NavLink } from "react-router";

const PetCard = ({
  item,
  isFavorite,
  handleHeartClick,
  handleLearnMoreClick,
  showFavoritesButton = true,
}) => {
  return (
    <li
      className={css.item}
      onClick={(e) => {
        if (e.target.closest(`.${css.btnWrapper}`)) return;

        handleLearnMoreClick(item, e);
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
            <p className={css.info}>{item.name}</p>
          </div>
          <div className={css.infoThumb}>
            <p className={css.infoTitle}>Birthday</p>
            {item.birthday ? formatDate(item.birthday) : "-"}
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
      <div>
        <p className={css.price}>{item.price ? `$${item.price}` : "Free"}</p>
        <div className={css.btnWrapper}>
          <NavLink
            to="/"
            onClick={(e) => handleLearnMoreClick(item, e)}
            className={`${css.btn} ${!showFavoritesButton ? css.fullWidthBtn : ""}`}
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
        </div>
      </div>
    </li>
  );
};

export default React.memo(PetCard);
