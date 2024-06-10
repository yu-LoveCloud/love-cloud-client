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
import { SectionTitle } from "../../components/Typography";
import FundingCardComponent from '../../components/funding/FundingCardComponent';
import RecipientCardComponent from '../../components/funding/RecipientCardComponent';
import FundingParticipationForm from '../../components/funding/FundingParticipationFormComponent';
import { Divider } from '../../components/Common';

const FundingParticipate = () => {
    const navigate = useNavigate();
    
    const funding = {
        fundingId: 1,
        title: "우리의 결혼을 축하해주세요1",
        message: "여러분의 작은 성원이 큰 기쁨이 됩니다. 많은 참여 부탁드립니다.1",
        targetAmount: 1940000,
        currentAmount: 1000,
        status: "IN_PROGRESS",
        endDate: "2024-12-31T23:59:00",
        participantCount: 1,
        productOptions: {
            productOptionsId: 1,
            mainImages: [
                {
                    imageId: 1,
                    imageName: "333464cf-168b-4903-9ce2-ccdacd4a1e75.jpg"
                },
                {
                    imageId: 2,
                    imageName: "image2.jpg"
                }
            ]
        },
        couple: {
            coupleId: 1,
            people: [
                {
                    phoneNumber: "01011111111",
                    weddingRole: "GROOM",
                    name: "웨딩일"
                },
                {
                    phoneNumber: "01022222222",
                    weddingRole: "BRIDE",
                    name: "웨딩이"
                }
            ]
        }
    };

    return (
        <AppContainer>
            <NavigationBar />
            <ContentContainer>
                <TopContainer>
                    <BackButton src={BackButtonIcon} alt="Back" onClick={() => navigate(-1)} />
                    <CenterTitle>펀딩 참여</CenterTitle>
                </TopContainer>
                <FundingCardComponent funding={funding} />
                <Divider />
                <SectionTitle>받으시는 분</SectionTitle>
                <RecipientCardComponent people={funding.couple.people} />
                <Divider />
                <SectionTitle>보내시는 분</SectionTitle>
                <FundingParticipationForm />
                <ButtonWrapper>
                    <PurpleButton>결제하기</PurpleButton>
                </ButtonWrapper>
            </ContentContainer>
        </AppContainer>
    )
}

export default FundingParticipate;

const ButtonWrapper = styled.div`
    padding-top: 0px;
    padding-bottom: 0px;
    position: absolute;
    bottom: 10px;
    width: calc(100% - 48px);
`;