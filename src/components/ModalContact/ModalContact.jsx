import css from "./ModalContact.module.css";

const ModalContact = ({ onClose }) => {
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button onClick={onClose}>
          <svg width="24" height="24" className={css.closeIcon}>
            <use href="/sprite.svg#icon-cross-small" />
          </svg>
        </button>
        <div className={css.contentWrapper}>
          <h3 className={css.mainTitle}>Owner contacts:</h3>
          <div className={css.img}>
            <img src="/images/Hero-desc.png" alt="Owner" />
          </div>
          <div className={css.infoWrapper}>
            <p className={css.info}>
              <b className={css.title}>Name:</b>Kostina Anastasiya
            </p>

            <p className={css.info}>
              <b className={css.title}>Phone:</b>+38 065 387 51 29
            </p>

            <p className={css.info}>
              <b className={css.title}>Address:</b>Odessa, Deribasovska 28
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalContact;
