import React from "react";
import styled from "styled-components";

const MyProfileItemInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
`;
const MyProfileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 35px;
  border: 1px solid gray;
  border-radius: 5px;
`;

const MyProfileItemList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 30px 0;
  width: 80%;
`;

const MyProfilleImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: none;
  border-radius: 50%;
  background-color: grey;
  overflow: hidden;
  img {
    width: 100%;
  }
`;

const MyProfilePhotoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

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
  width: 100%;
  min-height: 100vh;
  border: 1px solid gray;
`;

const MyPage = () => {
  return (
    <MyPageMain>
      <MyPageTitle>My page</MyPageTitle>

      <MyProfilePhotoBox>
        <MyProfilleImgWrapper>
          <img src="" alt="profile img" />
        </MyProfilleImgWrapper>
        <div>프로필 이미지 바꾸기</div>
      </MyProfilePhotoBox>

      <MyProfileItemList>

        <MyProfileItem>
          <MyProfileItemInner>아이디</MyProfileItemInner>
        </MyProfileItem>

        <MyProfileItem>
          <MyProfileItemInner>
            <div>이름</div>
            <button type="button">수정</button>
          </MyProfileItemInner>
        </MyProfileItem>

        <MyProfileItem>
          <MyProfileItemInner>
            <div>이메일</div>
            <button type="button">수정</button>
          </MyProfileItemInner>
        </MyProfileItem>

        <MyProfileItem>
          <MyProfileItemInner>비밀번호 바꾸기</MyProfileItemInner>
        </MyProfileItem>

        <MyProfileItem>
          <MyProfileItemInner>회원 탈퇴</MyProfileItemInner>
        </MyProfileItem>
        
      </MyProfileItemList>
    </MyPageMain>
  );
};

export default MyPage;

/*
기능
-현재 로그인한 유저의 정보 받기
-현재 로그인한 유저의 정보 수정하기
-정보가 수정되면 새로고침
-정보를 비우면 경고 띄우기
*/

/*
UI는 대대적인 수정이 필요해보인다.
UI
-글 항목
메인 페이지, 디테일 페이지 ui 재활용
*/
