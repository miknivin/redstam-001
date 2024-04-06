import React, { useEffect, useState } from "react";
import {
  useCanUserReviewQuery,
  useSubmitReviewMutation,
} from "../../redux/api/productsApi";
import toast from "react-hot-toast";
import StarRatings from "react-star-ratings";
const NewReview = ({ productId, closeModal }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [submitReview, { isLoading, error, isSuccess }] =
    useSubmitReviewMutation();

  const { data } = useCanUserReviewQuery(productId);
  const canReview = data?.canReview;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Review Posted");
      closeModal();
    }
  }, [closeModal, error, isSuccess]);

  const submitHandler = () => {
    const reviewData = { rating, comment, productId };
    submitReview(reviewData);
  };

  return (
    <div>
      <div class=" w-full flex flex-col justify-center items-center mx-auto">
        <div class="">
          <h5 class="modal-title text-3xl" id="ratingModalLabel">
            Submit Review
          </h5>
        </div>
        <div class="modal-body">
          <div className="my-4">
            <StarRatings
              rating={rating}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name="rating"
              changeRating={(e) => setRating(e)}
            />
          </div>

          <textarea
            name="review"
            id="review"
            class="border border-gray-300 rounded-lg mt-4 p-2 w-full"
            placeholder="Enter your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <button
            id="new_review_btn"
            class="bg-blue-500 text-white rounded-lg w-full mt-4 py-2 px-4 w-full"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={submitHandler}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewReview;
