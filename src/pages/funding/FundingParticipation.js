import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import AppContainer from "../../components/AppContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import ContentContainer from "../../components/ContentContainer";
import PurpleButton from "../../components/button/PurpleButton";
import BackButtonIcon from '../../assets/images/back-button.png';
import { TopContainer, BackButton, CenterTitle } from '../../components/Header/Header';
import { OrderedListContainer, ListItem, Input, TextArea } from "../../components/Typography";


const ButtonWrapper = styled.div`
    padding-top: 0px;
    padding-bottom: 0px;
    position: absolute;
    bottom: 10px;
    width: calc(100% - 48px);
`;

const ProductInfoTitle = styled.div`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const ProductInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 20px;
`;

const ProductImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
`;

const ProductDetails = styled.div`
    flex: 1;
    margin-left: 16px;
`;

const ProductName = styled.div`
    font-size: 16px;
    font-family: "Pretendard";
    font-weight: bold;
    margin-bottom: 8px;
`;

const ProductPrice = styled.div`
    font-size: 14px;
    font-family: "Pretendard";
    color: #666;
`;

const FundingParticipation = () => {
    const navigate = useNavigate();
    const { productOptionsId } = useParams();

    const product = {
        productName: "BESPOKE 냉장고 4도어 811L",
        selectedOption: {
            mainImages: [{ imageName: "example.jpg" }],
            price: 3940000
        }
    };

    return (
        <AppContainer>
            <NavigationBar />
            <ContentContainer>
                <TopContainer>
                    <BackButton src={BackButtonIcon} alt="Back" onClick={() => navigate(-1)} />
                    <CenterTitle>펀딩 생성</CenterTitle>
                </TopContainer>
                <ProductInfoTitle>상품 정보</ProductInfoTitle>
                <ProductInfoContainer>
                    <ProductImage src={`https://via.placeholder.com/100`} alt={product.productName} />
                    <ProductDetails>
                        <ProductName>{product.productName}</ProductName>
                        <ProductPrice>₩{product.selectedOption.price.toLocaleString()}</ProductPrice>
                    </ProductDetails>
                </ProductInfoContainer>
                <OrderedListContainer>
                    <ListItem>펀딩 제목</ListItem>
                    <Input placeholder="펀딩 제목" />
                    <ListItem>펀딩 마감 기한</ListItem>
                    <Input
                        type="datetime-local"
                        placeholder="펀딩 마감 기한"
                    />
                    <ListItem>하객에게 전달하고픈 말(상세 페이지에 표시)</ListItem>
                    <TextArea placeholder="하객에게 전달하고픈 말(상세 페이지에 표시)" />
                </OrderedListContainer>
                <ButtonWrapper>
                    <PurpleButton>펀딩 생성하기</PurpleButton>
                </ButtonWrapper>
            </ContentContainer>
        </AppContainer>
    );
};

export default FundingParticipation;