import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import AppContainer from "../../components/AppContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import ContentContainer from "../../components/ContentContainer";
import BackButtonIcon from '../../assets/images/back-button.png';
import { TopContainer, BackButton, CenterTitle } from '../../components/Header/Header';

const FundingListContainer = styled.div`
`;

const FundingCard = styled.div`
    display: flex;
    align-items: center;
    padding: 13px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 16px;
`;

const FundingImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 16px;
`;

const FundingDetails = styled.div`
    flex: 1;
`;

const FundingTitle = styled.div`
    font-size: 16px;
    font-weight: bold;
    font-family: "Pretendard";
    margin-bottom: 10px;
`;

const FundingInfo = styled.div`
    font-size: 12px;
    font-family: "Pretendard";
    color: #666;
    text-align: right;
`;

const FundingProgress = styled.div`
    margin-top: 8px;
`;

const ProgressInfo = styled.div`
    font-size: 12px;
    font-family: "Pretendard";
    color: #666;
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 5px;
    background-color: #ddd;
    border-radius: 5px;
    overflow: hidden;
    margin-top: 4px;
`;

const Progress = styled.div`
    width: ${props => props.progress}%;
    height: 100%;
    background-color: #4c3073;
`;

const FundingParticipation = () => {
    const navigate = useNavigate();
    const { coupleId } = useParams(); // coupleId 파라미터를 받아옴
    const [fundings, setFundings] = useState([]);

    useEffect(() => {
        const fetchFundings = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/couples/${coupleId}/fundings`);
                setFundings(response.data);
            } catch (error) {
                console.error('Error fetching fundings:', error);
            }
        };

        fetchFundings();
    }, [coupleId]);

    return (
        <AppContainer>
            <NavigationBar />
            <ContentContainer>
                <TopContainer>
                    <BackButton src={BackButtonIcon} alt="Back" onClick={() => navigate(-1)} />
                    <CenterTitle>현재 진행 중인 펀딩</CenterTitle>
                </TopContainer>
                <FundingListContainer>
                    {fundings.map((funding) => {
                        const progress = (funding.currentAmount / funding.targetAmount) * 100;
                        return (
                            <FundingCard key={funding.fundingId}>
                                <FundingImage src={`https://lovecloud-storage.s3.ap-northeast-2.amazonaws.com/images/${funding.productOptions.mainImages[0].imageName}`} alt={funding.title} />
                                <FundingDetails>
                                    <FundingTitle>{funding.title}</FundingTitle>
                                    <FundingInfo>{funding.participantCount}명 참여</FundingInfo>
                                    <FundingInfo>마감 기한 {new Date(funding.endDate).toLocaleDateString()}</FundingInfo>
                                    <FundingProgress>
                                        <ProgressInfo>펀딩 진행률 {progress.toFixed(2)}%</ProgressInfo>
                                        <ProgressBar>
                                            <Progress progress={progress} />
                                        </ProgressBar>
                                    </FundingProgress>
                                </FundingDetails>
                            </FundingCard>
                        );
                    })}
                </FundingListContainer>
            </ContentContainer>
        </AppContainer>
    );
}

export default FundingParticipation;