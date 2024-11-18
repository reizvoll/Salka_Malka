import supabase from "../supabaseClient";
import { v4 as uuidv4 } from "uuid";

export const uploadFiles = async (files) => {
  // Promise.all로 여러 파일을 처리
  const uploadPromises = files.map(async (file) => {
    const { data: avatarData, error } = await supabase.storage
      .from("avatar")
      .upload(`public/${uuidv4()}.png`, file); // 파일을 "public/" 폴더에 저장

    if (error) {
      console.error("파일 업로드 에러:", error);
      throw error;
    }

    // 업로드된 파일의 경로를 이용해 Public URL을 생성
    const { data: publicUrlData, error: publicUrlError } = supabase.storage
      .from("avatar")
      .getPublicUrl(avatarData.path);

    if (publicUrlError) {
      console.error("퍼블릭 URL 생성 에러:", publicUrlError);
      throw publicUrlError;
    }

    // 파일의 Public URL을 반환
    return publicUrlData.publicUrl;
  });

  // 모든 파일 업로드 완료 후 결과 반환
  return Promise.all(uploadPromises);
};
