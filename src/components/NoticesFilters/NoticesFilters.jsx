import Select from "react-select";
import css from "./NoticesFilters.module.css";
import { CategorySelectStyles } from "./CategorySelectStyles";
import { GenderSelectStyles } from "./GenderSelectStyles";
import { TypeSelectStyles } from "./TypeSelectStyles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchCategories,
  fetchSex,
  fetchSpecies,
} from "../../redux/Notices/options";

const NoticesFilters = ({ filters, setFilters, items, setSortedItems }) => {
  const categoriesList = useSelector((state) => state.notices.categories);
  const sexList = useSelector((state) => state.notices.sex);
  const speciesList = useSelector((state) => state.notices.species);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSex());
    dispatch(fetchSpecies());
  }, [dispatch]);

  const categoriesOptions =
    categoriesList?.map((category) => ({
      value: category,
      label: category,
    })) || [];

  const sexOptions =
    sexList?.map((sex) => ({
      value: sex,
      label: sex,
    })) || [];

  const speciesOptions =
    speciesList?.map((species) => ({
      value: species,
      label: species,
    })) || [];

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
        sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case "unpopular":
        sorted.sort((a, b) => (a.popularity || 0) - (b.popularity || 0));
        break;
    }
    setSortedItems(sorted);
  };

  console.log(items);

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
          options={categoriesOptions}
          placeholder="Category"
          menuPosition="fixed"
          isClearable
          value={categoriesOptions.find((e) => e.value === filters.category)}
          onChange={(option) =>
            setFilters((prev) => ({ ...prev, category: option?.value || "" }))
          }
        />

        <Select
          styles={GenderSelectStyles}
          options={sexOptions}
          placeholder="By gender"
          menuPosition="fixed"
          value={sexOptions.find((e) => e.value === filters.gender)}
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
