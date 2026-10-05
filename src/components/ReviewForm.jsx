import { useState } from "react";
import { Star, X } from "lucide-react";
import { FaLeaf, FaFire, FaMoneyBillWave, FaHeart } from "react-icons/fa";
import { GiMuscleUp, GiMilkCarton } from "react-icons/gi";
import axios from "axios";
import Swal from "sweetalert2";

const categories = [
  {
    label: "Healthy",
    value: "Healthy",
    icon: <FaHeart className="text-red-500" />,
  },
  {
    label: "Fresh",
    value: "Fresh",
    icon: <FaLeaf className="text-green-600" />,
  },
  {
    label: "High Protein",
    value: "High Protein",
    icon: <GiMuscleUp className="text-orange-600" />,
  },
  {
    label: "Creamy",
    value: "Creamy",
    icon: <GiMilkCarton className="text-blue-500" />,
  },
  {
    label: "Tasty",
    value: "Tasty",
    icon: <Star className="fill-yellow-400 text-yellow-400" size={16} />,
  },
  {
    label: "Value For Money",
    value: "Value For Money",
    icon: <FaMoneyBillWave className="text-green-700" />,
  },
];

const ReviewForm = ({ url, productId, onReviewAdded }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const toggleCategory = (value) => {
    if (categoriesSelected.includes(value)) {
      setCategoriesSelected(
        categoriesSelected.filter((item) => item !== value),
      );
    } else {
      setCategoriesSelected([...categoriesSelected, value]);
    }
  };
  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewName = user?.username || name;

    if (!reviewName.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Enter Name",
        text: "Please enter your name.",
        confirmButtonColor: "#b45309",
      });
    }

    if (rating === 0) {
      return Swal.fire({
        icon: "warning",
        title: "Select Rating",
        text: "Please select your rating.",
        confirmButtonColor: "#b45309",
      });
    }

    if (!message.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Enter Review",
        text: "Please write your review.",
        confirmButtonColor: "#b45309",
      });
    }

    try {
      setLoading(true);

      const { data } = await axios.post(`${url}/reviews/add`, {
        productId,
        name: reviewName,
        rating,
        review: message,
        categories: categoriesSelected,
      });

      if (data.success) {
        setName("");
        setRating(0);
        setMessage("");
        setCategoriesSelected([]);

        if (onReviewAdded) {
          onReviewAdded();
        }

        await Swal.fire({
          icon: "success",
          title: "Review Submitted",
          text: data.message,
          confirmButtonColor: "#b45309",
        });

        setShowForm(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Review Failed",
        text: error.response?.data?.message || "Something went wrong!",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-[90%] max-w-2xl mx-auto py-16">
      {!showForm ? (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            We'd Love Your Feedback ❤️
          </h2>

          <p className="text-gray-600 mt-4 leading-7 max-w-xl mx-auto">
            Your opinion helps us improve our products and assists other
            customers in making the right choice. If you've purchased this
            product, we'd truly appreciate it if you could take a moment to
            share your valuable experience with us.
          </p>

          <button
            onClick={() => setShowForm(true)}
            className="mt-8 bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-xl font-semibold transition cursor-pointer"
          >
            Write Your Valuable Review
          </button>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Write Your Review</h2>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Name</label>

              {user?.username ? (
                <div className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-700">
                  {user.username}
                </div>
              ) : (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-amber-700"
                />
              )}
            </div>

            <div>
              <label className="block mb-3 font-medium">
                Rating <span className="text-red-500">*</span>
              </label>

              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="cursor-pointer hover:scale-110 transition"
                  >
                    <Star
                      size={38}
                      className={`${
                        star <= rating
                          ? "fill-orange-500 text-orange-500"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {rating > 0 && (
                <p className="text-center text-sm text-gray-500 mt-2">
                  {rating} out of 5
                </p>
              )}
            </div>

            <div>
              <label className="block mb-3 font-medium">
                Product Highlights
                <span className="text-gray-400 text-sm ml-2">(Optional)</span>
              </label>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => toggleCategory(item.value)}
                    className={`flex items-center justify-center gap-2 border rounded-xl py-3 px-3 transition cursor-pointer ${
                      categoriesSelected.includes(item.value)
                        ? "bg-amber-700 text-white border-amber-700"
                        : "border-gray-300 hover:border-amber-700"
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Review <span className="text-red-500">*</span>
              </label>

              <textarea
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your review..."
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none outline-none focus:border-amber-700"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-700 hover:bg-amber-800 disabled:opacity-60 text-white py-3.5 rounded-xl font-semibold transition cursor-pointer"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default ReviewForm;
