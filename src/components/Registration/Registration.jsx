import RegistrationForm from "../RegistrationForm/RegistrationForm";
import css from "./Registration.module.css";

const Registration = () => {
  return (
    <div className={css.registrationWrapper}>
      <div className={css.petBlock}>
        <img
          src="/images/registration-desc.png"
          alt="red cat"
          className={css.img}
        />
        <img src="/public/images/Shape.png" className={css.shape} />
        <div className={css.infoWrapper}>
          <div className={css.circle}>
            <img src="/images/🐈.png" />
          </div>
          <div className={css.info}>
            <div className={css.nameWrapper}>
              <p className={css.name}>Jack</p>
              <p className={css.birthday}>
                <span className={css.span}>Birthday: </span> 18.10.2021
              </p>
            </div>
            <p className={css.about}>
              Jack is a gray Persian cat with green eyes. He loves to be
              pampered and groomed, and enjoys playing with toys.
            </p>
          </div>
        </div>
      </div>
      <RegistrationForm />
    </div>
  );
};

export default Registration;
