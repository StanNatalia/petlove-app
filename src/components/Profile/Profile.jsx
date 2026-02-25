import { useEffect, useState } from "react";
import css from "./Profile.module.css";
import ModalEditProfile from "../ModalEditProfile/ModalEditProfile";
import { useForm } from "react-hook-form";

const Profile = ({ user, onClose }) => {
  const [isEditModal, setIsEditModal] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    console.log(data);
  };

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
            <svg width="40" height="40">
              <use href="/sprite.svg#icon-user" />
            </svg>
          </div>
          <button className={css.photoBtn}>Upload photo</button>
        </div>
        <h3 className={css.text}>My information</h3>

        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <input
            type="text"
            className={css.field}
            {...register("name")}
            disabled
          />
          <input
            type="email"
            className={css.field}
            {...register("email")}
            disabled
          />
          <input
            type="number"
            className={css.field}
            disabled
            placeholder="No  phone number yet "
          />
        </form>
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
