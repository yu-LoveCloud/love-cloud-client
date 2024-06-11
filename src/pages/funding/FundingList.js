import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../../api/apiClient";
import styled from "styled-components";
import AppContainer from "../../components/AppContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import ContentContainer from "../../components/ContentContainer";
import BackButtonIcon from "../../assets/images/back-button.png";
import {
  TopContainer,
  BackButton,
  CenterTitle,
} from "../../components/Header/Header";
import FundingCardComponent from "../../components/funding/FundingCardComponent";
import { BASE_URL } from "../../constants/global";

const FundingListContainer = styled.div``;

const FundingList = () => {
  const navigate = useNavigate();
  const { coupleId } = useParams(); // coupleId 파라미터를 받아옴
  const [fundings, setFundings] = useState([]);

  useEffect(() => {
    const fetchFundings = async () => {
      try {
        const response = await apiClient.get(`/couples/${coupleId}/fundings`);
        setFundings(response.data);
      } catch (error) {
        console.error("Error fetching fundings:", error);
      }
    };

    fetchFundings();
  }, [coupleId]);

  const handleCardClick = (fundingId) => {
    navigate(`/fundings/${fundingId}`);
  };

  return (
    <AppContainer>
      <NavigationBar />
      <ContentContainer>
        <TopContainer>
          <BackButton
            src={BackButtonIcon}
            alt="Back"
            onClick={() => navigate(-1)}
          />
          <CenterTitle>현재 진행 중인 펀딩</CenterTitle>
        </TopContainer>
        <FundingListContainer>
          {fundings.map((funding) => (
            <div
              key={funding.fundingId}
              onClick={() => handleCardClick(funding.fundingId)}
            >
              <FundingCardComponent funding={funding} />
            </div>
          ))}
        </FundingListContainer>
      </ContentContainer>
    </AppContainer>
  );
};

export default FundingList;
