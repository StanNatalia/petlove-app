import css from "./ModalEditProfile.module.css";
import PhotoUploading from "../PhotoUploading/PhotoUploading";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editUser } from "../../redux/Auth/options";
import { useEffect } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),

  email: Yup.string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invalid email format",
    )
    .required("Email is required"),

  avatar: Yup.string()
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      "Avatar must be a valid image URL",
    )
    .required("Photo is required"),

  phone: Yup.string()
    .matches(/^\+38\d{10}$/, "Phone must be in format +38XXXXXXXXXX")
    .required("Phone is required"),
});

const ModalEditProfile = ({ user, onClose }) => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(editUser(data));
      if (editUser.fulfilled.match(resultAction)) {
        onClose();
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
              <div>
                <input
                  className={css.field}
                  type="text"
                  {...register("name")}
                />
                {errors.name && (
                  <p className={css.error}>{errors.name.message}</p>
                )}
              </div>

              <div>
                <input
                  className={css.field}
                  type="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className={css.error}>{errors.email.message}</p>
                )}
              </div>

              <div>
                <input
                  className={css.field}
                  type="text"
                  {...register("phone")}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className={css.error}>{errors.phone.message}</p>
                )}
              </div>
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
