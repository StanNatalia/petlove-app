import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./CustomDatePicker.module.css";
import { useFormContext } from "react-hook-form";
import { format } from "date-fns";

const CustomDatePicker = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedDate = watch("birthday");

  return (
    <div className={css.datepickerWrapper}>
      <div className={css.inputWrapper}>
        <DatePicker
          selected={selectedDate ? new Date(selectedDate) : null}
          onChange={(date) => setValue("birthday", format(date, "yyyy-MM-dd"))}
          dateFormat="dd.MM.yyyy"
          placeholderText="Select date"
          className={css.datepickerInput}
          showPopperArrow={false}
          maxDate={new Date()}
        />
        <div className={css.iconWrapper}>
          <svg className={css.icon}>
            <use href="/sprite.svg#icon-calendar"></use>
          </svg>
        </div>
      </div>
      {errors.birthday && (
        <p className={css.error}>{errors.birthday.message}</p>
      )}
    </div>
  );
};

export default CustomDatePicker;
