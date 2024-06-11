import React, { useState } from 'react';
import styled from 'styled-components';
import { OrderedListContainer, ListItem, Input, TextArea } from "../../components/Typography";

const FundingParticipationForm = ({ setName, setPhone, setEmail, setFundingAmount, setMessage, name, phone, email, fundingAmount, message }) => {

    const handleAmountButtonClick = (amount) => {
        setFundingAmount(prevAmount => formatNumber(Number(prevAmount.replace(/,/g, '')) + amount));
    };

    const handleFundingAmountChange = (e) => {
        const value = e.target.value.replace(/,/g, '');
        if (!isNaN(value) && value.trim() !== '') {
            setFundingAmount(formatNumber(value));
        } else {
            setFundingAmount('');
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/-/g, '');
        if (!isNaN(value)) {
            setPhone(formatPhoneNumber(value));
        }
    };

    const formatNumber = (value) => {
        return Number(value).toLocaleString();
    };

    const formatPhoneNumber = (value) => {
        if (value.length <= 3) return value;
        if (value.length <= 7) return `${value.slice(0, 3)}-${value.slice(3)}`;
        return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`;
    };

    return (
        <FormContainer>
            <OrderedListContainer>
                <ListItem>이름</ListItem>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름을 입력해주세요"
                />
                <ListItem>휴대폰 번호</ListItem>
                <Input
                    type="text"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="휴대폰 번호를 입력해주세요"
                />
                <ListItem>이메일</ListItem>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일을 입력해주세요"
                />
                <ListItem>펀딩 금액 입력</ListItem>
                <InputWrapper>
                    <StyledInput
                        type="text"
                        value={fundingAmount}
                        onChange={handleFundingAmountChange}
                        placeholder="펀딩 금액을 입력해주세요"
                    />
                    <AmountText>원</AmountText>
                </InputWrapper>
                <ButtonGroup>
                    <AmountButton onClick={() => handleAmountButtonClick(300000)}>+ 30만</AmountButton>
                    <AmountButton onClick={() => handleAmountButtonClick(100000)}>+ 10만</AmountButton>
                    <AmountButton onClick={() => handleAmountButtonClick(50000)}>+ 5만</AmountButton>
                    <AmountButton onClick={() => handleAmountButtonClick(10000)}>+ 1만</AmountButton>
                </ButtonGroup>
                <ListItem>응원 메시지</ListItem>
                <TextArea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="응원 메시지를 입력해주세요"
                />
            </OrderedListContainer>
        </FormContainer>
    );
};

export default FundingParticipationForm;

const FormContainer = styled.div`
    margin-bottom: 40px;
`;

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const StyledInput = styled(Input)`
    padding-right: 30px;
`;

const AmountText = styled.span`
    position: absolute;
    right: 10px;
    top: 30%;
    transform: translateY(-50%);
    font-family: "Pretendard";
    font-size: 14px;
    color: #767676;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
`;

const AmountButton = styled.button`
    padding: 10px 20px;
    background-color: #D9D9D9;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-family: "Pretendard";
    color: #767676;
    font-size: 12px;
`;
