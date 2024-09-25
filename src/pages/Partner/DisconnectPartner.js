import axios from "axios";
import styled from "styled-components";
import AppContainer from "../../components/AppContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import ContentContainer from "../../components/ContentContainer";
import { Title } from "../../components/Typography";
import { useEffect, useState } from "react";
import { getCookie } from "../../Cookie";
import { ButtonWrapper } from "../../components/button/ButtonWrapper";
import PurpleButton from "../../components/button/PurpleButton";
import { useNavigate } from "react-router-dom";

const CoupleId = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function DisconnectPartner() {
    const [coupleCode, setCoupleCode] = useState('');
    const navigate = useNavigate('');

    useEffect(() => {
        const accessToken = getCookie('access_token');
        const getCoupleCode = async () => {
            try {
                const response = await axios.get('커플코드 api', {
                    headers: {'Authorization': `Bearer ${accessToken}`}
                });
                setCoupleCode(response.data);
            } catch (error) {
                window.alert("정보 안가져와짐");
            }
        }
        getCoupleCode();
    });

    const handleDisconnect = () => {
        // 여기에 api넣어서 파트너 끊기 구현
        // 아직 api 없는듯
        if(!coupleCode) {
            window.alert('커플이 아닙니다.');
            navigate('/mypage');
        } else {
            // 여기 짜야됨
        }
    }

    return(
        <AppContainer>
        <NavigationBar />
        <ContentContainer>
            <Title>파트너 연결 끊기</Title>  {/* 중앙정렬해야하나 */}
            <CoupleId>
                <h3>커플코드</h3>
            </CoupleId>
            <ButtonWrapper>
                <PurpleButton onClick={handleDisconnect}>파트너 연결 끊기</PurpleButton>
            </ButtonWrapper>
        </ContentContainer>
        </AppContainer>
    )
}

export default DisconnectPartner;