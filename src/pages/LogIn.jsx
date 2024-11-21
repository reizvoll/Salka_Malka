import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { logIn } from "../api/user";
import AuthInput from "../components/AuthInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

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
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  width: 300px;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-align: center;
  background-color: #7e57c2;
  border: transparent;
  border-radius: 20px;
  cursor: pointer;
  margin: 15px 0 20px 0;

  &:hover {
    background-color: #4b00cc;
  }
`;

const SignUpLink = styled.button`
  font-size: 14px;
  color: #4b00cc;
  background: transparent;
  border: transparent;
  cursor: pointer;
  margin: 15px 0 0 0;

  &:hover {
    text-decoration: underline;
  }
`;

const PasswordResetLink = styled.button`
  font-size: 12px;
  color: #666;
  background: transparent;
  border: transparent;
  cursor: pointer;
  display: block;
  text-align: center;
  margin-top: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

const LogoSide = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImg = styled.img`
  width: 350px;
`;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    try {
      const user = await logIn(email, password);
      dispatch(setUser(user));
      toast.success("로그인 성공!");
      navigate("/"); // 로그인 후 홈으로 이동
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container>
      <Card>
        <FormCard>
          <Header>
            <Title>Log In</Title>
          </Header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AuthInput
              placeholder="E-mail"
              inputProps={register("email", {
                required: "계정 이메일을 입력해주세요.",
              })}
              error={errors.email}
            />
            <AuthInput
              placeholder="Password"
              inputProps={{
                ...register("password", {
                  required: "비밀번호를 입력해주세요.",
                }),
                type: "password",
              }}
              error={errors.password}
            />
            <SubmitButton type="submit">Login</SubmitButton>
          </form>
          <SignUpLink onClick={() => navigate("/signup")}>
            계정이 없으신가요? 회원가입 하기
          </SignUpLink>
            <PasswordResetLink onClick={() => navigate("/password-reset")}>
              Forgot your password?
            </PasswordResetLink>
        </FormCard>
        <LogoSide>
          <LogoImg src="/logo.png" alt="Logo_Img" />
        </LogoSide>
      </Card>
    </Container>
  );
};

export default Login;
