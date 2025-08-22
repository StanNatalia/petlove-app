import { NavLink } from "react-router";
import css from "./Header.module.css";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/Auth/selectors";
import { logoutThunk } from "../../redux/Auth/options";
import { useEffect, useState } from "react";
import ModalLogout from "../ModalLogout/ModalLogout";

const buildLinkPage = ({ isActive }) => {
  return clsx(css.pageLink, isActive && css.pageActive);
};

const buildLinkUser = ({ isActive }) => {
  return clsx(css.userLink, isActive && css.userActive);
};

const Header = () => {
  const [isOpenModalLogout, setIsOpenModalLogout] = useState(false);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

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
            News
          </NavLink>
          <NavLink to="/notices" className={buildLinkPage}>
            Find pet
          </NavLink>
          <NavLink to="/friends" className={buildLinkPage}>
            Our friends
          </NavLink>
        </nav>
      </div>

      {!isLoggedIn && (
        <nav className={css.guestView}>
          <NavLink to="/login" className={buildLinkUser}>
            Log in
          </NavLink>
          <NavLink to="/registration" className={buildLinkUser}>
            Registration
          </NavLink>
        </nav>
      )}
      {isLoggedIn && (
        <div className={css.userView}>
          <button
            onClick={() => setIsOpenModalLogout(true)}
            className={css.logout}
          >
            Log out
          </button>
          <div className={css.circle}>
            <svg height="24" width="24">
              <use href="/sprite.svg#icon-user" />
            </svg>
          </div>
          {user?.name && <h3 className={css.name}>{user.name}</h3>}
        </div>
      )}
      {isOpenModalLogout && (
        <ModalLogout
          onClose={() => setIsOpenModalLogout(false)}
          onConfirm={() => {
            dispatch(logoutThunk());
            setIsOpenModalLogout(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
