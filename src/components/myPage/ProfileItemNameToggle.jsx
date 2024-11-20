import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileTxt } from "../../api/FetchUserDataApi";
import { updateUserNickname } from "../../redux/slices/userSlice";
import styled from "styled-components";
import MyPageBtn from "../../styles/myPageBtn";
import { toast } from "react-toastify";

const ProfileNameInput = styled.input`
  width: 80%;
  font-size: 16px;
  border: none;
  outline: none;
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
      toast.error("이름을 입력해주세요!");
      setIsModifingName(false);
      return;
    }

    const isChangingName = window.confirm("정말 이름을 바꾸시겠습니까?");
    if (isChangingName) {
      //db에 업데이트
      const { error } = await updateProfileTxt(uid, { columnName: "username", newData: name });
      if (error) return toast.error(error);
      //스토어 업데이트
      dispatch(updateUserNickname(name));
    }

    setIsModifingName(false);
  };

  const btnStyle = { padding: "5px" };

  return (
    <>
      <ProfileNameInput
        type="text"
        placeholder="이름을 입력해주세요"
        maxLength="15"
        value={name}
        onChange={handleOnNameChange}
      />
      <MyPageBtn onClick={handleIsModifingName} $btnStyle={btnStyle}>
        수정완료
      </MyPageBtn>
    </>
  );
};

const ProfileItemName = ({ setIsModifingName }) => {
  const { nickname } = useSelector((state) => state.user);
  const handleIsModifing = () => {
    setIsModifingName(true);
  };

  const btnStyle = { padding: "5px" };

  return (
    <>
      <span>{nickname}</span>
      <MyPageBtn type="button" onClick={handleIsModifing} $btnStyle={btnStyle}>
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

export default ProfileItemNameToggle;
