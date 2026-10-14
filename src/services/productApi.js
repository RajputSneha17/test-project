import axios from "axios";

// Get all products
export const getProducts = async (url) => {
  const response = await axios.get(`${url}/product/show`);

  return response.data;
};

// Get single product
export const getProduct = async (url, productId) => {
  const response = await axios.get(`${url}/product/show/${productId}`);

  return response.data;
};

// Get products by subcategory
export const getProductsBySubCategory = async (url, subCategoryId) => {
  const response = await axios.get(
    `${url}/product/subcategory/${subCategoryId}`,
  );

  return response.data;
};

// Get products by category
export const getProductsByCategory = async (url, categoryId) => {
  const response = await axios.get(`${url}/product/category/${categoryId}`);

  return response.data;
};

// Get PFC Special products
export const getPfcSpecialProducts = async (url) => {
  const response = await axios.get(`${url}/product/pfc-special`);

  return response.data;
};
