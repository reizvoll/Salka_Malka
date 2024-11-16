import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { FaPencilAlt, FaImage } from "react-icons/fa";
import { addPost } from "../api/PostApi";

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

const ErrorMessage = styled.span`
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

const ImagePreviewWrap = styled.div`
  position: relative;
`;

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const onSubmit = (data) => {
    console.log("data: ", data);
    addPost(data, images);
    alert("게시글 등록완료!");
  };

  const clickImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (images.length + files.length > 3) {
      alert("이미지는 3장까지만 가능");
      return;
    }
    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...fileURLs]);
  };

  const handleDeleteImage = (index) => {
    setImages((image) => image.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <PostFormWrap>
        <Header>
          <FaPencilAlt />
          <span>게시글 작성</span>
        </Header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="제목을 작성해주세요"
            {...register("title", { required: "제목을 작성해주세요" })}
            error={errors.title}
          />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
          <Textarea
            placeholder="내용을 작성해주세요"
            {...register("content", {
              required: "내용을 작성해주세요",
              minLength: {
                value: 10,
                message: "10글자 이상 작성해주세요",
              },
            })}
            error={errors.content}
          />
          {errors.content && (
            <ErrorMessage>{errors.content.message}</ErrorMessage>
          )}

          <FormFooter>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />

            <ImgIconWrap onClick={clickImage}>
              <FaImage />
              <span>이미지</span>
            </ImgIconWrap>

            <SubmitButton type="submit">등록</SubmitButton>
          </FormFooter>
          {errors.images && (
            <ErrorMessage>{errors.images.message}</ErrorMessage>
          )}
        </form>

        {images.length > 0 && (
          <ImagePreviews>
            {images.map((image, index) => (
              <ImagePreviewWrap key={index}>
                <img src={image} alt={`preview-${index}`} />
                <DeleleBtn onClick={() => handleDeleteImage(index)}>
                  x
                </DeleleBtn>
                {index === 0 && <MainImg>대표</MainImg>}
              </ImagePreviewWrap>
            ))}
          </ImagePreviews>
        )}
      </PostFormWrap>
    </Container>
  );
};

export default CreatePost;
