import Select from "react-select";
import css from "./TypeSelect.module.css";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";

const TypeSelect = ({ types }) => {
  const {
    setValue,
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();

  const selectedValue = watch("type");

  const getBorderState = () => {
    const isTouched = touchedFields.type;
    const isFilled = !!selectedValue;
    const hasError = !!errors.type;

    if (hasError) return "error";
    if (isTouched && isFilled) return "success";
    return "default";
  };

  const borderState = getBorderState();

  const selectClassNames = {
    control: (base, state) =>
      clsx(
        css.control,
        borderState === "error" && css.errorControl,
        borderState === "success" && css.successControl,
      ),

    option: ({ isSelected, isFocused }) =>
      clsx(css.option, isSelected && css.selected, isFocused && css.focused),

    singleValue: () => css.singleValue,
    placeholder: () => css.placeholder,
    menu: () => css.menu,
    menuList: () => css.menuList,
    indicatorsContainer: () => css.indicatorsContainer,
    valueContainer: () => css.valueContainer,
    indicatorSeparator: () => css.indicatorSeparator,
    clearIndicator: () => css.clearIndicator,

    dropdownIndicator: (state) =>
      clsx(
        css.dropdownIndicator,
        state?.selectProps?.menuIsOpen && css.rotated,
      ),
  };

  return (
    <div className={css.wrapper}>
      <Select
        options={types}
        classNames={selectClassNames}
        classNamePrefix="type-select"
        placeholder="Type of pet"
        value={types.find((opt) => opt.value === selectedValue) || null}
        onChange={(option) =>
          setValue("type", option.value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          })
        }
      />

      {errors.type && <p className={css.error}>{errors.type.message}</p>}
    </div>
  );
};

export default TypeSelect;
