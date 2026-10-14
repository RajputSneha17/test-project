import axios from "axios";

// Get reviews of a product
export const getReviews = async (url, productId) => {
  const response = await axios.get(`${url}/reviews/show/${productId}`);

  return response.data;
};

// Add review
export const addReview = async (url, reviewData) => {
  const response = await axios.post(`${url}/reviews/add`, reviewData);

  return response.data;
};

// Delete review
export const deleteReview = async (url, productId, reviewId, token) => {
  const response = await axios.delete(
    `${url}/reviews/delete/${productId}/${reviewId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
