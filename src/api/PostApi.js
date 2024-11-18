import supabase from "../supabaseClient";

export const fetchPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      post_images!left (id, post_id, image_url)
      ;
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  console.log("Fetched data with joined post_images:", data);
  return data;
};

export const addImages = async ({ tableName, foreignKey, records }) => {
  // 이미지 데이터 삽입
  const { error: imageError } = await supabase.from(tableName).insert(records);

  // 에러 처리
  if (imageError) {
    console.error(`${tableName} 테이블에 이미지 추가 중 에러:`, imageError);
    throw new Error(imageError.message);
  }

  console.log(`${tableName} 테이블에 이미지 추가 성공`);
};

export const addPost = async ({ post, user_id, images }) => {
  console.log("post api: ", post);
  console.log("user id: ", user_id);

  // 게시글 데이터 추가
  const { data: postData, error: postError } = await supabase
    .from("posts")
    .insert({ user_id, title: post.title, content: post.content })
    .select();

  // 게시글 추가 중 에러 처리
  if (postError) {
    console.log("게시글 추가 에러:", postError);
    throw new Error(postError.message);
  }

  // 추가된 게시글의 ID 가져오기
  const postId = postData[0].id;

  // 이미지 추가
  if (images.length > 0) {
    const imageRecords = images.map((imageUrl) => ({
      post_id: postId,
      image_url: imageUrl,
    }));

    // 공통 이미지 추가 함수 호출
    await addImages({
      tableName: "post_images",
      foreignKey: "post_id",
      records: imageRecords,
    });
  }

  console.log("게시글과 이미지 추가 성공:", postData, images);
};

export const fetchImages = async (postId) => {
  const { data: images, error: imageError } = await supabase
    .from("post_images")
    .select("image_url")
    .eq("post_id", postId);

  if (imageError) throw new Error("이미지 정보를 가져오는 데 실패했습니다.");

  return images;
};

export async function deletePost({ postId, navigate }) {
  try {
    // 1. post 테이블에서 게시글 삭제
    const { error: deletePostError } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId);

    if (deletePostError) {
      throw new Error(`게시글 삭제 실패: ${deletePostError.message}`);
    }

    // 삭제 완료 후 /로 리디렉션
    navigate("/");

    return { message: "게시글 삭제가 완료되었습니다." };
  } catch (error) {
    console.error("삭제 중 오류 발생:", error.message);
    return { error: error.message };
  }
}
