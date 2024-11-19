import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../components/MainLayout";
import Search from "../pages/Search";
import MyPosts from "../pages/Myposts";
import LikedPosts from "../pages/LikedPosts";
import CreatePost from "../pages/CreatePost";
import MyPage from "../pages/MyPage";
import Comments from "../components/post-comment/Comments";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="myposts" element={<MyPosts />} />
          <Route path="likedposts" element={<LikedPosts />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
