import { useDispatch, useSelector } from "react-redux";
import css from "./Notices.module.css";
import { selectNotices } from "../../redux/Notices/selectors";
import { useEffect, useState } from "react";
import { fetchNotices } from "../../redux/Notices/options";
import { NavLink } from "react-router";
import { formatDate } from "../../utils/utils";
import { selectIsLoggedIn } from "../../redux/Auth/selectors";
import ModalAttention from "../ModalAttention/ModalAttention";
import ModalNotices from "../ModalNotices/ModalNotices";
import Select from "react-select";
import NoticesFilters from "../NoticesFilters/NoticesFilters";
import { set } from "react-hook-form";

const Notices = () => {
  const [isModalAttentionOpen, setIsModalAttentionOpen] = useState(false);
  const [isModalNoticeOpen, setIsModalNoticeOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    gender: "",
    species: "",
    location: "",
  });

  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector(selectNotices);

  useEffect(() => {
    dispatch(fetchNotices());
  }, [dispatch]);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleLearnMoreClick = (item, e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setIsModalAttentionOpen(true);
      return;
    }
    setSelectedItem(item);
    setIsModalNoticeOpen(true);
  };

  const handleHeartClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setIsModalAttentionOpen(true);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredItems = items.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.comment.toLowerCase().includes(filters.search.toLowerCase());
    const matchCategory = filters.category
      ? item.category === filters.category
      : true;
    const matchGender = filters.gender ? item.sex === filters.gender : true;
    const matchSpecies = filters.species
      ? item.species === filters.species
      : true;
    const matchLocation = filters.location
      ? item.location?.includes(filters.location)
      : true;

    return (
      matchSearch &&
      matchCategory &&
      matchGender &&
      matchSpecies &&
      matchLocation
    );
  });

  return (
    <div className={css.wrapper}>
      <h2 className={css.titlePage}>Find your favorite pet</h2>
      <NoticesFilters filters={filters} setFilters={setFilters} />
      {isLoading && <p>Loading</p>}
      {error && <p>{error}</p>}
      <ul className={css.list}>
        {filteredItems.map((item) => (
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
                <NavLink
                  to="/"
                  onClick={(e) => handleLearnMoreClick(item, e)}
                  className={css.btn}
                >
                  Learn more
                </NavLink>
                <div className={css.circle} onClick={handleHeartClick}>
                  <svg width="18" height="18">
                    <use href="/sprite.svg#icon-heart" />
                  </svg>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {isModalAttentionOpen && (
        <ModalAttention onClose={() => setIsModalAttentionOpen(false)} />
      )}
      {isModalNoticeOpen && (
        <ModalNotices
          item={selectedItem}
          onClose={() => setIsModalNoticeOpen(false)}
        />
      )}
    </div>
  );
};

export default Notices;
