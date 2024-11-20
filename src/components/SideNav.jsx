import React from "react";
import styled from "styled-components";
import { FaHome, FaSearch, FaHeart, FaFolder, FaPen } from "react-icons/fa";
import { NavLink } from "react-router-dom"; // NavLink로 변경
import { useSelector } from "react-redux";
const SideMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 28px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease; /* 애니메이션 추가 */
  p {
    transition: color 0.2s ease;
    color: inherit; /* 기본 색상은 부모의 color를 상속받음 */
  }
  &.active {
    color: #7e57ce; /* 활성화된 링크에 색상 적용 */
    p {
      color: #7e57ce; /* p 태그도 함께 색상 변경 */
    }
  }
`;

const SideMenu = ({ icon, text, to }) => {
  return (
    <SideMenuWrapper>
      <StyledNavLink
        to={to}
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        {icon}
        <p>{text}</p>
      </StyledNavLink>
    </SideMenuWrapper>
  );
};

const CreatePostBtn = styled.button`
  margin-top: 24px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #444;
  box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px,
    rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px,
    rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px,
    rgba(42, 51, 70, 0.04) 0px 6px 6px -3px,
    rgba(14, 63, 126, 0.04) 0px 12px 12px -6px,
    rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;

  text-align: left;
  display: flex; /* flexbox로 설정 */
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
`;

const SideMenus = styled.div`
  color: #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: relative;
`;

const UserPrfile = styled.button`
  color: #ccc;
  position: relative; /* p 요소에 애니메이션 적용을 위해 상대 위치 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  p {
    margin-top: 8px;
  }
`;

const Sidebar = styled.nav`
  min-width: 64px;
  padding: 10px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  cursor: pointer;
  /* 임의로 박아놨습니다!!! 네브바 사이즈 확인용이에용 */
  box-shadow: rgba(9, 30, 66, 0.075) 0px 1px 1px,
    rgba(9, 30, 66, 0.041) 0px 0px 1px 1px;
  /* sideMenus가 호버되면 내부의 모든 p 태그가 보이도록 설정 */
  ${SideMenuWrapper} p, ${CreatePostBtn} p, ${UserPrfile} p {
    cursor: pointer;
    margin: 0;
    width: 100px;
    font-size: 13px;
    position: absolute;
    left: 50%;
    opacity: 0;
    transition: left 0.3s ease-in-out, opacity 0.3s ease;
  }

  &:hover ${SideMenuWrapper} p,
  &:hover ${CreatePostBtn} p,
  &:hover ${UserPrfile} p {
    left: 64px;
    opacity: 1;
  }
`;

const ProfileIcon = styled.div`
  background-image: ${({ $profileurl }) =>
    $profileurl ? `url(${$profileurl})` : "none"};
  background-size: cover; /* 이미지가 요소의 크기에 맞게 조정 */
  background-position: center; /* 이미지의 중심을 기준으로 배치 */
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  width: 42px;
  height: 42px;
  background-color: #f1f1f1;
  border-radius: 50%; /* 원형으로 만들기 */
`;

const Logo = styled.div`
  @font-face {
    font-family: "Yeongdo-Rg";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/2410-1@1.2/Yeongdo-Rg.woff2")
      format("woff2");
    font-weight: 400;
    font-style: normal;
  }
  font-family: "Yeongdo-Rg", sans-serif; /* @font-face에서 정의한 폰트 이름 사용 */

  font-size: 25px; /* 서체 크기 설정 */
  font-weight: 600; /* 기본 설정 */
  margin-bottom: 16px; /* 아래 여백 추가 */
  color: #7e57ce; /* 텍스트 색상 */
`;

const SideNav = () => {
  const { email, profileUrl } = useSelector((state) => state.user);
  return (
    <Sidebar>
      <StyledNavLink to="/">
        <Logo>
          살까
          <br />
          말까
        </Logo>
      </StyledNavLink>
      <SideMenus>
        <SideMenu icon={<FaHome size={22} />} text={"홈"} to="/" />
        <SideMenu icon={<FaSearch size={21} />} text={"검색"} to="/search" />
        <SideMenu icon={<FaFolder size={21} />} text={"내 글"} to="/myposts" />
        <SideMenu
          icon={<FaHeart size={21} />}
          text={"좋아요한 글"}
          to="/likedposts"
        />
        <StyledNavLink
          to="/create"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          <CreatePostBtn>
            <FaPen size={16} color="#fff" />
            <p>글 작성</p>
          </CreatePostBtn>
        </StyledNavLink>
      </SideMenus>
      <StyledNavLink
        to="/mypage"
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        <UserPrfile>
          <ProfileIcon $profileurl={profileUrl} />
          <p>{email}</p>
        </UserPrfile>
      </StyledNavLink>
    </Sidebar>
  );
};

export default SideNav;
