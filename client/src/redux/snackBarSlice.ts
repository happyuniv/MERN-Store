import { createSlice } from "@reduxjs/toolkit";

type SnackBarState = {
  isOpen: boolean;
  message: string;
  trigger: boolean;
};

const initialState: SnackBarState = {
  isOpen: false,
  message: "",
  trigger: false,
};

const snackBarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackBar: (state, action) => {
      state.isOpen = true;
      state.message = action.payload;
      state.trigger = !state.trigger;
    },
    closeSnackBar: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openSnackBar, closeSnackBar } = snackBarSlice.actions;
export default snackBarSlice.reducer;
