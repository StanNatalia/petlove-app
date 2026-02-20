import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./CustomDatePicker.module.css";

const CustomDatePicker = () => {
  return (
    <div className={css.datepickerWrapper}>
      <DatePicker
        dateFormat="dd.MM.yyyy"
        placeholderText="Select date"
        className={css.datepickerInput}
        showPopperArrow={false}
      />
      <div className={css.iconWrapper}>
        <svg width="22px" height="22px">
          <use href="/public/sprite.svg#icon-calendar"></use>
        </svg>
      </div>
    </div>
  );
};

export default CustomDatePicker;
