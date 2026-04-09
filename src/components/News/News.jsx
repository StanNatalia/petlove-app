import { useDispatch, useSelector } from "react-redux";
import css from "./News.module.css";
import { selectNews } from "../../redux/News/selectors";
import { useEffect, useRef, useState } from "react";
import { fetchNews } from "../../redux/News/options";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";

const News = () => {
  const dispatch = useDispatch();
  const { items, page, totalPages, isLoading, error } = useSelector(selectNews);
  const [search, setSearch] = useState("");
  const [searchPage, setSearchPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchNews({ page: 1, limit: search ? 2000 : 6, search: "" }));
    }, 400);
    return () => clearTimeout(timer);
  }, [dispatch, search]);

  const inputRef = useRef(null);

  const handlePageChange = (newPage) => {
    if (search) {
      setSearchPage(newPage);
    } else {
      dispatch(fetchNews({ page: newPage, limit: 6 }));
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.text.toLowerCase().includes(search.toLowerCase()),
  );

  const totalSearchPage = Math.ceil(filteredItems.length / perPage);

  const startIndex = (searchPage - 1) * perPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + perPage);

  return (
    <div className={css.wrapper}>
      <div className={css.topWrapper}>
        <h2 className={css.title}>News</h2>
        <div className={css.inputWrapper}>
          <input
            type="text"
            placeholder="Search"
            ref={inputRef}
            value={search}
            maxLength={16}
            onChange={(e) => {
              (setSearch(e.target.value), setSearchPage(1));
            }}
            className={css.searchInput}
          />
          {search ? (
            <svg
              width="18"
              height="18"
              className={css.iconCross}
              onClick={() => {
                setSearch("");
                setSearchPage(1);
              }}
            >
              <use href="/sprite.svg#icon-cross-small" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              className={css.iconSearch}
              onClick={() => inputRef.current.focus()}
            >
              <use href="/sprite.svg#icon-search" />
            </svg>
          )}

          {search && (
            <svg
              width="18"
              height="18"
              className={css.iconClear}
              onClick={() => setSearch("")}
              style={{ cursor: "pointer" }}
            >
              <use href="//sprite.svg#icon-cross-red" />
            </svg>
          )}
        </div>
      </div>

      {isLoading && <Loading />}
      {error && <p>{error}</p>}
      <ul className={css.list}>
        {(search ? paginatedItems : items).map((item) => (
          <li key={item._id} className={css.item}>
            <img src={item.imgUrl} alt={item.title} className={css.img} />
            <h3 className={css.name}>{item.title}</h3>
            <div className={css.titleWrapper}>
              <p className={css.text}>{item.text}</p>
              <div className={css.readMoreWrapper}>
                <span className={css.date}>
                  {new Date(item.date).toLocaleDateString()}
                </span>
                <a
                  href={item.url}
                  className={css.readMore}
                  target="_blank"
                  rel="noreferrer"
                >
                  Read more
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={search ? searchPage : page}
        totalPages={search ? totalSearchPage : totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default News;
