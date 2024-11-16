import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
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

export const addPost = async (post, images) => {
  const { data: postData, error: postError } = await supabase
    .from("posts")
    .insert({
      user_id: import.meta.env.VITE_SAMPLE_USERID_KEY,
      title: post.title,
      content: post.content,
    })
    .select();

  if (postError) {
    console.log("게시글 추가 에러:", postError);
    throw new Error(postError.message);
  }

  const postId = postData[0].id;

  const imageRecords = images.map((imageUrl) => ({
    post_id: postId,
    image_url: imageUrl,
  }));

  const { error: imageError } = await supabase
    .from("post_images")
    .insert(imageRecords);

  if (imageError) {
    console.log("이미지 추가 에러:", imageError);
    throw new Error(imageError.message);
  }

  console.log("게시글과 이미지 추가 성공:", postData, images);
};
