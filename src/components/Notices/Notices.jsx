import { useDispatch, useSelector } from "react-redux";
import css from "./Notices.module.css";
import { selectNotices } from "../../redux/Notices/selectors";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchNotices } from "../../redux/Notices/options";
import { selectIsLoggedIn } from "../../redux/Auth/selectors";
import { addToViewed } from "../../redux/Viewed/viewedSlice";
import ModalAttention from "../ModalAttention/ModalAttention";
import ModalNotices from "../ModalNotices/ModalNotices";
import NoticesFilters from "../NoticesFilters/NoticesFilters";
import Loading from "../Loading/Loading";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/Favorites/options";
import PetCard from "../PetCard/PetCard";
import Pagination from "../Pagination/Pagination";

const Notices = () => {
  const [isModalAttentionOpen, setIsModalAttentionOpen] = useState(false);
  const [isModalNoticeOpen, setIsModalNoticeOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortedItems, setSortedItems] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    gender: "",
    species: "",
    location: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortedItems]);

  const { items, isLoading, error } = useSelector(selectNotices);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotices({ page: 1, limit: 2000 }));
  }, [dispatch]);

  const sourceItems = sortedItems.length ? sortedItems : items;

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const favorites = useSelector((state) => state.favorites.items) || [];
  const isFavorite = (id) => favorites.some((fav) => fav._id === id);

  const handleLearnMoreClick = useCallback(
    (item, e) => {
      e.preventDefault();
      if (!isLoggedIn) {
        setIsModalAttentionOpen(true);
        return;
      }

      dispatch(addToViewed(item));
      setSelectedItem(item);
      setIsModalNoticeOpen(true);
    },
    [isLoggedIn, dispatch],
  );

  const handleHeartClick = useCallback(
    (item, e) => {
      if (!isLoggedIn) {
        e.preventDefault();
        setIsModalAttentionOpen(true);
        return;
      }

      const alreadyFavorite = favorites.some((fav) => fav._id === item._id);

      if (alreadyFavorite) {
        dispatch(removeFromFavorites(item._id));
      } else {
        try {
          dispatch(addToFavorites(item._id));
        } catch (err) {
          console.warn("Already in favorites, skipping request");
        }
      }
    },
    [isLoggedIn, favorites, dispatch],
  );

  const filteredItems = useMemo(() => {
    return sourceItems.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        (item.comment || "")
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      const matchCategory = filters.category
        ? item.category === filters.category
        : true;

      const matchGender = filters.gender ? item.sex === filters.gender : true;

      const matchSpecies = filters.species
        ? item.species === filters.species
        : true;

      const matchLocation = filters.location
        ? item.location === filters.location
        : true;

      return (
        matchSearch &&
        matchCategory &&
        matchGender &&
        matchSpecies &&
        matchLocation
      );
    });
  }, [sourceItems, filters]);

  const totalFilteredPages = Math.ceil(filteredItems.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + perPage);

  return (
    <div className={css.wrapper}>
      <h2 className={css.titlePage}>Find your favorite pet</h2>
      <NoticesFilters
        filters={filters}
        setFilters={setFilters}
        items={sourceItems}
        setSortedItems={setSortedItems}
      />
      {isLoading && <Loading />}
      {error && <p>{error}</p>}
      <ul className={css.list}>
        {paginatedItems.map((item) => (
          <PetCard
            key={item._id}
            item={item}
            isFavorite={isFavorite(item._id)}
            handleLearnMoreClick={handleLearnMoreClick}
            handleHeartClick={handleHeartClick}
          />
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.max(totalFilteredPages, 1)}
        onPageChange={setCurrentPage}
      />

      {isModalAttentionOpen && (
        <ModalAttention onClose={() => setIsModalAttentionOpen(false)} />
      )}
      {isModalNoticeOpen && (
        <ModalNotices
          item={selectedItem}
          onClose={() => setIsModalNoticeOpen(false)}
          handleHeartClick={handleHeartClick}
        />
      )}
    </div>
  );
};

export default Notices;
