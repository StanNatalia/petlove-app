import { useFormContext } from "react-hook-form";
import css from "./SexForm.module.css";

const SexForm = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedSex = watch("sex");

  const handleSelect = (value) => {
    setValue("sex", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className={css.wrapper}>
      <div className={css.sexWrapper}>
        <div
          className={`${css.sexIcon} ${css.female} ${
            selectedSex === "female" ? css.activeFemale : ""
          }`}
          onClick={() => handleSelect("female")}
        >
          <svg className={css.iconFemale}>
            <use href="/sprite.svg#icon-female" />
          </svg>
        </div>

        <div
          className={`${css.sexIcon} ${css.male} ${selectedSex === "male" ? css.activeMale : ""}`}
          onClick={() => handleSelect("male")}
        >
          <svg>
            <use href="/sprite.svg#icon-male" />
          </svg>
        </div>

        <div
          className={`${css.sexIcon} ${css.multiple} ${
            selectedSex === "multiple" ? css.activeMultiple : ""
          }`}
          onClick={() => handleSelect("multiple")}
        >
          <svg>
            <use href="/sprite.svg#icon-male_female" />
          </svg>
        </div>

        <input
          type="hidden"
          {...register("sex", { required: "Please select a sex" })}
        />
      </div>

      {errors.sex && <p className={css.error}>{errors.sex.message}</p>}
    </div>
  );
};

export default SexForm;
