import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const FundingListContainer = styled.div``;

const UserFundingList = () => {
  const navigate = useNavigate();
  const [fundings, setFundings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserFundings = async () => {
      try {
        // 1. 사용자 정보 요청
        const userResponse = await apiClient.get(`/user/me`);
        const { coupleId } = userResponse.data;

        if (!coupleId) {
          throw new Error("커플이 없습니다.");
        }

        // 2. 커플의 펀딩 목록 요청
        const fundingsResponse = await apiClient.get(
          `/couples/${coupleId}/fundings`
        );
        setFundings(fundingsResponse.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserFundings();
  }, []);

  const handleCardClick = (fundingId) => {
    navigate(`/fundings/${fundingId}`);
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
          <BackButton
            src={BackButtonIcon}
            alt="Back"
            onClick={() => navigate(-1)}
          />
          <CenterTitle>내 커플의 펀딩 목록</CenterTitle>
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

export default UserFundingList;
