import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../slices/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root", // 저장소 키
  storage, // 사용할 스토리지 (localStorage)
};

// userReducer를 persistReducer로 감싸기
const persistedUserReducer = persistReducer(persistConfig, UserReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer, // userReducer를 'user' 키에 연결
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist 관련 직렬화 오류 방지
    }),
});

// persistStore를 사용해 저장소 만들기
export const persistor = persistStore(store);
export default store;
