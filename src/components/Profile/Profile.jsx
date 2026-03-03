import { useState } from "react";
import css from "./Profile.module.css";
import ModalEditProfile from "../ModalEditProfile/ModalEditProfile";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../redux/Auth/options";
import { NavLink, useNavigate } from "react-router";
import PetCard from "../PetCard/PetCard";
import ProfileForm from "../ProfileForm/ProfileForm";

const Profile = ({ onClose }) => {
  const [isEditModal, setIsEditModal] = useState(false);
  const viewed = useSelector((state) => state.viewed.items);
  const [viewMode, setViewMode] = useState("favorites");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const favorites = useSelector((state) => state.favorites.items);

  const pets = user.pets || [];

  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={css.wrapper} onClick={(e) => e.stopPropagation()}>
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
            pets.map((pet) => (
              <div key={pet._id} className={css.petCard}>
                <div className={css.imgWrapper}>
                  <img
                    src={pet.imgURL}
                    alt={pet.name}
                    className={css.petImage}
                  />
                </div>

                <div className={css.petInfo}>
                  <h5 className={css.title}>{pet.title}</h5>
                  <div className={css.description}>
                    <div className={css.wrapper}>
                      <p className={css.info}>Name</p>
                      <p className={css.value}>{pet.name}</p>
                    </div>

                    <div className={css.wrapper}>
                      <p className={css.info}>Birthday</p>
                      <p className={css.value}>{pet.birthday}</p>
                    </div>

                    <div className={css.wrapper}>
                      <p className={css.info}>Sex</p>
                      <p className={css.value}>{pet.sex}</p>
                    </div>

                    <div className={css.wrapper}>
                      <p className={css.info}>Species</p>
                      <p className={css.value}>{pet.species}</p>
                    </div>
                  </div>
                </div>
                <div className={css.deleteBtn}>
                  <svg width="16" height="16">
                    <use href="/public/sprite.svg#icon-trash" />
                  </svg>
                </div>
              </div>
            ))
          ) : (
            <p className={css.noPets}>You don't have pets yet</p>
          )}
        </div>

        <button onClick={handleLogout} className={css.logoutBtn}>
          LOG OUT
        </button>
      </div>
      <div className={`${css.content} ${css.secondaryContent}`}>
        <div className={css.btnWrapper}>
          <button
            className={`${css.btn} ${viewMode === "favorites" ? css.active : ""}`}
            onClick={() => setViewMode("favorites")}
          >
            My favorites pets
          </button>
          <button
            className={`${css.btn} ${viewMode === "viewed" ? css.active : ""}`}
            onClick={() => setViewMode("viewed")}
          >
            Viewed
          </button>
        </div>
        <div className={css.petsList}>
          {viewMode === "favorites" && favorites.length > 0 ? (
            favorites.map((item) => (
              <PetCard key={item._id} item={item} showFavoritesButton={false} />
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
    </div>
  );
};

export default Profile;
