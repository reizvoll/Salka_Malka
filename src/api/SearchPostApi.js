import supabase from "../supabaseClient";

const searchPosts = async (searchKeyword, orderingOption) => {
    const orderingOptionList = {
        "newToOld": { columnName : 'created_at', isAscending: false },
        "oldToNew": { columnName: 'created_at', isAscending: true }
    }

    const { columnName, isAscending } = orderingOptionList[orderingOption];

    const { data, error } = await supabase.from("posts").select(`
      *,
      post_images!left (id, post_id, image_url)
    `).ilike('title', `%${searchKeyword}%`).order(columnName, { ascending: isAscending });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export default searchPosts;