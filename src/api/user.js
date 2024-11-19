import supabase from '../supabaseClient';

// 로그인
export const logIn = async (email, password) => {
  if (!email || !password) throw new Error("이메일과 비밀번호를 입력해주세요.");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return true;
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
    .from('avatar') // 버킷 이름을 'avatar'로 변경
    .upload(`${folderPath}/${fileName}`, imageFile); // 경로 + 파일명

  if (uploadError) {
    throw new Error(`이미지 업로드 실패: ${uploadError.message}`);
  }

  // 업로드된 이미지의 공개 URL 가져오기
  const imageUrl = supabase.storage
    .from('avatar') // 버킷 이름
    .getPublicUrl(`${folderPath}/${fileName}`).data.publicUrl;

  if (!imageUrl) {
    throw new Error("이미지 URL 생성 실패");
  }

  // 회원가입 처리 프로세스
  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { displayName, avatarUrl: imageUrl }, // 닉네임, 이미지 URL 저장
    },
  });

  if (signUpError) {
    throw new Error(`회원가입 실패: ${signUpError.message}`);
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