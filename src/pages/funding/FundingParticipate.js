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
    const { fundingId } = useParams();
    const [funding, setFunding] = useState(null);
    
    useEffect(() => {
        const fetchFundingData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/fundings/${fundingId}`);
                setFunding(response.data);
            } catch (error) {
                console.error('Error fetching funding data:', error);
            }
        };

        fetchFundingData();
    }, [fundingId]);

    if (!funding) return <div>Loading...</div>;
    
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