import { useDispatch, useSelector } from "react-redux";
import ProfileItemNameToggle from "./ProfileItemNameToggle";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { TiUserDelete } from "react-icons/ti";
import styled from "styled-components";
import { logOut } from "../../api/user";
import MyPageBtn from "../../styles/myPageBtn";
import { persistor } from "../../redux/config/configStore";
import { clearUser } from "../../redux/slices/userSlice";

const NoStyledBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  &:hover {
    color: #7e57ce;
  }
`;

const DeleteLink = styled.div`
  margin-right: auto;
  &:hover {
    color: #4e3a78;
  }
`;

const ButtonsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px 0;
  width: 70%;
`;

const MyProfileItemInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
`;
const MyProfileItemBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #fff;
  cursor: ${({ $hover }) => ($hover ? "pointer" : "default")};
  ${({ $hover }) =>
    $hover &&
    `
    &:hover {
      background-color: #7e57ce;
      color : #fff;
    }
  `};
`;
const MyProfileItemName = styled.div`
  width: 10%;
`;
const MyProfileItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
`;
const MyProfileItemListSheet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 30px 0;
  width: 70%;
`;

const MyProfileItem = ({ itemName, children }) => {
  return (
    <MyProfileItemWrapper>
      <MyProfileItemName>{itemName}</MyProfileItemName>
      <MyProfileItemBox>
        <MyProfileItemInner>{children}</MyProfileItemInner>
      </MyProfileItemBox>
    </MyProfileItemWrapper>
  );
};

const MyProfileItemList = () => {
  const { email } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const HandleOnClickLink = (e) => {
    const url = e.currentTarget.dataset.url;
    navigate(url);
  };
  const HandleOnClickLogOut = (e) => {
    const url = e.currentTarget.dataset.url;
    logOut();
    persistor.purge();
    dispatch(clearUser());
    navigate(url);
  };
  const btnStyle = { padding: "10px 20px", width: "120px" };

  return (
    <MyProfileItemListSheet>
      <MyProfileItem itemName={"ID"}>
        <span>{email}</span>
      </MyProfileItem>

      <MyProfileItem itemName={"이름"}>
        <ProfileItemNameToggle />
      </MyProfileItem>

      <ButtonsBox>
        <MyPageBtn
          type="button"
          data-url="/password-reset"
          onClick={HandleOnClickLink}
          $btnStyle={btnStyle}
        >
          비밀번호 변경
        </MyPageBtn>
        <MyPageBtn
          type="button"
          data-url="/login"
          onClick={HandleOnClickLogOut}
          $btnStyle={btnStyle}
        >
          <span>로그아웃</span>
          <MdLogout />
        </MyPageBtn>
      </ButtonsBox>

      <DeleteLink>
        <NoStyledBtn
          type="button"
          data-url="/delete-account"
          onClick={HandleOnClickLink}
        >
          <span>계정 삭제</span> <TiUserDelete />
        </NoStyledBtn>
      </DeleteLink>
    </MyProfileItemListSheet>
  );
};

export default MyProfileItemList;
