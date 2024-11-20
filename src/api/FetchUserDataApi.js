import { v4 as uuidv4 } from "uuid";
import supabase from "../supabaseClient";
import { toast } from "react-toastify";

async function updateProfileTxt(uid, dataObj) {
    const { columnName, newData } = dataObj;

    try {
        const { error } = await supabase
            .from("user_profiles")
            .update({ [columnName]: newData })
            .eq("id", uid) // 특정 ID와 매칭

        if (error) {
            if (error.message.includes('duplicate key value violates unique constraint')) {
                return { error: '이미 존재하는 닉네임입니다.' };
            }
            console.error("업데이트 중 오류 발생:", error.message);
            return { error: error.message };
        }
        return {};
    } catch (err) {
        console.error("업데이트 중 알 수 없는 오류 발생:", err.message);
        return { error: err.message };
    }
}

async function getImgUrlFromDBStorage(locationObj) {
    const { bucketName, folderPath, fileName } = locationObj;

    // 업로드된 이미지의 공개 URL 가져오기
    const imageUrl = supabase.storage
        .from(`${bucketName}`) // 버킷 이름
        .getPublicUrl(`${folderPath}/${fileName}`).data.publicUrl;

    if (!imageUrl) return null
    return imageUrl
}

async function removeImgFromDBStorage(locationObj) {
    const { bucketName, folderPath, fileName } = locationObj;
    const { data: removedData, error: removeError } = await supabase.storage
        .from(`${bucketName}`)
        .remove([`${folderPath}/${fileName}`]); // 경로 + 파일명
    if (removeError) {
        throw new Error(`이미지 삭제 실패: ${removeError.message}`);
    }
}

async function upLoadImgToDBStorage(locationObj, imageFile) {
    const { bucketName, folderPath, fileName } = locationObj;
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from(`${bucketName}`)
        .upload(`${folderPath}/${fileName}`, imageFile); // 경로 + 파일명
    if (uploadError) {
        throw new Error(`이미지 업로드 실패: ${uploadError.message}`);
    }
}

async function updateProfileImg(profileImgData) {
    const { uid, email, imageFile, profileUrl } = profileImgData;
    const prevFileName = profileUrl.split('/').pop();

    const bucketName = "avatar";
    const folderPath = "user"// `avatar/user` 경로로 저장
    

    const newImgFileName = `${uuidv4()}`; // 고유 파일명 생성
    const newImgPath = {
        bucketName, folderPath, fileName: newImgFileName
    }
    const prevImgPath = { bucketName, folderPath, fileName: prevFileName }
    // 새 프로필 이미지 업로드
    upLoadImgToDBStorage(newImgPath, imageFile);
    // 이전 프로필 이미지 삭제
    removeImgFromDBStorage(prevImgPath);


    // 업로드된 이미지의 공개 URL 가져오기
    const imageUrl = await getImgUrlFromDBStorage(newImgPath);
    // user_profiles 테이블에 데이터 업데이트
    const { error: insertError } = await supabase
        .from("user_profiles")
        .update({ profile_image_url: imageUrl })
        .eq("id", uid);

    return imageUrl;
}

export { updateProfileTxt, updateProfileImg, upLoadImgToDBStorage, getImgUrlFromDBStorage }