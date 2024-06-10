import React from 'react';
import styled from 'styled-components';

// 텍스트

const FundingMessageText = styled.div`
    font-family: "Pretendard";
    font-size: 14px;
    color: #767676;
`;

const GuestNameText = styled.div`
    font-family: "Pretendard";
    font-weight: bold;
    font-size: 14px;
    color: #767676
`;

const GuestFundingAmountText = styled.div`
    font-family: "Pretendard";
    font-size: 14px;
    color: #767676;
`;

const GuestMessageText = styled.div`
    font-family: "Pretendard";
    font-size: 14px;
    color: #FFFFFF;
`;

// 펀딩 메시지

const FundingMessageContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
`;

const FundingMessage = styled.div`
    background-color: #D9D9D9;
    padding: 20px;
    border-radius: 15px 15px 0 15px;
    font-family: "Pretendard";
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 80%;
`;

// 게스트 메시지

const GuestFundingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

const GuestInfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    width: 90%;
`;

const GuestMessage = styled.div`
    background-color: #B49AD9;
    padding: 20px;
    border-radius: 15px 15px 15px 0;
    margin-bottom: 20px;
    font-family: "Pretendard";
    box-shadow: 0 4px 8px rgba(180, 154, 217, 0.8);
    width: 80%;
    align-self: flex-start;
    position: relative;
`;

const GuestFundingComponent = ({ message, guestFunding }) => {
    return (
        <div>
            <FundingMessageContainer>
                <FundingMessage>
                    <FundingMessageText>{message}</FundingMessageText>
                </FundingMessage>
            </FundingMessageContainer>
            <GuestFundingWrapper>
                {guestFunding.map((guest) => (
                    <div key={guest.guestFundingId}>
                        <GuestInfoContainer>
                            <GuestNameText>{guest.name}</GuestNameText>
                            <GuestFundingAmountText>{guest.fundingAmount}원</GuestFundingAmountText>
                        </GuestInfoContainer>
                        <GuestMessage>
                            <GuestMessageText>{guest.message}</GuestMessageText>
                        </GuestMessage>
                    </div>
                ))}
            </GuestFundingWrapper>
        </div>
    );
};

export default GuestFundingComponent;
