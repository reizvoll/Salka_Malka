import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../components/MainLayout";
import Search from "../pages/Search";
import MyPosts from "../pages/Myposts";
import LikedPosts from "../pages/LikedPosts";
import CreatePost from "../pages/CreatePost";
import MyPage from "../pages/MyPage";
import Detail from "../pages/Detail";
import Login from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import PasswordReset from "../pages/PasswordReset";
import DeleteAccount from "../pages/DeleteAccount";
import ResetPage from "../pages/ResetPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/reset-page" element={<ResetPage />} />
        <Route path="/delete-account" element={<DeleteAccount />} />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="myposts" element={<MyPosts />} />
          <Route path="likedposts" element={<LikedPosts />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="update/:id" element={<CreatePost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
