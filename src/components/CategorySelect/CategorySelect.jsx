import Select from "react-select";
import clsx from "clsx";
import css from "./CategorySelect.module.css";

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

const CategorySelect = ({ categoriesOptions, filters, setFilters }) => {
  return (
    <>
      <Select
        className={css.categorySelectContainer}
        classNames={selectClassNames}
        options={categoriesOptions}
        placeholder="Category"
        value={
          filters.category
            ? categoriesOptions.find((e) => e.value === filters.category)
            : null
        }
        onChange={(option) =>
          setFilters((prev) => ({ ...prev, category: option?.value || "" }))
        }
      />
    </>
  );
};

export default CategorySelect;
