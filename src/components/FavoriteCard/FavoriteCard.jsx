import { useDispatch } from "react-redux";
import css from "./FavoriteCard.module.css";
import { removeFromFavorites } from "../../redux/Favorites/options";

const FavoriteCard = ({ pet }) => {
  const dispatch = useDispatch();
  return (
    <div className={css.petCard}>
      <div className={css.imgWrapper}>
        <img src={pet.imgURL} alt={pet.name} className={css.petImage} />
      </div>

      <div className={css.petInfo}>
        <h5 className={css.title}>{pet.title}</h5>
        <div className={css.description}>
          <div className={css.wrapper}>
            <p className={css.info}>Name</p>
            <p className={css.value}>{pet.name}</p>
          </div>

          <div className={css.wrapper}>
            <p className={css.info}>Birthday</p>
            <p className={css.value}>{pet.birthday}</p>
          </div>

          <div className={css.wrapper}>
            <p className={css.info}>Sex</p>
            <p className={css.value}>{pet.sex}</p>
          </div>

          <div className={css.wrapper}>
            <p className={css.info}>Species</p>
            <p className={css.value}>{pet.species}</p>
          </div>
        </div>
      </div>
      <div
        className={css.deleteBtn}
        onClick={() => dispatch(removeFromFavorites(pet._id))}
      >
        <svg width="16" height="16">
          <use href="/sprite.svg#icon-trash" />
        </svg>
      </div>
    </div>
  );
};

export default FavoriteCard;
