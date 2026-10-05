const Products = [
  {
    id: 1,

    name: "Tofu/Soya",

    category: "Tofu/Soya",
    reviewType: "tofu",

    image:
      "https://images.unsplash.com/photo-1722635940350-d1b2e5129379?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9mdXxlbnwwfHwwfHx8MA%3D%3D",

    rating: 4.9,

    reviews: 150,

    price: 199,

    shortDescription: "Fresh, protein-rich & completely plant based.",

    description:
      "PFC Silken Tofu is made from premium quality soybeans. It has a smooth and silky texture, making it perfect for soups, curries, desserts, smoothies and healthy everyday meals. Rich in protein and calcium, it is an excellent dairy-free alternative for a balanced lifestyle.",

    ingredients: [
      "Processed Soybean",
      "Filtered Water",
      "Food Grade Coagulant",
    ],

    benefits: [
      "High in Protein",
      "Rich in Calcium",
      "100% Plant Based",
      "Cholesterol Free",
      "No Artificial Colours",
      "No Artificial Flavours",
      "No Preservatives",
      "Suitable for Vegans & Vegetarians",
    ],

    nutrition: [
      {
        title: "Energy",
        value: "62 kcal",
      },
      {
        title: "Protein",
        value: "6.6 g",
      },
      {
        title: "Carbohydrate",
        value: "2.1 g",
      },
      {
        title: "Sugar",
        value: "0 g",
      },
      {
        title: "Total Fat",
        value: "2.8 g",
      },
      {
        title: "Saturated Fat",
        value: "0.4 g",
      },
      {
        title: "Trans Fat",
        value: "0 g",
      },
      {
        title: "Calcium",
        value: "177 mg",
      },
      {
        title: "Iron",
        value: "2.6 mg",
      },
    ],

    storage:
      "Store between 2°C and 7°C. Refrigerate after opening and consume within 2 days.",

    shelfLife: "21 Days",

    weight: "200 g",

    country: "India",

    manufacturer: "Plant Fresh Choice (PFC)",

    shipping: "Free delivery on orders above ₹499.",

    delivery: "Estimated delivery within 2–4 business days.",
  },

  {
    id: 2,

    name: "Soya Milk",

    category: "Soy Milk",

    reviewType: "soyaMilk",

    image:
      "https://plus.unsplash.com/premium_photo-1694481100261-ab16523c4093?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c295YSUyMG1pbGt8ZW58MHx8MHx8fDA%3D",

    rating: 4.8,

    reviews: 126,

    price: 209,

    shortDescription:
      "Creamy, dairy-free soy milk packed with plant-based protein.",

    description:
      "PFC Soya Milk is made from carefully selected premium soybeans to deliver a smooth, creamy, and nutritious dairy-free beverage. Rich in plant-based protein and naturally lactose-free, it is perfect for tea, coffee, cereals, smoothies, and everyday drinking.",

    ingredients: [
      "Filtered Water",
      "Whole Soybeans",
      "Natural Stabilizer",
      "Calcium",
      "Vitamin B12",
    ],

    benefits: [
      "100% Dairy Free",
      "Rich in Plant Protein",
      "Lactose Free",
      "Good Source of Calcium",
      "Heart Friendly",
      "Suitable for Vegans",
      "No Cholesterol",
      "No Artificial Preservatives",
    ],

    nutrition: [
      { title: "Energy", value: "54 kcal" },
      { title: "Protein", value: "3.5 g" },
      { title: "Carbohydrate", value: "4.2 g" },
      { title: "Sugar", value: "2.8 g" },
      { title: "Total Fat", value: "2.0 g" },
      { title: "Saturated Fat", value: "0.3 g" },
      { title: "Calcium", value: "120 mg" },
      { title: "Vitamin B12", value: "0.5 µg" },
    ],

    storage:
      "Keep refrigerated between 2°C and 7°C. Shake well before use. Consume within 3 days after opening.",

    shelfLife: "30 Days",

    weight: "1 Litre",

    country: "India",

    manufacturer: "Plant Fresh Choice (PFC)",

    shipping: "Free delivery on orders above ₹499.",

    delivery: "Estimated delivery within 2–4 business days.",
  },
  {
    id: 3,

    name: "Vegan Ghee",

    category: "Vegan Ghee",

    reviewType: "veganGhee",

    image:
      "https://plus.unsplash.com/premium_photo-1723672873127-7b8b8f9f1411?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmVnYW4lMjBnaGVlfGVufDB8fDB8fHww",

    rating: 4.9,

    reviews: 98,

    price: 349,

    shortDescription:
      "100% plant-based ghee alternative with a rich buttery aroma.",

    description:
      "PFC Vegan Ghee is a delicious plant-based alternative to traditional dairy ghee. Crafted using premium vegetable oils, it offers the rich aroma, smooth texture, and authentic taste of ghee while being completely dairy-free. Ideal for cooking, baking, roasting, and everyday meals.",

    ingredients: [
      "Refined Coconut Oil",
      "Rice Bran Oil",
      "Natural Flavour",
      "Turmeric Extract",
      "Vitamin A & D",
    ],

    benefits: [
      "100% Vegan",
      "Dairy Free",
      "Lactose Free",
      "No Cholesterol",
      "Rich Buttery Taste",
      "Suitable for Cooking & Baking",
      "No Artificial Preservatives",
      "Plant Based",
    ],

    nutrition: [
      { title: "Energy", value: "900 kcal" },
      { title: "Protein", value: "0 g" },
      { title: "Carbohydrate", value: "0 g" },
      { title: "Sugar", value: "0 g" },
      { title: "Total Fat", value: "100 g" },
      { title: "Saturated Fat", value: "38 g" },
      { title: "Trans Fat", value: "0 g" },
      { title: "Vitamin A", value: "750 µg" },
    ],

    storage:
      "Store in a cool and dry place away from direct sunlight. Keep the lid tightly closed after use.",

    shelfLife: "12 Months",

    weight: "500 ml",

    country: "India",

    manufacturer: "Plant Fresh Choice (PFC)",

    shipping: "Free delivery on orders above ₹499.",

    delivery: "Estimated delivery within 2–4 business days.",
  },
];

export default Products;
