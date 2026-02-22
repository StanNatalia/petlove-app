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
    <div className={css.sexWrapper}>
      <div
        className={`${css.sexIcon} ${
          selectedSex === "female" ? css.active : ""
        }`}
        onClick={() => handleSelect("female")}
        style={{ background: "rgba(244, 63, 94, 0.1)" }}
      >
        <svg width="24" height="24">
          <use href="/sprite.svg#icon-female" />
        </svg>
      </div>

      <div
        className={`${css.sexIcon} ${selectedSex === "male" ? css.active : ""}`}
        onClick={() => handleSelect("male")}
        style={{ background: "rgba(84, 173, 255, 0.1)" }}
      >
        <svg width="24" height="24">
          <use href="/sprite.svg#icon-male" />
        </svg>
      </div>

      <div
        className={`${css.sexIcon} ${
          selectedSex === "multiple" ? css.active : ""
        }`}
        onClick={() => handleSelect("multiple")}
        style={{ background: "#fff4df" }}
      >
        <svg width="24" height="24">
          <use href="/sprite.svg#icon-male_female" />
        </svg>
      </div>

      <input
        type="hidden"
        {...register("sex", { required: "Please select a sex" })}
      />

      {errors.sex && <p className={css.error}>{errors.sex.message}</p>}
    </div>
  );
};

export default SexForm;
