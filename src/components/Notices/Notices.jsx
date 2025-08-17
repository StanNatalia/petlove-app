import { useDispatch, useSelector } from "react-redux";
import css from "./Notices.module.css";
import { selectNotices } from "../../redux/Notices/selectors";
import { useEffect } from "react";
import { fetchNotices } from "../../redux/Notices/options";

const Notices = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector(selectNotices);

  useEffect(() => {
    dispatch(fetchNotices());
  }, [dispatch]);

  console.log(items);
  return (
    <div className={css.wrapper}>
      <h2>Pets</h2>
      {isLoading && <p>Loading</p>}
      {error && <p>{error}</p>}
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <img
              src={item.imgURL || "/fallback.jpg"}
              alt={item.species || "pet"}
            />
            <p>{item.name}</p>
            <p>{item.birthday}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notices;
