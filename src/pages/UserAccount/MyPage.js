import React , { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AppContainer from '../../components/AppContainer';
import NavigationBar from '../../components/Nav/NavigationBar';
import ContentContainer from '../../components/ContentContainer';
import WhiteButton from '../../components/button/WhiteButton';
import { Title } from "../../components/Typography";
import { ButtonWrapper } from '../../components/button/ButtonWrapper';

const Menu = styled.div`
  margin-top: 50px;
  width: 100%;
`;

const MenuList = styled.div`
  border-bottom: 2px solid #DFDFDF;
  padding: 10px;
`;

const Unregister = styled.p`
  position: fixed;
  bottom: 30px;
  color: #757575;
  width: 100%;
  text-align: center;
`;

function MyPage() {
    
    return (
        <AppContainer>
            <NavigationBar />
            <ContentContainer>
                <Title>마이페이지</Title>

                <Menu>
                    <MenuList>
                        <Link to='/' style={{color: 'inherit' , textDecoration: 'none' }}>내 정보 관리</Link>
                    </MenuList>
                    <MenuList>
                        <Link to='/' style={{color: 'inherit' , textDecoration: 'none' }}>비밀번호 재설정</Link>
                    </MenuList>
                    <MenuList>
                        <Link to='/' style={{color: 'inherit' , textDecoration: 'none' }}>파트너 연결하기</Link>
                    </MenuList>
                    <MenuList>
                        <Link to='/' style={{color: 'inherit' , textDecoration: 'none' }}>환불 계좌 등록하기</Link>
                    </MenuList>
                    <MenuList>
                        <Link to='/' style={{color: 'inherit' , textDecoration: 'none'}}>배송지 관리하기</Link>
                    </MenuList>
                </Menu>
                <ButtonWrapper>
                    <Link to="/signout" style={{color: 'inherit' , textDecoration: 'none'}}>
                        <WhiteButton>로그아웃</WhiteButton>
                    </Link>
                </ButtonWrapper>
                <Link to='/unregister' style={{color: 'inherit' , textDecoration: 'none'}}>
                    <Unregister>회원탈퇴</Unregister>
                </Link>
            </ContentContainer>
        </AppContainer>
    );
}


export default MyPage;