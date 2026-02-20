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
];

const TypeSelect = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const customStyles = {
    control: (base) => ({
      ...base,
      alignItems: "center",
      background: "none",
      border: isError
        ? "1px solid var(--main-red)"
        : "1px solid var(--main-black)",
      height: "44px",
      borderRadius: "8px",
      cursor: "pointer",
      boxShadow: "none",
      fontFamily: "var(--font-family)",
      fontWeight: "500",
      fontSize: "18px",
    }),
    valueContainer: (base) => ({
      ...base,
      color: isError ? "var(--main-red)" : "black",
    }),
    singleValue: (base) => ({
      ...base,
      color: isError ? "var(--main-red)" : "black",
      fontWeight: 500,
    }),
    placeholder: (base) => ({
      ...base,
      color: isError ? "var(--main-red)" : "black",
    }),
    input: (base) => ({
      ...base,
      color: isError ? "var(--main-red)" : "black",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "8px",
      background: "linear-gradient(180deg, #294045 0%, #1e2f33 100%)",
      margin: "0",
      zIndex: 100,
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "157px",
      overflowY: "auto",
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused
        ? "linear-gradient(180deg, #355359 0%, #3b5d63 100%)"
        : "transparent",
      color: "#fcfcfc",
      cursor: "pointer",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  return (
    <div className={css.wrapper}>
      <Select
        name="category"
        options={options}
        style={customStyles}
        value={selectedOption}
        onChange={setSelectedOption}
        placeholder="Type of pet"
      />
    </div>
  );
};

export default TypeSelect;
