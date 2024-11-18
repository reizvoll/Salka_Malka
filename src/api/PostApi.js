import supabase from "../supabaseClient";

export const fetchPosts = async () => {
  const { data, error } = await supabase.from("posts").select(`
      *,
      post_images!left (id, post_id, image_url)
    `);

  if (error) {
    throw new Error(error.message);
  }

  console.log("Fetched data with joined post_images:", data);
  return data;
};

export const addPost = async ({ post, user_id, images }) => {
  console.log("post api: ", post);
  console.log("user id: ", user_id);

  // 게시글 데이터 추가 (Supabase의 "posts" 테이블에 삽입)
  const { data: postData, error: postError } = await supabase
    .from("posts")
    .insert({ user_id, title: post.title, content: post.content })
    .select();

  // 게시글 추가 중 에러가 발생한 경우
  if (postError) {
    console.log("게시글 추가 에러:", postError);
    throw new Error(postError.message);
  }

  // 추가된 게시글의 ID 가져오기
  const postId = postData[0].id;

  // 이미지가 존재할 경우 이미지 데이터 추가
  if (images.length > 0) {
    // 이미지 데이터를 "post_id"와 함께 매핑
    const imageRecords = images.map((imageUrl) => ({
      post_id: postId,
      image_url: imageUrl,
    }));

    // 이미지 데이터 추가 (Supabase의 "post_images" 테이블에 삽입)
    const { error: imageError } = await supabase
      .from("post_images")
      .insert(imageRecords);

    // 이미지 추가 중 에러가 발생한 경우
    if (imageError) {
      console.error("이미지 추가 에러:", imageError);
      throw new Error(imageError.message);
    }
  }

  console.log("게시글과 이미지 추가 성공:", postData, images);
};

export async function deletePost(postId) {
  try {
    // 1. 게시글의 이미지 정보를 가져오기
    const { data: images, error: imageError } = await supabase
      .from("post_images")
      .select("image_url")
      .eq("post_id", postId);

    if (imageError) throw new Error("이미지 정보를 가져오는 데 실패했습니다.");

    // 이미지 파일 삭제 작업
    const storageDeletions = images.map(async (image) => {
      const fileName = image.image_url.split("/").pop(); // URL에서 파일 이름 추출
      const { error: deleteError } = await supabase.storage
        .from("your-bucket-name") // 스토리지 버킷 이름
        .remove([fileName]); // 파일 삭제
      if (deleteError) throw new Error("이미지를 삭제하는 데 실패했습니다.");
    });

    // 2. post_images 테이블에서 이미지 삭제
    const { error: deleteImagesError } = await supabase
      .from("post_images")
      .delete()
      .eq("post_id", postId);

    if (deleteImagesError)
      throw new Error("post_images에서 이미지를 삭제하는 데 실패했습니다.");

    // 이미지 파일 삭제와 테이블 삭제가 모두 완료될 때까지 기다리기
    await Promise.all(storageDeletions);

    // 3. post_likes 테이블에서 좋아요 정보 삭제
    const { error: deleteLikesError } = await supabase
      .from("posts_likes")
      .delete()
      .eq("post_id", postId);

    if (deleteLikesError)
      throw new Error("post_likes에서 좋아요를 삭제하는 데 실패했습니다.");

    // 4. comments 테이블에서 해당 post_id에 맞는 댓글 삭제
    const { error: deleteCommentsError } = await supabase
      .from("comments")
      .delete()
      .eq("post_id", postId);

    if (deleteCommentsError)
      throw new Error("comments에서 댓글을 삭제하는 데 실패했습니다.");

    // 5. post 테이블에서 게시글 삭제
    const { error: deletePostError } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId);

    if (deletePostError) throw new Error("게시글을 삭제하는 데 실패했습니다.");

    // 성공적으로 모든 작업을 완료한 경우 메시지 반환

    return {
      message: "게시글 삭제가 완료되었습니다.",
    };
  } catch (error) {
    // 오류 발생 시 예외 처리
    return { error: error.message };
  }
}
