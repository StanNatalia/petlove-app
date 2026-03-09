import { useDispatch, useSelector } from "react-redux";
import css from "./Notices.module.css";
import { selectNotices } from "../../redux/Notices/selectors";
import { useEffect, useState } from "react";
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
  const [allItems, setAllItems] = useState([]);
  const perPage = 6;

  const { items, isLoading, error, totalPages } = useSelector(selectNotices);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotices({ page: currentPage, limit: perPage }));
  }, [dispatch, currentPage]);

  const hasFilters =
    filters.search ||
    filters.category ||
    filters.gender ||
    filters.species ||
    filters.location;

  useEffect(() => {
    const hasFilters =
      filters.search ||
      filters.category ||
      filters.gender ||
      filters.species ||
      filters.location;

    if (hasFilters) {
      dispatch(fetchNotices({ page: 1, limit: 2000 })).then((res) => {
        if (res.payload && res.payload.results) {
          setAllItems(res.payload.results);
        } else {
          setAllItems([]);
        }
      });
    } else {
      setAllItems([]);
    }
  }, [dispatch, filters]);

  useEffect(() => {
    setCurrentPage(1);
    setSortedItems([]);
  }, [filters]);

  const sourceItems =
    sortedItems.length > 0
      ? sortedItems
      : allItems.length > 0
        ? allItems
        : items;

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const favorites = useSelector((state) => state.favorites.items) || [];
  const isFavorite = (id) => favorites.some((fav) => fav._id === id);

  const handleLearnMoreClick = (item, e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setIsModalAttentionOpen(true);
      return;
    }

    dispatch(addToViewed(item));
    setSelectedItem(item);
    setIsModalNoticeOpen(true);
  };

  const handleHeartClick = (item, e) => {
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
  };

  const filteredItems = sourceItems.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      (item.comment || "").toLowerCase().includes(filters.search.toLowerCase());
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
        {(hasFilters || sortedItems.length > 0 ? paginatedItems : items).map(
          (item) => (
            <PetCard
              key={item._id}
              item={item}
              isFavorite={isFavorite(item._id)}
              handleLearnMoreClick={handleLearnMoreClick}
              handleHeartClick={handleHeartClick}
            />
          ),
        )}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={hasFilters ? Math.max(totalFilteredPages, 1) : totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

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
