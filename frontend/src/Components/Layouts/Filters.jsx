import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../../helpers/helper";
import { PRODUCT_CATEGORIES } from "../../Constants/constants";
import StarRatings from "react-star-ratings";
const Filters = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    searchParams.has("min") && setMin(searchParams.get("min"));
    searchParams.has("max") && setMax(searchParams.get("max"));
  }, [searchParams]);

  // Handle price filter
  const handleButtonClick = (e) => {
    e.preventDefault();

    searchParams = getPriceQueryParams(searchParams, "min", min);
    searchParams = getPriceQueryParams(searchParams, "max", max);

    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  // Handle category & rating filter
  const handleClick = (checkbox) => {
    const checkboxes = document.getElementsByName(checkbox.name);

    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });

    if (checkbox.checked === false) {
      //Delete filter from query
      if (searchParams.has(checkbox.name)) {
        searchParams.delete(checkbox.name);
        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
      }
    } else {
      // Set new filter value if already there
      if (searchParams.has(checkbox.name)) {
        searchParams.set(checkbox.name, checkbox.value);
      } else {
        //append new filter
        searchParams.append(checkbox.name, checkbox.value);
      }

      const path = window.location.pathname + "?" + searchParams.toString();
      navigate(path);
    }
  };

  const defaultCheckHandler = (checkboxType, checkboxValue) => {
    const value = searchParams.get(checkboxType);
    if (checkboxValue === value) return true;
    return false;
  };

  return (
    <div className="border p-3 filter text-base-300">
      <h3>Filters</h3>
      <hr />
      <h5 className="filter-heading mb-3">Price</h5>
      <form id="filter_form" className="" onSubmit={handleButtonClick}>
        <div className="row flex ">
          <div className="col w-24 me-3">
            <input
              type="text"
              placeholder="Min ($)"
              className="input input-bordered input-primary bg-transparent p-2 w-full max-w-xs"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
          </div>
          <div className="col w-24 me-3">
            <input
              type="text"
              placeholder="Max ($)"
              className="input input-bordered input-primary bg-transparent p-2  w-full max-w-xs"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">
              GO
            </button>
          </div>
        </div>
      </form>
      <hr />
      <h5 className="mb-3">Category</h5>
      {PRODUCT_CATEGORIES.map((category) => (
        <div class="form-control">
          <label class="label cursor-pointer p-2">
            <span class="label-text text-base-300 text-sm">{category}</span>
            <input
              type="checkbox"
              name="category"
              value={category}
              class="checkbox checkbox-primary"
              defaultChecked={defaultCheckHandler("category", category)}
              onClick={(e) => handleClick(e.target)}
            />
          </label>
        </div>
      ))}
      <hr />
      <h5 className="mb-3">Ratings</h5>

      {[5, 4, 3, 2, 1].map((rating) => (
        <div className="form-check my-2">
          <input
            className=" checkbox align-middle"
            type="checkbox"
            name="ratings"
            id="check7"
            value={rating}
            defaultChecked={defaultCheckHandler("ratings", rating?.toString)}
            onClick={(e) => handleClick(e.target)}
          />
          <label className="form-check-label" for="check7">
            <StarRatings
              rating={rating}
              starRatedColor="#FFBE00"
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="1px"
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default Filters;
