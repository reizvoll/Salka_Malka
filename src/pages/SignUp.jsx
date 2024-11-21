import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { signUp } from "../api/user";
import AuthInput from "../components/AuthInput";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: #f9f9f9;
`;

const Card = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  background-color: white;
`;

const FormCard = styled.div`
  width: 400px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  width: 100px;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-align: center;
  background-color: #7e57c2;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #4b00cc;
  }
`;

const Message = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: ${({ success }) => (success ? "#4b00cc" : "tomato")};
`;

const LogoSide = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImg = styled.img`
  width: 350px;
`;

const BackButton = styled(IoChevronBackCircleOutline)`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 40px;
  color: #7c7c7c;
  cursor: pointer;

  &:hover {
    color: #666;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #ffffff;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border: 2px solid #666;
`;

const Label = styled.span`
  font-size: 14px;
  color: #666;
  text-decoration: underline;
  margin: 15px 0 20px 0;
`;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState(null);
  const fileInputRef = useRef(null); // 파일 입력 요소에 접근하기 위한 ref
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  // 이미지 선택 버튼 클릭 시 파일 입력 요소 열기
  const clickImage = () => {
    fileInputRef.current.click();
  };

  // 파일 선택 처리
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreviewImage(URL.createObjectURL(file)); // 미리보기 설정
    else setPreviewImage(null); // 파일 선택 취소 시 미리보기 초기화
  };

  // 회원가입 폼 제출 처리
  const onSubmit = async ({ email, password, nickname }) => {
    try {
      let imageFile = null;

      // 이미지 파일 확인
      if (fileInputRef.current.files.length > 0) {
        imageFile = fileInputRef.current.files[0];
      }

      await signUp(email, password, nickname, imageFile); // API 호출
      setMessage("회원가입 성공! 로그인 페이지로 이동하세요.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Container>
      <Card>
        {/* 돌아가기 아이콘 추가 */}
        <BackButton onClick={() => navigate("/login")} />
        <FormCard>
          <Header>
            <Title>회원가입</Title>
            <Subtitle>정보를 입력해주세요.</Subtitle>
          </Header>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 프로필 이미지 */}
            <ProfileContainer onClick={clickImage}>
              <ProfileImage src={previewImage || "/salka.png"} />
              <Label>프로필 이미지</Label>
            </ProfileContainer>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            {/* 이메일 입력 */}
            <AuthInput
              placeholder="이메일"
              inputProps={register("email", {
                required: "이메일을 입력해주세요.",
              })}
              error={errors.email}
            />

            {/* 비밀번호 입력 */}
            <AuthInput
              placeholder="비밀번호"
              inputProps={{
                ...register("password", {
                  required: "비밀번호를 입력해주세요.",
                  minLength: {
                    value: 6,
                    message: "비밀번호는 최소 6자 이상이어야 합니다.",
                  },
                }),
                type: "password",
              }}
              error={errors.password}
            />

            {/* 비밀번호 확인 입력 */}
            <AuthInput
              placeholder="비밀번호 확인"
              inputProps={{
                ...register("confirmPassword", {
                  required: "비밀번호를 다시 입력해주세요.",
                  validate: (value) => {
                    if (
                      value !==
                      document.querySelector('input[name="password"]').value
                    ) {
                      return "비밀번호가 일치하지 않습니다.";
                    }
                  },
                }),
                type: "password",
              }}
              error={errors.confirmPassword}
            />

            {/* 닉네임 입력 */}
            <AuthInput
              placeholder="닉네임"
              inputProps={register("nickname", {
                required: "닉네임을 입력해주세요.",
              })}
              error={errors.nickname}
            />

            <SubmitButton type="submit">회원가입</SubmitButton>
          </form>
          {/* 성공/오류 메시지 출력 */}
          {message && (
            <Message success={message.includes("성공")}>{message}</Message>
          )}
        </FormCard>
        <LogoSide>
          <LogoImg src="/logo.png" alt="Logo_Img" />
        </LogoSide>
      </Card>
    </Container>
  );
};

export default SignUp;
