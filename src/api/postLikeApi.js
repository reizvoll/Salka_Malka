import supabase from "../supabaseClient";

export const fetchLikeStatus = async (userId, postId) => {
  const { data, error } = await supabase.rpc("get_post_like_status", {
    id_post: postId,
    id_user: userId,
  });
  return data;
};

export const addPostLike = async (userId, postId) => {
  const { error } = await supabase.from("post_likes").insert({ user_id: userId, post_id: postId });
  if (error) throw new Error("좋아요에 실패했습니다.");
};

export const deletePostLike = async (userId, postId) => {
  const { error } = await supabase
    .from("post_likes")
    .delete()
    .eq("user_id", userId)
    .eq("post_id", postId);
  if (error) throw new Error("좋아요 취소에 실패했습니다.");
};
