import axios from "axios";

// Get all categories
export const getCategories = async (url) => {
  const response = await axios.get(`${url}/category/show`);
  return response.data;
};

// Get single category
export const getCategory = async (url, categoryId) => {
  const response = await axios.get(`${url}/category/show/${categoryId}`);

  return response.data;
};

// Get subcategories of a category
export const getSubCategories = async (url, categoryId) => {
  const response = await axios.get(`${url}/subcategory/category/${categoryId}`);

  return response.data;
};
