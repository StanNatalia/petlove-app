import Select from "react-select";
import clsx from "clsx";
import css from "./GenderSelect.module.css";

const selectClassNames = {
  control: () => css.control,
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
  dropdownIndicator: ({ selectProps }) =>
    clsx(css.dropdownIndicator, selectProps.menuIsOpen && css.rotated),
};

const GenderSelect = ({ sexOptions, filters, setFilters }) => {
  return (
    <>
      <Select
        classNames={selectClassNames}
        className={css.genderSelectController}
        options={sexOptions}
        placeholder="By gender"
        value={
          filters.gender
            ? sexOptions.find((e) => e.value === filters.gender)
            : null
        }
        onChange={(option) =>
          setFilters((prev) => ({ ...prev, gender: option?.value || "" }))
        }
      />
    </>
  );
};

export default GenderSelect;
