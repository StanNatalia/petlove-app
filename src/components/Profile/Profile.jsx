import { useState } from "react";
import css from "./Profile.module.css";
import ModalEditProfile from "../ModalEditProfile/ModalEditProfile";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk, removePet } from "../../redux/Auth/options";
import { NavLink, useNavigate } from "react-router";
import PetCard from "../PetCard/PetCard";
import ProfileForm from "../ProfileForm/ProfileForm";
import FavoriteCard from "../FavoriteCard/FavoriteCard";
import ModalLogout from "../ModalLogout/ModalLogout";

const Profile = ({ onClose }) => {
  const [isEditModal, setIsEditModal] = useState(false);
  const [viewMode, setViewMode] = useState("favorites");
  const [isLogoutModal, setIsLogoutModal] = useState(false);
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

  return (
    <div className={css.container} onClick={(e) => e.stopPropagation()}>
      <div className={css.content}>
        <ProfileForm setIsEditModal={setIsEditModal} user={user} />
        <div className={css.petsWrapper}>
          <div className={css.userWrapper}>
            <h4 className={css.text}>My pets</h4>
            <NavLink to="/add-pet">
              <button className={css.btn}>
                Add pet
                <svg width="18" height="18">
                  <use href="/sprite.svg#icon-plus" />
                </svg>
              </button>
            </NavLink>
          </div>
        </div>

        <div className={css.petsList}>
          {pets.length > 0 ? (
            pets.map((pet) => <FavoriteCard key={pet._id} pet={pet} />)
          ) : (
            <p className={css.noPets}>You don't have pets yet</p>
          )}
        </div>

        <button onClick={handleLogout} className={css.logoutBtn}>
          LOG OUT
        </button>
      </div>
      <div>
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
        <div className={css.petsList}>
          {viewMode === "favorites" && favorites.length > 0 ? (
            favorites.map((item) => (
              <PetCard
                key={item._id}
                item={item}
                showFavoritesButton={false}
                showDeleteButton={true}
                handleDeleteClick={(item) => dispatch(removePet(item._id))}
              />
            ))
          ) : viewMode === "viewed" && viewed.length > 0 ? (
            viewed.map((item) => (
              <PetCard key={item._id} item={item} showFavoritesButton={false} />
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

      {isEditModal && (
        <ModalEditProfile user={user} onClose={() => setIsEditModal(false)} />
      )}

      {isLogoutModal && (
        <ModalLogout
          onClose={() => setIsLogoutModal(false)}
          handleLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default Profile;
