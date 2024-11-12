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
import ParticipationDetailTable from '../../components/funding/ParticipationDetailTable';

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

    const handleCancelParticipation = async () => {
        try {
            await apiClient.patch(`/participations/${participationId}/cancel`);
            alert('참여가 성공적으로 취소되었습니다.');
            navigate(`/user/participations`); // 취소 후 참여 목록으로 이동
        } catch (error) {
            console.error('참여 취소 실패:', error);
            alert('참여 취소에 실패했습니다. 다시 시도해주세요.');
        }
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
                <Label>참여 정보</Label>
                <ParticipationDetailTable participation={participation} />

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

const ButtonWrapper = styled.div`
    padding-top: 0px;
    padding-bottom: 0px;
    position: absolute;
    bottom: 10px;
    width: calc(100% - 48px);
    display: flex;
    justify-content: center;
`;
