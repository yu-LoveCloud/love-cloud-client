import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const ProductDetailPage = () => {
    const navigate = useNavigate();
    const { productOptionsId } = useParams();
    const [selectedColor, setSelectedColor] = useState(productOptionsId);

    const product = {
        productName: "BESPOKE 냉장고 4도어 902L",
        price: 1890000,
        modelName: "RF90DG9111S9",
        mainImages: [
            "https://via.placeholder.com/400x300",
            "https://via.placeholder.com/400x300",
            "https://via.placeholder.com/400x300"
        ],
        descriptionImages: [
            "https://via.placeholder.com/400x300",
            "https://via.placeholder.com/400x300",
            "https://via.placeholder.com/400x300"
        ],
        colorOptions: [
            { color: "#EEEEEE", id: '1' },
            { color: "#555555", id: '2' },
            { color: "#CCCCCC", id: '3' }
        ]
    };

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

    const handleColorOptionClick = (id) => {
        setSelectedColor(id);
        navigate(`/items/${id}`);
    };

    useEffect(() => {
        setSelectedColor(productOptionsId);
    }, [productOptionsId]);

    return (
        <AppContainer>
            <NavigationBar />
            <ContentContainer>
                <TopContainer>
                    <BackButton src={BackButtonIcon} alt="Back" onClick={() => navigate(-1)} />
                    <CenterTitle>상품 상세</CenterTitle>
                </TopContainer>
                <ImageSlider {...settings}>
                    {product.mainImages.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={`View ${index + 1}`} />
                        </div>
                    ))}
                </ImageSlider>
                <ColorOptionsContainer>
                    {product.colorOptions.map((option) => (
                        <ColorOption
                            key={option.id}
                            color={option.color}
                            isSelected={option.id === selectedColor}
                            onClick={() => handleColorOptionClick(option.id)}
                        />
                    ))}
                </ColorOptionsContainer>
                <ProductInfoContainer>
                    <ProductInfo>{product.productName}</ProductInfo>
                    <ProductModel>{product.modelName}</ProductModel>
                    <ProductPrice>₩{product.price.toLocaleString()}</ProductPrice>
                </ProductInfoContainer>
                <SectionTitle>상품 상세 정보</SectionTitle>
                <DescriptionImagesContainer>
                    {product.descriptionImages.map((image, index) => (
                        <DescriptionImage key={index} src={image} alt={`Description ${index + 1}`} />
                    ))}
                </DescriptionImagesContainer>
                <PurpleButton>펀딩 생성하기</PurpleButton>
            </ContentContainer>
        </AppContainer>
    );
};

export default ProductDetailPage;
