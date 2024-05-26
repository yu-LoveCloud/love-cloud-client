import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AppContainer from '../../components/AppContainer';
import NavigationBar from '../../components/Nav/NavigationBar';
import ContentContainer from '../../components/ContentContainer';
import PurpleButton from '../../components/button/PurpleButton';

const Title = styled.h2`
  color: #000000;
  padding-top: 10px;
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

const CheckInput = styled.input`
  background-color : #F2F2F2;
  width : 27px;
  height : 27px;
  font-size : 16px;
`;

function SignUp() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);

    const handleInputChange = (event, setter) => {
        setter(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    name,
                    phone,
                    password,
                    role1: isChecked1 ? '신랑' : '', // 체크박스1 정보 저장
                    role2: isChecked2 ? '신부' : ''  // 체크박스2 정보 저장
                })
            });
            if (response.ok) {
                alert('회원가입이 완료되었습니다.');
            } else {
                throw new Error('회원가입에 실패하였습니다.');
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
                <Input value={phone} onChange={e => handleInputChange(e, setPhone)}/>
                <h4 style={{ marginTop: '20px', marginBottom: '4px' }}>비밀번호</h4>
                <Input value={password} onChange={e => handleInputChange(e, setPassword)} />
                <h4 style={{ marginTop: '20px', marginBottom: '4px' }}>비밀번호 확인</h4>
                <Input />
            </div>
            <div style = {{ display : 'flex' , marginTop : '40px'}}>
                <div style = {{ width : '50%' }}>
                    <label>
                        <CheckInput type="checkbox" checked={isChecked1} onChange={() => setIsChecked1(!isChecked1)} />
                        신랑
                    </label>
                </div>
                <div style = {{ width : '50%' }}>
                    <label>
                        <CheckInput type="checkbox" checked={isChecked2} onChange={() => setIsChecked2(!isChecked2)} />
                        신부
                    </label>
                </div>
            </div>
            <div style={{ position: 'fixed' , bottom: '24px' , width: '300px' }}>
            <Link to="/refundaccount" style = {{ color: 'inherit' , textDecoration : 'none' }}>
                <PurpleButton as="button" type="submit">다음 단계로</PurpleButton>
            </Link>
            </div>
        </ContentContainer>  
        </AppContainer>
    );
}

export default SignUp;