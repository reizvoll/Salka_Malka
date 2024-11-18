import supabase from '../supabaseClient';

// 로그인
export const logIn = async (email, password) => {
  if (!email || !password) throw new Error("이메일과 비밀번호를 입력해주세요.");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return true;
};

// 회원가입
export const signUp = async (email, password, displayName) => {
  const { error } = await supabase.auth.signUp({ email, password, options: { data: { displayName },},});
  if (error) throw new Error(error.message);
  return true;
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