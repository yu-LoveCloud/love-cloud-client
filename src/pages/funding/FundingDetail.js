import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import AppContainer from "../../components/AppContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import ContentContainer from "../../components/ContentContainer";
import BackButtonIcon from '../../assets/images/back-button.png';
import { TopContainer, BackButton, CenterTitle } from '../../components/Header/Header';
import FundingCardComponent from '../../components/funding/FundingCardComponent';

const FundingDetail = () => {
    const navigate = useNavigate();

    const funding = {
        fundingId: 1,
        title: '우리의 결혼을 축하해주세요1',
        message: '여러분의 작은 성원이 큰 기쁨이 됩니다. 많은 참여 부탁드립니다.1',
        targetAmount: 1940000,
        currentAmount: 1000,
        status: 'IN_PROGRESS',
        endDate: '2024-12-31T23:59:00',
        participantCount: 1,
        productOptions: {
            productOptionsId: 1,
            mainImages: [
                { imageId: 1, imageName: '333464cf-168b-4903-9ce2-ccdacd4a1e75.jpg' },
                { imageId: 2, imageName: 'image2.jpg' }
            ]
        },
        couple: {
            coupleId: 1,
            people: [
                { phoneNumber: '01011111111', weddingRole: 'GROOM', name: '웨딩일' },
                { phoneNumber: '01022222222', weddingRole: 'BRIDE', name: '웨딩이' }
            ]
        }
    };

    return (
        <AppContainer>
            <NavigationBar />
            <ContentContainer>
                <TopContainer>
                <BackButton src={BackButtonIcon} alt="Back" onClick={() => navigate(-1)} />
                    <CenterTitle>펀딩 상세</CenterTitle>
                </TopContainer>
                <FundingCardComponent funding={funding} />
            </ContentContainer>
        </AppContainer>
    )
}

export default FundingDetail;

const FundingCard = styled.div`
    display: flex;
    align-items: center;
    padding: 13px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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