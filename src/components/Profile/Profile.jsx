import { useState } from "react";
import css from "./Profile.module.css";
import ModalEditProfile from "../ModalEditProfile/ModalEditProfile";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../redux/Auth/options";
import { NavLink, useNavigate } from "react-router";
import PetCard from "../PetCard/PetCard";
import ProfileForm from "../ProfileForm/ProfileForm";
import FavoriteCard from "../FavoriteCard/FavoriteCard";
import ModalLogout from "../ModalLogout/ModalLogout";
import { removeFromFavorites } from "../../redux/Favorites/options";
import ModalNotices from "../ModalNotices/ModalNotices";
import ModalContact from "../ModalContact/ModalContact";

const Profile = ({ onClose }) => {
  const [isEditModal, setIsEditModal] = useState(false);
  const [viewMode, setViewMode] = useState("favorites");
  const [isLogoutModal, setIsLogoutModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalNoticeOpen, setIsModalNoticeOpen] = useState(false);
  const [isContactModal, setIsContactModal] = useState(false);

  const handleLearnMoreClick = (item, e) => {
    e.preventDefault();
    setSelectedItem(item);
    setIsModalNoticeOpen(true);
  };

  const handleRemoveFavorite = (id) => {
    dispatch(removeFromFavorites(id));
  };

  const viewed = useSelector((state) => state.viewed.items || []);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const favorites = useSelector((state) => state.favorites.items || []);

  const pets = user.pets || [];

  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const openContact = () => {
    setIsContactModal(true);
  };

  return (
    <div className={css.container} onClick={(e) => e.stopPropagation()}>
      <div className={css.content}>
        <ProfileForm setIsEditModal={setIsEditModal} user={user} />
        <div className={css.petsWrapper}>
          <h4 className={css.text}>My pets</h4>
          <NavLink to="/add-pet" className={css.link}>
            <button className={css.btn}>
              Add pet
              <svg width="18" height="18">
                <use href="/sprite.svg#icon-plus" />
              </svg>
            </button>
          </NavLink>
        </div>

        <div className={css.petsList}>
          {pets.length > 0 ? (
            pets.map((pet) => <FavoriteCard key={pet._id} pet={pet} />)
          ) : (
            <p className={css.noPets}>You don't have pets yet</p>
          )}
        </div>

        <button
          onClick={() => setIsLogoutModal(true)}
          style={{ cursor: "pointer" }}
          className={css.logoutBtn}
        >
          LOG OUT
        </button>
      </div>
      <div className={css.secondContent}>
        <div className={css.btnWrapper}>
          <button
            className={css.btnFavorite}
            onClick={() => setViewMode("favorites")}
          >
            My favorites pets
          </button>
          <button
            className={css.btnViewed}
            onClick={() => setViewMode("viewed")}
          >
            Viewed
          </button>
        </div>
        <div className={css.petsListFavorites}>
          {viewMode === "favorites" && favorites.length > 0 ? (
            favorites.map((item) => (
              <PetCard
                variant="small"
                key={item._id}
                item={item}
                showFavoritesButton={false}
                showDeleteButton={true}
                handleDeleteClick={(item) =>
                  dispatch(removeFromFavorites(item._id))
                }
                handleLearnMoreClick={handleLearnMoreClick}
              />
            ))
          ) : viewMode === "viewed" && viewed.length > 0 ? (
            viewed.map((item) => (
              <PetCard
                key={item._id}
                item={item}
                showFavoritesButton={false}
                handleLearnMoreClick={handleLearnMoreClick}
              />
            ))
          ) : (
            <p className={css.notification}>
              {viewMode === "favorites" ? (
                <>
                  Oops,
                  <span className={css.span}>
                    looks like there aren't any furries
                  </span>{" "}
                  on our adorable page yet. Do not worry! View your pets on the
                  "find your favorite pet" page and add them to your favorites.
                </>
              ) : (
                "You haven't viewed any pets yet."
              )}
            </p>
          )}
        </div>
      </div>

      {isModalNoticeOpen && (
        <ModalNotices
          item={selectedItem}
          onClose={() => setIsModalNoticeOpen(false)}
          handleRemoveFavorite={handleRemoveFavorite}
          openContact={openContact}
        />
      )}

      {isEditModal && (
        <ModalEditProfile user={user} onClose={() => setIsEditModal(false)} />
      )}

      {isLogoutModal && (
        <ModalLogout
          onClose={() => setIsLogoutModal(false)}
          handleLogout={handleLogout}
        />
      )}

      {isContactModal && (
        <ModalContact onClose={() => setIsContactModal(false)} />
      )}
    </div>
  );
};

export default Profile;
