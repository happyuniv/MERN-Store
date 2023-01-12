import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import snackBarReducer from "./snackBarSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    snackbar: snackBarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
