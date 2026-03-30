import Select from "react-select";
import css from "./TypeSelect.module.css";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import clsx from "clsx";

const TypeSelect = ({ types }) => {
  const getIsMobile = () => window.innerWidth <= 500;

  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(getIsMobile());
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedValue = watch("type");

  // const customStyles = {
  //   control: (base, state) => ({
  //     ...base,
  //     border: state.isFocused
  //       ? "1px solid #f6b83d"
  //       : "1px solid rgba(38, 38, 38, 0.15)",
  //     borderRadius: "30px",
  //     padding: isMobile ? "0 12px" : "0 16px",
  //     width: "100%",
  //     boxShadow: "none",
  //     cursor: "pointer",
  //     "&:hover": {
  //       border: "1px solid #f6b83d",
  //     },
  //   }),

  //   valueContainer: (base) => ({
  //     ...base,
  //     padding: 0,
  //   }),

  //   placeholder: (base) => ({
  //     ...base,
  //     fontWeight: 500,
  //     fontSize: isMobile ? "14px" : "16px",
  //     fontFamily: '"Manrope", sans-serif',
  //     lineHeight: "125%",
  //     letterSpacing: "-0.03em",
  //     color: "rgba(38, 38, 38, 0.6)",
  //   }),

  //   singleValue: (base) => ({
  //     ...base,
  //     fontWeight: 500,
  //     fontSize: isMobile ? "14px" : "16px",
  //     fontFamily: '"Manrope", sans-serif',
  //     lineHeight: "125%",
  //     letterSpacing: "-0.03em",
  //     color: "rgba(38, 38, 38, 0.6)",
  //   }),

  //   indicatorSeparator: () => ({
  //     display: "none",
  //   }),

  //   dropdownIndicator: (base) => ({
  //     ...base,
  //     padding: 0,
  //   }),
  //   menu: (base) => ({
  //     ...base,
  //     width: "210px",
  //     borderRadius: "20px",
  //   }),

  //   menuList: (base) => ({
  //     ...base,
  //     overflowY: "auto",
  //     maxHeight: "126px",
  //     height: "126px",
  //     marginRight: "7px",
  //     paddingTop: "10px",
  //     paddingLeft: "4px",
  //     paddingBottom: "0px",
  //   }),

  //   option: (base, state) => ({
  //     ...base,
  //     fontWeight: 500,
  //     fontSize: "16px",
  //     padding: "4px 14px",
  //     fontFamily: '"Manrope", sans-serif',
  //     lineHeight: "125%",
  //     letterSpacing: "-0.03em",
  //     color: state.isFocused ? "#f9b020" : "rgba(38, 38, 38, 0.6)",
  //     backgroundColor: "none",
  //     cursor: "pointer",
  //   }),
  // };

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

  return (
    <div className={css.wrapper}>
      <Select
        className={css.speciesSelectContainer}
        classNames={selectClassNames}
        name="category"
        options={types}
        classNamePrefix="type-select"
        value={types.find((opt) => opt.value === selectedValue) || null}
        onChange={(option) =>
          setValue("type", option.value, {
            shouldValidate: true,
            shouldDirty: true,
          })
        }
        placeholder="Type of pet"
      />
      {errors.type && <p className={css.error}>{errors.type.message}</p>}
    </div>
  );
};

export default TypeSelect;
