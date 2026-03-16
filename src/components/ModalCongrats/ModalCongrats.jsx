import { useNavigate } from "react-router";
import css from "./ModalCongrats.module.css";

const ModalCongrats = ({ onClose }) => {
  const navigate = useNavigate();
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button className={css.closeIcon} onClick={onClose}>
          <svg width="24" height="24">
            <use href="/public/sprite.svg#icon-cross-small" />
          </svg>
        </button>
        <div className={css.circle}>
          <img src="/public/images/🐈.png" className={css.img} />
        </div>
        <div className={css.wrapper}>
          <div className={css.textWrapper}>
            <h4 className={css.title}>Congrats</h4>
            <p className={css.text}>
              The first fluff in the favorites! May your friendship be the
              happiest and filled with fun.
            </p>
          </div>

          <button className={css.btn} onClick={() => navigate("/profile")}>
            Go to profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCongrats;
