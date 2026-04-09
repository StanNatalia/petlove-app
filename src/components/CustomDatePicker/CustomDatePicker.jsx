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

  const hasError = !!errors.birthday;
  const isDirty = !!selectedDate;

  const getInputClass = () => {
    if (!isDirty) return css.datepickerInput;

    if (hasError) return `${css.datepickerInput} ${css.errorField}`;

    return `${css.datepickerInput} ${css.successField}`;
  };

  return (
    <div className={css.datepickerWrapper}>
      <div className={css.inputWrapper}>
        <DatePicker
          selected={selectedDate ? new Date(selectedDate) : null}
          onChange={(date) => {
            if (!date) return setValue("birthday", "");
            setValue("birthday", format(date, "yyyy-MM-dd"), {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            });
          }}
          dateFormat="dd.MM.yyyy"
          placeholderText="Select date"
          className={getInputClass()}
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
