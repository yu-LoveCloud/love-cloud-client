import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import AppContainer from "../../components/AppContainer";
import NavigationBar from '../../components/Nav/NavigationBar';
import ContentContainer from '../../components/ContentContainer';
import PurpleButton from '../../components/button/PurpleButton';

const Title = styled.h2`
  color: #000000;
  padding-top: 10px;
  margin-top: auto;
  width: 100%;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  height: 27px;
  font-size: 16px;
  border-radius: 10px;
  background-color: #F2F2F2;
  border: 0;
`;

const ButtonWrapper = styled.div`
  padding-top: 0px;
  padding-bottom: 0px;
`;

function ChangePassword() {


    return (
        <AppContainer>
        <NavigationBar />
        <ContentContainer>
            <Title>비밀번호 변경</Title>
            <div>
                <h4 style={{ marginTop: '30px', marginBottom: '4px' }}>이메일</h4>
                <Input />
                <h4 style={{ marginTop: '20px', marginBottom: '4px' }}>이름</h4>
                <Input />
                
                <div style={{ display: 'flex'}}>
                    <div>
                    <h4 style={{ marginTop: '20px', marginBottom: '4px' }}>이메일로 전송된 코드</h4>
                    <Input style={{ width: '90%' , marginRight: '30px' }}/>
                    </div>
                    <ButtonWrapper style={{ width: '25%' , height: '29px' , marginTop: '20px'}}>
                        <PurpleButton>인증</PurpleButton>
                    </ButtonWrapper>
                </div>
                <h4 style={{ marginTop: '20px', marginBottom: '4px' }}>새로운 비밀번호</h4>
                <Input />
                <h4 style={{ marginTop: '20px', marginBottom: '4px' }}>새로운 비밀번호 확인</h4>
                <Input />
            </div>
            <ButtonWrapper style={{ position: 'fixed' , bottom: '24px' , width: '300px' }}>
                <PurpleButton>
                    <Link to="/loginform" style = {{ color: 'inherit' , textDecoration : 'none' }}>비밀번호 변경하기</Link>
                </PurpleButton>
            </ButtonWrapper>
        </ContentContainer>
        </AppContainer>
    );
}

export default ChangePassword;