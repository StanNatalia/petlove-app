import { useForm } from "react-hook-form";
import css from "./RegistrationForm.module.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../redux/Auth/options";

const RegistrationForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const dispatch = useDispatch();

  const onSubmit = ({ name, email, password }) => {
    dispatch(registerThunk({ name, email, password }));
    reset();
  };

  const passwordValue = watch("password");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  return (
    <div className={css.formWrapper}>
      <h4 className={css.title}>Registration</h4>
      <p className={css.text}>Thank you for your interest in our platform. </p>
      <form className={css.inputWrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputBlock}>
          <div className={css.fieldWrapper}>
            <input
              {...register("name", {
                required: "this field is required",
                pattern: {
                  value: /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
                  message: "only letters",
                },
                maxLength: {
                  value: 30,
                  message: "name can contain no more than 25 characters",
                },
                minLength: {
                  value: 2,
                  message: "name must be at least 2 characters",
                },
              })}
              type="text"
              className={css.field}
              placeholder="Name"
            />
            {errors?.name && (
              <div className={css.errorMessage}>{errors.name.message}</div>
            )}
          </div>
          <div className={css.fieldWrapper}>
            <input
              {...register("email", {
                required: "this field is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              type="email"
              name="email"
              className={css.field}
              placeholder="Email"
            />
            {errors?.email && (
              <div className={css.errorMessage}>{errors.email.message}</div>
            )}
          </div>
          <div className={css.fieldWrapper}>
            <div className={css.inputWithIcon}>
              <input
                {...register("password", {
                  required: "this field is required",
                  minLength: {
                    value: 6,
                    message: "password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "password must be maximum 20 characters",
                  },
                })}
                type={showPassword ? "text" : "password"}
                name="password"
                className={css.field}
                placeholder="Password"
              />
              <span onClick={togglePassword} className={css.eye}>
                {showPassword ? (
                  <svg width="22" height="22">
                    <use href="/public/sprite.svg#icon-eye" />
                  </svg>
                ) : (
                  <svg width="22" height="22">
                    <use href="/public/sprite.svg#icon-eye-off" />
                  </svg>
                )}
              </span>
            </div>
            {errors?.password && (
              <div className={css.errorMessage}>{errors.password.message}</div>
            )}
          </div>
          <div className={css.fieldWrapper}>
            <div className={css.inputWithIcon}>
              <input
                {...register("confirmPassword", {
                  required: "this field is required",
                  validate: (value) =>
                    value === passwordValue || "Password do not match",
                })}
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className={css.field}
                placeholder="Confirm password"
              />
              <span onClick={toggleConfirmPassword} className={css.eye}>
                {showConfirmPassword ? (
                  <svg width="22" height="22">
                    <use href="/public/sprite.svg#icon-eye" />
                  </svg>
                ) : (
                  <svg width="22" height="22">
                    <use href="/public/sprite.svg#icon-eye-off" />
                  </svg>
                )}
              </span>
            </div>

            {errors?.confirmPassword && (
              <div className={css.errorMessage}>
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
        </div>
        <div className={css.btnWrapper}>
          <button type="submit" className={css.btn}>
            Registration
          </button>
          <div className={css.linkWrapper}>
            <p className={css.linkText}>Already have an account?</p>
            <NavLink to="/login" className={css.link}>
              Login
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
