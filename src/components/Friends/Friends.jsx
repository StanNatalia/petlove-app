import { useDispatch, useSelector } from "react-redux";
import css from "./Friends.module.css";
import { useEffect } from "react";
import { selectFriends } from "../../redux/Friends/selectors";
import { fetchFriends } from "../../redux/Friends/options";

const Friends = () => {
  const dispatch = useDispatch();

  const { items, isLoading, error } = useSelector(selectFriends);

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);
  return (
    <div className={css.wrapper}>
      <h2>Our friends</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className={css.list}>
        {items.map((item) => (
          <li key={item.id} className={css.friendsItem}>
            <img
              src={item.imageUrl || "/fallback.jpg"}
              alt={item.species || "pet"}
              className={css.petImage}
            />
            <p>{item.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
