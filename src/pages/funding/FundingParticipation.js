import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import AppContainer from "../../components/AppContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import ContentContainer from "../../components/ContentContainer";
import PurpleButton from "../../components/button/PurpleButton";

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

const ProductInfoContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
    margin-bottom: 20px;
`;

const ProductImage = styled.img`
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 10px;
    margin-right: 10px;
`;

const ProductDetails = styled.div`
    flex: 1;
`;

const ProductName = styled.div`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
`;

const ProductPrice = styled.div`
    font-size: 14px;
    color: #666;
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 5px;
`;

const TextArea = styled.textarea`
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 5px;
    resize: none;
`;

const StyledButtonContainer = styled.div`
    position: sticky;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: white;
    padding: 10px 0;
`;

const FundingParticipation = () => {
    const navigate = useNavigate();
    const { productOptionsId } = useParams();
    const [product, setProduct] = useState(null);
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/items/${productOptionsId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [productOptionsId]);

    const handleSubmit = async () => {
        const fundingData = {
            productOptionsId,
            title,
            deadline,
            message
        };

        try {
            await axios.post('http://localhost:8080/funding/create', fundingData);
            navigate('/funding/success');
        } catch (error) {
            console.error('Error creating funding:', error);
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <AppContainer>
            <NavigationBar />
            <ContentContainer>
                <TopContainer>
                    <BackButton src={'/path/to/back-icon.png'} alt="Back" onClick={() => navigate(-1)} />
                    <CenterTitle>펀딩 생성하기</CenterTitle>
                </TopContainer>
                <ProductInfoContainer>
                    <ProductImage src={`https://lovecloud-storage.s3.ap-northeast-2.amazonaws.com/images/${product.selectedOption.mainImages[0].imageName}`} alt={product.productName} />
                    <ProductDetails>
                        <ProductName>{product.productName}</ProductName>
                        <ProductPrice>₩{product.selectedOption.price.toLocaleString()}</ProductPrice>
                    </ProductDetails>
                </ProductInfoContainer>
                <FormContainer>
                    <div>
                        <Label>펀딩 제목</Label>
                        <Input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="펀딩 제목을 입력하세요"
                        />
                    </div>
                    <div>
                        <Label>펀딩 마감 기한</Label>
                        <Input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>하객에게 전달하고픈 말(상세 페이지에 표시)</Label>
                        <TextArea
                            rows="4"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="하객에게 전달하고픈 말을 입력하세요"
                        />
                    </div>
                </FormContainer>
                <StyledButtonContainer>
                    <PurpleButton onClick={handleSubmit}>펀딩 생성하기</PurpleButton>
                </StyledButtonContainer>
            </ContentContainer>
        </AppContainer>
    );
};

export default FundingParticipation;
