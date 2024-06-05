import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Slider from 'react-slick';
import AppContainer from "../../components/AppContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import ContentContainer from "../../components/ContentContainer";
import PurpleButton from "../../components/button/PurpleButton";
import BackButtonIcon from '../../assets/images/back-button.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TopContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 20px;
`;

const BackButton = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
    position: absolute;
    left: 10px;
`;

const CenterTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
    font-family: "Pretendard";
`;

const ImageSlider = styled(Slider)`
    .slick-slide img {
        width: 100%;
        border-radius: 20px;
    }
    margin-bottom: 40px;
`;

const ColorOptionsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 10px;
    margin-bottom: 20px;
`;

const ColorOption = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin-right: 10px;
    cursor: pointer;
    border: 2px solid ${props => props.isSelected ? 'black' : '#ddd'};
    box-shadow: ${props => props.isSelected ? '0 0 2px 2px #666' : 'none'};
`;

const ProductInfoContainer = styled.div`
    padding-left: 10px;
    margin-bottom: 20px;
`;

const ProductInfo = styled.div`
    font-size: 20px;
    font-family: "Pretendard";
    margin-bottom: 5px;
    font-weight: bold;
`;

const ProductModel = styled.div`
    font-size: 12px;
    font-family: "Pretendard";
    color: #666;
    margin-bottom: 10px;
`;

const ProductPrice = styled.div`
    font-size: 16px;
    font-family: "Pretendard";
    font-weight: bold;
    text-align: right;
    flex: 1;
`;

const SectionTitle = styled.div`
    font-size: 15px;
    font-family: "Pretendard";
    font-weight: bold;
    padding-left: 10px;
    margin-bottom: 10px;
`;

const DescriptionImagesContainer = styled.div`
    padding-left: 10px;
    padding-right: 10px;
`;

const DescriptionImage = styled.img`
    width: 100%;
    border-radius: 10px;
    margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
    padding-top: 0px;
    padding-bottom: 0px;
    position: absolute;
    bottom: 10px;
    width: calc(100% - 48px);
`;

const ProductDetailPage = () => {
    const navigate = useNavigate();
    const { productOptionsId } = useParams();
    const [selectedColor, setSelectedColor] = useState(productOptionsId);
    const [product, setProduct] = useState(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };

    const fetchProductDetails = async (productOptionsId) => {
        try {
            const response = await axios.get(`http://localhost:8080/items/${productOptionsId}`);
            setProduct(response.data);
            setSelectedColor(response.data.selectedOption.productOptionsId);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const handleColorOptionClick = (id) => {
        setSelectedColor(id);
        navigate(`/items/${id}`);
        fetchProductDetails(id);
    };

    useEffect(() => {
        fetchProductDetails(productOptionsId);
    }, [productOptionsId]);

    const handleCreateFundingClick = () => {
        navigate(`/funding/create/${productOptionsId}`);
    };


    if (!product) return <div>Loading...</div>;

    const allColorOptions = [
        ...product.otherOptions,
        { productOptionsId: product.selectedOption.productOptionsId, color: product.selectedOption.color }
    ];

    return (
        <AppContainer>
            <NavigationBar />
            <ContentContainer>
                <TopContainer>
                    <BackButton src={BackButtonIcon} alt="Back" onClick={() => navigate(-1)} />
                    <CenterTitle>상품 상세</CenterTitle>
                </TopContainer>
                <ImageSlider {...settings}>
                    {product.selectedOption.mainImages.map((image, index) => (
                        <div key={index}>
                            <img src={`https://lovecloud-storage.s3.ap-northeast-2.amazonaws.com/images/${image.imageName}`} alt={`View ${index + 1}`} />
                        </div>
                    ))}
                </ImageSlider>
                <ColorOptionsContainer>
                    {allColorOptions.map((option) => (
                        <ColorOption
                            key={option.productOptionsId}
                            color={option.color}
                            isSelected={option.productOptionsId === selectedColor}
                            onClick={() => handleColorOptionClick(option.productOptionsId)}
                        />
                    ))}
                </ColorOptionsContainer>
                <ProductInfoContainer>
                    <ProductInfo>{product.productName}</ProductInfo>
                    <ProductModel>{product.selectedOption.modelName}</ProductModel>
                    <ProductPrice>₩{product.selectedOption.price.toLocaleString()}</ProductPrice>
                </ProductInfoContainer>
                <SectionTitle>상품 상세 정보</SectionTitle>
                <DescriptionImagesContainer>
                    {product.selectedOption.descriptionImages.map((image, index) => (
                        <DescriptionImage key={index} src={`https://lovecloud-storage.s3.ap-northeast-2.amazonaws.com/images/${image.imageName}`} alt={`Description ${index + 1}`} />
                    ))}
                </DescriptionImagesContainer>
                <ButtonWrapper>
                    <PurpleButton onClick={handleCreateFundingClick}>펀딩 생성하기</PurpleButton>
                </ButtonWrapper>
            </ContentContainer>
        </AppContainer>
    );
};

export default ProductDetailPage;
