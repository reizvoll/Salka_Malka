import React, { useState } from "react";
import styled from "styled-components";
import { resetPassword } from "../api/user";
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
  transform: translate(-50%, -65%);
  border-radius: 15px;
  background-color: white;
`;

const FormCard = styled.div`
  width: 400px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
`;

const AuthInput = styled.input`
  width: 100%; /* 부모 너비 기준으로 확장 */
  max-width: 350px; /* 최대 너비 제한 */
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  box-sizing: border-box; /* 패딩 포함한 너비 계산 */
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

const LogoSide = styled.div`
  width: 400px;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImg = styled.img`
  width: 350px;
`;

const Message = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: ${({ success }) => (success ? "#4b00cc" : "tomato")};
`;

const BackButton = styled(IoChevronBackCircleOutline)`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 40px;
  color: #7c7c7c;
  cursor: pointer;

  &:hover {
    color: #666;
  }
`;

const PasswordReset = () => {
  const [email, setEmail] = useState(""); // 이메일 입력 상태
  const [message, setMessage] = useState(null); // 성공 또는 에러 메시지 상태
  const navigate = useNavigate(); // 네비게이션 훅

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("이메일을 입력해주세요.");
      return;
    }

    try {
      await resetPassword(email); // 비밀번호 재설정 API 호출
      setMessage("비밀번호 재설정 이메일이 발송되었습니다.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Container>
      <Card>
        {/* 돌아가기 버튼 */}
        <BackButton onClick={() => navigate("/login")} />
        <FormCard>
          <Header>
            <Title>Password Reset</Title>
            <Subtitle>비밀번호를 재설정하려면 이메일을 입력하세요.</Subtitle>
          </Header>
          <AuthInput
            placeholder="E-mail"
            inputProps={{
              value: email,
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <SubmitButton onClick={handlePasswordReset}>Reset</SubmitButton>
          {message && (
            <Message success={message.includes("발송")}>{message}</Message>
          )}
        </FormCard>
        <LogoSide>
          <LogoImg src="/logo.png" alt="Logo_Img" />
        </LogoSide>
      </Card>
    </Container>
  );
};

export default PasswordReset;
