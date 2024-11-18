import supabase from "../supabaseClient";


// 로그인
export const logIn = async (email, password) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return true;
};

// 회원가입

export const signUp = async (email, password) => {
  const { error } = await supabase.auth.signUp({ email, password, options: { data: { autocomplete: "off" } }}); //autocomplete 비활성화
  if (error) throw new Error(error.message);
  return true;
};

// 비밀번호 재설정
export const resetPassword = async (email) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, { options: { autocomplete: "off" }}); //autocomplete 비활성화
  if (error) throw new Error(error.message);
  return true;
};

// 회원 탈퇴
export const deleteAccount = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  return true;
};