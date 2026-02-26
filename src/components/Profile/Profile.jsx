import { useState } from "react";
import css from "./Profile.module.css";
import ModalEditProfile from "../ModalEditProfile/ModalEditProfile";
import { useSelector } from "react-redux";

const Profile = ({ onClose }) => {
  const [isEditModal, setIsEditModal] = useState(false);

  const user = useSelector((state) => state.auth.user);

  return (
    <div className={css.wrapper} onClick={(e) => e.stopPropagation()}>
      <div className={css.content}>
        <div className={css.userWrapper}>
          <button className={css.btn}>
            User
            <svg width="18" height="18" className={css.userIcon}>
              <use href="/sprite.svg#icon-user-white" />
            </svg>
          </button>
          <div className={css.editWrapper} onClick={() => setIsEditModal(true)}>
            <svg width="18" height="18" className={css.userIcon}>
              <use href="/sprite.svg#icon-edit" />
            </svg>
          </div>
        </div>
        <div className={css.photoWrapper}>
          <div className={css.photoIcon}>
            {user.avatar ? (
              <img src={user.avatar} alt="avatar" className={css.avatarImg} />
            ) : (
              <svg width="40" height="40">
                <use href="/sprite.svg#icon-user" />
              </svg>
            )}
          </div>
          <button className={css.photoBtn} onClick={() => setIsEditModal(true)}>
            Upload photo
          </button>
        </div>
        <h3 className={css.text}>My information</h3>

        <div className={css.form}>
          {user.name ? (
            <p className={css.field}>{user.name}</p>
          ) : (
            <p className={css.field}>Name</p>
          )}

          {user.email ? (
            <p className={css.field}>{user.email}</p>
          ) : (
            <p className={css.field}>name@gmail.com</p>
          )}

          {user.phone ? (
            <p className={css.field}>{user.phone}</p>
          ) : (
            <p className={css.field}>+380</p>
          )}
        </div>
        <div className={css.petsWrapper}>
          <div className={css.userWrapper}>
            <h4 className={css.text}>My pets</h4>
            <button className={css.btn}>
              Add pet
              <svg width="18" height="18">
                <use href="/sprite.svg#icon-plus" />
              </svg>
            </button>
          </div>
        </div>
        <button className={css.logoutBtn}>LOG OUT</button>
      </div>
      <div className={`${css.content} ${css.secondaryContent}`}>
        <div className={css.btnWrapper}>
          <button className={css.btn}>My favorites pets</button>
          <button className={`${css.btn} ${css.secondaryBtn}`}>Viewed</button>
        </div>

        <p className={css.notification}>
          Oops,
          <span className={css.span}>
            looks like there aren't any furries
          </span>{" "}
          on our adorable page yet. Do not worry! View your pets on the "find
          your favorite pet" page and add them to your favorites.
        </p>
      </div>

      {isEditModal && (
        <ModalEditProfile user={user} onClose={() => setIsEditModal(false)} />
      )}
    </div>
  );
};

export default Profile;
