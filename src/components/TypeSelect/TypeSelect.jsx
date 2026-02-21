import Select from "react-select";
import { useState } from "react";
import css from "./TypeSelect.module.css";

const options = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "bird", label: "Bird" },
  { value: "monkey", label: "Monkey" },
  { value: "turtle", label: "Turtle" },
  { value: "fish", label: "Fish" },
  { value: "lizard", label: "Lizard" },
  { value: "snake", label: "Snake" },
  { value: "frog", label: "Frog" },
  { value: "bees", label: "Bees" },
  { value: "butterfly", label: "Butterfly" },
  { value: "spider", label: "Spider" },
  { value: "scorpion", label: "Scorpion" },
];

const TypeSelect = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      border: state.isFocused
        ? "1px solid #f6b83d"
        : "1px solid rgba(38, 38, 38, 0.15)",
      borderRadius: "30px",
      padding: "0 16px",
      width: "210px",
      height: "52px",
      minHeight: "52px",
      boxShadow: "none",
      cursor: "pointer",
      "&:hover": {
        border: "1px solid #f6b83d",
      },
    }),

    valueContainer: (base) => ({
      ...base,
      padding: 0,
    }),

    placeholder: (base) => ({
      ...base,
      fontWeight: 500,
      fontSize: "16px",
      fontFamily: '"Manrope", sans-serif',
      lineHeight: "125%",
      letterSpacing: "-0.03em",
      color: "rgba(38, 38, 38, 0.6)",
    }),

    singleValue: (base) => ({
      ...base,
      fontWeight: 500,
      fontSize: "16px",
      fontFamily: '"Manrope", sans-serif',
      lineHeight: "125%",
      letterSpacing: "-0.03em",
      color: "rgba(38, 38, 38, 0.6)",
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),

    dropdownIndicator: (base) => ({
      ...base,
      padding: 0,
    }),
    menu: (base) => ({
      ...base,
      width: "210px",
      borderRadius: "20px",
    }),

    menuList: (base) => ({
      ...base,
      overflowY: "auto",
      maxHeight: "126px",
      height: "126px",
      marginRight: "7px",
      paddingTop: "10px",
      paddingLeft: "4px",
      paddingBottom: "0px",
    }),

    option: (base, state) => ({
      ...base,
      fontWeight: 500,
      fontSize: "16px",
      padding: "4px 14px",
      fontFamily: '"Manrope", sans-serif',
      lineHeight: "125%",
      letterSpacing: "-0.03em",
      color: state.isFocused ? "#f9b020" : "rgba(38, 38, 38, 0.6)",
      backgroundColor: "none",
      cursor: "pointer",
    }),
  };

  return (
    <div className={css.wrapper}>
      <Select
        name="category"
        options={options}
        classNamePrefix="type-select"
        styles={customStyles}
        value={selectedOption}
        onChange={setSelectedOption}
        placeholder="Type of pet"
        menuPortalTarget={document.body} // по умолчанию react-select так делает
        menuPosition="fixed" // либо absolute
      />
    </div>
  );
};

export default TypeSelect;
