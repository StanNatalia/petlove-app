import css from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={css.loadingWrapper}>
      <button className={css.logo}>
        petl
        <span>
          <svg width="82" height="82">
            <use href={"/public/sprite.svg#icon-heart-circle"} />
          </svg>
        </span>
        ve
      </button>
    </div>
  );
};

export default Loading;
