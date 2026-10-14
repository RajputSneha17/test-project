import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryApi";
import CategoryCard from "../../components/CategoryCard";
import Loader from "../../components/Loader";

const Categories = ({ url }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchCategories = async () => {
      setLoading(true);

      try {
        const data = await getCategories(url);

        const categoryList = Array.isArray(data)
          ? data
          : data?.categories || [];

        if (!cancelled) {
          setCategories(categoryList);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);

        if (!cancelled) {
          setCategories([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      cancelled = true;
    };
  }, [url]);

  if (loading) {
    return <Loader text="Loading categories..." />;
  }

  return (
    <section className="min-h-screen px-4 md:px-8 lg:px-12 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-[#285a31]">
            Categories
          </h1>

          <p className="mt-3 text-[#315c38]/70">
            Explore our product categories
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[#315c38]/60">No categories available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
