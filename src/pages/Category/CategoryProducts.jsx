import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductsByCategory } from "../../services/productApi";

import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";

const CategoryProducts = ({ url }) => {
  const { categoryId } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      setLoading(true);

      try {
        const data = await getProductsByCategory(url, categoryId);

        const productList = Array.isArray(data) ? data : data?.products || [];

        if (!cancelled) {
          setProducts(productList);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);

        if (!cancelled) {
          setProducts([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [url, categoryId]);

  if (loading) {
    return <Loader text="Loading products..." />;
  }

  return (
    <section className="min-h-screen px-4 md:px-8 lg:px-12 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#285a31] mb-8">
          Products
        </h1>

        {products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[#315c38]/60">No products available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.publicId} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryProducts;
