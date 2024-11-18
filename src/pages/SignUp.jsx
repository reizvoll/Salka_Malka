import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { signUp } from "../api/user";
import AuthInput from "../components/AuthInput";
import { IoChevronBackCircleOutline } from "react-icons/io5";

const Container = styled.div`
  background-color: #f9f9f9;
`;

const Card = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -65%);
  border-radius: 15px;
  background-color: white;
`;

const FormCard = styled.div`
  width: 400px;
  padding: 40px;
`;

const Header = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  width: 100px;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-align: center;
  background-color: #7e57c2;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #4b00cc;
  }
`;

const Message = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: ${({ success }) => (success ? "#4b00cc" : "tomato")};
`;

const ImgSide = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginImg = styled.img`
  width: 350px;
`;

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState(null);

  const onSubmit = async ({ email, password }) => {
    try {
      await signUp(email, password);
      setMessage("회원가입 성공! 로그인 페이지로 이동하여 로그인하세요.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Container>
      <Card>
        <FormCard>
          <Header>
            <Title>회원가입</Title>
            <Subtitle>계정을 만들려면 아래 정보를 입력해주세요.</Subtitle>
          </Header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AuthInput
              placeholder="이메일"
              inputProps={register("email", {
                required: "이메일을 입력해주세요.",
              })}
              error={errors.email}
            />
            <AuthInput
              type="password"
              placeholder="비밀번호"
              inputProps={register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 6,
                  message: "비밀번호는 최소 6자 이상이어야 합니다.",
                },
              })}
              error={errors.password}
            />
            <SubmitButton type="submit">회원가입</SubmitButton>
          </form>
          {message && <Message success={message.includes("성공")}>{message}</Message>}
        </FormCard>
        <ImgSide>
          <LoginImg src="/logo.png" alt="SignUp_Logo" />
        </ImgSide>
      </Card>
    </Container>
  );
};

export default SignUp;