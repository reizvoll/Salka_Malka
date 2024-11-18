import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { FaPencilAlt } from "react-icons/fa";
import { addPost, updatePost } from "../api/PostApi";
import { uploadFiles } from "../api/storage";
import PostInput from "../components/PostInput";
import PostImageInput from "../components/PostImageInput";
import ImagePreview from "../components/ImagePreview";
import { useLocation, useNavigate } from "react-router-dom";

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

const CreatePost = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialPost = useMemo(
    () => location.state?.post || { title: "", content: "", images: [] },
    [location.state?.post]
  );

  const isUpdatePost = location.state?.isUpdatePost || false;

  // location.state?.images를 useMemo 대신 useEffect로 처리
  const [postImgs, setPostImgs] = useState([]);

  useEffect(() => {
    setPostImgs(location.state?.images || []);
  }, [location.state?.images]);

  useEffect(() => {
    console.log("포스트 이미지", postImgs);
  }, [postImgs]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: isUpdatePost ? initialPost : {},
  });

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // 이미지 URL을 미리보기용으로 업데이트
  useEffect(() => {
    if (isUpdatePost) {
      setValue("title", initialPost.title);
      setValue("content", initialPost.content);
      setPreviewImages(postImgs.map((img) => img.image_url)); // image_url을 previewImages로 설정
    }
  }, [isUpdatePost, setValue, initialPost, postImgs]);

  const fileInputRef = useRef(null);

  const onSubmit = async (data) => {
    try {
      const user_id = import.meta.env.VITE_SAMPLE_USERID_KEY;
      const imageUrls = previewImages;

      if (isUpdatePost) {
        const updateData = {
          title: data.title,
          content: data.content,
        };
        const result = await updatePost({
          postId: initialPost.id,
          updateData,
          navigate,
          images: imageUrls,
        });

        if (result.error) {
          alert(`게시글 수정 실패: ${result.error}`);
        } else {
          alert("게시글이 수정되었습니다!");
        }
      } else {
        const newPost = { post: data, user_id, images: imageUrls };
        await addPost(newPost);
        alert("게시글이 등록되었습니다!");
      }

      navigate("/");
    } catch (err) {
      console.error("에러: ", err);
      alert(err.message);
    }
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

    setImages((prev) => [...prev, ...files]);
    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...fileURLs]);
  };

  const handleDeleteImage = (index) => {
    setPreviewImages((image) => image.filter((_, i) => i !== index));
    setImages((image) => image.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <PostFormWrap>
        <Header>
          <FaPencilAlt />
          <span>{isUpdatePost ? "게시글 수정" : "게시글 작성"}</span>
        </Header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <PostInput
            type="text"
            placeholder="제목을 작성해주세요"
            inputProps={register("title", { required: "제목을 작성해주세요" })}
            error={errors.title}
          />

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

          <FormFooter>
            <PostImageInput
              fileInputRef={fileInputRef}
              clickImage={clickImage}
              handleFileChange={handleFileChange}
            />
            <SubmitButton type="submit">등록</SubmitButton>
          </FormFooter>
        </form>

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
