import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MyPageBtn = styled.button`
  padding: 5px;
  background-color: #7e57ce;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #4e3a78;
  }
`;
const ProfileNameInput = styled.input`
  width: 80%;
  font-size: 16px;
  border: none;
  outline: none;
`;
const ProfileNameForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

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
  border-radius: 10px;
  background-color: #fff;
`;
const MyProfileItemListSheet = styled.div`
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
const HiddenInput = styled.input`
  display: none;
`;
const PseudoInputBtn = styled.label`
  padding: 5px;
  padding: 5px 10px;
  background-color: #7e57ce;
  color: white;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: #4e3a78;
  }
  cursor: pointer;
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

const ProfileItemNameInput = ({ setIsModifingName }) => {
  const [name, setName] = useState("");
  const handleOnNameChange = (e) => {
    setName(e.target.value);
  };
  const handleIsModifingName = (e) => {
    //아무것도 입력하지 않고 수정완료 버튼 누름
    if (name === "") {
      window.alert("이름을 입력해주세요!");
      return;
    }

    //이름 바꿀지 확인하기
    const isChangingName = window.confirm("정말 이름을 바꾸시겠습니까?");
    if (isChangingName) window.alert("바꾸었습니다");

    //이름 수정하기에서 이름 보여주기로 돌아감
    setIsModifingName(false);
  };

  return (
    <>
      <ProfileNameInput
        type="text"
        placeholder="이름을 입력해주세요"
        value={name}
        onChange={handleOnNameChange}
      />
      <MyPageBtn onClick={handleIsModifingName}>수정완료</MyPageBtn>
    </>
  );
};

const ProfileItemName = ({ setIsModifingName }) => {
  const handleIsModifing = () => {
    setIsModifingName(true);
  };

  return (
    <>
      <span>이름</span>
      <MyPageBtn type="button" onClick={handleIsModifing}>
        수정하기
      </MyPageBtn>
    </>
  );
};

const ProfileItemNameToggle = () => {
  const [isModifingName, setIsModifingName] = useState(false);
  const profileName = isModifingName ? (
    <ProfileItemNameInput setIsModifingName={setIsModifingName} />
  ) : (
    <ProfileItemName setIsModifingName={setIsModifingName} />
  );

  return profileName;
};

const MyProfileItemList = () => {
  const navigateTo = useNavigate();
  const HandleOnClickLink = (e) => {
    navigateTo(e.target.dataset.url);
  };

  return (
    <MyProfileItemListSheet>
      <MyProfileItem>
        <MyProfileItemInner>
          <span>아이디</span>
        </MyProfileItemInner>
      </MyProfileItem>

      <MyProfileItem>
        <MyProfileItemInner>
          <ProfileItemNameToggle />
        </MyProfileItemInner>
      </MyProfileItem>

      <MyProfileItem>
        <MyProfileItemInner data-url="/" onClick={HandleOnClickLink}>
          <span>비밀번호 바꾸기</span>
        </MyProfileItemInner>
      </MyProfileItem>

      <MyProfileItem>
        <MyProfileItemInner data-url="/" onClick={HandleOnClickLink}>
          <span>회원 탈퇴</span>
        </MyProfileItemInner>
      </MyProfileItem>
    </MyProfileItemListSheet>
  );
};

const MyProfilePhoto = () => {
  const [UploadedPhotoFile, setUploadedPhotoFile] = useState(null);

  useEffect(() => {}, [UploadedPhotoFile]); //프로필 이미지 업데이트 -> 재렌더링

  const handleImgUpload = (e) => {
    const photoFile = e.target.value;
    setUploadedPhotoFile(photoFile);
  };

  return (
    <MyProfilePhotoBox>
      <MyProfilleImgWrapper>
        <img src="" alt="profile img" />
      </MyProfilleImgWrapper>
      <HiddenInput
        type="file"
        name="profilePhoto"
        id="profilePhoto"
        accept="image/*"
        onChange={handleImgUpload}
      />
      <PseudoInputBtn htmlFor="profilePhoto">
        프로필 이미지 바꾸기
      </PseudoInputBtn>
    </MyProfilePhotoBox>
  );
};

const MyPage = () => {
  return (
    <MyPageMain>
      <MyPageTitle>My page</MyPageTitle>
      <MyProfilePhoto />
      <MyProfileItemList />
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
