import React from "react";
import styled from "styled-components";
import { ReactComponent as MenuIcon } from "../../assets/images/menu-icon.svg";
import { ReactComponent as MypageIcon } from "../../assets/images/mypage-icon.svg";
import { Link } from "react-router-dom";

const NavBar = styled.nav`
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #d9d9d9;
  height: 50px;
`;

const Logo = styled.b`
  font-family: "Pretendard-Bold";
  font-size: 20px;
  color: #4c3073;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

function NavigationBar() {
  return (
    <NavBar>
      <IconButton>
        <MenuIcon />
      </IconButton>
      <Link to="/" style={{ color: 'inherit' , textDecoration : 'none' }}>
        <Logo>LOVE CLOUD</Logo>
      </Link>
      <IconButton>
        <MypageIcon />
      </IconButton>
    </NavBar>
  );
}

export default NavigationBar;
