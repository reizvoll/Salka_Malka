import React, { useState } from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 12px;
  width: 100%;
  border: 1px solid ${({ error }) => (error ? "tomato" : "#ddd")};
  border-radius: 8px;
  outline: none;
  margin-bottom: 15px;

  &:focus {
    border-color: #6200ee;
  }
`;

const ErrorMessage = styled.div`
  font-size: 14px;
  color: tomato;
  margin-top: -10px;
  margin-bottom: 15px;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 12px;
  top: 38%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  color: #7c7c7c;

  &:hover {
    text-decoration: underline;
  }
`;

const AuthInput = ({ placeholder, inputProps, error }) => {
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보기 상태 관리

  // 비밀번호 보기 기능이 활성화된 경우 토글 버튼 추가
  const isPasswordField = inputProps?.type === "password";

  return (
    <InputWrapper>
      <Input
        placeholder={placeholder}
        error={error}
        autoComplete="off" // autocomplete 비활성화
        {...inputProps}
        type={isPasswordField && showPassword ? "text" : inputProps.type} // 상태에 따라 type 변경
      />
      {isPasswordField && (
        <ToggleButton
          onClick={(e) => {
            e.preventDefault(); // 기본 동작 방지
            setShowPassword((prev) => !prev);
          }}
        >
          {showPassword ? "숨기기" : "보이기"}
        </ToggleButton>
      )}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </InputWrapper>
  );
};

export default AuthInput;