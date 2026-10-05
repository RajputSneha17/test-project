const orders = [
  {
    id: "#PFC-10428",
    date: "June 24, 2026",
    status: "Delivered",
    total: 548,
    items: [
      {
        id: 1,
        name: "Silken Tofu",
        category: "Tofu",
        price: 199,
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300",
      },
      {
        id: 2,
        name: "Soy Milk",
        category: "Beverage",
        price: 149,
        image:
          "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300",
      },
      {
        id: 3,
        name: "Fresh Broccoli",
        category: "Vegetables",
        price: 200,
        image:
          "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=300",
      },
    ],
  },

  {
    id: "#PFC-10391",
    date: "June 12, 2026",
    status: "Shipped",
    total: 349,
    items: [
      {
        id: 4,
        name: "Vegan Ghee",
        category: "Cooking",
        price: 349,
        image:
          "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300",
      },
    ],
  },

  {
    id: "#PFC-10355",
    date: "May 30, 2026",
    status: "Processing",
    total: 278,
    items: [
      {
        id: 5,
        name: "Organic Spinach",
        category: "Vegetables",
        price: 79,
        image:
          "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300",
      },
      {
        id: 6,
        name: "Original Soy Milk",
        category: "Beverage",
        price: 199,
        image:
          "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300",
      },
    ],
  },
];

export default orders;
