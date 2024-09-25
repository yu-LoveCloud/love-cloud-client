import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AppContainer from '../../components/AppContainer';
import NavigationBar from '../../components/Nav/NavigationBar';
import ContentContainer from '../../components/ContentContainer';
import WhiteButton from '../../components/button/WhiteButton';
import { Title } from "../../components/Typography";
import { getCookie, removeCookie } from '../../Cookie';
import axios from 'axios';
import { ButtonWrapper } from '../../components/button/ButtonWrapper';

const Menu = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const MenuList = styled.div`
  border-bottom: 2px solid #DFDFDF;
  padding: 10px;
`;

// const Unregister = styled.div`
//   width: 100%;
//   position: absolute;
//   padding-bottom: 20px;
//   padding-top: 10px;
//   text-align: center;
//   color: #757575;
// `;

function MyPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const accessToken = getCookie('access_token');

        if (!accessToken) {
            navigate('/loginform'); 
        } else {
            const getUsername = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/user/me', {
                        headers: { 'Authorization': `Bearer ${accessToken}` }
                    });
                    setUsername(response.data.name);
                    console.log(response.data);
                } catch (error) {
                    console.log(error);
                    window.alert("데이터 안불러와짐;;");
                }
            };
            getUsername();
        }
    }, [navigate]);

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
            removeCookie('refresh_token');
            navigate('/'); // 로그아웃 성공시 메인으로 이동
            window.alert("로그아웃 되었습니다.");

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
                <h3>{username}님</h3>
                <Menu>
                    <MenuList>
                        <Link to='/disconnectpartner' style={{color: 'inherit' , textDecoration: 'none' }}>내 정보 관리</Link>
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
                {/* 회원탈퇴버튼 삭제
                    <ButtonWrapper>
                        <Unregister onClick={handleUnregister}>회원탈퇴</Unregister>
                    </ButtonWrapper>
                */} 
            </ContentContainer>
        </AppContainer>
    );
}

export default MyPage;