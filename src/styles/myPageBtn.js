import styled from "styled-components";

const MyPageBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: ${({ $btnStyle }) =>
        $btnStyle.padding ? $btnStyle.padding : "none"};
  width: ${({ $btnStyle }) => ($btnStyle.width ? $btnStyle.width : "auto")};
  background-color: #7e57ce;
  color: white;
  border: none;
  border-radius: 5px;
  text-align: center;
  vertical-align: center;
  cursor: pointer;
  &:hover {
    background-color: #4e3a78;
  }
`;

export default MyPageBtn;