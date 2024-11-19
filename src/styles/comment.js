import { BiSolidMessageAdd } from "react-icons/bi";
import styled from "styled-components";

export const CreatedAt = styled.p`
  font-size: 0.8rem;
  color: rgb(142, 142, 142);
  margin-left: 8px;
`
export const SaveButton = styled(BiSolidMessageAdd)`
  position: absolute;
  background-color: #7e57ce;
  color: white;
  padding: 3px;
  width: 24px;
  height: 24px;
  margin-left: auto;
  border-radius: 50%;
  font-size: 0.65rem;
  right: 3px;
  top: 3px;
  text-align: center;
`;