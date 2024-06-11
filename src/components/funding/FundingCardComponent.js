import React from 'react';
import styled from 'styled-components';
import { IMAGE_PREFIX } from "../../constants/global";

const FundingCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 13px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 16px;
`;

const FundingImageWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
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
`;

const FundingProgressContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 8px;
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 10px;
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

const ProgressInfo = styled.div`
    font-size: 12px;
    font-family: "Pretendard";
    color: #666;
`;


const FundingCardComponent = ({ funding }) => {
    const progress = (funding.currentAmount / funding.targetAmount) * 100;

    return (
        <FundingCardWrapper>
            <FundingImageWrapper>
                <FundingImage src={`${IMAGE_PREFIX}${funding.productOptions.mainImages[0].imageName}`} alt={funding.title} />
                <FundingDetails>
                    <FundingTitle>{funding.title}</FundingTitle>
                    <FundingInfo>{funding.participantCount}명 참여</FundingInfo>
                    <FundingInfo>마감 기한 {new Date(funding.endDate).toLocaleDateString()}</FundingInfo>
                </FundingDetails>
            </FundingImageWrapper>
            <FundingProgressContainer>
                <ProgressInfo>펀딩 진행률 {progress.toFixed(2)}%</ProgressInfo>
                <ProgressInfo>{funding.currentAmount.toLocaleString()}원 / {funding.targetAmount.toLocaleString()}원</ProgressInfo>
            </FundingProgressContainer>
            <ProgressBar>
                <Progress progress={progress} />
            </ProgressBar>
        </FundingCardWrapper>
    );
};

export default FundingCardComponent;
