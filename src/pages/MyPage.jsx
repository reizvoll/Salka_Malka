import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { updateProfileTxt, updateProfileImg } from "../api/FetchUserDataApi";
import { updateUserNickname, updateUserProfileUrl } from "../redux/slices/userSlice";

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
  const { uid } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleOnNameChange = (e) => {
    setName(e.target.value);
  };
  const handleIsModifingName = async () => {
    //아무것도 입력하지 않고 수정완료 버튼 누름
    if (name === "") {
      window.alert("이름을 입력해주세요!");
      setIsModifingName(false);
      return;
    }

    const isChangingName = window.confirm("정말 이름을 바꾸시겠습니까?");    
    if (isChangingName) {
      //db에 업데이트
      await updateProfileTxt(uid, { columnName: 'username', newData: name });
      //스토어 업데이트
      dispatch(updateUserNickname(name));
    }

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
  const { uid, nickname } = useSelector((state) => state.user);
  const handleIsModifing = () => {
    setIsModifingName(true);
  };

  return (
    <>
      <span>이름 : {nickname}</span>
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
  const { email } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const HandleOnClickLink = (e) => {
    navigateTo(e.target.dataset.url);
  };

  return (
    <MyProfileItemListSheet>
      <MyProfileItem>
        <MyProfileItemInner>
          <span>ID : {email}</span>
        </MyProfileItemInner>
      </MyProfileItem>

      <MyProfileItem>
        <MyProfileItemInner>
          <ProfileItemNameToggle />
        </MyProfileItemInner>
      </MyProfileItem>

      <MyProfileItem>
        <MyProfileItemInner data-url="/password-reset" onClick={HandleOnClickLink}>
          <span>비밀번호 변경</span>
        </MyProfileItemInner>
      </MyProfileItem>

      <MyProfileItem>
        <MyProfileItemInner data-url="/delete-account" onClick={HandleOnClickLink}>
          <span>계정 삭제</span>
        </MyProfileItemInner>
      </MyProfileItem>
    </MyProfileItemListSheet>
  );
};

const MyProfilePhoto = () => {
  const { uid, email, profileUrl } = useSelector((state) => state.user);
  const profilePhoto = profileUrl ? profileUrl : "/default-profile.png";
  const dispatch = useDispatch();

  const handleImgUpload = async (e) => {
    const photoFile = e.target.files[0];
    //db에 업데이트
    const PhotoDataobj = { uid, email, imageFile: photoFile, profileUrl };
    const imgUrl = await updateProfileImg(PhotoDataobj);
    //스토어 업데이트
    dispatch(updateUserProfileUrl(imgUrl));
  };

  return (
    <MyProfilePhotoBox>
      <MyProfilleImgWrapper>
        <img src={profilePhoto} alt="profile img" />
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
