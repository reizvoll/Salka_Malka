import React from "react";
import styled from "styled-components";

const ImagePreviews = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 10px;
  img {
    width: 160px;
    height: 160px;
    border-radius: 5px;
    border: 1px solid #ddd;
    object-fit: cover;
  }
`;

const ImagePreviewWrap = styled.div`
  position: relative;
`;

const MainImg = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  background: #027f00;
  color: white;
  width: 40px;
  height: 20px;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeleleBtn = styled.div`
  font-size: 14px;
  position: absolute;
  top: 0px;
  right: 0px;
  color: white;
  width: 20px;
  height: 20px;
  background: black;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: tomato;
  }
`;

const ImagePreview = ({ previewImages, handleDeleteImage }) => {
  return (
    <ImagePreviews>
      {/* 미리보기 이미지 배열을 순회하여 각 이미지를 렌더링 */}
      {previewImages.map((image, index) => (
        <ImagePreviewWrap key={index}>
          {/* 미리보기 이미지 */}
          <img src={image} alt={`preview-${index}`} />

          {/* 삭제 버튼 */}
          <DeleleBtn onClick={() => handleDeleteImage(index)}>x</DeleleBtn>

          {/* 첫 번째 이미지를 '대표'로 표시 */}
          {index === 0 && <MainImg>대표</MainImg>}
        </ImagePreviewWrap>
      ))}
    </ImagePreviews>
  );
};

export default ImagePreview;
