import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Info, ClipboardList, Heart, User, Search } from "lucide-react";

const MobileNav = () => {
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

  const bottomTabs = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "About",
      path: "/about",
      icon: Info,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: ClipboardList,
    },
    {
      name: "Wishlist",
      path: "/wishlist",
      icon: Heart,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  return (
    <div className="md:hidden">
      <div
        className="
          fixed
          top-0
          left-0
          right-0
          z-50
          bg-[#f7fbf3]/95
          backdrop-blur-xl
          border-b
          border-[#dfead8]
          shadow-[0_2px_12px_rgba(55,90,45,0.08)]
        "
      >
        <div className="flex items-center gap-3 px-3">
          <NavLink
            to="/"
            className="shrink-0 flex items-center justify-center w-20 h-20 overflow-hidden"
          >
            <img
              src="/images/pfcLogo.png"
              alt="PFC"
              className="w-20 h-20 object-contain scale-125"
            />
          </NavLink>

          <div className="flex-1 relative">
            <Search
              size={18}
              strokeWidth={2}
              className="
        absolute
        left-3
        top-1/2
        -translate-y-1/2
        text-[#789276]
      "
            />

            <input
              type="text"
              placeholder="Search products..."
              className="
        w-full
        h-10
        pl-10
        pr-4
        rounded-full
        bg-[#edf6e9]
        border
        border-[#dfead8]
        outline-none
        text-[13px]
        text-[#315c38]
        placeholder:text-[#789276]
        focus:border-[#285a31]
        focus:bg-white
        transition-all
      "
            />
          </div>
        </div>

        <div
          className="
            overflow-x-auto
            scrollbar-hide
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              px-3
              pb-3
              w-max
              min-w-full
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
                  rounded-full
                  text-[13px]
                  font-medium
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? "bg-[#285a31] text-white shadow-sm"
                      : "bg-[#edf6e9] text-[#315c38] hover:bg-[#dcecd6]"
                  }
                  `
                }
              >
                {category.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <div
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-50
          bg-white/95
          backdrop-blur-xl
          border-t
          border-[#dfead8]
          shadow-[0_-4px_20px_rgba(55,90,45,0.10)]
          px-2
          pt-2
          pb-[calc(8px+env(safe-area-inset-bottom))]
        "
      >
        <div className="grid grid-cols-5">
          {bottomTabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <NavLink
                key={tab.name}
                to={tab.path}
                end={tab.path === "/"}
                className={({ isActive }) =>
                  `
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  py-1.5
                  transition-all
                  duration-200

                  ${isActive ? "text-[#285a31]" : "text-[#789276]"}
                  `
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`
                        flex
                        items-center
                        justify-center
                        w-10
                        h-7
                        rounded-full
                        transition-all
                        duration-200

                        ${isActive ? "bg-[#e5f1e1]" : "bg-transparent"}
                      `}
                    >
                      <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                    </div>

                    <span
                      className={`
                        text-[10px]
                        font-medium

                        ${isActive ? "font-semibold" : ""}
                      `}
                    >
                      {tab.name}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
