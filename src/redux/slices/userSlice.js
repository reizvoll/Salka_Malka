import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: null,
  email: null,
  nickname: null,
  profileUrl: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 유저 로그인 성공
    setUser(state, action) {
      const { uid, email, nickname, profileUrl } = action.payload;
      state.uid = uid;
      state.email = email;
      state.nickname = nickname;
      state.profileUrl = profileUrl;
    },

    // 로그아웃
    clearUser(state) {
      state.uid = null;
      state.email = null;
      state.nickname = null;
      state.profileUrl = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
