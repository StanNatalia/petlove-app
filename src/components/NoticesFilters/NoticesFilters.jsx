import css from "./NoticesFilters.module.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  fetchCategories,
  fetchSex,
  fetchSpecies,
} from "../../redux/Notices/options";
import SpeciesSelect from "../SpeciesSelect/SpeciesSelect";
import CitySelect from "../CitySelect/CitySelect";
import CategorySelect from "../CategorySelect/CategorySelect";
import GenderSelect from "../GenderSelect/GenderSelect";
const NoticesFilters = ({ filters, setFilters, items, setSortedItems }) => {
  const [activeSort, setActiveSort] = useState(null);

  const categoriesList = useSelector((state) => state.notices.categories);
  const sexList = useSelector((state) => state.notices.sex);
  const speciesList = useSelector((state) => state.notices.species);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSex());
    dispatch(fetchSpecies());
  }, [dispatch]);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const categoriesOptions = [
    { value: "", label: "Show all" },
    ...(categoriesList?.map((category) => ({
      value: category,
      label: capitalize(category),
    })) || []),
  ];
  const sexOptions = [
    { value: "", label: "Show all" },
    ...(sexList?.map((sex) => ({
      value: sex,
      label: capitalize(sex),
    })) || []),
  ];

  const speciesOptions = [
    { value: "", label: "Show all" },
    ...(speciesList?.map((species) => ({
      value: species,
      label: capitalize(species),
    })) || []),
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSort = (type) => {
    if (activeSort === type) return;
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
    setActiveSort(type);
  };

  const clearSort = () => {
    setActiveSort(null);
    setSortedItems([]);
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
            autoComplete="off"
          />
          {filters.search && (
            <svg
              width="18"
              height="18"
              className={css.clearInputIcon}
              onClick={() => setFilters((prev) => ({ ...prev, search: "" }))}
            >
              <use href="/sprite.svg#icon-cross-small" />
            </svg>
          )}
          <svg width="18" height="18" className={css.searchIcon}>
            <use href="/sprite.svg#icon-search" />
          </svg>
        </div>

        <CategorySelect
          categoriesOptions={categoriesOptions}
          filters={filters}
          setFilters={setFilters}
        />

        <GenderSelect
          sexOptions={sexOptions}
          filters={filters}
          setFilters={setFilters}
        />

        <SpeciesSelect
          speciesOptions={speciesOptions}
          filters={filters}
          setFilters={setFilters}
        />

        <CitySelect setFilters={setFilters} />
      </div>

      <div className={css.line}></div>

      <div className={css.sortBtn}>
        <button
          className={activeSort === "popular" ? css.active : ""}
          onClick={() => handleSort("popular")}
        >
          Popular
          {activeSort === "popular" && (
            <svg
              width="18"
              height="18"
              className={css.clearIcon}
              onClick={(e) => {
                e.stopPropagation();
                clearSort();
              }}
            >
              <use href="/sprite.svg#icon-cross-small" />
            </svg>
          )}
        </button>

        <button
          className={activeSort === "unpopular" ? css.active : ""}
          onClick={() => handleSort("unpopular")}
        >
          Unpopular
          {activeSort === "unpopular" && (
            <svg
              width="18"
              height="18"
              className={css.clearIcon}
              onClick={(e) => {
                e.stopPropagation();
                clearSort();
              }}
            >
              <use href="/sprite.svg#icon-cross-small" />
            </svg>
          )}
        </button>

        <button
          className={activeSort === "cheap" ? css.active : ""}
          onClick={() => handleSort("cheap")}
        >
          Cheap
          {activeSort === "cheap" && (
            <svg
              width="18"
              height="18"
              className={css.clearIcon}
              onClick={(e) => {
                e.stopPropagation();
                clearSort();
              }}
            >
              <use href="/sprite.svg#icon-cross-small" />
            </svg>
          )}
        </button>

        <button
          className={activeSort === "expensive" ? css.active : ""}
          onClick={() => handleSort("expensive")}
        >
          Expensive
          {activeSort === "expensive" && (
            <svg
              width="18"
              height="18"
              className={css.clearIcon}
              onClick={(e) => {
                e.stopPropagation();
                clearSort();
              }}
            >
              <use href="/sprite.svg#icon-cross-small" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default React.memo(NoticesFilters);
