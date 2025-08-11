import { useForm } from "react-hook-form";
import css from "./RegistrationForm.module.css";
import { useEffect } from "react";
import { NavLink } from "react-router";

const RegistrationForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className={css.formWrapper}>
      <h4 className={css.title}>Registration</h4>
      <p className={css.text}>Thank you for your interest in our platform. </p>
      <form className={css.inputWrapper}>
        <div className={css.inputBlock}>
          <div className={css.fieldWrapper}>
            <input
              {...register("name", {
                required: "this field is required",
                pattern: {
                  value: /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
                  message: "only letters",
                  maxLength: {
                    value: 30,
                    message: "name can contain no more than 25 characters",
                  },
                  minLength: {
                    value: 2,
                    message: "name must be at least 2 characters",
                  },
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
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
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
              type="text"
              name="password"
              className={css.field}
              placeholder="Password"
            />
            {errors?.email && (
              <div className={css.errorMessage}>{errors.email.message}</div>
            )}
          </div>
          <div className={css.fieldWrapper}>
            <input
              {...register("confirmPassword", {
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
              type="text"
              name="password"
              className={css.field}
              placeholder="Confirm password"
            />
            {errors?.email && (
              <div className={css.errorMessage}>{errors.email.message}</div>
            )}
          </div>
        </div>
        <div>
          <button type="submit" className={css.btn}>
            Registration
          </button>
          <p>Already have an account?</p>
          <NavLink to="/login">Login</NavLink>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
