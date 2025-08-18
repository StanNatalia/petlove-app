import { useDispatch, useSelector } from "react-redux";
import css from "./News.module.css";
import { selectNews } from "../../redux/News/selectors";
import { useEffect, useState } from "react";
import { fetchNews } from "../../redux/News/options";

const News = () => {
  const dispatch = useDispatch();
  const { items, page, totalPage, isLoading, error } = useSelector(selectNews);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLocaleLowerCase()) ||
      item.text.toLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <div className={css.wrapper}>
      <div className={css.topWrapper}>
        <h2 className={css.title}>News</h2>
        <div className={css.inputWrapper}>
          <input
            type="text"
            placeholder="Search"
            value={search}
            maxLength={16}
            onChange={(e) => setSearch(e.target.value)}
            className={css.searchInput}
          />
          <svg width="18" height="18" className={css.iconSearch}>
            <use href="/public/sprite.svg#icon-search" />
          </svg>

          {search && (
            <svg
              width="18"
              height="18"
              className={css.iconClear}
              onClick={() => setSearch("")}
              style={{ cursor: "pointer" }}
            >
              <use href="/public/sprite.svg#icon-cross-red" />
            </svg>
          )}
        </div>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className={css.list}>
        {filteredItems.map((item) => (
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
    </div>
  );
};

export default News;
