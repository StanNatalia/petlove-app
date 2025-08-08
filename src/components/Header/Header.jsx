import { NavLink } from "react-router";
import css from "./Header.module.css";
import clsx from "clsx";

const buildLinkPage = ({ isActive }) => {
  return clsx(css.link, isActive && css.pageActive);
};

const Header = () => {
  return (
    <header className={css.header}>
      <NavLink to="/">
        <button className={css.headerLogo}>PetLove</button>
      </NavLink>
      <nav className={css.headerNav}>
        <NavLink to="/news" className={buildLinkPage}>
          {" "}
          News
        </NavLink>
        <NavLink to="/findPet" className={buildLinkPage}>
          Find pet
        </NavLink>
        <NavLink to="/ourFriends" className={buildLinkPage}>
          {" "}
          Our friends
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
