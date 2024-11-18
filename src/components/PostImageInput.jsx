import React from "react";
import styled from "styled-components";
import { FaImage } from "react-icons/fa";

const ImgIconWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  font-size: 10px;
  cursor: pointer;

  &:hover {
    color: #007bff;
  }

  svg {
    font-size: 24px;
    margin-bottom: 1px;
  }
`;

const PostImageInput = ({ fileInputRef, clickImage, handleFileChange }) => {
  return (
    <>
      {/* 숨겨진 파일 입력 요소(input은 안보이고, 이미지 아이콘만 보이도록) */}
      <input
        type="file"
        ref={fileInputRef} // fileInputRef를 통해 DOM 요소에 직접 접근
        style={{ display: "none" }} // 사용자가 보지 못하도록 숨김
        accept="image/*" // 이미지 파일만 허용
        multiple
        onChange={handleFileChange}
      />

      {/* 사용자가 클릭하여 파일 입력 창을 열 수 있는 영역 */}
      <ImgIconWrap onClick={clickImage}>
        <FaImage /> {/* 이미지 아이콘 */}
        <span>이미지</span>
      </ImgIconWrap>
    </>
  );
};

export default PostImageInput;
