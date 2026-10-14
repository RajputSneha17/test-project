import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getCategory, getSubCategories } from "../../services/categoryApi";

import SubCategoryCard from "../../components/SubCategoryCard";
import Loader from "../../components/Loader";

const CategoryDetails = ({ url }) => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchCategoryData = async () => {
      setLoading(true);

      try {
        const [categoryData, subCategoryData] = await Promise.all([
          getCategory(url, categoryId),
          getSubCategories(url, categoryId),
        ]);

        const categoryResult = categoryData?.category ?? categoryData;

        const subCategoryList = Array.isArray(subCategoryData)
          ? subCategoryData
          : subCategoryData?.subcategories ||
            subCategoryData?.subCategories ||
            [];

        if (!cancelled) {
          setCategory(categoryResult);
          setSubCategories(subCategoryList);
        }
      } catch (error) {
        console.error("Error fetching category details:", error);

        if (!cancelled) {
          setCategory(null);
          setSubCategories([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchCategoryData();

    return () => {
      cancelled = true;
    };
  }, [url, categoryId]);

  if (loading) {
    return <Loader text="Loading category..." />;
  }

  if (!category) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#285a31]">
            Category not found
          </h2>

          <button
            onClick={() => navigate("/categories")}
            className="mt-5 px-6 py-3 rounded-xl bg-[#285a31] text-white"
          >
            View Categories
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-4 md:px-8 lg:px-12 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          {category.image && (
            <div className="w-full h-56 md:h-72 overflow-hidden rounded-3xl mb-6">
              <img
                src={category.image}
                alt={category.name || "Category"}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          <h1 className="text-3xl md:text-5xl font-bold text-[#285a31]">
            {category.name}
          </h1>

          {category.description && (
            <p className="mt-3 max-w-3xl text-[#315c38]/70 leading-relaxed">
              {category.description}
            </p>
          )}
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#285a31] mb-6">
            Shop by Subcategory
          </h2>

          {subCategories.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-[#315c38]/60">No subcategories available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
              {subCategories.map((subCategory) => (
                <SubCategoryCard
                  key={subCategory.id}
                  subCategory={subCategory}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryDetails;
