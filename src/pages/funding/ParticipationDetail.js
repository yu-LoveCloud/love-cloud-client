import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../../api/apiClient';
import styled from 'styled-components';
import AppContainer from '../../components/AppContainer';
import NavigationBar from '../../components/Nav/NavigationBar';
import ContentContainer from '../../components/ContentContainer';
import BackButtonIcon from '../../assets/images/back-button.png';
import PurpleButton from '../../components/button/PurpleButton';
import { TopContainer, BackButton, CenterTitle } from '../../components/Header/Header';
import ParticipationHeader from '../../components/funding/ParticipationHeader';
import FundingCardComponent from '../../components/funding/FundingCardComponent';
import { Divider } from '../../components/Common';

const ParticipationDetail = () => {
    const navigate = useNavigate();
    const { participationId } = useParams();
    const [participation, setParticipation] = useState(null);
    const [funding, setFunding] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParticipationData = async () => {
            try {
                const participationResponse = await apiClient.get(`/participations/${participationId}`);
                setParticipation(participationResponse.data);
                const fundingResponse = await apiClient.get(`/fundings/${participationResponse.data.fundingId}`);
                setFunding(fundingResponse.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchParticipationData();
    }, [participationId]);

    const handleCancelParticipation = () => {
        // Handle participation cancellation logic here
        alert('참여 취소가 요청되었습니다.');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <AppContainer>
            <NavigationBar />
            <ContentContainer>
                <TopContainer>
                    <BackButton src={BackButtonIcon} alt="Back" onClick={() => navigate(-1)} />
                    <CenterTitle>참여 상세 내역</CenterTitle>
                </TopContainer>

                {/* 참여 번호와 날짜 */}
                <OrderInfo>
                    <LeftSection>
                        <Label>참여 번호</Label> {participation.merchantUid}
                    </LeftSection>
                    <RightSection>{new Date(participation.paidAt).toLocaleDateString()}</RightSection>
                </OrderInfo>

                {/* 참여 상태 및 결제 날짜 */}
                <ParticipationHeader paidAt={participation.paidAt} status={participation.status} />

                {/* 펀딩 카드 */}
                <FundingListContainer>
                    <FundingCardComponent funding={funding} />
                </FundingListContainer>

                {/* 구분선 */}
                <Divider />

                {/* 참여 정보 */}
                <ParticipationInfo>
                    <InfoRow>
                        <LeftSection>
                            <Label>이름</Label>
                        </LeftSection>
                        <RightSection>{participation.name}</RightSection>
                    </InfoRow>
                    <InfoRow>
                        <LeftSection>
                            <Label>휴대폰 번호</Label>
                        </LeftSection>
                        <RightSection>{participation.phoneNumber}</RightSection>
                    </InfoRow>
                    <InfoRow>
                        <LeftSection>
                            <Label>이메일</Label>
                        </LeftSection>
                        <RightSection>{participation.email}</RightSection>
                    </InfoRow>
                    <InfoRow>
                        <LeftSection>
                            <Label>펀딩 금액</Label>
                        </LeftSection>
                        <RightSection>{participation.amount.toLocaleString()}원</RightSection>
                    </InfoRow>
                    <InfoRow>
                        <LeftSection>
                            <Label>응원 메시지</Label>
                        </LeftSection>
                        <RightSection>{participation.message}</RightSection>
                    </InfoRow>
                </ParticipationInfo>

                <ButtonWrapper>
                    <PurpleButton onClick={handleCancelParticipation}>참여 취소하기</PurpleButton>
                </ButtonWrapper>
            </ContentContainer>
        </AppContainer>
    );
};

export default ParticipationDetail;

// 스타일 정의
const OrderInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1em 0;
`;

const Label = styled.span`
    font-size: 14px;
    font-weight: bold;
    margin-right: 8px;
    color: #111111;
`;

const LeftSection = styled.div`
    flex: 1;
    text-align: left;
    font-size: 12px;
    color: #111111;
`;

const RightSection = styled.div`
    flex: 1;
    text-align: right;
    font-size: 12px;
    color: #111111;
`;

const FundingListContainer = styled.div`
    margin-top: 16px;
`;

const ParticipationInfo = styled.div`
    padding: 16px;
    font-size: 14px;
    color: #333;
`;

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
`;

const ButtonWrapper = styled.div`
    padding-top: 0px;
    padding-bottom: 0px;
    position: absolute;
    bottom: 10px;
    width: calc(100% - 48px);
    display: flex;
    justify-content: center;
`;
