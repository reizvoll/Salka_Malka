import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import styled from "styled-components";

const OutletWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  max-width: 900px;
  margin: 0 auto;
  height: fit-content;
`;

export default function MainLayout() {
  return (
    <div style={{ display: "flex" }}>
      <SideNav />
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
    </div>
  );
}
