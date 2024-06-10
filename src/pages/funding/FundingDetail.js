import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import AppContainer from "../../components/AppContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import ContentContainer from "../../components/ContentContainer";
import BackButtonIcon from '../../assets/images/back-button.png';
import PurpleButton from "../../components/button/PurpleButton";
import { TopContainer, BackButton, CenterTitle } from '../../components/Header/Header';
import FundingCardComponent from '../../components/funding/FundingCardComponent';
import GuestFundingComponent from '../../components/funding/GuestFundingComponent';

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

    const guestFunding = [
        {
            "guestFundingId": 1,
            "name": "게스트일",
            "fundingAmount": 1000,
            "message": "결혼 축하한다. 행복하게 잘 살렴.",
            "paidAt": "2024-06-07T02:52:44"
        },
        {
            "guestFundingId": 2,
            "name": "게스트이",
            "fundingAmount": 2000,
            "message": "결혼 축2",
            "paidAt": "2024-06-07T02:52:54"
        }
    ];

    return (
        <AppContainer>
            <NavigationBar />
            <ContentContainer>
                <TopContainer>
                <BackButton src={BackButtonIcon} alt="Back" onClick={() => navigate(-1)} />
                    <CenterTitle>펀딩 상세</CenterTitle>
                </TopContainer>
                <FundingCardComponent funding={funding} />
                <GuestFundingComponent message={funding.message} guestFunding={guestFunding} />
                <ButtonWrapper>
                    <PurpleButton>펀딩 참여하기</PurpleButton>
                </ButtonWrapper>
            </ContentContainer>
        </AppContainer>
    )
}

export default FundingDetail;

const ButtonWrapper = styled.div`
    padding-top: 0px;
    padding-bottom: 0px;
    position: absolute;
    bottom: 10px;
    width: calc(100% - 48px);
`;