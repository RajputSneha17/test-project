import { useEffect, useRef } from "react";
import { ChevronRight, Sparkles, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const offerProducts = [
  {
    id: 1,
    name: "Fresh Green Apples",
    image:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=700&auto=format&fit=crop",
    price: 129,
    oldPrice: 169,
    discount: "24% OFF",
  },
  {
    id: 2,
    name: "Fresh Bananas",
    image:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=700&auto=format&fit=crop",
    price: 49,
    oldPrice: 69,
    discount: "29% OFF",
  },
  {
    id: 3,
    name: "Fresh Tomatoes",
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=700&auto=format&fit=crop",
    price: 39,
    oldPrice: 55,
    discount: "29% OFF",
  },
  {
    id: 4,
    name: "Fresh Milk",
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=700&auto=format&fit=crop",
    price: 58,
    oldPrice: 65,
    discount: "11% OFF",
  },
  {
    id: 5,
    name: "Fresh Paneer",
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=700&auto=format&fit=crop",
    price: 89,
    oldPrice: 110,
    discount: "19% OFF",
  },
  {
    id: 6,
    name: "Fresh Potatoes",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=700&auto=format&fit=crop",
    price: 35,
    oldPrice: 49,
    discount: "29% OFF",
  },
  {
    id: 7,
    name: "Fresh Oranges",
    image:
      "https://images.unsplash.com/photo-1547514701-42782101795e?w=700&auto=format&fit=crop",
    price: 79,
    oldPrice: 99,
    discount: "20% OFF",
  },
  {
    id: 8,
    name: "Soya Chunks",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=700&auto=format&fit=crop",
    price: 75,
    oldPrice: 95,
    discount: "21% OFF",
  },
];

const Banner = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrame;

    const scroll = () => {
      if (
        container.scrollLeft >=
        container.scrollWidth - container.clientWidth - 1
      ) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += 0.7;
      }

      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, []);
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f7fbf3] via-[#eef7e9] to-[#f9fcf7] pt-16 md:pt-25 pb-12">
      <div
        className="
          absolute
          -top-40
          left-1/2
          -translate-x-1/2

          w-[500px]
          h-[300px]

          rounded-full

          bg-[#b8dca9]/30

          blur-[100px]

          pointer-events-none
        "
      />

      <div
        className="
          absolute
          top-[35%]
          -left-40

          w-[300px]
          h-[300px]

          rounded-full

          bg-[#d9eacb]/40

          blur-[90px]

          pointer-events-none
        "
      />

      <div
        className="
          absolute
          top-[55%]
          -right-40

          w-[300px]
          h-[300px]

          rounded-full

          bg-[#d8e9c8]/40

          blur-[90px]

          pointer-events-none
        "
      />

      {/* =====================================================
          FALLING / FLOATING STARS
      ===================================================== */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span
          className="
            absolute
            left-[5%]
            top-[4%]
            text-[#8bb67d]
            text-xl
            opacity-60
            animate-bounce
          "
        >
          ✦
        </span>

        <span
          className="
            absolute left-[12%] top-[22%] text-[#c5a64d] text-sm opacity-60 animate-pulse
          "
        >
          ✧
        </span>

        <span
          className="
            absolute
            left-[23%]
            top-[9%]
            text-[#8bb67d]
            text-sm
            opacity-50
            animate-bounce
          "
        >
          ✦
        </span>

        <span
          className="
            absolute
            left-[34%]
            top-[30%]
            text-[#c5a64d]
            text-lg
            opacity-50
            animate-pulse
          "
        >
          ✧
        </span>

        <span
          className="
            absolute
            left-[46%]
            top-[5%]
            text-[#8bb67d]
            text-xl
            opacity-60
            animate-bounce
          "
        >
          ✦
        </span>

        <span
          className="
            absolute
            right-[37%]
            top-[23%]
            text-[#c5a64d]
            text-sm
            opacity-50
            animate-pulse
          "
        >
          ✧
        </span>

        <span
          className="
            absolute
            right-[27%]
            top-[7%]
            text-[#8bb67d]
            text-lg
            opacity-60
            animate-bounce
          "
        >
          ✦
        </span>

        <span
          className="
            absolute
            right-[17%]
            top-[27%]
            text-[#c5a64d]
            text-sm
            opacity-50
            animate-pulse
          "
        >
          ✧
        </span>

        <span
          className="
            absolute
            right-[6%]
            top-[8%]
            text-[#8bb67d]
            text-xl
            opacity-60
            animate-bounce
          "
        >
          ✦
        </span>

        <span
          className="
            absolute
            left-[8%]
            top-[58%]
            text-[#c5a64d]
            text-sm
            opacity-40
            animate-pulse
          "
        >
          ✧
        </span>

        <span
          className="
            absolute
            left-[30%]
            top-[70%]
            text-[#8bb67d]
            text-lg
            opacity-40
            animate-bounce
          "
        >
          ✦
        </span>

        <span
          className="
            absolute
            right-[31%]
            top-[68%]
            text-[#c5a64d]
            text-sm
            opacity-40
            animate-pulse
          "
        >
          ✧
        </span>

        <span
          className="
            absolute
            right-[8%]
            top-[60%]
            text-[#8bb67d]
            text-lg
            opacity-50
            animate-bounce
          "
        >
          ✦
        </span>
      </div>

      {/* =====================================================
          HEADING
      ===================================================== */}

      <div
        className="
          relative
          z-10

          w-[92%]
          lg:w-[88%]

          mx-auto

          text-center
        "
      >
        {/* Tiny label */}

        <div
          className="
            inline-flex
            items-center
            gap-2

            px-4
            py-1.5

            rounded-full

            bg-white/70
            backdrop-blur-md

            border
            border-[#dbe8d5]

            text-[#6c9364]

            text-[10px]
            sm:text-xs

            font-semibold

            uppercase
            tracking-[0.18em]

            shadow-sm
          "
        >
          <Sparkles size={13} />
          Limited Time Deals
        </div>

        {/* Main heading */}

        <h2
          className="
            mt-4

            text-3xl
            sm:text-4xl
            md:text-5xl

            font-extrabold

            tracking-tight

            text-[#244f2b]
          "
        >
          Today's Offers
        </h2>

        {/* Subheading */}

        <p
          className="
            mt-2

            text-sm
            sm:text-base

            text-[#759070]
          "
        >
          Fresh picks. Better prices. Just for you.
        </p>

        {/* Decorative line */}

        <div
          className="
            mt-5

            flex
            items-center
            justify-center
            gap-3
          "
        >
          <span
            className="
              w-10
              h-px
              bg-[#bdd4b5]
            "
          />

          <span
            className="
              text-[#c5a64d]
              text-sm
            "
          >
            ✦
          </span>

          <span
            className="
              w-10
              h-px
              bg-[#bdd4b5]
            "
          />
        </div>
      </div>

      {/* =====================================================
          OFFER CARDS
      ===================================================== */}

      <div
        className="
          relative
          z-10

          w-[95%]
          lg:w-[90%]

          mx-auto

          mt-8
          md:mt-10
        "
      >
        <div
          className="
            flex
            gap-4
            md:gap-5

            overflow-x-auto

            pb-5

            snap-x
            snap-mandatory

            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {offerProducts.map((product) => (
            <div
              key={product.id}
              className="
                relative

                flex-shrink-0

                snap-start

                w-[175px]
                sm:w-[205px]
                md:w-[225px]

                overflow-hidden

                rounded-[22px]

                bg-white/90
                backdrop-blur-sm

                border
                border-[#dfead9]

                shadow-[0_10px_30px_rgba(50,90,45,0.08)]

                group

                hover:-translate-y-2

                hover:shadow-[0_20px_40px_rgba(50,90,45,0.15)]

                transition-all
                duration-300
              "
            >
              {/* =================================================
                  DISCOUNT
              ================================================= */}

              <div
                className="
                  absolute
                  top-3
                  left-3
                  z-20

                  px-2.5
                  py-1

                  rounded-full

                  bg-[#285a31]

                  text-white

                  text-[10px]
                  sm:text-xs

                  font-bold

                  shadow-md
                "
              >
                {product.discount}
              </div>

              {/* =================================================
                  PRODUCT IMAGE
              ================================================= */}

              <div
                className="
                  relative

                  h-[155px]
                  sm:h-[175px]
                  md:h-[190px]

                  overflow-hidden

                  bg-gradient-to-br
                  from-[#f5faef]
                  to-[#e5f1df]
                "
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="
                    w-full
                    h-full

                    object-cover

                    group-hover:scale-110

                    transition-transform
                    duration-500
                  "
                />

                {/* Image Shine */}

                <div
                  className="
                    absolute
                    inset-0

                    bg-gradient-to-tr
                    from-[#285a31]/10
                    via-transparent
                    to-white/20

                    pointer-events-none
                  "
                />
              </div>

              {/* =================================================
                  PRODUCT DETAILS
              ================================================= */}

              <div className="p-4">
                <h3
                  className="
                    text-sm
                    md:text-[15px]

                    font-semibold

                    text-[#294f30]

                    truncate
                  "
                >
                  {product.name}
                </h3>

                {/* Price */}

                <div
                  className="
                    mt-2

                    flex
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      text-lg

                      font-extrabold

                      text-[#285a31]
                    "
                  >
                    ₹{product.price}
                  </span>

                  <span
                    className="
                      text-xs

                      text-gray-400

                      line-through
                    "
                  >
                    ₹{product.oldPrice}
                  </span>
                </div>

                {/* Add Button */}

                <button
                  className="
                    mt-3

                    w-full

                    py-2

                    rounded-xl

                    bg-[#edf6e9]

                    text-[#285a31]

                    text-xs
                    sm:text-sm

                    font-bold

                    hover:bg-[#285a31]
                    hover:text-white

                    active:scale-95

                    transition-all
                    duration-200

                    cursor-pointer
                  "
                >
                  <span className="flex items-center justify-center gap-2">
                    <ShoppingBag size={14} />
                    Add
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* =====================================================
            VIEW ALL
        ===================================================== */}

        <div className="flex justify-center mt-3">
          <Link
            to="/offers"
            className="
              inline-flex
              items-center
              gap-1.5

              px-5
              py-2.5

              rounded-full

              border
              border-[#cbdcc5]

              bg-white/70

              text-[#315c38]

              text-sm

              font-semibold

              hover:bg-[#285a31]
              hover:text-white
              hover:border-[#285a31]

              transition-all
              duration-300
            "
          >
            View All Offers
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
