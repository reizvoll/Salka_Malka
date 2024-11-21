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
      // profileUrl이 없거나 빈 값인 경우 기본 이미지 설정
      state.profileUrl = profileUrl && profileUrl.trim() !== "" ? profileUrl : null;
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

    // profileUrl이 없거나 빈 값인 경우 기본 이미지 설정
    state.profileUrl = profileUrl && profileUrl.trim() !== "" ? profileUrl : "/salka.png";
    },
  },
});

export const { setUser, clearUser, updateUserNickname, updateUserProfileUrl } =
  userSlice.actions;

  export const initAuthListener = () => async (dispatch) => {
    try {
      // 초기 유저 정보 가져오기
      const { data: { user }, error } = await supabase.auth.getUser();
  
      if (error) {
        console.error("유저 정보를 가져오는 중 오류:", error.message);
        return; // 오류 발생, 초기화 종료
      }
  
      if (user) {
        // 유저 정보가 있는 경우 Redux 저장
        dispatch(
          setUser({
            uid: user.id,
            email: user.email,
            nickname: user.user_metadata?.username || "", // 기본값 제거
            profileUrl: user.user_metadata?.avatarUrl || null, // 기본 이미지 설정 제거
          })
        );
      } else {
        // 유저 정보가 없을 경우 clearUser 처리
        dispatch(clearUser());
        return; // 로그인 상태가 아니므로 리스너 설정 불필요
      }
  
      // onAuthStateChange 리스너 설정
      const { data: listener } = supabase.auth.onAuthStateChange((e, session) => {
        if (session) {
          const currentUser = session.user;
          dispatch(
            setUser({
              uid: currentUser.id,
              email: currentUser.email,
              nickname: currentUser.user_metadata?.username || "", // 기본값 제거
              profileUrl: currentUser.user_metadata?.avatarUrl || null, // 기본 이미지 설정 제거
            })
          );
        } else {
          dispatch(clearUser());
        }
      });
  
      // 리스너 정리 함수 반환
      return () => {
        listener.subscription.unsubscribe();
      };
    } catch (error) {
      console.error("initAuthListener 오류:", error.message);
    }
  };  

export default userSlice.reducer;
