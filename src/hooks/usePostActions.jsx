import { addPost, fetchPostById, updatePost } from "../api/PostApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const usePostActions = (userId) => {
  const navigate = useNavigate();

  const handlePostAction = async (postData, images, postId = null) => {
    try {
      const result = postId
        ? await updatePost({ postId, updateData: postData, images })
        : await addPost({ post: postData, user_id: userId, images });

      const fetchedPost = await fetchPostById(postId || result);

      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success(postId ? "게시글 수정 완료" : "게시글 등록 완료");
      navigate(`/detail/${postId || result.id}`, {
        state: { post: fetchedPost },
      });
    } catch (err) {
      toast.error(err.message || "게시글 작업 중 오류가 발생했습니다.");
      throw err; // 로딩 상태 처리를 위해 에러를 throw
    }
  };

  const handleUpdatePost = (data, allImages) => {
    const updateData = { title: data.title, content: data.content };
    return handlePostAction(updateData, allImages, data.id);
  };

  const handleCreatePost = (data, allImages) => {
    const newPost = { ...data, user_id: userId, images: allImages };
    return handlePostAction(newPost, allImages);
  };

  return { handleUpdatePost, handleCreatePost };
};
