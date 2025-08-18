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
    <div className={css.wrapper}>
      <div>
        <h2 className={css.title}>News</h2>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className={css.list}>
        {items.map((item) => (
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
