import { createSlice } from "@reduxjs/toolkit";

const getInitialViewed = () => {
  const saved = localStorage.getItem("viewed");
  return saved ? JSON.parse(saved) : [];
};

const viewedSlice = createSlice({
  name: "viewed",
  initialState: {
    items: getInitialViewed(),
  },
  reducers: {
    addToViewed(state, action) {
      const exist = state.items.find((item) => item._id === action.payload._id);
      if (!exist) {
        state.items.push(action.payload);
      }
    },
    clearViewed(state) {
      state.items = [];
    },
  },
});

export const { addToViewed, clearViewed } = viewedSlice.actions;
export default viewedSlice.reducer;
