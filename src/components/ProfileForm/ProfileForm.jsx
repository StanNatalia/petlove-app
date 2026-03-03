import css from "./ProfileForm.module.css";

const ProfileForm = ({ setIsEditModal, user }) => {
  return (
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
    </div>
  );
};

export default ProfileForm;
