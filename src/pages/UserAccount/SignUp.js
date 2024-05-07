import React, { useState } from 'react';
import styled from "styled-components";
import AppContainer from "../../components/AppContainer";
import NavigationBar from '../../components/Nav/NavigationBar';

const Title = styled.h2`
  color: #000000;
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

const CheckInput = styled.input`
  background-color : #F2F2F2;
  width : 27px;
  height : 27px;
  font-size : 16px;
`;

function SignUp() {
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);

    const handleCheckboxChange1 = (event) => {
        setIsChecked1(event.target.checked);
    };

    const handleCheckboxChange2 = (event) => {
        setIsChecked2(event.target.checked);
    };

    return (
        <>
        <NavigationBar />
        <AppContainer>
            <div style={{ width: '100%', textAlign: 'center' }}>
                <Title>회원가입</Title>
            </div>
            <div>
                <h4 style={{ marginTop: '59px', marginBottom: '4px' }}>이메일</h4>
                <Input />
                <h4 style={{ marginTop: '20px', marginBottom: '4px' }}>이름</h4>
                <Input />
                <h4 style={{ marginTop: '20px', marginBottom: '4px' }}>비밀번호</h4>
                <Input />
                <h4 style={{ marginTop: '20px', marginBottom: '4px' }}>비밀번호 확인</h4>
                <Input />
            </div>
            <div style = {{ display : 'flex' , marginTop : '40px'}}>
                <div style = {{ width : '50%' }}>
                    <label>
                        <CheckInput type="checkbox" checked={isChecked1} onChange={handleCheckboxChange1} />
                        신랑
                    </label>
                </div>
                <div style = {{ width : '50%' }}>
                    <label>
                        <CheckInput type="checkbox" checked={isChecked2} onChange={handleCheckboxChange2} />
                        신부
                    </label>
                </div>
            </div>
        </AppContainer>
        </>
    );
}

export default SignUp;