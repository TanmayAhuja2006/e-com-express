import { createSlice } from "@reduxjs/toolkit";
const STORAGE_KEY = "cart_items_v1";

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
};

const initialState = {
  items: loadFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, name, price, image, quantity = 1 } = action.payload;
      const existing = state.items.find((it) => it.id === id);
      if (existing) {
        existing.quantity = existing.quantity + quantity;
      } else {
        state.items.push({ id, name, price, image, quantity });
      }
      saveToStorage(state.items);
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((it) => it.id !== id);
      saveToStorage(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((it) => it.id === id);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter((it) => it.id !== id);
        }
      }
      saveToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveToStorage(state.items);
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + (i.quantity || 0), 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (sum, i) => sum + (i.price || 0) * (i.quantity || 0),
    0
  );

export default cartSlice.reducer;
