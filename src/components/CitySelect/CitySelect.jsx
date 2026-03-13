import AsyncSelect from "react-select/async";
import { useDispatch } from "react-redux";
import { getCities, getLocations } from "../../redux/Cities/options";
import css from "./CitySelect.module.css";
import clsx from "clsx";
import { components } from "react-select";

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

const ClearIndicator = (props) => {
  return (
    <components.ClearIndicator {...props}>
      <svg width="18" height="18">
        <use href="/sprite.svg#icon-cross-small" />
      </svg>
    </components.ClearIndicator>
  );
};

const CitySelect = ({ setFilters }) => {
  const dispatch = useDispatch();

  const loadOptions = async (inputValue) => {
    let data = [];
    if (!inputValue) {
      data = await dispatch(getLocations()).unwrap();
    } else if (inputValue.length >= 3) {
      data = await dispatch(getCities(inputValue)).unwrap();
    } else {
      return [];
    }

    return data.map((city) => ({
      value: city._id,
      label: `${city.cityEn}, ${city.stateEn}`,
    }));
  };

  return (
    <AsyncSelect
      className={css.citySelectContainer}
      classNames={selectClassNames}
      components={{ ClearIndicator }}
      cacheOptions
      defaultOptions
      isClearable
      loadOptions={loadOptions}
      placeholder="Location"
      onChange={(option) =>
        setFilters((prev) => ({
          ...prev,
          location: option?.label || "",
        }))
      }
    />
  );
};

export default CitySelect;
