import { NavLink, useLocation, useNavigate } from "react-router";
import css from "./Header.module.css";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/Auth/selectors";
import { logoutThunk } from "../../redux/Auth/options";
import { useState } from "react";
import Profile from "../Profile/Profile";
import ProfilePage from "../../pages/ProfilePage";
import ModalLogout from "../ModalLogout/ModalLogout";

const buildLinkUser = ({ isActive }) =>
  clsx(css.userLink, isActive && css.userActive);

const Header = () => {
  const [isProfile, setIsProfile] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    localStorage.removeItem("token");
    navigate("/login");
  };

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
    <header className={clsx(css.header, isHomePage && css.headerHome)}>
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
                      ? "/sprite.svg#icon-white-heart-circle"
                      : "/sprite.svg#icon-heart-circle"
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

      <div className={css.manageWrapper}>
        {isLoggedIn && (
          <div className={css.userView}>
            {location.pathname !== "/" && (
              <button
                onClick={() => setLogoutModal(true)}
                className={css.logout}
              >
                Log out
              </button>
            )}

            <NavLink
              to="/profile"
              className={css.userInfoWrapper}
              onClick={() => setIsProfile(true)}
              style={{ cursor: "pointer" }}
            >
              <div className={css.circle}>
                {user.avatar ? (
                  <img src={user.avatar} />
                ) : (
                  <svg height="24" width="24">
                    <use href="/sprite.svg#icon-user" />
                  </svg>
                )}
              </div>
              {user?.name && (
                <h3 className={isHomePage ? css.name : css.homeName}>
                  {user.name}
                </h3>
              )}
            </NavLink>
          </div>
        )}

        <div className={css.rightSide}>
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
          <button
            className={clsx(css.burger, !isHomePage && css.burgerBlack)}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg className={css.burgerIcon}>
              <use href="/sprite.svg#icon-burger" />
            </svg>
          </button>
        </div>

        {logoutModal && (
          <ModalLogout
            onClose={() => setLogoutModal(false)}
            handleLogout={handleLogout}
          />
        )}
        {isMobileMenuOpen && (
          <div
            className={css.mobileBackdrop}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className={clsx(
                css.mobileMenu,
                !isHomePage && css.mobileMenuOrange,
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={clsx(
                  css.closeBtn,
                  !isHomePage && css.closeBtnOrange,
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg width="30" height="30">
                  <use href="/sprite.svg#icon-cross-small" />
                </svg>
              </button>
              <div className={css.wrapperNav}>
                <nav className={css.mobileNav}>
                  <NavLink
                    to="/news"
                    className={clsx(
                      css.mobileLink,
                      !isHomePage && css.mobileLinkOrange,
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    News
                  </NavLink>
                  <NavLink
                    to="/notices"
                    className={clsx(
                      css.mobileLink,
                      !isHomePage && css.mobileLinkOrange,
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Find pet
                  </NavLink>
                  <NavLink
                    to="/friends"
                    className={clsx(
                      css.mobileLink,
                      !isHomePage && css.mobileLinkOrange,
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Our friends
                  </NavLink>
                </nav>
                {isLoggedIn ? (
                  <button
                    className={clsx(
                      css.loginBtn,
                      !isHomePage && css.loginBtnOrange,
                    )}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setLogoutModal(true);
                    }}
                  >
                    Log out
                  </button>
                ) : (
                  <nav className={css.mobileGuestView}>
                    <NavLink
                      to="/login"
                      className={clsx(
                        css.loginBtn,
                        !isHomePage && css.loginBtnOrange,
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Log in
                    </NavLink>
                    <NavLink
                      to="/registration"
                      className={clsx(
                        css.registerBtn,
                        !isHomePage && css.registerBtnOrange,
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Registration
                    </NavLink>
                  </nav>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
