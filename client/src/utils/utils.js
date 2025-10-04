export const homeSlidesData = [
  {
    image:
      "https://images.pexels.com/photos/15113597/pexels-photo-15113597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "The sneaker fest",
    subTitle: "The biggest sneaker fest of 2025 will be live here!",
    interval: 1500,
  },
  {
    image:
      "https://images.pexels.com/photos/5325588/pexels-photo-5325588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Clothes for all need!",
    subTitle: "Office or meeting or casuals or dates we got you covered.",
    interval: 500,
  },
  {
    image:
      "https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Up your electronic game with us",
    subTitle: "All popular electronics available.",
    interval: 2500,
  },
  {
    image:
      "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Style with us and break the street",
    subTitle: "Style with us and break the street as all eyes on you.",
    interval: 2500,
  },
  {
    image:
      "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "All additional accessories available",
    subTitle: "Style with us all additional accessories available.",
    interval: 2500,
  },
  {
    image:
      "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Build a modern kitchen with us",
    subTitle: "Style your rooms with the best accs.",
    interval: 2500,
  },
];

export const allProductsData = [
  {
    id: 1,
    title: "Classic Sneakers",
    price: 49.99,
    oldPrice: 69.99,
    rating: 4,
    image:
      "https://images.pexels.com/photos/15113597/pexels-photo-15113597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "Comfortable and stylish sneakers perfect for casual outings or everyday wear.",
  },
  {
    id: 2,
    title: "Wireless Headphones",
    price: 79.99,
    oldPrice: 99.99,
    rating: 5,
    image:
      "https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "High-quality wireless headphones with noise cancellation and long battery life.",
  },
  {
    id: 3,
    title: "Leather Backpack",
    price: 39.99,
    oldPrice: 49.99,
    rating: 4,
    image:
      "https://images.pexels.com/photos/3747466/pexels-photo-3747466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "Premium leather backpack suitable for travel, work, and casual use.",
  },
  {
    id: 4,
    title: "Smart Watch",
    price: 129.99,
    oldPrice: 159.99,
    rating: 5,
    image:
      "https://images.pexels.com/photos/2773946/pexels-photo-2773946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "Stay connected and track your fitness with this sleek smartwatch.",
  },
  {
    id: 5,
    title: "Sunglasses",
    price: 19.99,
    oldPrice: 29.99,
    rating: 4,
    image:
      "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "Stylish sunglasses with UV protection, perfect for summer outings.",
  },
];

const BASE_URL = "http://localhost:5000/api/v1";

export async function fetcher(endpoint, options = {}) {
  const { method = "GET", body, headers = {} } = options;
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }
    return await res.json();
  } catch (err) {
    console.error("API Error:", err.message);
    throw err;
  }
}
