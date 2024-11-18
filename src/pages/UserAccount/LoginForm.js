import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AppContainer from '../../components/AppContainer';
import NavigationBar from '../../components/Nav/NavigationBar';
import ContentContainer from '../../components/ContentContainer';
import { Title } from '../../components/Typography';
import { setCookie } from '../../Cookie';
import { apiClient } from '../../api/apiClient';

const Input = styled.input`
    width: 100%;
    height: 27px;
    font-size: 16px;
    border-radius: 10px;
    background-color: #f2f2f2;
    border: 0;
`;

const LoginButton = styled.button`
    background-color: #4c3073;
    width: 100%;
    height: 56px;
    border: 0px;
    border-radius: 12px;
    box-shadow: #d9d9d9 0 4px 4px;
    color: white;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    font-family: 'Pretendard';
    transition: transform 0.3s, box-shadow 0.3s;
    &:hover {
        transform: translateY(-1px);
        box-shadow: #d9d9d9 0 5px 5px;
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

const CheckInput = styled.input`
    background-color: #f2f2f2;
    width: 27px;
    height: 27px;
    font-size: 16px;
`;

const SnsImg = styled.img`
    width: 64px;
    height: 64px;
`;

const SnsButton = styled.button`
    background: none;
    border: none;
    padding: 0;
`;

function LoginForm() {
    const [data, setData] = useState({ email: '', password: '', weddingRole: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleRoleChange = () => {
        setData({
            ...data,
            weddingRole: data.weddingRole === 'GUEST' ? '' : 'GUEST',
        });
    };

    const login = async () => {
        const endpoint = data.weddingRole === 'GUEST' ? '/auth/guest/sign-in' : '/auth/wedding-user/sign-in';

        try {
            const response = await apiClient.post(endpoint, {
                email: data.email,
                password: data.password,
            });

            const accessToken = response.data?.access_token || null;
            const refreshToken = response.data?.refresh_token || null;

            if (accessToken) {
                setCookie('access_token', accessToken, { path: '/' });
                setCookie('refresh_token', refreshToken, { path: '/' });
                setError('');
                alert('로그인 되었습니다.');
                navigate('/');
            } else {
                alert(response.data.message);
                setError(response.data.message || '로그인 실패');
            }
        } catch (error) {
            console.error('Login error:', error.response?.data.message || error.message);
            setError('로그인 중 에러가 발생했습니다.');
        }
    };

    return (
        <AppContainer>
            <NavigationBar />
            <ContentContainer>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        login();
                    }}
                >
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <Title>LOVE CLOUD</Title>
                    </div>
                    <div>
                        <h4 style={{ marginTop: '59px', marginBottom: '4px' }}>이메일</h4>
                        <Input name="email" type="email" value={data.email} onChange={handleChange} />
                    </div>
                    <div>
                        <h4 style={{ marginTop: '34px', marginBottom: '4px' }}>비밀번호</h4>
                        <Input
                            name="password"
                            type="password"
                            value={data.password}
                            onChange={handleChange}
                            style={{ marginBottom: '20px' }}
                        />
                    </div>
                    <div style={{ width: '100%', paddingBottom: '10px' }}>
                        <label>
                            <CheckInput
                                type="checkbox"
                                checked={data.weddingRole === 'GUEST'}
                                onChange={handleRoleChange}
                            />
                            하객이시라면 체크해주세요!
                        </label>
                    </div>
                    <LoginButtonWrapper>
                        <LoginButton type="button" onClick={login}>
                            로그인
                        </LoginButton>
                    </LoginButtonWrapper>
                </form>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <div style={{ fontSize: 'small', display: 'flex', justifyContent: 'space-between' }}>
                    <h4 style={{ width: '150px' }}>
                        <Link to="/changepassword" style={{ textDecoration: 'none', color: 'inherit' }}>
                            비밀번호를 잊어버리셨나요?
                        </Link>
                    </h4>
                    <h4 style={{ width: '50px' }}>
                        <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
                            회원가입
                        </Link>
                    </h4>
                </div>
            </ContentContainer>
        </AppContainer>
    );
}

export default LoginForm;
