import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/apiClient';
import styled from 'styled-components';
import AppContainer from '../../components/AppContainer';
import NavigationBar from '../../components/Nav/NavigationBar';
import ContentContainer from '../../components/ContentContainer';
import BackButtonIcon from '../../assets/images/back-button.png';
import { TopContainer, BackButton, CenterTitle } from '../../components/Header/Header';
import FundingCardComponent from '../../components/funding/FundingCardComponent';
import ParticipationHeader from '../../components/funding/ParticipationHeader';

const FundingListContainer = styled.div``;

const ParticipationList = () => {
    const navigate = useNavigate();
    const [participations, setParticipations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParticipations = async () => {
            try {
                const participationResponse = await apiClient.get(`/participations`);
                const participationData = participationResponse.data;

                const fundingDetailsPromises = participationData.map(async (participation) => {
                    const fundingResponse = await apiClient.get(`/fundings/${participation.fundingId}`);
                    return { ...participation, fundingDetails: fundingResponse.data };
                });

                const fullParticipations = await Promise.all(fundingDetailsPromises);
                setParticipations(fullParticipations);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchParticipations();
    }, []);

    const handleCardClick = (participationId) => {
        // 참여 ID로 ParticipationDetail 페이지로 이동
        navigate(`/participations/${participationId}`);
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
                    <CenterTitle>참여한 펀딩 내역</CenterTitle>
                </TopContainer>
                <FundingListContainer>
                    {participations.map((participation) => (
                        <div
                            key={participation.guestFundingId}
                            onClick={() => handleCardClick(participation.guestFundingId)} // 참여 상세로 이동
                        >
                            <ParticipationHeader paidAt={participation.paidAt} status={participation.status} />
                            <FundingCardComponent funding={participation.fundingDetails} />
                        </div>
                    ))}
                </FundingListContainer>
            </ContentContainer>
        </AppContainer>
    );
};

export default ParticipationList;
