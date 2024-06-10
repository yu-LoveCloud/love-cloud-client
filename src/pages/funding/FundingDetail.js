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
    const { fundingId } = useParams();
    const [funding, setFunding] = useState(null);
    const [guestFunding, setGuestFunding] = useState([]);

    useEffect(() => {
        const fetchFunding = async () => {
            try {
                const fundingResponse = await axios.get(`http://localhost:8080/fundings/${fundingId}`);
                setFunding(fundingResponse.data);
            } catch (error) {
                console.error('Error fetching funding:', error);
            }
        };

        const fetchGuestFunding = async () => {
            try {
                const guestFundingResponse = await axios.get(`http://localhost:8080/fundings/${fundingId}/guest-fundings`);
                setGuestFunding(guestFundingResponse.data);
            } catch (error) {
                console.error('Error fetching guest fundings:', error);
            }
        };

        fetchFunding();
        fetchGuestFunding();
    }, [fundingId]);

    if (!funding) {
        return <div>Loading...</div>;
    }

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
                    <PurpleButton onClick={() => navigate(`/fundings/${fundingId}/participate`)}>펀딩 참여하기</PurpleButton>
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