import { useForm } from "react-hook-form";
import css from "./RegistrationForm.module.css";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../redux/Auth/options";
import { toast } from "react-toastify";

const RegistrationForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
    getFieldState,
  } = useForm({
    mode: "onChange",
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onSubmit = async ({ name, email, password }) => {
    try {
      const data = await dispatch(
        registerThunk({ name, email, password }),
      ).unwrap();
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
      toast.success("Registration successful");
      reset();
      navigate("/profile");
    } catch (error) {
      toast.error(error?.message || error || "something went wrong");
    }
  };

  const nameValue = watch("name");
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const nameState = getFieldState("name");
  const emailState = getFieldState("email");
  const passwordState = getFieldState("password");
  const confirmState = getFieldState("confirmPassword");

  const isNameValid =
    nameValue &&
    /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(nameValue) &&
    nameValue.length >= 2 &&
    nameValue.length < 20;

  const isEmailValid = emailValue
    ? /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(emailValue)
    : false;

  const isPasswordSecure =
    passwordValue &&
    passwordValue.length >= 7 &&
    /[A-Z]/.test(passwordValue) &&
    /[a-z]/.test(passwordValue) &&
    /\d/.test(passwordValue);

  const isConfirmPasswordValid = confirmPasswordValue
    ? confirmPasswordValue === passwordValue
    : false;

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
            <div className={css.inputWithIcon}>
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
                className={`${css.field} ${
                  nameState.isTouched || nameState.isDirty
                    ? nameState.invalid
                      ? css.fieldError
                      : css.fieldSuccess
                    : ""
                }`}
                placeholder="Name"
              />
              {nameValue && (
                <span className={css.nameCheckIcon}>
                  {isNameValid ? (
                    <svg width="22" height="22">
                      <use href="/sprite.svg#icon-check" />
                    </svg>
                  ) : (
                    <svg width="22" height="22">
                      <use href="/sprite.svg#icon-cross-red" />
                    </svg>
                  )}
                </span>
              )}
            </div>
            {errors?.name && (
              <div className={css.errorMessage}>{errors.name.message}</div>
            )}
          </div>
          <div className={css.fieldWrapper}>
            <div className={css.inputWithIcon}>
              <input
                {...register("email", {
                  required: "this field is required",
                  pattern: {
                    value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                    message: "Enter a valid Email",
                  },
                })}
                type="email"
                name="email"
                className={`${css.field} ${
                  emailState.isDirty
                    ? emailState.invalid
                      ? css.fieldError
                      : css.fieldSuccess
                    : ""
                }`}
                placeholder="Email"
              />
              {emailValue && (
                <span className={css.emailCheckIcon}>
                  {isEmailValid ? (
                    <svg width="22" height="22">
                      <use href="/sprite.svg#icon-check" />
                    </svg>
                  ) : (
                    <svg width="22" height="22">
                      <use href="/sprite.svg#icon-cross-red" />
                    </svg>
                  )}
                </span>
              )}
            </div>
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
                    value: 7,
                    message: "password must be at least 7 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "password must be maximum 20 characters",
                  },
                })}
                type={showPassword ? "text" : "password"}
                name="password"
                className={`${css.field} ${
                  passwordState.isDirty
                    ? passwordState.invalid
                      ? css.fieldError
                      : css.fieldSuccess
                    : ""
                }`}
                placeholder="Password"
              />
              <span onClick={togglePassword} className={css.eye}>
                {showPassword ? (
                  <svg width="22" height="22">
                    <use href="/sprite.svg#icon-eye" />
                  </svg>
                ) : (
                  <svg width="22" height="22">
                    <use href="/sprite.svg#icon-eye-off" />
                  </svg>
                )}
              </span>
              {passwordValue && (
                <span className={css.passwordCheckIcon}>
                  {isPasswordSecure ? (
                    <svg width="22" height="22">
                      <use href="/sprite.svg#icon-check" />
                    </svg>
                  ) : (
                    <svg width="22" height="22">
                      <use href="/sprite.svg#icon-cross-red" />
                    </svg>
                  )}
                </span>
              )}
            </div>
            {errors?.password && (
              <div className={css.errorMessage}>{errors.password.message}</div>
            )}
            {!errors?.password && passwordValue && (
              <div
                style={{
                  fontSize: "12px",
                  color: isPasswordSecure ? "green" : "red",
                  marginTop: "4px",
                }}
              >
                {isPasswordSecure ? "Password is secure" : "Password is weak"}
              </div>
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
                className={`${css.field} ${
                  confirmState.isDirty
                    ? confirmState.invalid
                      ? css.fieldError
                      : css.fieldSuccess
                    : ""
                }`}
                placeholder="Confirm password"
              />
              <span onClick={toggleConfirmPassword} className={css.eye}>
                {showConfirmPassword ? (
                  <svg width="22" height="22">
                    <use href="/sprite.svg#icon-eye" />
                  </svg>
                ) : (
                  <svg width="22" height="22">
                    <use href="/sprite.svg#icon-eye-off" />
                  </svg>
                )}
              </span>
              {confirmPasswordValue && (
                <span className={css.confirmCheckIcon}>
                  {isConfirmPasswordValid ? (
                    <svg width="22" height="22">
                      <use href="/sprite.svg#icon-check" />
                    </svg>
                  ) : (
                    <svg width="22" height="22">
                      <use href="/sprite.svg#icon-cross-red" />
                    </svg>
                  )}
                </span>
              )}
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
