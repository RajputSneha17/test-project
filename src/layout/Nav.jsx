import { User, Heart } from "lucide-react";
import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { WishlistContext } from "../context/WishlistContext";
import GoogleTranslate from "../components/GoogleTranslate";
import MobileNav from "./MobileNav";

const Nav = () => {
  const { wishlist } = useContext(WishlistContext);

  const navigate = useNavigate();

  const savedUser = localStorage.getItem("user");

  const totalWishlist = wishlist.length;

  const categories = [
    {
      name: "PFC Special",
      path: "/category/pfc-special",
    },
    {
      name: "Grocery",
      path: "/category/grocery",
    },
    {
      name: "Fruits & Vegetables",
      path: "/category/fruits-vegetables",
    },
    {
      name: "Dairy",
      path: "/category/dairy",
    },
    {
      name: "Clothes",
      path: "/category/clothes",
    },
    {
      name: "Household",
      path: "/category/household",
    },
  ];

  return (
    <>
      {/* =====================================================
          DESKTOP NAVBAR
      ===================================================== */}

      <nav className="fixed top-0 left-0 w-full z-50">
        {/* ===================================================
            TOP NAV
        =================================================== */}

        <div
          className="
            h-[82px]
            w-full
            px-5
            md:px-10
            lg:px-20

            flex
            items-center
            justify-between

            bg-[#f7fbf3]/95
            backdrop-blur-xl

            border-b
            border-[#dfead8]

            shadow-[0_4px_20px_rgba(55,90,45,0.06)]
          "
        >
          {/* ===============================
              LOGO
          =============================== */}

          <Link
            to="/"
            className="
              flex
              items-center
              shrink-0
              transition-transform
              duration-300
              hover:scale-[1.03]
            "
          >
            <img
              src="images/pfcLogo.png"
              alt="Pachaori Food Corporation"
              className="w-50 h-50 object-contain"
            />
          </Link>

          {/* ===============================
              DESKTOP MAIN LINKS
          =============================== */}

          <div
            className="
              hidden
              md:flex
              items-center
              gap-1
              ml-8
            "
          >
            {/* HOME */}

            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `
                px-4
                py-2
                rounded-xl
                text-sm
                font-medium
                transition-all
                duration-200

                ${
                  isActive
                    ? "bg-[#285a31] text-white shadow-[0_4px_12px_rgba(40,90,49,0.20)]"
                    : "text-[#315c38] hover:bg-[#eaf4e5]"
                }
                `
              }
            >
              Home
            </NavLink>

            {/* ABOUT */}

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `
                px-4
                py-2
                rounded-xl
                text-sm
                font-medium
                transition-all
                duration-200

                ${
                  isActive
                    ? "bg-[#285a31] text-white shadow-[0_4px_12px_rgba(40,90,49,0.20)]"
                    : "text-[#315c38] hover:bg-[#eaf4e5]"
                }
                `
              }
            >
              About
            </NavLink>

            {/* MY ORDERS */}

            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `
                px-4
                py-2
                rounded-xl
                text-sm
                font-medium
                transition-all
                duration-200

                ${
                  isActive
                    ? "bg-[#285a31] text-white shadow-[0_4px_12px_rgba(40,90,49,0.20)]"
                    : "text-[#315c38] hover:bg-[#eaf4e5]"
                }
                `
              }
            >
              My Orders
            </NavLink>

            {/* CONTACT */}

            <NavLink
              to="/contactUs"
              className={({ isActive }) =>
                `
                px-4
                py-2
                rounded-xl
                text-sm
                font-medium
                transition-all
                duration-200

                ${
                  isActive
                    ? "bg-[#285a31] text-white shadow-[0_4px_12px_rgba(40,90,49,0.20)]"
                    : "text-[#315c38] hover:bg-[#eaf4e5]"
                }
                `
              }
            >
              Contact
            </NavLink>
          </div>

          {/* ===============================
              RIGHT SIDE
          =============================== */}

          <div
            className="
              hidden
              md:flex
              items-center
              gap-2
              ml-auto
            "
          >
            {/* Language */}

            <div className="px-3 py-2">
              <GoogleTranslate />
            </div>

            {/* Divider */}

            <div className="h-7 w-px bg-[#d8e5d2]" />

            {/* User */}

            {savedUser ? (
              <button
                onClick={() => navigate("/profile")}
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2.5

                  rounded-xl

                  text-sm
                  font-medium
                  text-[#315c38]

                  hover:bg-[#eaf4e5]

                  transition
                  cursor-pointer
                "
              >
                <User size={18} />
                Profile
              </button>
            ) : (
              <button
                onClick={() => navigate("/register")}
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2.5

                  rounded-xl

                  text-sm
                  font-medium
                  text-[#315c38]

                  hover:bg-[#eaf4e5]

                  transition
                  cursor-pointer
                "
              >
                <User size={18} />
                Register
              </button>
            )}

            {/* Wishlist */}

            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                `
                relative

                flex
                items-center
                justify-center

                w-11
                h-11

                rounded-xl

                transition

                ${
                  isActive
                    ? "bg-[#285a31] text-white shadow-[0_4px_12px_rgba(40,90,49,0.20)]"
                    : "text-[#315c38] hover:bg-[#eaf4e5]"
                }
                `
              }
            >
              <Heart size={25} />

              {totalWishlist > 0 && (
                <span
                  className="
                    absolute
                    -top-1
                    -right-1

                    min-w-5
                    h-5
                    px-1

                    rounded-full

                    bg-[#d95c4f]
                    text-white

                    flex
                    items-center
                    justify-center

                    text-[10px]
                    font-bold
                  "
                >
                  {totalWishlist}
                </span>
              )}
            </NavLink>
          </div>
        </div>

        {/* ===================================================
            CATEGORY BAR
        =================================================== */}

        <div
          className="
            hidden
            md:block

            w-full

            bg-[#edf6e9]

            border-b
            border-[#dfead8]

            shadow-[0_3px_12px_rgba(55,90,45,0.04)]
          "
        >
          <div
            className="
              max-w-[1500px]
              mx-auto

              px-6
              lg:px-16

              h-[50px]

              flex
              items-center
              justify-center

              gap-2
            "
          >
            {categories.map((category) => (
              <NavLink
                key={category.name}
                to={category.path}
                className={({ isActive }) =>
                  `
                  whitespace-nowrap
                  px-4
                  py-2

                  rounded-lg

                  text-[13px]
                  font-medium

                  transition-all
                  duration-200

                  ${
                    isActive
                      ? "bg-[#285a31] text-white shadow-[0_4px_12px_rgba(40,90,49,0.20)]"
                      : "text-[#315c38] hover:bg-[#dcecd6] hover:text-[#1f4d29]"
                  }
                  `
                }
              >
                {category.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* =====================================================
          MOBILE NAV
      ===================================================== */}

      <MobileNav />
    </>
  );
};

export default Nav;
