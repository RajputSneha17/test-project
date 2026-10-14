import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  if (!category) return null;

  const categoryId = category.id;

  const handleClick = () => {
    if (!categoryId) return;
    navigate(`/category/${categoryId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer rounded-2xl
                 overflow-hidden
                 bg-[#eef7e8]
                 border border-green-100
                 hover:shadow-xl
                 hover:-translate-y-1
                 transition-all duration-300"
    >
      {/* Image */}
      <div className="h-48 md:h-56 overflow-hidden">
        {category.image ? (
          <img
            src={category.image}
            alt={category.name || "Category"}
            loading="lazy"
            className="w-full h-full object-cover
                       group-hover:scale-105
                       transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="opacity-50 text-sm">No Image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold">{category.name}</h3>

        {category.description && (
          <p className="mt-2 text-sm opacity-60 line-clamp-2">
            {category.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
