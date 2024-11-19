import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 300px;
  height: 150px;
  gap: 10px;
  background: white;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  gap: 100px;
`;

const UserModal = ({ isOpen, title, message, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContent>
        <h2>{title}</h2>
        <p>{message}</p>
        <ModalActions>
          <button onClick={onClose}>취소</button>
          <button onClick={onConfirm}>확인</button>
        </ModalActions>
      </ModalContent>
    </Overlay>
  );
};

export default UserModal;
