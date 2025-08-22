import Select from "react-select";
import css from "./NoticesFilters.module.css";
import { CustomSelectStyles } from "./CustomSelectStyles";

const NoticesFilters = ({ filters, setFilters }) => {
  const categoryOptions = [
    { value: "sell", label: "Sell" },
    { value: "free", label: "Free" },
    { value: "lost", label: "Lost" },
    { value: "found", label: "Found" },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "lost", label: "Lost" },
    { value: "unknown", label: "Unknown" },
  ];

  const speciesOptions = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "fish", label: "Fish" },
    { value: "monkey", label: "Monkey" },
    { value: "bird", label: "Bird" },
    { value: "snake", label: "Snake" },
    { value: "turtle", label: "Turtle" },
    { value: "lizard", label: "Lizard" },
    { value: "frog", label: "Frog" },
    { value: "ants", label: "Ants" },
    { value: "bees", label: "Bees" },
    { value: "butterfly", label: "Butterfly" },
    { value: "spider", label: "Spider" },
    { value: "scorpion", label: "Scorpion" },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={css.filters}>
      <div className={css.searchWrapper}>
        <input
          type="text"
          name="search"
          placeholder="Search..."
          value={filters.search}
          onChange={handleFilterChange}
          className={css.searchInput}
        />
        <svg width="18" height="18" className={css.searchIcon}>
          <use href="/sprite.svg#icon-search" />
        </svg>
      </div>

      <Select
        styles={CustomSelectStyles}
        options={categoryOptions}
        placeholder="Category"
        menuPortalTarget={null}
        menuPlacement="bottom"
        menuPosition="fixed"
        value={categoryOptions.find((e) => e.value === filters.category)}
        onChange={(option) =>
          setFilters((prev) => ({ ...prev, category: option?.value || "" }))
        }
      />

      <Select
        options={genderOptions}
        placeholder="By gender"
        menuPosition="absolute"
        value={genderOptions.find((e) => e.value === filters.gender)}
        onChange={(option) =>
          setFilters((prev) => ({ ...prev, gender: option?.value || "" }))
        }
      />

      <Select
        options={speciesOptions}
        placeholder="By type"
        menuPosition="absolute"
        value={speciesOptions.find((e) => e.value === filters.species)}
        onChange={(option) =>
          setFilters((prev) => ({ ...prev, species: option?.value || "" }))
        }
      />

      <div className={css.locationWrapper}>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
          className={css.locationInput}
        />
        <svg width="18" height="18" className={css.searchIcon}>
          <use href="/sprite.svg#icon-search" />
        </svg>
      </div>
    </div>
  );
};

export default NoticesFilters;
