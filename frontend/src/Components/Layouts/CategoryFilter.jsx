import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PRODUCT_CATEGORIES } from "../../Constants/constants";

const CategoryFilter = () => {
  const navigate = useNavigate();


  const [activeCategory, setActiveCategory] = useState("All Products");
  const [allCategories, setAllCategories] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Run only once after the component mounts
    setAllCategories(["All Products", ...PRODUCT_CATEGORIES]);
  }, []);

  useEffect(() => {
    // Check if 'category' parameter exists in the URL
    const categoryParam = searchParams.get("category");
    console.log(categoryParam);

    if (!categoryParam || categoryParam==="All Products") {
      // If 'category' parameter doesn't exist, set it to 'Tea'
      setActiveCategory("All Products")
      searchParams.delete("category");
      setSearchParams(searchParams);
      console.log(categoryParam);
    } else {
      // If 'category' parameter exists, set the activeCategory state to its value
      setActiveCategory(categoryParam);
    }
  }, [activeCategory, navigate, searchParams, setSearchParams]);

  const handleClick = (checkbox) => {
    const checkboxes = document.getElementsByName(checkbox.name);
    setActiveCategory(checkbox.value);
    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });

    if (checkbox.checked === false) {
      if (searchParams.has(checkbox.name)) {
        searchParams.delete(checkbox.name);
        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
      }
    } else {
      if (searchParams.has(checkbox.name)) {
        searchParams.set(checkbox.name, checkbox.value);
      } else {
        searchParams.append(checkbox.name, checkbox.value);
      }

      const path = window.location.pathname + "?" + searchParams.toString();
      navigate(path);
    }
  };

  // const defaultCheckHandler = (checkboxType, checkboxValue) => {
  //   const value = searchParams.get(checkboxType);
  //   if (checkboxValue === value) return true;
  //   return false;
  // };

  return (
          <div className="dropdown dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className=" text-gray-200 block py-2 px-3 rounded md:bg-transparent md:hover:text-red-500 md:p-0 font-bold"
            >
              {activeCategory}<i className="fa-solid fa-chevron-down text-sm ms-2"></i>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[15] menu p-2 shadow rounded-box bg-base-300 min-w-[200px]"
            >
              {allCategories.map((category) => (
                <div class="form-control" key={category}>
                  <label class="label cursor-pointer p-2">
                    <span class="label-text text-sm me-2">{category}</span>
                    <input
                      type="checkbox"
                      name="category"
                      value={category}
                      class="checkbox checkbox-error"
                      checked={category === activeCategory}
                      // defaultChecked={defaultCheckHandler("category", category)}
                      onClick={(e) => handleClick(e.target)}
                    />
                  </label>
                </div>
              ))}
            </ul>
          </div>
  );
};

export default CategoryFilter;
