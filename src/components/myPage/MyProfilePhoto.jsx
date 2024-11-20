import { useDispatch, useSelector } from "react-redux";
import { updateProfileImg } from "../../api/FetchUserDataApi";
import { updateUserProfileUrl } from "../../redux/slices/userSlice";
import styled from "styled-components";

const MyProfilleImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  border: none;
  border-radius: 50%;
  background-color: gray;
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
  border: 1px solid #fff;
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
  gap: 40px;
`;

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

export default MyProfilePhoto;