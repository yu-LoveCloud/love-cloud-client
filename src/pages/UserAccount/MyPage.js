import React , { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AppContainer from '../../components/AppContainer';
import NavigationBar from '../../components/Nav/NavigationBar';
import ContentContainer from '../../components/ContentContainer';
import WhiteButton from '../../components/button/WhiteButton';
import { Title } from "../../components/Typography";

const Menu = styled.div`
  margin-top: 50px;
  width: 100%;
`;

const MenuList = styled.div`
  border-bottom: 2px solid #DFDFDF;
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  width: 352px;
  padding-top: 0px;
  padding-bottom: 0px;
  position: fixed;
  bottom: 80px;
`;

const Unregister = styled.p`
  position: fixed;
  bottom: 30px;
  color: #757575;
  width: 100%;
  text-align: center;
`;

function MyPage() {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                const response = await fetch('http://localhost:3001/users');
                if (!response.ok) {
                    setIsLoggedIn(false);
                    return;
                }
                const userData = await response.json();
                setUser(userData[0]);
                setIsLoggedIn(true);
            } catch (error) {
                console.error('사용자 정보를 가져오는 중 오류 발생', error);
                setIsLoggedIn(false);
            }
        };
        checkUserLoggedIn();
    }, []);

    if (!isLoggedIn) {
        return <Link to="/loginform">로그인</Link>;
    }

    return (
        <AppContainer>
            <NavigationBar />
            <ContentContainer>
                <Title>마이페이지</Title>
                <p>{user ? `${user.name}님` : '사용자 정보를 불러오는 중...'}</p>
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
                        <Link to='/' style={{color: 'inherit' , textDecoration: 'none' , borderBottom: '2px solid #DFDFDF' , padding: '10px'}}>배송지 관리하기</Link>
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