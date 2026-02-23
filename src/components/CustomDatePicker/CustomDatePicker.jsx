import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./CustomDatePicker.module.css";
import { useFormContext } from "react-hook-form";

const CustomDatePicker = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedDate = watch("birthday");

  return (
    <div className={css.datepickerWrapper}>
      <DatePicker
        selected={selectedDate ? new Date(selectedDate) : null}
        onChange={(date) =>
          setValue("birthday", date.toISOString(), {
            shouldValidate: true,
            shouldDirty: true,
          })
        }
        dateFormat="dd.MM.yyyy"
        placeholderText="Select date"
        className={css.datepickerInput}
        showPopperArrow={false}
        maxDate={new Date()}
      />

      {errors.birthday && (
        <p className={css.error}>{errors.birthday.message}</p>
      )}
      <div className={css.iconWrapper}>
        <svg width="22px" height="22px">
          <use href="/sprite.svg#icon-calendar"></use>
        </svg>
      </div>
    </div>
  );
};

export default CustomDatePicker;
