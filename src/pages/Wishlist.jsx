import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className="max-w-6xl mx-auto pt-28 px-5">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {wishlist.map((item) => {
            const itemId = item._id || item.id;

            return (
              <div key={itemId} className=" p-4 shadow cursor-pointer">
                <Link to={`/detail/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-52 object-cover rounded-lg"
                  />
                  <h2 className="font-semibold mt-3">{item.name}</h2>

                  {Number(item.price) > 0 && (
                    <p className="text-green-600 font-bold">₹{item.price}</p>
                  )}
                </Link>
                <button
                  onClick={() => removeFromWishlist(itemId)}
                  className="mt-4 cursor-pointer w-full bg-red-500 text-white py-2 rounded-lg"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
