import css from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.heroWrapper}>
        <h1 className={css.title}>
          Take good <span className={css.heroSpan}>care</span> of your small
          pets
        </h1>
        <h3 className={css.heroInfo}>
          Choosing a pet for your home is a choice that is meant to enrich your
          life with immeasurable joy and tenderness.
        </h3>
      </div>
      <img
        src="/images/Hero-desc.png"
        alt="woman kisses her dog on the nose"
        className={css.heroImg}
      />
    </div>
  );
};

export default Hero;
