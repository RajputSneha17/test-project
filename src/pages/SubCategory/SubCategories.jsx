import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategory, getSubCategories } from "../../services/categoryApi";

const SubCategories = ({ url }) => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (image) => image || "";

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
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
        console.error("Error fetching subcategories:", error);

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

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url, categoryId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f9ee] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-green-200 border-t-green-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#f3f9ee] text-green-950 px-4 md:px-8 lg:px-12 py-10">
      <div className="max-w-7xl mx-auto">
        {category && (
          <div className="mb-10">
            <h1 className="text-3xl md:text-5xl font-bold">{category.name}</h1>

            {category.description && (
              <p className="mt-3 opacity-70 max-w-2xl">
                {category.description}
              </p>
            )}
          </div>
        )}

        <h2 className="text-2xl md:text-3xl font-bold mb-6">Subcategories</h2>

        {subCategories.length === 0 ? (
          <div className="text-center py-20">
            <p className="opacity-70">No subcategories available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {subCategories.map((subCategory) => {
              const image = getImageUrl(subCategory.image);

              return (
                <div
                  key={subCategory.id}
                  onClick={() =>
                    navigate(`/subcategory/${subCategory.id}`)
                  }
                  className="cursor-pointer bg-[#e8f4df] rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="w-full h-44 rounded-xl overflow-hidden bg-[#f3f9ee] flex items-center justify-center mb-4">
                    {image ? (
                      <img
                        src={image}
                        alt={subCategory.name || "Subcategory"}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-green-700/40 text-sm">
                        No image available
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold">{subCategory.name}</h3>

                  {subCategory.description && (
                    <p className="text-sm mt-2 opacity-70 line-clamp-2">
                      {subCategory.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default SubCategories;
