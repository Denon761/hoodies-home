import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.items.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        addedAt: new Date().toISOString(),
        ...action.payload,
      });
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateCartItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) item.selections.quantity = Math.max(1, quantity);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + (item.selections?.quantity ?? 1), 0);
