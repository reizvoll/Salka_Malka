import React from 'react'
import styled from 'styled-components';

const Interaction = ({ children, onClick }) => {
  return <Item onClick={onClick}>{children}</Item>;
};

const Item = styled.div`
  display: flex;
  align-items: center;
  color: #777;

  font-size: 14px;
  cursor: pointer;
  gap: 10px;
  position: relative;
`;

export default Interaction