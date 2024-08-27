import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) =>
          item?.data[0]?.card?.info?.id !=
          action.payload?.data[0]?.card?.info?.id
      );
    },
    clearCart: (state) => {
      state.items.length = 0;
    },
    incrementItem: (state, action) => {
      const ind = action.payload;
      state.items[ind].data[1]++;
    },
    decrementItem: (state, action) => {
      const ind = action.payload;
      state.items[ind].data[1]--;
    },
  },
});

export const { addItem, removeItem, clearCart, incrementItem, decrementItem } =
  cartSlice.actions;

export default cartSlice.reducer;
