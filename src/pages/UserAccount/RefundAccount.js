import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import AppContainer from "../../components/AppContainer";
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

const ButtonWrapper = styled.div`
  padding-top: 0px;
  padding-bottom: 0px;
  position: fixed;
  bottom: 24px;
  width: 300px;
`;

const BankSelect = styled.select`
  padding: 10px;
  border-radius: 5px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  outline: none;
  width: 100%;
  font-size: 16px;
`


function RefundAccount() {
    const [bank, setBank] = useState('');
    const [account, setAccount] = useState('');

    const handleBankChange = (event) => {
        setBank(event.target.bank);
    }
    const handleAcountChange = (event) => {
      setAccount(event.target.account);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          const response = await fetch('http://127.0.0.1:3306', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  bank, account
              })
          });
          if (response.ok) {
              console.log('계좌 정보 저장 성공');
              alert('회원가입이 완료되었습니다.');
          } else {
              throw new Error('Failed to save account data');
          }
      } catch (error) {
          console.error('계좌 정보 저장 실패:', error);
          alert('서버 오류로 인해 회원가입을 완료할 수 없습니다.');
      }
  };

    return(
        <AppContainer>
        <NavigationBar />
        <ContentContainer as="form" onSubmit={handleSubmit}>
            <Title>환불 계좌 등록</ Title>
            <p>환불 계좌 정보</p>
            <h4 style={{ marginBottom: '4px' }}>은행명</h4>
            <BankSelect value={bank} onChange={handleBankChange}>
                {<option bank="">은행명</option>} {/* 일단 이정도만 넣어두고 나중에 추가 예정 , 마이페이지로 옮기기 */}
                <option bank="NH">NH농협</option>
                <option bank="KAKAO">카카오뱅크</option>
                <option bank="KB">KB국민</option>
                <option bank="TOSS">토스뱅크</option>
                <option bank="SINHAN">신한</option>
                <option bank="WOORI">우리</option>
                <option bank="IBK">IBK기업</option>
                <option bank="HANA">하나</option>
            </BankSelect>
            <h4 style={{ marginTop: '20px', marginBottom: '4px' }}>계좌번호 (-없이 입력해주세요)</h4>
            <Input value={account} onChange={handleAcountChange} />
            <ButtonWrapper>
            <Link to="/loginform" style = {{ color: 'inherit' , textDecoration : 'none' }}>
              <PurpleButton as="button" type="submit">로그인하기</PurpleButton>
            </Link>
            </ButtonWrapper>
        </ContentContainer>
        </ AppContainer>
    );
}

export default RefundAccount;