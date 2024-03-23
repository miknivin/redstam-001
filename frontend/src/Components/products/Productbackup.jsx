import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "./product-item.css";
function ProductItem({ product }) {
  return (
    <div className="card bg-base-100 shadow-xl  overflow-hidden m-5 md:m-0">
      <Link to={`products/${product._id}`}>
        <div className="w-full">
          <figure>
            <img
              className=" w-full h-full aspect-video object-cover object-center"
              src={product?.images[0]?.url}
              alt={product.name}
            />
          </figure>
        </div>
        <div className="card-body p-6">
          <h2 className="card-title">{product?.name}</h2>
          <div className="price flex justify-around items-start gap-4">
            <s className="text-2xl">₹{Math.ceil(product.price * 2)}</s>
            <p className="text-red-400 text-sm">₹{Math.ceil(product.price)}</p>
          </div>

          <div className="card-actions justify-between items-center flex-row-reverse">
            <button className="btn  btn-warning px-2">Add to Cart</button>
            {/* rating */}
            <div className="rating">
              <StarRatings
                rating={product.ratings}
                starRatedColor="#FFBE00"
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="1px"
              />
              <div className="badge border border-warning ms-3 p-3 rounded-full text-xs flex justify-center items-center badge-xs">
                {product.numOfReviews}
              </div>
              {/* <span className='ps-3 text-xl border border-white rounded-full text-center'></span> */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductItem;
