import React, { useState } from 'react';
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
  font-size: 16px;
  border-radius: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  height: 56px;
  width: 100%;
  border-radius: 10px;
  background-color: #4C3073;
  color: #ffffff;
  margin-top: 20px;
`;

const UserInfoDisplay = styled.div`
  margin-top: 20px;
  color: #4C3073;
  font-size: 16px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 20px;
`;

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userInfo, setUserInfo] = useState({});
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
                setUserInfo(data[0]);
                setError('');
            } else {
                setError('이메일 또는 비밀번호가 일치하지 않습니다.');
                setUserInfo({});
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
               <Button type="submit">로그인</Button>
               {error && <ErrorMessage>{error}</ErrorMessage>}
               <div style ={{ fontSize : 'small' , display : 'flex', justifyContent : 'space-between' }}>
                <h4 style = {{ width : '150px'}}>비밀번호를 잊어버리셨나요?</h4> <h4 style = {{ width : '50px'}}>회원가입</h4>
               </div>
               <div style ={{ display : 'flex' , justifyContent : 'space-between' }}>
                <button onClick={handleGoogleLogin} style = {{ background : 'none' , border : 'none' , padding : '0' }}>
                    <img style = {{ width : '64px' , height : '64px' }} src='/images/GoogleLogin.jpg' />
                </button>
                <button onClick={handleKakaoLogin} style = {{ background : 'none' , border : 'none', padding : '0' }}>
                    <img style = {{ width : '64px' , height : '64px' }} src='/images/KakaoLogin.jpg' />
                </button>
                <button onClick={handleNaverLogin} style = {{ background : 'none' , border : 'none', padding : '0' }}>
                    <img style = {{ width : '64px' , height : '64px' }} src='/images/NaverLogin.jpg' />
                </button>
               </div>
           </AppContainer>
       </form>
       </>
    );
}

export default LoginForm;

