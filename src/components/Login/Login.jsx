import LoginForm from "../LoginForm/LoginForm";
import css from "./Login.module.css";

const Login = () => {
  return (
    <div className={css.registrationWrapper}>
      <div className={css.petBlock}>
        <img src="/images/login-desc.png" alt="dog" className={css.img} />
        <img src="/images/Shape.png" className={css.shape} />
        <div className={css.infoWrapper}>
          <div className={css.circle}>
            <img src="/images/🐈.png" />
          </div>
          <div className={css.info}>
            <div className={css.nameWrapper}>
              <p className={css.name}>Rich</p>
              <p className={css.birthday}>
                <span className={css.span}>Birthday: </span> 21.09.2020
              </p>
            </div>
            <p className={css.about}>
              Rich would be the perfect addition to an active family that loves
              to play and go on walks. I bet he would love having a doggy
              playmate too!
            </p>
          </div>
        </div>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
