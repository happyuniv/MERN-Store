import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../component/PrdouctList";

export type CartProduct = ProductType & {
  amount: number;
};

type CartState = {
  products: CartProduct[];
};

const cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")!)
  : [];
const initialState: CartState = {
  products: cart,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload.product._id
      );
      if (index === -1) {
        state.products.push(action.payload.product);
      }
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    setAmount: (state, action) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload.product._id
      );
      if (action.payload.type === "plus") {
        state.products[index].amount += 1;
      } else if (action.payload.type === "minus") {
        state.products[index].amount -= 1;
      }
    },
    RemoveFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload.product._id
      );
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
  },
});

export const { addToCart, setAmount, RemoveFromCart } = cartSlice.actions;
export default cartSlice.reducer;
