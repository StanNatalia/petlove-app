import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import css from "./CustomDatePicker.module.css";

const CustomDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className={css.datepickerWrapper}>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd.MM.yyyy"
        placeholderText="Select date"
        className={css.datepickerInput}
        showPopperArrow={false}
      />
      <div className={css.iconWrapper}>
        <svg width="22px" height="22px">
          <use href="/sprite.svg#icon-calendar"></use>
        </svg>
      </div>
    </div>
  );
};

export default CustomDatePicker;
