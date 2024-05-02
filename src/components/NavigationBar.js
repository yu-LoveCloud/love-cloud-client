import React from 'react';
import styled from 'styled-components';
import { ReactComponent as MenuIcon } from '../assets/images/menu-icon.svg';
import { ReactComponent as MypageIcon } from '../assets/images/mypage-icon.svg';

const NavBar = styled.nav`
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Logo = styled.h1`
    font-size: 1.5em;
    color: #333;
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
        <Logo>LOVE CLOUD</Logo>
        <IconButton>
          <MypageIcon />
        </IconButton>
      </NavBar>
    );
  }

export default NavigationBar;