import React, { useState } from "react";
import { Clock, Users, Play, ChefHat, Leaf } from "lucide-react";

const recipes = [
  {
    id: "breakfast",
    category: "Breakfast",
    name: "Tofu Bhurji",
    tagline: "A simple Indian breakfast with a delicious tofu twist.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1400&auto=format&fit=crop",
    time: "20 minutes",
    servings: "2 servings",
    difficulty: "Easy",
    ingredients: [
      "200 g firm tofu",
      "1 medium onion, finely chopped",
      "1 medium tomato, finely chopped",
      "1 green chilli, finely chopped",
      "1 tsp ginger-garlic paste",
      "1/2 tsp turmeric powder",
      "1/2 tsp red chilli powder",
      "1/2 tsp cumin seeds",
      "1 tbsp cooking oil",
      "Salt to taste",
      "Fresh coriander",
      "1/2 tsp garam masala",
    ],
    method: [
      "Crumble the tofu into small pieces and keep it aside.",
      "Heat oil in a pan and add cumin seeds.",
      "Add onion and green chilli and sauté until the onion becomes soft.",
      "Add ginger-garlic paste and cook for another minute.",
      "Add tomato, turmeric, red chilli powder and salt.",
      "Cook until the tomato becomes soft and the masala comes together.",
      "Add the crumbled tofu and mix everything well.",
      "Cook for 4–5 minutes on medium heat.",
      "Add garam masala and fresh coriander.",
      "Serve hot with roti, toast or paratha.",
    ],
    videos: [
      {
        title: "Tofu Bhurji Recipe",
        url: "https://www.youtube.com/results?search_query=tofu+bhurji+recipe",
      },
      {
        title: "Indian Style Tofu Recipes",
        url: "https://www.youtube.com/results?search_query=indian+style+tofu+recipes",
      },
      {
        title: "Easy Tofu Breakfast",
        url: "https://www.youtube.com/results?search_query=easy+tofu+breakfast+recipe",
      },
    ],
  },
  {
    id: "snacks",
    category: "Snacks",
    name: "Crispy Tofu Tikka",
    tagline: "Golden, smoky and packed with Indian spices.",
    image:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=1400&auto=format&fit=crop",
    time: "30 minutes",
    servings: "2 servings",
    difficulty: "Easy",
    ingredients: [
      "250 g firm tofu",
      "3 tbsp thick plant-based yogurt",
      "1 tsp ginger-garlic paste",
      "1 tsp Kashmiri chilli powder",
      "1/2 tsp turmeric powder",
      "1 tsp garam masala",
      "1/2 tsp cumin powder",
      "1 tbsp lemon juice",
      "1 tbsp oil",
      "Salt to taste",
      "1 small capsicum",
      "1 small onion",
    ],
    method: [
      "Press the tofu to remove excess moisture and cut it into cubes.",
      "Mix yogurt, spices, lemon juice, oil and salt in a bowl.",
      "Add tofu cubes and coat them evenly with the marinade.",
      "Add sliced onion and capsicum and mix gently.",
      "Allow everything to marinate for at least 20 minutes.",
      "Cook in an air fryer, oven or pan until golden and lightly charred.",
      "Turn the pieces occasionally so they cook evenly.",
      "Serve hot with green chutney and lemon.",
    ],
    videos: [
      {
        title: "Tofu Tikka Recipe",
        url: "https://www.youtube.com/results?search_query=tofu+tikka+indian+recipe",
      },
      {
        title: "Crispy Tofu Tikka",
        url: "https://www.youtube.com/results?search_query=crispy+tofu+tikka",
      },
      {
        title: "Indian Tofu Snack Recipes",
        url: "https://www.youtube.com/results?search_query=indian+tofu+snack+recipes",
      },
    ],
  },
  {
    id: "main-course",
    category: "Main Course",
    name: "Tofu Curry",
    tagline:
      "A comforting Indian curry made with soft tofu and aromatic masala.",
    image:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=1400&auto=format&fit=crop",
    time: "35 minutes",
    servings: "3 servings",
    difficulty: "Medium",
    ingredients: [
      "250 g firm tofu",
      "2 medium tomatoes",
      "1 medium onion",
      "1 tsp ginger-garlic paste",
      "1/2 tsp turmeric powder",
      "1 tsp coriander powder",
      "1/2 tsp cumin powder",
      "1/2 tsp red chilli powder",
      "1/2 tsp garam masala",
      "1 tbsp cooking oil",
      "1 cup water",
      "Salt to taste",
      "Fresh coriander",
    ],
    method: [
      "Cut tofu into medium-sized cubes.",
      "Lightly pan-fry the tofu until the edges become golden.",
      "Heat oil in a pan and sauté the onion until golden.",
      "Add ginger-garlic paste and cook for a minute.",
      "Add chopped tomatoes and all the dry spices.",
      "Cook until the tomatoes become soft and the masala thickens.",
      "Add water and bring the gravy to a gentle boil.",
      "Add the fried tofu cubes.",
      "Cover and simmer for 5–7 minutes.",
      "Add garam masala and fresh coriander before serving.",
    ],
    videos: [
      {
        title: "Indian Tofu Curry",
        url: "https://www.youtube.com/watch?v=dNyl_KrMiaA",
      },
      {
        title: "Easy Tofu Curry",
        url: "https://www.youtube.com/results?search_query=easy+indian+tofu+curry",
      },
      {
        title: "Restaurant Style Tofu Curry",
        url: "https://www.youtube.com/results?search_query=restaurant+style+tofu+curry",
      },
    ],
  },
  {
    id: "street-style",
    category: "Street Style",
    name: "Tofu Kathi Roll",
    tagline:
      "Spicy tofu wrapped in a soft roti with chutney and crunchy vegetables.",
    image:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=1400&auto=format&fit=crop",
    time: "25 minutes",
    servings: "2 rolls",
    difficulty: "Easy",
    ingredients: [
      "200 g firm tofu",
      "2 rotis",
      "1 small onion",
      "1/2 capsicum",
      "1 tsp ginger-garlic paste",
      "1/2 tsp garam masala",
      "1/2 tsp red chilli powder",
      "1 tbsp lemon juice",
      "Green chutney",
      "1 tbsp cooking oil",
      "Salt to taste",
    ],
    method: [
      "Cut the tofu into thin strips.",
      "Heat oil and sauté onion and capsicum.",
      "Add ginger-garlic paste and cook briefly.",
      "Add tofu, garam masala, chilli powder and salt.",
      "Cook until the tofu gets a light golden coating.",
      "Warm the rotis on a tawa.",
      "Spread green chutney over each roti.",
      "Add the tofu filling and sliced onion.",
      "Roll tightly and serve hot.",
    ],
    videos: [
      {
        title: "Tofu Kathi Roll",
        url: "https://www.youtube.com/results?search_query=tofu+kathi+roll+recipe",
      },
      {
        title: "Tofu Frankie",
        url: "https://www.youtube.com/results?search_query=tofu+frankie+recipe",
      },
      {
        title: "Indian Tofu Wrap",
        url: "https://www.youtube.com/results?search_query=indian+tofu+wrap+recipe",
      },
    ],
  },
  {
    id: "quick-meals",
    category: "Quick Meals",
    name: "Tofu Fried Rice",
    tagline: "A quick, satisfying meal for busy days.",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1400&auto=format&fit=crop",
    time: "20 minutes",
    servings: "2 servings",
    difficulty: "Easy",
    ingredients: [
      "200 g firm tofu",
      "2 cups cooked rice",
      "1/2 cup mixed vegetables",
      "2 spring onions",
      "1 tbsp soy sauce",
      "1 tsp chilli sauce",
      "1 tsp vinegar",
      "1 tsp ginger-garlic paste",
      "1 tbsp cooking oil",
      "Salt and pepper to taste",
    ],
    method: [
      "Cut tofu into small cubes.",
      "Heat oil in a wok or wide pan.",
      "Add tofu and cook until lightly golden.",
      "Add mixed vegetables and stir-fry on high heat.",
      "Add ginger-garlic paste and cook for a minute.",
      "Add cooked rice and toss everything together.",
      "Add soy sauce, chilli sauce and vinegar.",
      "Season with salt and pepper.",
      "Add spring onions and serve hot.",
    ],
    videos: [
      {
        title: "Tofu Fried Rice",
        url: "https://www.youtube.com/results?search_query=tofu+fried+rice+recipe",
      },
      {
        title: "Indian Style Tofu Rice",
        url: "https://www.youtube.com/results?search_query=indian+style+tofu+fried+rice",
      },
      {
        title: "Quick Tofu Meal",
        url: "https://www.youtube.com/results?search_query=quick+tofu+meal+recipe",
      },
    ],
  },
];

const Recipe = () => {
  const [activeCategory, setActiveCategory] = useState("breakfast");

  const recipe =
    recipes.find((item) => item.id === activeCategory) || recipes[0];

  return (
    <section className="w-full bg-[#f7fbf3] py-16 text-[#244d2b] sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 text-center">
          <div className="mx-auto flex w-fit items-center gap-2 text-[#5c9957]">
            <ChefHat size={18} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em]">
              PFC Recipes
            </span>
          </div>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
            Made with tofu.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#708174]">
            Simple Indian-inspired recipes you can make with your PFC tofu.
          </p>
        </div>

        <div className="mb-14 flex justify-center overflow-x-auto pb-2">
          <div className="flex gap-2 rounded-full border border-[#d7e8d1] bg-white/70 p-1.5">
            {recipes.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveCategory(item.id)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-xs font-semibold transition-all duration-300 ${
                  activeCategory === item.id
                    ? "bg-[#244d2b] text-white shadow-[0_8px_25px_rgba(36,77,43,0.15)]"
                    : "text-[#708174] hover:text-[#3f7545]"
                }`}
              >
                {item.category}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[36px] border border-[#d7e8d1] bg-white/70 shadow-[0_25px_80px_rgba(52,100,57,0.08)]">
          <div className="grid lg:grid-cols-[1fr_1fr]">
            <div className="relative min-h-[430px] overflow-hidden bg-[#eaf4e6] lg:min-h-[650px]">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#244d2b]/50 via-transparent to-transparent" />

              <div className="absolute left-6 top-6 rounded-full border border-white/40 bg-white/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-md">
                {recipe.category}
              </div>

              <div className="absolute bottom-7 left-7 right-7 text-white">
                <div className="mb-3 flex items-center gap-2">
                  <Leaf size={15} />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">
                    Tofu Recipe
                  </span>
                </div>

                <h3 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                  {recipe.name}
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-white/85">
                  {recipe.tagline}
                </p>
              </div>
            </div>

            <div className="p-7 sm:p-10 lg:p-12">
              <div className="flex flex-wrap gap-3 border-b border-[#d7e8d1] pb-7">
                <div className="rounded-full bg-[#edf6e9] px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-[#5c9957]" />
                    <span className="text-xs font-medium text-[#3f7545]">
                      {recipe.time}
                    </span>
                  </div>
                </div>

                <div className="rounded-full bg-[#edf6e9] px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-[#5c9957]" />
                    <span className="text-xs font-medium text-[#3f7545]">
                      {recipe.servings}
                    </span>
                  </div>
                </div>

                <div className="rounded-full bg-[#edf6e9] px-4 py-2">
                  <span className="text-xs font-medium text-[#3f7545]">
                    {recipe.difficulty}
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-xl font-semibold tracking-[-0.03em]">
                  Ingredients
                </h4>

                <div className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 text-sm text-[#65766a]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#83b878]" />
                      <span>{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 border-t border-[#d7e8d1] pt-8">
                <h4 className="text-xl font-semibold tracking-[-0.03em]">
                  How to make it
                </h4>

                <div className="mt-5 space-y-5">
                  {recipe.method.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eaf4e6] text-[10px] font-semibold text-[#4f8b4a]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="pt-1 text-sm leading-6 text-[#65766a]">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#d7e8d1] bg-[#f7fbf3] px-7 py-8 sm:px-10 lg:px-12">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#5c9957]">
                  Watch & Cook
                </p>

                <h4 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                  Want to see it made?
                </h4>

                <p className="mt-2 text-sm text-[#708174]">
                  Watch tofu recipes and cooking ideas on YouTube.
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {recipe.videos.map((video, index) => (
                <a
                  key={index}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-[#d7e8d1] bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b8d4b0] hover:shadow-[0_12px_30px_rgba(52,100,57,0.08)]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#244d2b] text-white transition-transform duration-300 group-hover:scale-105">
                    <Play size={15} fill="currentColor" />
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-[#244d2b]">
                      {video.title}
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#708174]">
                      Watch on YouTube
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recipe;
