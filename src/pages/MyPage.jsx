import styled from "styled-components";
import MyProfileItemList from "../components/myPage/MyProfileItemList";
import MyProfilePhoto from "../components/myPage/MyProfilePhoto";

const MyPageTitle = styled.h1`
  margin: 30px 0;
  font-size: 40px;
  font-weight: bold;
`;
const MyPageMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 80%;
  min-width: 800px;
  min-height: 100vh;
`;

const MyPage = () => {
  return (
    <MyPageMain>
      <MyPageTitle>My Page</MyPageTitle>
      <MyProfilePhoto />
      <MyProfileItemList />
    </MyPageMain>
  );
};

export default MyPage;
