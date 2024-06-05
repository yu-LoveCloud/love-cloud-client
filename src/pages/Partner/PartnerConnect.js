import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import AppContainer from "../../components/AppContainer";
import NavigationBar from '../../components/Nav/NavigationBar';
import ContentContainer from '../../components/ContentContainer';
import PurpleButton from '../../components/button/PurpleButton';
import WhiteButton from '../../components/button/WhiteButton';

const Title = styled.h2`
  color: #000000;
  padding-top: 10px;
  margin-top: auto;
  width: 100%;
  text-align: left;
  font-size: 16pt;
`;

const Comment = styled.h4`
  width: 100%;
  margin-bottom: 0px;
  text-align: center;
  margin-top: 150px;
`;

const Code = styled.h4`
  color: #000000;
  padding-top: 5px;
  text-align: center;
  margin-top: 0px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  padding-top: 0px;
  padding-bottom: 0px;
  position: fixed;
  bottom: 24px;
  width: 352px;
`;

function PartnerConnect() {
    const textCopy = {};
    const [inviteCode, setInviteCode] = useState('');

    useEffect(() => {
        const fetchInviteCode = async () => {
            try {
                const response = await fetch('서버 API');
                if (!response.ok) {
                    throw new Error('서버의 응답이 없습니다.');
                }
                const data = await response.json();
                setInviteCode(data.inviteCode);
            }
            catch (error) {
                console.error('코드를 불러오는데 실패했습니다.', error);
            }
        };
        fetchInviteCode();
    }, []);

    const handleCopyCode = async () => {
        if (inviteCode) {
            try {
                await navigator.clipboard.writeText(inviteCode);
                alert('초대 코드가 복사되었습니다.');
            }
            catch (error) {
                console.error('초대 코드 복사 실패', error);
            }
        }
    };

    return(
        <AppContainer>
        <NavigationBar />
        <ContentContainer>
            <Title>파트너 연결 후<br /><span style={{ color : '#4c3073' }}>LOVE CLOUD</span>를 시작해보세요.</Title>
            <Comment>나의 코드 복사</Comment>
            <Code>
                <p onClick={handleCopyCode} style={{ cursor : 'pointer' }}>
                    {inviteCode || '코드를 불러오는 중...'}
                </p>
            </Code>

            <ButtonWrapper>
            <Link to="/sendinvitation" style = {{ color: 'inherit' , textDecoration : 'none' }}>
                <PurpleButton>초대장 보내기</PurpleButton>
            </Link>
            <p />
            <Link to="/connectcode" style = {{ color: 'inherit' , textDecoration : 'none' }}>
                <WhiteButton>상대방 코드로 연결하기</WhiteButton>
            </Link>
            </ButtonWrapper>
        </ContentContainer>
        </AppContainer>
    );
}

export default PartnerConnect;