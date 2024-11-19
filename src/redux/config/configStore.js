import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../slices/UserSlice";

const store = configureStore({
  reducer: {
    user: UserReducer, // userReducer를 'user' 키에 연결
  },
});

export default store;
