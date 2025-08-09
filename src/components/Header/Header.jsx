import { NavLink } from "react-router";
import css from "./Header.module.css";
import clsx from "clsx";

const buildLinkPage = ({ isActive }) => {
  return clsx(css.pageLink, isActive && css.pageActive);
};

const buildLinkUser = ({ isActive }) => {
  return clsx(css.userLink, isActive && css.userActive);
};

const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.headerWrapper}>
        <NavLink to="/">
          <button className={css.headerLogo}>
            petl
            <span>
              <svg width="23" height="23" className={css.iconHeart}>
                <use href="/sprite.svg#icon-heart-circle" />
              </svg>
            </span>
            ve
          </button>
        </NavLink>
        <nav className={css.pageNav}>
          <NavLink to="/news" className={buildLinkPage}>
            {" "}
            News
          </NavLink>
          <NavLink to="/findPet" className={buildLinkPage}>
            Find pet
          </NavLink>
          <NavLink to="/friends" className={buildLinkPage}>
            {" "}
            Our friends
          </NavLink>
        </nav>
      </div>
      <nav className={css.userNav}>
        <NavLink to="/login" className={buildLinkUser}>
          Log in
        </NavLink>
        <NavLink to="/registration" className={buildLinkUser}>
          Registration
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
