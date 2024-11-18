import React from "react";
import styled from "styled-components";
import { ErrorMessage } from "../pages/CreatePost";

const Input = styled.input`
  font-size: 16px;
  padding: 10px;
  width: 100%;
  border: 1px solid ${({ error }) => (error ? "tomato" : "#ddd")};
  border-radius: 5px;
  outline: none;
  margin-bottom: 10px;
  &:focus {
    border-color: #007bff;
  }
`;

const Textarea = styled.textarea`
  font-size: 16px;
  padding: 10px;
  width: 100%;
  height: 200px;
  border: 1px solid ${({ error }) => (error ? "tomato" : "#ddd")};
  border-radius: 5px;
  outline: none;
  margin-bottom: 10px;
  resize: none;
  &:focus {
    border-color: #007bff;
  }
`;

const PostInput = ({
  as: Component = "input",
  placeholder,
  inputProps, // register 함수에서 반환된 속성을 입력 필드에 적용
  error, // 유효성 검사 에러 메시지
}) => {
  // `as` 속성이 "textarea"이면, Textarea 컴포넌트, 아니면 Input 컴포넌트 사용
  const StyledComponent = Component === "textarea" ? Textarea : Input;

  return (
    <div>
      <StyledComponent
        placeholder={placeholder}
        error={error}
        {...inputProps}
      />
      {/* 에러 메시지가 존재하면 화면에 표시 */}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
};

export default PostInput;
