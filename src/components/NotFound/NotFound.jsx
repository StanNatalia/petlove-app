import { NavLink } from "react-router";
import css from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.catWrapper}>
        <p className={css.title}>4</p>
        <div className={css.circle}>
          <img src="/public/images/NotFound.png" alt="" />
        </div>
        <p className={css.title}>4</p>
      </div>
      <h3 className={css.info}>Ooops! This page not found :(</h3>
      <NavLink to="/" className={css.btn}>
        To home page
      </NavLink>
    </div>
  );
};

export default NotFound;
