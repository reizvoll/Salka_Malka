import supabase from "../supabaseClient";

const searchPosts = async (searchKeyword, orderingOption) => {
    const orderingOptionList = {
        "newToOld": { columnName : 'created_at', isAscending: false },
        "oldToNew": { columnName: 'created_at', isAscending: true }
    }

    const { columnName, isAscending } = orderingOptionList[orderingOption];

    const { data: posts, error: postsError } = await supabase.from("posts").select(`
      *,
      post_images!left(id, post_id, image_url)
    `).ilike('title', `%${searchKeyword}%`).order(columnName, { ascending: isAscending });

    if (postsError) {
        throw new Error(postsError.message);
    }

    // 2. 게시물마다 작성자 정보 가져오기
    const postsWithUserProfiles = await Promise.all(
        posts.map(async (post) => {
            const { data: userProfile, error: userProfileError } = await supabase
                .from("user_profiles")
                .select("username, profile_image_url")
                .eq("id", post.user_id)
                .single(); // single()을 사용해 한 명의 사용자 정보만 가져옵니다
            if (userProfileError) {
                throw new Error(userProfileError.message);
            }
            return {
                ...post,
                user_profiles: userProfile, // 작성자 정보 추가
            };
        })
    );
    console.log(postsWithUserProfiles);
    return postsWithUserProfiles;
};

export default searchPosts;