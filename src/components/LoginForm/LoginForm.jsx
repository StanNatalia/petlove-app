import { useForm } from "react-hook-form";
import css from "./LoginForm.module.css";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../redux/Auth/options";
import { toast } from "react-toastify";

const LoginForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    getFieldState,
  } = useForm({
    mode: "onChange",
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    try {
      const res = await dispatch(loginThunk({ email, password })).unwrap();
      toast.success(`Hello, ${res?.user.name || "User"}! Login successful`);
      reset();
      navigate("/", { replace: true });
    } catch {
      toast.error("Invalid email or password");
    }
  };

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const emailState = getFieldState("email");
  const passwordState = getFieldState("password");

  const isEmailValid = emailValue
    ? /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(emailValue)
    : false;

  const isPasswordSecure =
    passwordValue &&
    passwordValue.length >= 7 &&
    /[A-Z]/.test(passwordValue) &&
    /[a-z]/.test(passwordValue) &&
    /\d/.test(passwordValue);

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

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className={css.formWrapper}>
      <h4 className={css.title}>Log in</h4>
      <p className={css.text}>
        Welcome! Please enter your credentials to login to the platform:
      </p>
      <form className={css.inputWrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputBlock}>
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
                  emailState.isTouched || emailState.isDirty
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
                  validate: (value) =>
                    (/[A-Z]/.test(value) &&
                      /[a-z]/.test(value) &&
                      /\d/.test(value)) ||
                    "Password must include upper, lower case letters and a number",
                })}
                type={showPassword ? "text" : "password"}
                name="password"
                className={`${css.field} ${
                  passwordState.isTouched || passwordState.isDirty
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
        </div>
        <div className={css.btnWrapper}>
          <button type="submit" className={css.btn}>
            Log in
          </button>
          <div className={css.linkWrapper}>
            <p className={css.linkText}>Don’t have an account?</p>
            <NavLink to="/registration" className={css.link}>
              Register
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
