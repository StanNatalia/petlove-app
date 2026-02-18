import { useDispatch, useSelector } from "react-redux";
import css from "./Friends.module.css";
import { useEffect } from "react";
import { selectFriends } from "../../redux/Friends/selectors";
import { fetchFriends } from "../../redux/Friends/options";
import Loading from "../Loading/Loading";

const Friends = () => {
  const dispatch = useDispatch();

  const { items, isLoading, error } = useSelector(selectFriends);

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  const formatPhone = (phone) => {
    if (!phone) return "";

    const digits = phone.replace(/\D/g, "");

    if (digits.length === 12) {
      return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
        5,
        8,
      )} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
    }

    return phone;
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Our friends</h2>
      {isLoading && <Loading />}
      {error && <p>{error}</p>}
      <ul className={css.list}>
        {items.map((item) => (
          <li key={item.id} className={css.item}>
            <div className={css.workTime}>
              {!item.workDays || item.workDays.length === 0 ? (
                <p className={css.time}>Day and night</p>
              ) : (
                (() => {
                  const workingDay = item.workDays.find(
                    (day) => day.isOpen && day.from && day.to,
                  );
                  return workingDay ? (
                    <p
                      className={css.time}
                    >{`${workingDay.from} - ${workingDay.to}`}</p>
                  ) : (
                    <p className={css.time}>closed</p>
                  );
                })()
              )}
            </div>

            <img
              src={item.imageUrl || "/fallback.jpg"}
              alt={item.species || "pet"}
              className={css.img}
            />
            <div className={css.infoWrapper}>
              <h4 className={css.name}>{item.title}</h4>
              <p className={css.info}>
                <span className={css.span}>Email:</span>
                {item.email
                  ? item.email
                  : `${item.title.toLowerCase()}@gmail.com`}
              </p>
              <p className={css.info}>
                <span className={css.span}>Address:</span>
                {item.address ? item.address : "only website"}
              </p>
              <p className={css.info}>
                <span className={css.span}>Phone:</span>
                {item.phone ? formatPhone(item.phone) : "only website"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
