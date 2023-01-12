import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  currentUser: null | {
    _id: string;
    username: string;
    email: string;
    address: {
      list: UserAddress[];
    };
  };
};

export type UserAddress = {
  _id: string;
  country: string;
  city: string;
  detail: string;
  selected: boolean;
};

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")!)
  : null;
const initialState: UserState = {
  currentUser: user,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userUpdate: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("cart");
    },
  },
});

export const { userUpdate, logout } = userSlice.actions;

// export default combineReducers({
//   userRegister: registerSlice.reducer,
//   userLogin: loginSlice.reducer,
//   userUpdate: updateSlice.reducer,
// });
export default userSlice.reducer;
