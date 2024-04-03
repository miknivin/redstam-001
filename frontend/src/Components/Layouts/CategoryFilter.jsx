import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PRODUCT_CATEGORIES } from "../../Constants/constants";

const CategoryFilter = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const [activeCategory, setActiveCategory] = useState("Tea");

  useEffect(() => {
    // Check if 'category' parameter exists in the URL
    const categoryParam = searchParams.get("category");
    if (!categoryParam) {
      // If 'category' parameter doesn't exist, set it to 'Tea'
      searchParams.set("category", "Tea");
      navigate(`?${searchParams.toString()}`);
    } else {
      // If 'category' parameter exists, set the activeCategory state to its value
      setActiveCategory(categoryParam);
    }
  }, [navigate, searchParams]);

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
    <div className=" bg-base-100 dark:bg-gray-950 ">
      <div className="max-w-screen-xl mx-auto">
        <div className="heading py-8 px-4 flex justify-between">
          <h1 className="text-4xl lg:text-6xl text-gray-900 dark:text-gray-300 font-light text-start">
            Shop By Categories
            <div className=" h-[1.2px] w-32 bg-slate-200 mt-3 rounded-2xl"></div>
          </h1>

          <div className="dropdown dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 bg-gray-200 text-gray-900 hover:bg-gray-200/70 text-xl min-w-[6rem]"
            >
              {activeCategory}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[15] menu p-2 shadow rounded-box bg-base-300"
            >
              {PRODUCT_CATEGORIES.map((category) => (
                <div class="form-control" key={category}>
                  <label class="label cursor-pointer p-2">
                    <span class="label-text text-sm me-2">{category}</span>
                    <input
                      type="checkbox"
                      name="category"
                      value={category}
                      class="checkbox checkbox-primary"
                      checked={category === activeCategory}
                      // defaultChecked={defaultCheckHandler("category", category)}
                      onClick={(e) => handleClick(e.target)}
                    />
                  </label>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
