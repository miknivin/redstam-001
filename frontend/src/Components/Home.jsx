import Banners from "./Layouts/Banners/Banners";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import Metadata from "./Layouts/Metadata";
import { useGetProductsQuery } from "../redux/api/productsApi.js";
import Categories from "./Layouts/Categories.jsx";
import ProductItem from "./products/ProductItem.jsx";
import Loader from "./Layouts/Loader.jsx";
import { useEffect } from "react";
import toast from "react-hot-toast";
import CustomPagination from "./Layouts/CustomPagination.jsx";
import { useSearchParams } from "react-router-dom";
import Filters from "./Layouts/Filters.jsx";
import NoResultPage from "./utilities/NoResultPage.jsx";
import About from "./Layouts/About.jsx";
import Mission from "./Layouts/Mission.jsx";

function Home() {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings");
  const params = { page, keyword };
  min != null && (params.min = min);
  max != null && (params.max = max);
  category != null && (params.category = category);
  ratings != null && (params.ratings = ratings);

  const { data, isLoading, isError, error } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [error?.data?.message, isError]);

  if (isLoading) return <Loader />;
  if (!isLoading && data?.filteredProducts.length === 0)
    return <NoResultPage />;
  return (
    <>
      <Metadata title={"Natural Products Online"} />
      <div>
        {/* Conditionally render Banners only when there is no keyword */}
        {!keyword && <Banners />}
        {!keyword && <About />}
        <section id="categories">
          {/* Conditionally render Categories only when there is no keyword */}
          {/* {!keyword && <Categories />} */}
        </section>
        {/* all products section */}
        <section id="products" className="bg-gray-900">
        <Mission/>
          <div className="text-center">
            {/* <h1 className="text-5xl font-bold py-5 text-base-300">
              {keyword
                ? `${data?.filteredProducts?.length} Products found with this Keyword : ${keyword}`
                : "All Products"}
            </h1> */}
          </div>
          <div
            className={`flex justify-center py-3  ${keyword ? "w-[90%]" : ""} mx-auto w-full`}
          >
            {/* Add another column with filter information when a keyword exists */}
            {/* {keyword && (
              <div className="hidden md:block md:w-1/4 px-4">
                <p className="text-lg font-bold">Filters:</p>
                <Filters />
              </div>
            )} */}
            <div className={``}>
              {data?.filteredProducts?.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
          </div>
          <CustomPagination
            resPerPage={data?.resPerPage}
            filteredProductsCount={data?.filteredProductsCount}
          />
        </section>
      </div>
    </>
  );
}

export default Home;
