import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../../api/apiClient';
import styled from 'styled-components';
import AppContainer from '../../components/AppContainer';
import NavigationBar from '../../components/Nav/NavigationBar';
import ContentContainer from '../../components/ContentContainer';
import BackButtonIcon from '../../assets/images/back-button.png';
import DeleteButtonIcon from '../../assets/images/delete-button.png';
import PurpleButton from '../../components/button/PurpleButton';
import { TopContainer, BackButton, CenterTitle } from '../../components/Header/Header';
import FundingCardComponent from '../../components/funding/FundingCardComponent';
import GuestFundingComponent from '../../components/funding/GuestFundingComponent';

const FundingDetail = () => {
    const navigate = useNavigate();
    const { fundingId } = useParams();
    const [funding, setFunding] = useState(null);
    const [guestFunding, setGuestFunding] = useState([]);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const fetchFunding = async () => {
            try {
                const fundingResponse = await apiClient.get(`/fundings/${fundingId}`);
                setFunding(fundingResponse.data);
                const userResponse = await apiClient.get('/user/me');
                setIsOwner(userResponse.data.coupleId === fundingResponse.data.couple.coupleId);
            } catch (error) {
                console.error('Error fetching funding:', error);
            }
        };

        const fetchGuestFunding = async () => {
            try {
                const guestFundingResponse = await apiClient.get(`fundings/${fundingId}/guest-fundings`);
                setGuestFunding(guestFundingResponse.data);
            } catch (error) {
                console.error('Error fetching guest fundings:', error);
            }
        };

        fetchFunding();
        fetchGuestFunding();
    }, [fundingId]);

    const handleDeleteFunding = async () => {
        try {
            await apiClient.patch(`/fundings/${fundingId}/cancel`);
            alert('펀딩이 성공적으로 취소되었습니다.');
            navigate('/user/fundings');
        } catch (error) {
            console.error('펀딩 취소 실패:', error);
            alert('펀딩 취소에 실패했습니다. 다시 시도해주세요.');
        }
    };

    if (!funding) {
        return <div>Loading...</div>;
    }

    return (
        <AppContainer>
            <NavigationBar />
            <ContentContainer>
                <TopContainer>
                    <BackButton src={BackButtonIcon} alt="Back" onClick={() => navigate(-1)} />
                    <CenterTitle style={{ flex: 1, textAlign: 'center' }}>펀딩 상세</CenterTitle>
                    {isOwner && <DeleteButton src={DeleteButtonIcon} alt="Delete" onClick={handleDeleteFunding} />}
                </TopContainer>
                <FundingCardComponent funding={funding} />
                <GuestFundingComponent message={funding.message} guestFunding={guestFunding} />
                <ButtonWrapper>
                    <PurpleButton onClick={() => navigate(`/fundings/${fundingId}/participate`)}>
                        펀딩 참여하기
                    </PurpleButton>
                </ButtonWrapper>
            </ContentContainer>
        </AppContainer>
    );
};

export default FundingDetail;

const ButtonWrapper = styled.div`
    padding-top: 0px;
    padding-bottom: 0px;
    position: absolute;
    bottom: 10px;
    width: calc(100% - 48px);
`;

const DeleteButton = styled.img`
    width: 24px;
    height: 24px;
    margin-left: auto;
    cursor: pointer;
`;
