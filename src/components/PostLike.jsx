import React, { useEffect, useState } from "react";
import { IoMdHeart } from "react-icons/io";
import { useSelector } from "react-redux";
import { addPostLike, deletePostLike, fetchLikeStatus } from "../api/postLikeApi";
import { toast } from "react-toastify";
import { Interaction } from "../styles/postInteractions";

const PostLike = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { uid: userId } = useSelector((state) => state.user);

  const handleLikeButtonClick = async () => {
    try {
      if (isLiked) {
        await deletePostLike(userId, post.id);
        setLikeCount(likeCount - 1);
      } else {
        await addPostLike(userId, post.id);
        setLikeCount(likeCount + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchLikeStatus(userId, post.id);
        console.log("🚀 ~ fetch ~ data:", data);

        setIsLiked(!!data[0].is_liked);
        setLikeCount(data[0].like_count);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  return (
    <Interaction onClick={handleLikeButtonClick}>
      <IoMdHeart size={20} color={isLiked ? "red" : ""} />
      <div>{likeCount}</div>
    </Interaction>
  );
};

export default PostLike;
