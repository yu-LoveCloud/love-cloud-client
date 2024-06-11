import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../../api/apiClient";
import styled from "styled-components";
import AppContainer from "../../components/AppContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import ContentContainer from "../../components/ContentContainer";
import BackButtonIcon from "../../assets/images/back-button.png";
import PurpleButton from "../../components/button/PurpleButton";
import {
  TopContainer,
  BackButton,
  CenterTitle,
} from "../../components/Header/Header";
import { SectionTitle } from "../../components/Typography";
import FundingCardComponent from "../../components/funding/FundingCardComponent";
import RecipientCardComponent from "../../components/funding/RecipientCardComponent";
import FundingParticipationForm from "../../components/funding/FundingParticipationFormComponent";
import { Divider } from "../../components/Common";

const FundingParticipate = () => {
  const navigate = useNavigate();
  const { fundingId } = useParams();
  const [funding, setFunding] = useState(null);
  const [guestFunding, setGuestFunding] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fundingAmount, setFundingAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchFundingData = async () => {
      try {
        const response = await apiClient.get(`/fundings/${fundingId}`);
        setFunding(response.data);
        console.log("펀딩 데이터 가져오기 성공:", response.data);
      } catch (error) {
        console.error("펀딩 데이터 가져오기 실패:", error);
      }
    };

    fetchFundingData();
  }, [fundingId]);

  useEffect(() => {
    const loadIamportScript = () => {
      const script = document.createElement("script");
      script.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
      script.async = true;
      document.body.appendChild(script);
    };

    loadIamportScript();
  }, []);

  const handlePayment = (response) => {
    const { merchantUid, name, amount } = response;

    const requestPay = () => {
      const IMP = window.IMP;
      IMP.init("imp36544802");

      IMP.request_pay(
        {
          pg: "html5_inicis",
          pay_method: "card",
          merchant_uid: merchantUid,
          name: name,
          amount: amount,
        },
        function (rsp) {
          if (rsp.success) {
            console.log("결제 성공:", rsp);
            apiClient
              .post(`/payments/complete/${rsp.imp_uid}`)
              .then((paymentResponse) => {
                console.log("결제 검증 응답 데이터:", paymentResponse.data);
                completeFundingParticipation(
                  response.guestFundingId,
                  paymentResponse.data
                );
              })
              .catch((error) => {
                console.error("결제 검증 실패:", error);
                alert("결제 검증에 실패하였습니다. 다시 시도해주세요.");
              });
          } else {
            console.error("결제 실패:", rsp.error_msg);
            alert("결제에 실패하였습니다. 에러 내용: " + rsp.error_msg);
          }
        }
      );
    };

    requestPay();
  };

  const completeFundingParticipation = (guestFundingId, paymentId) => {
    console.log(
      `펀딩 참여 완료 요청: guestFundingId=${guestFundingId}, paymentId=${paymentId}`
    );
    apiClient
      .patch(`/participations/${guestFundingId}/complete`, {
        paymentId,
      })
      .then((response) => {
        console.log("펀딩 참여 완료 성공:", response.data);
        alert("펀딩 참여가 완료되었습니다.");
        navigate("/");
      })
      .catch((error) => {
        console.error("펀딩 참여 완료 실패:", error);
        alert("펀딩 참여 완료에 실패하였습니다. 다시 시도해주세요.");
      });
  };

  const handleSubmit = async () => {
    const plainPhone = phone.replace(/-/g, "");
    const plainFundingAmount = fundingAmount.replace(/,/g, "");

    const data = {
      name,
      phoneNumber: plainPhone,
      email,
      fundingAmount: Number(plainFundingAmount),
      message,
    };
    console.log("제출된 데이터:", data);

    try {
      const response = await apiClient.post(
        `/fundings/${fundingId}/participations`,
        data
      );
      console.log("펀딩 참여 응답 데이터:", response.data);
      setGuestFunding(response.data);
      handlePayment(response.data);
    } catch (error) {
      console.error("펀딩 참여 실패:", error);
      alert("펀딩 참여에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  if (!funding) return <div>Loading...</div>;

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
          <CenterTitle>펀딩 참여</CenterTitle>
        </TopContainer>
        <FundingCardComponent funding={funding} />
        <Divider />
        <SectionTitle>받으시는 분</SectionTitle>
        <RecipientCardComponent people={funding.couple.people} />
        <Divider />
        <SectionTitle>보내시는 분</SectionTitle>
        <FundingParticipationForm
          setName={setName}
          setPhone={setPhone}
          setEmail={setEmail}
          setFundingAmount={setFundingAmount}
          setMessage={setMessage}
          name={name}
          phone={phone}
          email={email}
          fundingAmount={fundingAmount}
          message={message}
        />
        <ButtonWrapper>
          <PurpleButton onClick={handleSubmit}>결제하기</PurpleButton>
        </ButtonWrapper>
      </ContentContainer>
    </AppContainer>
  );
};

export default FundingParticipate;

const ButtonWrapper = styled.div`
  padding-top: 0px;
  padding-bottom: 0px;
  position: absolute;
  bottom: 10px;
  width: calc(100% - 48px);
`;
