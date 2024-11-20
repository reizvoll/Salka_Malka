import { createSlice } from "@reduxjs/toolkit";
import supabase from "../../supabaseClient";

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

    // 유저 이름 업데이트
    updateUserNickname(state, action) {
      const nickname = action.payload;
      state.nickname = nickname;
    },

    // 유저 프로필 사진 업데이트
    updateUserProfileUrl(state, action) {
      const profileUrl = action.payload;
      state.profileUrl = profileUrl;
    },
  },
});

export const { setUser, clearUser, updateUserNickname, updateUserProfileUrl } =
  userSlice.actions;

export const initAuthListener = () => async (dispatch) => {
  try {
    // 1. 초기 유저 정보 가져오기
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error("유저 정보를 가져오는 중 오류:", error.message);
    } else if (user) {
      dispatch(
        setUser({
          uid: user.id,
          email: user.email,
          nickname: user.user_metadata?.username || "Guest",
          profileUrl: user.user_metadata?.avatarUrl || "/salka.png", // default 이미지
        })
      );
    }

    // 2. onAuthStateChange 리스너 설정
    const { data: listener } = supabase.auth.onAuthStateChange((e, session) => {
      if (session) {
        const currentUser = session.user;
        dispatch(
          setUser({
            uid: currentUser.id,
            email: currentUser.email,
            nickname: currentUser.user_metadata?.username || "Guest",
            profileUrl: currentUser.user_metadata?.avatarUrl || "/salka.png",
          })
        );
      } else {
        dispatch(clearUser());
      }
    });

    // 3. 리스너 해제 처리
    return () => {
      listener.subscription.unsubscribe();
    };
  } catch (error) {
    console.error("initAuthListener 오류:", error.message);
  }
};

export default userSlice.reducer;
