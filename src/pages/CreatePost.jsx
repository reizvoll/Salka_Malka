import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { FaPencilAlt } from "react-icons/fa";
import { addPost } from "../api/PostApi";
import { uploadFiles } from "../api/storage";
import PostInput from "../components/PostInput";
import PostImageInput from "../components/PostImageInput";
import ImagePreview from "../components/ImagePreview";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const PostFormWrap = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  width: 550px;
  height: auto;
  border-radius: 10px;
  background-color: white;
  padding: 20px 25px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
`;

export const ErrorMessage = styled.span`
  font-size: 14px;
  color: tomato;
  display: block;
  margin-top: -5px;
  margin-left: 0px;
  margin-bottom: 10px;
`;

const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 13px;
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background-color: #7e57ce;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #4e3a78;
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #7e57ce;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }, // 유효성 검사 에러 처리
  } = useForm();

  // 이미지 파일과 미리보기 이미지를 관리하는 state
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 파일 입력 요소에 접근하기 위한 ref
  const fileInputRef = useRef(null);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const user_id = import.meta.env.VITE_SAMPLE_USERID_KEY;

      // 업로드된 이미지 URL 배열
      const imageUrls = images.length > 0 ? await uploadFiles(images) : [];

      // 게시글 추가
      await addPost({ post: data, user_id, images: imageUrls });
      alert("게시글 등록 완료!");
      setIsLoading(false);
    } catch (err) {
      console.log("에러: ", err);
      alert(err.message);
      setIsLoading(false);
    }
  };

  // 이미지 선택 버튼 클릭 시 파일 입력 요소 열기
  const clickImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // 선택된 파일을 배열로 변환

    // 이미지 최대 업로드 개수 제한 (3장)
    if (images.length + files.length > 3) {
      alert("이미지는 3장까지만 가능");
      return;
    }

    // 기존 이미지 파일과 새로 추가된 파일 병합
    setImages((prev) => [...prev, ...files]);

    // 미리보기 URL 생성 및 업데이트
    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...fileURLs]);
  };

  // 선택한 이미지 삭제
  const handleDeleteImage = (index) => {
    setPreviewImages((image) => image.filter((_, i) => i !== index));
    setImages((image) => image.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <PostFormWrap>
        <Header>
          <FaPencilAlt />
          <span>게시글 작성</span>
        </Header>

        {/* 게시글 작성 폼 */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 제목 입력 필드 */}
          <PostInput
            type="text"
            placeholder="제목을 작성해주세요"
            inputProps={register("title", { required: "제목을 작성해주세요" })}
            error={errors.title}
          />

          {/* 내용 입력 필드 */}
          <PostInput
            as="textarea"
            placeholder="내용을 작성해주세요"
            inputProps={register("content", {
              required: "내용을 작성해주세요",
              minLength: {
                value: 10,
                message: "10글자 이상 작성해주세요",
              },
            })}
            error={errors.content}
          />

          {/* 폼 하단 (이미지 입력 및 제출 버튼) */}
          <FormFooter>
            <PostImageInput
              fileInputRef={fileInputRef}
              clickImage={clickImage}
              handleFileChange={handleFileChange}
            />
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : "등록"}
            </SubmitButton>
          </FormFooter>
        </form>

        {/* 이미지 미리보기 */}
        {previewImages.length > 0 && (
          <ImagePreview
            previewImages={previewImages}
            handleDeleteImage={handleDeleteImage}
          />
        )}
      </PostFormWrap>
    </Container>
  );
};

export default CreatePost;
