import React, { useState } from "react";
import styled from "styled-components";
import { deleteAccount } from "../api/user";
import UserModal from "../components/UserModal";

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
`;

const Header = styled.div`
  margin-bottom: 30px;
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
  margin-bottom: 20px;
`;

const DeleteButton = styled.button`
  width: 150px;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-align: center;
  background-color: #dc3545; /* 빨간색 버튼 */
  border: none;
  border-radius: 20px; /* 둥근 모서리 */
  cursor: pointer;

  &:hover {
    background-color: #b21f2d; /* 호버 시 더 어두운 빨간색 */
  }
`;

const Message = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: ${({ success }) => (success ? "#28a745" : "tomato")}; /* 성공 메시지: 초록색, 실패 메시지: 빨간색 */
`;

const ImgSide = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginImg = styled.img`
  width: 350px;
`;

const DeleteAccount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태
  const [message, setMessage] = useState(null); // 메시지 상태 (성공/실패)

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(); // 회원 탈퇴 API 호출
      setMessage("회원 탈퇴가 완료되었습니다."); // 성공 메시지
      setIsModalOpen(false); // 모달 닫기
    } catch (error) {
      setMessage(error.message); // 실패 메시지
    }
  };

  return (
    <Container>
      <Card>
        <FormCard>
          <Header>
            <Title>회원 탈퇴</Title>
            <Subtitle>회원 탈퇴를 원하시면 아래 버튼을 클릭하세요.</Subtitle>
          </Header>
          <DeleteButton onClick={() => setIsModalOpen(true)}>회원 탈퇴</DeleteButton>
          {message && <Message success={message.includes("완료")}>{message}</Message>}
        </FormCard>
        <ImgSide>
          <LoginImg src="/logo.png" alt="DeleteAccount_Logo" />
        </ImgSide>
      </Card>

      {/* 탈퇴 확인 모달 */}
      <UserModal
        isOpen={isModalOpen}
        title="회원 탈퇴"
        message="정말 탈퇴하시겠습니까?"
        onClose={() => setIsModalOpen(false)} // 모달 닫기
        onConfirm={handleDeleteAccount} // 탈퇴 확인
      />
    </Container>
  );
};

export default DeleteAccount;