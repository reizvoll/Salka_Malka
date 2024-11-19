import React, { useState } from "react";
import styled from "styled-components";
import { updatePassword } from "../api/user";
import AuthInput from "../components/AuthInput";
import { useLocation, useNavigate } from "react-router-dom";

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

const SubmitButton = styled.button`
  width: 300px;
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

const ResetPage = () => {
  const [newPassword, setNewPassword] = useState(""); // 새 비밀번호 상태
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 상태
  const [message, setMessage] = useState(null); // 성공/실패 메시지 상태
  const navigate = useNavigate(); // 네비게이션

  // 비밀번호 재설정 처리
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setMessage("모든 필드를 입력해주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 비밀번호 업데이트 요청
      await updatePassword(newPassword);
      setMessage("비밀번호가 성공적으로 재설정되었습니다.");
      setTimeout(() => navigate("/login"), 3000); // 3초 후 로그인 페이지로 이동
    } catch (error) {
      setMessage(error.message || "비밀번호 재설정 실패");
    }
  };

  return (
    <Container>
      <Card>
        <FormCard>
          <Header>
            <Title>Reset Password</Title>
            <Subtitle>새 비밀번호를 입력해 주세요.</Subtitle>
          </Header>
          <form onSubmit={handleResetPassword}>
            <AuthInput
              placeholder="새 비밀번호"
              inputProps={{
                type: "password",
                value: newPassword,
                onChange: (e) => setNewPassword(e.target.value)
              }}
            />
            <AuthInput
              placeholder="비밀번호 확인"
              inputProps={{
                type: "password",
                value: confirmPassword,
                onChange: (e) => setConfirmPassword(e.target.value)
              }}
            />
            <SubmitButton type="submit">Reset Password</SubmitButton>
          </form>
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

export default ResetPage;
