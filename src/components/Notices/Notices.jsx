import { useDispatch, useSelector } from "react-redux";
import css from "./Notices.module.css";
import { selectNotices } from "../../redux/Notices/selectors";
import { useEffect, useState } from "react";
import { fetchNotices } from "../../redux/Notices/options";
import { Link, NavLink } from "react-router";
import { formatDate } from "../../utils/utils";
import { selectIsLoggedIn } from "../../redux/Auth/selectors";
import ModalAttention from "../ModalAttention/ModalAttention";

const Notices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector(selectNotices);

  useEffect(() => {
    dispatch(fetchNotices());
  }, [dispatch]);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleAction = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setIsModalOpen(true);
      return;
    }
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.titlePage}>Find your favorite pet</h2>
      <div className={css.filters}>Filters</div>
      {isLoading && <p>Loading</p>}
      {error && <p>{error}</p>}
      <ul className={css.list}>
        {items.map((item) => (
          <li key={item._id} className={css.item}>
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
                  <p className={css.info}>{formatDate(item.birthday)}</p>
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
              <p className={css.price}>
                {item.price ? `$${item.price}` : "Free"}
              </p>
              <div className={css.btnWrapper}>
                <NavLink to="/" onClick={handleAction} className={css.btn}>
                  Learn more
                </NavLink>
                <div className={css.circle} onClick={handleAction}>
                  <svg width="18" height="18">
                    <use href="/sprite.svg#icon-heart" />
                  </svg>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && <ModalAttention onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Notices;
