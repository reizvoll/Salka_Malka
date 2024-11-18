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
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
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
