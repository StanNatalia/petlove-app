import Select from "react-select";
import css from "./SpeciesSelect.module.css";
import clsx from "clsx";

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

const SpeciesSelect = ({ filters, setFilters, speciesOptions }) => {
  return (
    <>
      <Select
        className={css.speciesSelectContainer}
        classNames={selectClassNames}
        options={speciesOptions}
        placeholder="By type"
        value={
          filters.species
            ? speciesOptions.find((e) => e.value === filters.species)
            : ""
        }
        onChange={(option) =>
          setFilters((prev) => ({ ...prev, species: option?.value || "" }))
        }
      />
    </>
  );
};
export default SpeciesSelect;
