import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import AppContainer from "../../components/AppContainer";
import NavigationBar from '../../components/NavigationBar';

const Title = styled.h2`
  color: #4C3073;
  padding-top: 40px;
  margin-top: auto;
`;

const Input = styled.input`
  width: 100%;
  height : 27px;
  font-size: 16px;
  border-radius: 10px;
  background-color : #F2F2F2;
  border : 0;
`;

const LoginButton = styled.button`
  background-color: #4c3073;
  width: 100%;
  height: 56px;
  border: 0px;
  border-radius: 12px;
  box-shadow: #d9d9d9 0 4px 4px;
  color: white; /* 글자 색상 설정 */
  font-size: 16px; /* 글자 크기 설정 */
  text-align: center;
  cursor: pointer; /* 커서 설정 */
  font-family: "Pretendard";
  transition: transform 0.3s, box-shadow 0.3s; /* 애니메이션 적용 */

  &:hover {
    transform: translateY(-1px); /* 살짝 위로 이동 */
    box-shadow: #d9d9d9 0 5px 5px; /* 그림자 변경 */
  }
`;

const LoginButtonWrapper = styled.div`
  padding-top: 0px;
  padding-bottom: 0px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 20px;
`;

const SnsImg = styled.img`
  width : 64px;
  height : 64px;
`;

const SnsButton = styled.button`
  background : none;
  border : none;
  padding : 0;
`;

function LoginForm({ children, onClick }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('서버 API?email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password));
            const data = await response.json();
            if (data.length > 0) {
                setError('');
            } else {
                setError('이메일 또는 비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('로그인 중 에러가 발생했습니다.');
        }
    };

    const handleGoogleLogin = () => {
        const clientId = '';
        const redirectUri = '';
        const scope = '';
        const url = '';

        window.location.href = url;
    };

    const handleKakaoLogin = () => {

    };

    const handleNaverLogin = () => {

    };

    return (
       <>
       <NavigationBar />
       <form onSubmit={handleSubmit}>
       <AppContainer>
               <div style={{ width: '100%', textAlign: 'center' }}>
                   <Title>LOVE CLOUD</Title>
               </div>
               <div>
                   <h4 style={{ marginTop: '59px', marginBottom: '4px' }}>이메일</h4>
                   <Input type="email" value={email} onChange={handleEmailChange} />
               </div>
               <div>
                   <h4 style={{ marginTop: '34px', marginBottom: '4px' }}>비밀번호</h4>
                   <Input
                       type="password"
                       value={password}
                       onChange={handlePasswordChange}
                       style={{ marginBottom: '20px' }}
                   />
               </div>
               <LoginButtonWrapper>
                    <LoginButton onClick={onClick}>{children}로그인</LoginButton>
                </LoginButtonWrapper>
               {error && <ErrorMessage>{error}</ErrorMessage>}
               <div style ={{ fontSize : 'small' , display : 'flex', justifyContent : 'space-between' }}>
                <h4 style = {{ width : '150px'}}>비밀번호를 잊어버리셨나요?</h4>
                <h4 style = {{ width : '50px'}}> <Link to="/signup" style = {{ textDecoration : 'none' , color : 'inherit' }}>회원가입</Link></h4>
               </div>
               <div style ={{ display : 'flex' , justifyContent : 'space-between' }}>
                <SnsButton onClick={handleGoogleLogin}>
                    <SnsImg src='/images/GoogleLogin.jpg' alt='' />
                </SnsButton>
                <SnsButton onClick={handleKakaoLogin}>
                    <SnsImg src='/images/KakaoLogin.jpg' alt='' />
                </SnsButton>
                <SnsButton onClick={handleNaverLogin}>
                    <SnsImg src='/images/NaverLogin.jpg' alt='' />
                </SnsButton>
               </div>
           </AppContainer>
       </form>
       </>
    );
}

export default LoginForm;