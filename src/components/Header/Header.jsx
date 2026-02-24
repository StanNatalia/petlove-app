import { NavLink, useLocation } from "react-router";
import css from "./Header.module.css";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/Auth/selectors";
import { logoutThunk } from "../../redux/Auth/options";
import { useState } from "react";
import ModalUserInfo from "../ModalUserInfo/ModalUserInfo"; // новое модальное окно с инфо юзера

const buildLinkUser = ({ isActive }) =>
  clsx(css.userLink, isActive && css.userActive);

const Header = () => {
  const [isOpenModalUser, setIsOpenModalUser] = useState(false);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const buildLinkPage = ({ isActive }) =>
    clsx(
      css.pageLink,
      isActive && css.pageActive,
      isHomePage && css.homeColorButton,
    );

  return (
    <header className={css.header}>
      <div className={css.headerWrapper}>
        <NavLink to="/">
          <button
            className={clsx(css.headerLogo, isHomePage && css.homeHeaderLogo)}
          >
            petl
            <span>
              <svg width="23" height="23">
                <use
                  href={
                    isHomePage
                      ? "/public/sprite.svg#icon-white-heart-circle"
                      : "/public/sprite.svg#icon-heart-circle"
                  }
                />
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
            onClick={() => dispatch(logoutThunk())}
            className={css.logout}
          >
            Log out
          </button>
          <div
            className={css.userInfoWrapper}
            onClick={() => setIsOpenModalUser(true)}
            style={{ cursor: "pointer" }}
          >
            <div className={css.circle}>
              <svg height="24" width="24">
                <use href="/sprite.svg#icon-user" />
              </svg>
            </div>
            {user?.name && (
              <h3 className={isHomePage ? css.name : css.homeName}>
                {user.name}
              </h3>
            )}
          </div>
        </div>
      )}

      {isOpenModalUser && (
        <ModalUserInfo user={user} onClose={() => setIsOpenModalUser(false)} />
      )}
    </header>
  );
};

export default Header;
