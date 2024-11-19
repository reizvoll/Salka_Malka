import supabase from "../supabaseClient";

// 로그인
export const logIn = async (email, password) => {
  if (!email || !password) throw new Error("이메일과 비밀번호를 입력해주세요.");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);

  // 로그인 후 유저 정보 가져오기
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) throw new Error(userError.message);

  // 유저 정보 반환
  console.log(user);
  return user;
};

// 회원 가입
export const signUp = async (email, password, displayName, imageFile) => {
  if (!email || !password || !displayName || !imageFile) {
    throw new Error("모든 필드를 입력해주세요.");
  }

  // 이미지 업로드
  const fileName = `${email}-${Date.now()}`; // 고유 파일명 생성
  const folderPath = `user`; // `avatar/user` 경로로 저장

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("avatar") // 버킷 이름을 'avatar'로 변경
    .upload(`${folderPath}/${fileName}`, imageFile); // 경로 + 파일명

  if (uploadError) {
    throw new Error(`이미지 업로드 실패: ${uploadError.message}`);
  }

  // 업로드된 이미지의 공개 URL 가져오기
  const imageUrl = supabase.storage
    .from("avatar") // 버킷 이름
    .getPublicUrl(`${folderPath}/${fileName}`).data.publicUrl;

  if (!imageUrl) {
    throw new Error("이미지 URL 생성 실패");
  }

  // 회원가입 처리 프로세스
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { displayName, avatarUrl: imageUrl }, // 닉네임, 이미지 URL 저장
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
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw new Error(error.message);
  return true;
};

// 회원 탈퇴
export const deleteAccount = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  return true;
};
