import { useNavigate } from "react-router-dom";

const SubCategoryCard = ({ subCategory }) => {
  const navigate = useNavigate();

  if (!subCategory) return null;

  const subCategoryId = subCategory.id;

  const handleClick = () => {
    if (!subCategoryId) return;
    navigate(`/subcategory/${subCategoryId}`);
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
      <div className="h-40 md:h-48 overflow-hidden">
        {subCategory.image ? (
          <img
            src={subCategory.image}
            alt={subCategory.name || "Subcategory"}
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
      <div className="p-4">
        <h3 className="text-lg font-semibold">{subCategory.name}</h3>

        {subCategory.description && (
          <p className="text-sm opacity-60 mt-1 line-clamp-2">
            {subCategory.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default SubCategoryCard;
