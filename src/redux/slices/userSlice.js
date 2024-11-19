// src/features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // 유저 정보 (로그인되지 않은 경우 null)
  isLoading: false, // 로딩 상태
  error: null, // 에러 메시지
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 유저 로그인 성공
    setUser(state, action) {
      state.user = action.payload;
    },
    // 로딩 상태 설정
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    // 에러 설정
    setError(state, action) {
      state.error = action.payload;
    },
    // 로그아웃
    clearUser(state) {
      state.user = null;
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, clearUser } = userSlice.actions;

export default userSlice.reducer;
