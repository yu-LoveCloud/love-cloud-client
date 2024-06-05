import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AppContainer from '../../components/AppContainer';
import NavigationBar from '../../components/Nav/NavigationBar';
import ContentContainer from '../../components/ContentContainer';
import PurpleButton from '../../components/button/PurpleButton';
import { Title } from "../../components/Typography";

const Input = styled.input`
  width: 100%;
  height: 27px;
  font-size: 16px;
  border-radius: 10px;
  background-color: #F2F2F2;
  border: 0;
`;

const CheckInput = styled.input`
  background-color: #F2F2F2;
  width: 27px;
  height: 27px;
  font-size: 16px;
`;

function SignUp() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [weddingRole, setWeddingRole] = useState(null);

    const handleInputChange = (event, setter) => {
        setter(event.target.value);
    };

    const handleRoleChange = (role) => {
        if (weddingRole === role) {
            setWeddingRole(null);
        }
        else {
            setWeddingRole(role);
        }
    };

    const checkPasswordsMatch = () => {
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!checkPasswordsMatch()) {
            return; // 비밀번호 불일치 시 함수 종료
        }
        try {
            const response = await fetch('http://localhost:3001/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    name,
                    phoneNumber,
                    password,
                    role: weddingRole
                })
            });
            if (response.ok) {
                const responseBody = await response.json();
                console.log('회원가입 성공:', responseBody);
                alert('회원가입이 완료되었습니다.');
            } else {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || '회원가입에 실패하였습니다.');
            }
        } catch (error) {
            console.error('회원가입 오류:', error);
            alert('서버 오류로 인해 회원가입을 완료할 수 없습니다.');
        }
    };

    return (
        <AppContainer>
            <NavigationBar />
            <ContentContainer as="form" onSubmit={handleSubmit}>
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <Title>회원가입</Title>
                </div>
                <div>
                    <h4 style={{ marginTop: '30px', marginBottom: '4px' }}>이메일</h4>
                    <Input value={email} onChange={e => handleInputChange(e, setEmail)} />
                    <h4 style={{ marginTop: '20px', marginBottom: '4px' }}>이름</h4>
                    <Input value={name} onChange={e => handleInputChange(e, setName)} />
                    <h4 style={{ marginTop: '20px', marginBottom: '4px' }}>전화번호</h4>
                    <Input value={phoneNumber} onChange={e => handleInputChange(e, setPhoneNumber)} />
                    <h4 style={{ marginTop: '20px', marginBottom: '4px' }}>비밀번호</h4>
                    <Input value={password} onChange={e => handleInputChange(e, setPassword)} type="password" />
                    <h4 style={{ marginTop: '20px', marginBottom: '4px' }}>비밀번호 확인</h4>
                    <Input value={confirmPassword} onChange={e => handleInputChange(e, setConfirmPassword)} type="password" />
                </div>
                <div style={{ display: 'flex', marginTop: '40px' }}>
                    <div style={{ width: '50%' }}>
                        <label>
                            <CheckInput type="checkbox" checked={weddingRole === '신랑'} onChange={() => handleRoleChange('신랑')} />
                            신랑
                        </label>
                    </div>
                    <div style={{ width: '50%' }}>
                        <label>
                            <CheckInput type="checkbox" checked={weddingRole === '신부'} onChange={() => handleRoleChange('신부')} />
                            신부
                        </label> {/* guest 추가해놓기 */}
                    </div>
                </div>
                <div style={{ position: 'fixed', bottom: '24px', width: '300px' }}>
                    <Link to="/refundaccount" style={{ color: 'inherit', textDecoration: 'none' }}>
                        <PurpleButton as="button" type="submit">다음 단계로</PurpleButton>
                    </Link>
                </div>
            </ContentContainer>
        </AppContainer>
    );
}

export default SignUp;
