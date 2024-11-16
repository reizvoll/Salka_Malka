import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import supabase from "../supabaseClient";

// export const fetchPosts = async () => {
//   const { data, error } = await supabase.from("posts").select("*");
//   if (error) {
//     throw new Error(error.message);
//   }
//   console.log("Fetched data:", data);
//   return data;
// };

// export const fetchPosts = async () => {
//   const { data, error } = await supabase.from("posts").select(`
//       *,
//       post_images (id, post_id, image_url)
//     `); // 관계 데이터 post_images도 함께 선택

//   if (error) {
//     throw new Error(error.message);
//   }

//   console.log("Fetched data with images:", data);
//   return data;
// };

export const fetchPosts = async () => {
  const { data, error } = await supabase.from("posts").select(`
      *,
      post_images!inner (id, post_id, image_url)
    `);

  if (error) {
    throw new Error(error.message);
  }

  console.log("Fetched data with joined post_images:", data);
  return data;
};
