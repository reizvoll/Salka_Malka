import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaPencilAlt } from "react-icons/fa";
import { addPost, fetchPostById, updatePost } from "../api/PostApi";
import { uploadFiles } from "../api/storage";
import PostInput from "../components/PostInput";
import PostImageInput from "../components/PostImageInput";
import ImagePreview from "../components/ImagePreview";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
export const ErrorMessage = styled.span`
  font-size: 14px;
  color: tomato;
  display: block;
  margin-top: -5px;
  margin-left: 0px;
  margin-bottom: 10px;
`;
const PostFormWrap = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  width: 550px;
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

const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
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

export const Spinner = styled.div`
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
  const location = useLocation();
  const navigate = useNavigate();
  console.log("형태 확인", location.state?.images);
  const initialPost = useMemo(
    () => location.state?.post || { title: "", content: "" },
    [location.state?.post]
  );
  const initialImages = useMemo(
    () => location.state?.images || [],
    [location.state?.images]
  );

  const isUpdatePost = location.state?.isUpdatePost || false;

  // 상태 관리
  const [existingImages, setExistingImages] = useState(initialImages); // 기존 이미지
  const [newImages, setNewImages] = useState([]); // 신규 이미지
  const [previewImages, setPreviewImages] = useState(initialImages); // 미리보기용 이미지
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state.user.uid);
  console.log("userId", userId);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialPost,
  });

  const fileInputRef = useRef(null);

  // Update 모드 초기화
  useEffect(() => {
    if (isUpdatePost) {
      setValue("title", initialPost.title);
      setValue("content", initialPost.content);
      setExistingImages(initialImages);
    }
  }, [isUpdatePost, initialPost, setValue, initialImages]);

  // 파일 추가
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (newImages.length + files.length > 3) {
      // console.log("이미지는 ");
      toast.success("이미지는 최대 3장까지 가능합니다.");
      return;
    }

    setNewImages((prev) => [...prev, ...files]);

    // 파일 URL을 생성하고 image_url을 가진 객체로 저장
    const fileURLs = files.map((file) => {
      return { image_url: URL.createObjectURL(file) }; // .image_url로 저장
    });

    setPreviewImages((prev) => [...prev, ...fileURLs]);
  };

  // 이미지 삭제
  const handleDeleteImage = (index) => {
    if (index < existingImages.length) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingImages.length;
      setNewImages((prev) => prev.filter((_, i) => i !== newIndex));
    }

    // 미리보기 이미지 배열에서 해당 이미지 삭제
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };
  //제출 핸들러
  const onSubmit = async (data) => {
    try {
      console.log("onSubmit data:", data);
      setIsLoading(true);
      const uploadedNewImages =
        newImages.length > 0 ? await uploadFiles(newImages) : [];
      const allImages = [
        ...existingImages.map((image) => image.image_url),
        ...uploadedNewImages,
      ];

      if (isUpdatePost) {
        await handleUpdatePost(data, allImages); // 수정
      } else {
        await handleCreatePost(data, allImages); // 등록
      }
    } catch (err) {
      console.error("에러: ", err);
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  const clickImage = () => {
    fileInputRef.current?.click();
  };

  const handlePostAction = async (postData, images, postId = null) => {
    const result = postId
      ? await updatePost({ postId, updateData: postData, images })
      : await addPost({ post: postData, user_id: userId, images });
    console.log(result);
    if (result.error) {
      setIsLoading(false);
      toast.error(result.error);
    } else {
      const postData = await fetchPostById(postId || result);
      setIsLoading(false);
      toast.success(postId ? "게시글 수정 완료" : "게시글 등록 완료");
      navigate(`/detail/${postId || result.id}`, { state: { post: postData } });
    }
  };
  // 수정 핸들러
  const handleUpdatePost = (data, allImages) => {
    console.log(data.title, data.content);
    const updateData = { title: data.title, content: data.content };
    return handlePostAction(updateData, allImages, initialPost.id);
  };

  // 등록 핸들러
  const handleCreatePost = (data, allImages) => {
    const newPost = { ...data, user_id: userId, images: allImages };
    return handlePostAction(newPost, allImages);
  };
  return (
    <Container>
      <PostFormWrap>
        <Header>
          <FaPencilAlt />
          <span>{isUpdatePost ? "게시글 수정" : "게시글 작성"}</span>
        </Header>

        {/* 게시글 작성 폼 */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 제목 입력 필드 */}
          <PostInput
            type="text"
            placeholder="제목을 작성해주세요"
            inputProps={register("title", {
              required: "제목을 작성해주세요",
              maxLength: {
                value: 20,
                message: "제목은 20글자 이하만 가능합니다.",
              },
            })}
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
              {isLoading ? <Spinner /> : isUpdatePost ? "수정" : "등록"}
            </SubmitButton>
          </FormFooter>
        </form>

        {/* 이미지 미리보기 */}
        {previewImages.length > 0 && (
          <ImagePreview
            previewImages={previewImages.map((image) => image.image_url)}
            handleDeleteImage={handleDeleteImage}
          />
        )}
      </PostFormWrap>
    </Container>
  );
};

export default CreatePost;
