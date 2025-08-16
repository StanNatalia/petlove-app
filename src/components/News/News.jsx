import { useDispatch, useSelector } from "react-redux";
import css from "./News.module.css";
import { selectNews } from "../../redux/News/selectors";
import { useEffect } from "react";
import { fetchNews } from "../../redux/News/options";

const News = () => {
  const dispatch = useDispatch();
  const { items, page, totalPage, isLoading, error } = useSelector(selectNews);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div className={css.newsWrapper}>
      <div>
        <h2 className={css.title}>News</h2>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className={css.list}>
        {items.map((item) => (
          <li key={item._id} className={css.newsItem}>
            <img src={item.imgUrl} alt={item.title} className={css.newsImg} />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <span>{new Date(item.date).toLocaleDateString()}</span>
            <a href={item.url} target="_blank" rel="noreferrer">
              Read more
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
