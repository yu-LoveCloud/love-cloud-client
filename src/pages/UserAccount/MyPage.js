import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AppContainer from '../../components/AppContainer';
import NavigationBar from '../../components/Nav/NavigationBar';
import ContentContainer from '../../components/ContentContainer';
import WhiteButton from '../../components/button/WhiteButton';
import { Title } from "../../components/Typography";
import { ButtonWrapper } from '../../components/button/ButtonWrapper';
import { getCookie, removeCookie } from '../../Cookie';
import axios from 'axios';

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
    const navigate = useNavigate();
    
    // const isAuthenticated = () => {
    //     const accessToken = getCookie("access_token");
    //     return !!accessToken;
    // };
    const accessToken = getCookie("access_token");
    
    if(!accessToken) {
        //navigate('/loginform');
    }
    useEffect(() => {
        
        console.log(accessToken);
    })
    // useEffect(() => {
    // //     if(!isAuthenticated()) {
    // //         navigate('/loginform');
    // //     }
    // // }, [navigate]);

    const handleLogout = () => {
        const accessToken = getCookie("access_token");

        axios.post('http://localhost:8080/auth/sign-out', {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(res => {
            console.log('Logged out successfully:', res.data);
            removeCookie("access_token");
            navigate('/'); // 로그아웃 성공시 메인으로 이동
        })
        .catch(error => {
            console.error('Logout failed:', error);
            alert("로그아웃 실패! 다시 시도해 주세요.");
        });
    };

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
                        <Link to='/changepassword' style={{color: 'inherit' , textDecoration: 'none' }}>비밀번호 재설정</Link>
                    </MenuList>
                    <MenuList>
                        <Link to='/partnerconnect' style={{color: 'inherit' , textDecoration: 'none' }}>파트너 연결하기</Link>
                    </MenuList>
                    <MenuList>
                        <Link to='/refundaccount' style={{color: 'inherit' , textDecoration: 'none' }}>환불 계좌 등록하기</Link>
                    </MenuList>
                    <MenuList>
                        <Link to='/' style={{color: 'inherit' , textDecoration: 'none'}}>배송지 관리하기</Link>
                    </MenuList>
                </Menu>
                <ButtonWrapper>
                        <WhiteButton onClick={handleLogout}>로그아웃</WhiteButton>
                </ButtonWrapper>

                    <Unregister>회원탈퇴</Unregister>

            </ContentContainer>
        </AppContainer>
    );
}


export default MyPage;
