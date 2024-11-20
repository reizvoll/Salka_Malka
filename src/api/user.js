import supabase from "../supabaseClient";
import { v4 as uuidv4 } from "uuid";
import {
  getImgUrlFromDBStorage,
  upLoadImgToDBStorage,
} from "./FetchUserDataApi";

// 로그인
export const logIn = async (email, password) => {
  if (!email || !password) throw new Error("이메일과 비밀번호를 입력해주세요.");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);

  // 로그인 후 유저 정보 가져오기
  const { data, error: userError } = await supabase.auth.getUser();

  if (userError) throw new Error(userError.message);
  const uid = data.user.id;

  const { data: userData, error: userDataError } = await supabase
    .from("user_profiles")
    .select("id, username, profile_image_url")
    .eq("id", uid)
    .single();

  if (userData) {
    userData.email = data.user.email; // 이메일 추가
    // userData의 키를 setUser에서 기대하는 형태로 변경
    return {
      uid: userData.id,
      email: userData.email,
      nickname: userData.username,
      profileUrl: userData.profile_image_url,
    };
  }
};

// 회원 가입
export const signUp = async (email, password, displayName, imageFile) => {
  if (!email || !password || !displayName || !imageFile) {
    throw new Error("모든 필드를 입력해주세요.");
  }

  // 이미지 업로드
  const folderPath = `user`; // `avatar/user` 경로로 저장
  const bucketName = "avatar";
  const newImgFileName = `${uuidv4()}`; // 고유 파일명 생성
  const newImgPath = {
    bucketName,
    folderPath,
    fileName: newImgFileName,
  };

  upLoadImgToDBStorage(newImgPath, imageFile);

  // 업로드된 이미지의 공개 URL 가져오기
  const imageUrl = await getImgUrlFromDBStorage(newImgPath);

  // 회원가입 처리 프로세스
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // data: { displayName, avatarUrl: imageUrl }, // 닉네임, 이미지 URL 저장
      data: { avatarUrl: imageUrl }, // 닉네임, 이미지 URL 저장
    },
  });

  if (signUpError) {
    throw new Error(`회원가입 실패: ${signUpError.message}`);
  }

  // `uid` 가져오기
  const uid = signUpData.user?.id;

  if (!uid) {
    throw new Error("회원가입 완료 후 사용자 ID를 가져올 수 없습니다.");
  }

  // user_profiles 테이블에 데이터 삽입
  const { error: insertError } = await supabase.from("user_profiles").insert({
    id: uid, // 사용자 ID
    username: displayName, // 닉네임
    profile_image_url: imageUrl, // 프로필 이미지 URL
  });

  if (insertError) {
    throw new Error(`유저 프로필 저장 실패: ${insertError.message}`);
  }

  return true; // 회원가입 완료
};

// 비밀번호 재설정
export const resetPassword = async (email) => {
  if (!email) throw new Error("이메일을 입력해주세요.");
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/reset-page",
  }); // 우선 keep (일단 확인용으로 본 것.)
  if (error) throw new Error(error.message);
  return true; //// 성공적으로 비밀번호 재설정 이메일 발송
};

// 새 비밀번호 업데이트
export const updatePassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser(
    { password: newPassword } // 업데이트할 비밀번호
  );
  if (error) {
    throw new Error(`비밀번호 재설정 실패: ${error.message}`);
  }
  return true; // 비밀번호 재설정 성공
};

export const getId = async () => {
  try {
    // 현재 로그인된 사용자 정보 가져오기
    const { data: user, error } = await supabase.auth.getUser();
    if (error) throw new Error("사용자 정보를 가져올 수 없습니다.");

    const userId = user?.user?.id; // 사용자 ID 추출
    if (!userId) throw new Error("사용자 ID를 가져올 수 없습니다.");

    return userId; // 사용자 ID 반환
  } catch (error) {
    console.error("getId() 오류:", error.message);
    throw error;
  }
};

export const logOut = async () => {
  const { error: signOutError } = await supabase.auth.signOut();
  if (signOutError) throw new Error(`로그아웃 실패: ${signOutError.message}`);
}

// 회원 탈퇴
export const deleteAccount = async () => {
  try {
    // 현재 로그인된 사용자 ID 가져오기
    const userId = await getId(); // getId()를 통해 사용자 ID 가져오기
    if (!userId) throw new Error("사용자 ID를 가져올 수 없습니다.");

    // RPC를 호출하여 데이터 삭제
    const { error } = await supabase.rpc("delete_user", { user_id: userId });
    if (error) throw new Error(`RPC 호출 실패: ${error.message}`);

    console.log("RPC 호출 결과:");

    // 로그아웃 처리
    logOut();

    console.log("회원 탈퇴가 완료되었습니다.");
    return true;
  } catch (error) {
    console.error("회원 탈퇴 중 오류 발생:", error.message);
    throw error;
  }
};