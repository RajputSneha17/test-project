import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewForm from "./ReviewForm";
import StarRating from "./StarRating";

import { FaHeart, FaLeaf, FaMoneyBillWave, FaStar } from "react-icons/fa";
import { GiMilkCarton, GiMuscleUp } from "react-icons/gi";

const ProductReviews = ({ url, productId }) => {
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const categoryIcons = {
    Healthy: {
      icon: <FaHeart className="text-red-500" />,
      color: "bg-red-50 text-red-600",
    },

    Fresh: {
      icon: <FaLeaf className="text-green-500" />,
      color: "bg-green-50 text-green-600",
    },

    "High Protein": {
      icon: <GiMuscleUp className="text-blue-500" />,
      color: "bg-blue-50 text-blue-600",
    },

    Creamy: {
      icon: <GiMilkCarton className="text-purple-500" />,
      color: "bg-purple-50 text-purple-600",
    },

    Tasty: {
      icon: <FaStar className="text-yellow-500" />,
      color: "bg-yellow-50 text-yellow-700",
    },

    "Value For Money": {
      icon: <FaMoneyBillWave className="text-emerald-500" />,
      color: "bg-emerald-50 text-emerald-700",
    },
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${url}/reviews/show/${productId}`);

      if (response.data.success) {
        setReviews(response.data.reviews);
        console.log(reviews);
      }
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const ReviewsSection = (
    <div className="mt-8 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>

        <span className="text-gray-500">{reviews.length} Reviews</span>
      </div>

      {(showAllReviews ? reviews : reviews.slice(0, 4)).map((review) => (
        <div key={review._id} className="border border-gray-200 rounded-xl p-5">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="text-lg font-semibold">{review.name}</h3>

              {review.categories && review.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {review.categories.map((category, index) => {
                    const item = categoryIcons[category];

                    return (
                      <span
                        key={index}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          item?.color || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item?.icon}
                        {category}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <StarRating rating={review.rating} size={15} showValue={false} />

              <span className="text-sm text-gray-500 notranslate">
                {Number(review.rating).toFixed(1)}
              </span>
            </div>
          </div>

          <p className="mt-4 text-gray-600 leading-7">{review.review}</p>
        </div>
      ))}

      {reviews.length > 4 && (
        <div className="text-center">
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="text-orange-500 font-semibold cursor-pointer underline"
          >
            {showAllReviews ? "Show Less" : "Show More"}
          </button>
        </div>
      )}

      {reviews.length === 0 && (
        <div className="border border-gray-200 rounded-xl p-8 text-center text-gray-500">
          No Reviews Yet
        </div>
      )}
    </div>
  );

  return (
    <div className="mt-12">
      <ReviewForm
        url={url}
        productId={productId}
        onReviewAdded={fetchReviews}
      />

      {ReviewsSection}
    </div>
  );
};

export default ProductReviews;
