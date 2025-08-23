import Select from "react-select";
import css from "./NoticesFilters.module.css";
import { CategorySelectStyles } from "./CategorySelectStyles";
import { GenderSelectStyles } from "./GenderSelectStyles";
import { TypeSelectStyles } from "./TypeSelectStyles";

const NoticesFilters = ({ filters, setFilters, items, setSortedItems }) => {
  const categoryOptions = [
    { value: "", label: "Show all" },
    { value: "sell", label: "Sell" },
    { value: "free", label: "Free" },
    { value: "lost", label: "Lost" },
    { value: "found", label: "Found" },
  ];

  const genderOptions = [
    { value: "", label: "Show all" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "lost", label: "Lost" },
    { value: "unknown", label: "Unknown" },
  ];

  const speciesOptions = [
    { value: "", label: "Show all" },
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

  const handleSort = (type) => {
    let sorted = [...items];
    switch (type) {
      case "expensive":
        sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "cheap":
        sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "popular":
        sorted.sort((a, b) => (b.popular || 0) - (a.popular || 0));
        break;
      case "unpopular":
        sorted.sort((a, b) => (a.popular || 0) - (b.popular || 0));
        break;
    }
    setSortedItems(sorted);
  };

  return (
    <div className={css.filters}>
      <div className={css.filterWrapper}>
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
          styles={CategorySelectStyles}
          options={categoryOptions}
          placeholder="Category"
          menuPosition="fixed"
          value={categoryOptions.find((e) => e.value === filters.category)}
          onChange={(option) =>
            setFilters((prev) => ({ ...prev, category: option?.value || "" }))
          }
        />

        <Select
          styles={GenderSelectStyles}
          options={genderOptions}
          placeholder="By gender"
          menuPosition="fixed"
          value={genderOptions.find((e) => e.value === filters.gender)}
          onChange={(option) =>
            setFilters((prev) => ({ ...prev, gender: option?.value || "" }))
          }
        />

        <Select
          styles={TypeSelectStyles}
          options={speciesOptions}
          placeholder="By type"
          menuPosition="fixed"
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

      <div className={css.sortBtn}>
        <button onClick={() => handleSort("expensive")}>Expensive</button>
        <button onClick={() => handleSort("cheap")}>Cheap</button>
        <button onClick={() => handleSort("popular")}>Popular</button>
        <button onClick={() => handleSort("unpopular")}>Unpopular</button>
      </div>
      <div className={css.line}></div>
    </div>
  );
};

export default NoticesFilters;
