import css from "./ModalEditProfile.module.css";
import PhotoUploading from "../PhotoUploading/PhotoUploading";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editUser } from "../../redux/Auth/options";
import { useEffect } from "react";

const ModalEditProfile = ({ user, onClose }) => {
  const methods = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      avatar: user?.avatar || "",
    },
  });

  useEffect(() => {
    if (user) {
      methods.reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        avatar: user.avatar || "",
      });
    }
  }, [user, methods]);

  const { register, handleSubmit } = methods;

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(editUser(data));
      if (editUser.fulfilled.match(resultAction)) {
        onClose();
        console.log(data);
      } else {
        console.error(resultAction.payload || "Edit failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button onClick={onClose}>
          <svg width="24" height="24" className={css.closeIcon}>
            <use href="/sprite.svg#icon-cross-small" />
          </svg>
        </button>
        <h3 className={css.text}>Edit information</h3>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("avatar")} />
            <PhotoUploading />
            <div className={css.fieldWrapper}>
              <input className={css.field} type="text" {...register("name")} />
              <input
                className={css.field}
                type="email"
                {...register("email")}
              />
              <input
                className={css.field}
                type="text"
                {...register("phone")}
                placeholder="Enter your phone number"
              />
            </div>
            <button type="submit" className={css.btn}>
              Go to profile
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ModalEditProfile;
