import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({
  rating = 0,
  size = 18,
  showValue = true,
  reviewCount,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar
            key={`full-${index}`}
            size={size}
            className="text-orange-500"
          />
        ))}

        {hasHalfStar && (
          <FaStarHalfAlt size={size} className="text-orange-500" />
        )}

        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar
            key={`empty-${index}`}
            size={size}
            className="text-orange-500"
          />
        ))}
      </div>

      {showValue && (
        <>
          <span className="font-semibold text-lg">
            {Number(rating).toFixed(1)}
          </span>

          {reviewCount !== undefined && (
            <span className="text-gray-500">({reviewCount} Reviews)</span>
          )}
        </>
      )}
    </div>
  );
};

export default StarRating;
