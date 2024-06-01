import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import AppContainer from "../../components/AppContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import ContentContainer from "../../components/ContentContainer";
import { Title } from "../../components/Typography";
import SelectedHeart from '../../assets/images/product/selected-heart.png';
import UnselectedHeart from '../../assets/images/product/unselected-heart.png';

// styled-components 정의
const FilterContainer = styled.div`
    display: flex; // 수평 정렬을 위해 flexbox 사용
    gap: 10px; // 요소 사이의 간격을 10px로 설정
    margin-bottom: 20px; // 아래 여백을 20px로 설정
    overflow-x: auto; // 가로 스크롤 가능하게 설정
    overflow-y: hidden; // 세로 스크롤은 비활성화
    white-space: nowrap; // 줄바꿈을 하지 않도록 설정
    cursor: grab; // 드래그 가능 상태 커서로 설정
    user-select: none; // 텍스트 선택을 비활성화
    scrollbar-width: none; // Firefox에서 스크롤바 숨기기
    &::-webkit-scrollbar {
        display: none; // Chrome, Safari에서 스크롤바 숨기기
    }
`;

const FilterButton = styled.button`
    padding: 10px 20px; // 내부 여백 설정
    border: 1px solid #ccc; // 테두리 설정
    background-color: ${props => (props.active ? '#4c3073' : '#fff')}; // 활성 상태에 따라 배경색 변경
    color: ${props => (props.active ? '#fff' : '#000')}; // 활성 상태에 따라 글자색 변경
    border-radius: 20px; // 모서리를 둥글게 설정
    cursor: pointer; // 클릭 가능한 커서로 설정
    font-size: 14px; // 글자 크기 설정
    font-family: "Pretendard"; // 글꼴 설정
`;

const SortSelectContainer = styled.div`
    display: flex;
    justify-content: flex-end; // 오른쪽 정렬
    margin-bottom: 20px; // 아래 여백을 20px로 설정
`;

const SortSelect = styled.select`
    padding: 10px 20px; // 내부 여백 설정
    background-color: #fff; // 배경색 설정
    color: #000; // 글자색 설정
    border: none; // 테두리 없음으로 설정
    border-radius: 20px; // 모서리를 둥글게 설정
    cursor: pointer; // 클릭 가능한 커서로 설정
    font-size: 14px; // 글자 크기 설정
    font-family: "Pretendard"; // 글꼴 설정
`;

const ProductGrid = styled.div`
    display: flex; // 수평 정렬을 위해 flexbox 사용
    flex-wrap: wrap; // 요소들이 줄바꿈 되도록 설정
    gap: 20px; // 요소 사이의 간격을 20px로 설정
`;

const ProductCard = styled.div`
    flex: 1 1 calc(50% - 20px); // 카드의 너비를 50%로 설정하고, 간격을 고려하여 조정
    max-width: calc(50% - 20px); // 최대 너비를 50%로 설정
    border: 1px solid #ccc; // 테두리 설정
    border-radius: 10px; // 모서리를 둥글게 설정
    overflow: hidden; // 내용이 넘칠 경우 숨기기
    text-align: center; // 텍스트 가운데 정렬
    background: #fff; // 배경색을 흰색으로 설정
    position: relative; // 찜 버튼 위치 설정을 위한 상대 위치
`;

const ProductImage = styled.img`
    width: 100%; // 이미지 너비를 100%로 설정
    height: 200px; // 이미지 높이를 200px로 설정
    object-fit: cover; // 이미지가 컨테이너에 맞게 조정되도록 설정
`;

const WishlistButton = styled.button`
    position: absolute; // 절대 위치 설정
    top: 10px; // 상단에서 10px 떨어짐
    right: 10px; // 오른쪽에서 10px 떨어짐
    background: none; // 배경 없음
    border: none; // 테두리 없음
    cursor: pointer; // 클릭 가능한 커서로 설정
    img {
        width: 24px; // 이미지 너비 설정
        height: 24px; // 이미지 높이 설정
    }
`;

const ColorOptions = styled.div`
    display: flex; // 수평 정렬을 위해 flexbox 사용
    justify-content: center; // 가운데 정렬
    gap: 5px; // 요소 사이의 간격을 5px로 설정
    margin-top: 10px; // 상단 여백을 10px로 설정
    overflow-x: auto; // 가로 스크롤 가능하게 설정
    overflow-y: hidden; // 세로 스크롤은 비활성화
    white-space: nowrap; // 줄바꿈을 하지 않도록 설정
    cursor: grab; // 드래그 가능 상태 커서로 설정
    user-select: none; // 텍스트 선택을 비활성화
    scrollbar-width: none; // Firefox에서 스크롤바 숨기기
    &::-webkit-scrollbar {
        display: none; // Chrome, Safari에서 스크롤바 숨기기
    }
`;

const ColorOptionButton = styled.button`
    width: 12px; // 버튼 너비 설정
    height: 12px; // 버튼 높이 설정
    border-radius: 50%; // 버튼을 원형으로 설정
    border: ${props => props.isSelected ? '1px solid #000' : '1px solid #ccc'}; // 선택된 경우 검은 테두리, 그렇지 않으면 회색 테두리
    background-color: ${props => props.color}; // 버튼 배경색 설정
    cursor: pointer; // 클릭 가능한 커서로 설정
`;

const ProductInfo = styled.div`
    padding: 10px; // 내부 여백 설정
`;

const ProductName = styled.h3`
    font-size: 14px; // 글자 크기 설정
    font-family: "Pretendard"; // 글꼴 설정
    color: #000; // 글자색 설정
`;

const ModelName = styled.p`
    font-size: 11px; // 글자 크기 설정
    color: #767676; // 글자색 설정
    font-family: "Pretendard"; // 글꼴 설정
`;

const ProductPrice = styled.p`
    color: #b49ad9; // 글자색 설정
    font-size: 14px; // 글자 크기 설정
    font-family: "Pretendard"; // 글꼴 설정
`;

// 더미 데이터 정의
const initialProducts = [
    {
        productId: 1, // 제품 ID
        productName: 'BESPOKE 냉장고 4도어 902L', // 제품 이름
        modelName: 'RF90DG9111S9', // 모델명
        price: '1,890,000원', // 가격
        imageUrl: 'https://via.placeholder.com/200', // 이미지 URL
        colors: ['#FFFFFF', '#000000', '#FF0000'], // 색상 옵션
        isWishlisted: false // 찜 상태
    },
    {
        productId: 2,
        productName: 'BESPOKE AI 하이브리드 900L',
        modelName: 'RF91DB90LE01',
        price: '3,240,000원',
        imageUrl: 'https://via.placeholder.com/200',
        colors: ['#FFFFFF', '#000000'],
        isWishlisted: true
    },
    {
        productId: 3,
        productName: 'BESPOKE 냉장고 4도어 811L',
        modelName: 'RF80DB9342H6',
        price: '3,470,000원',
        imageUrl: 'https://via.placeholder.com/200',
        colors: ['#FFFFFF', '#000000', '#00FF00'],
        isWishlisted: false
    },
    {
        productId: 4,
        productName: 'BESPOKE 정수기 냉장고 4도어 825L',
        modelName: 'RF85C98Y2AP',
        price: '3,925,000원',
        imageUrl: 'https://via.placeholder.com/200',
        colors: ['#FFFFFF', '#000000', '#0000FF'],
        isWishlisted: true
    },
];

const ProductList = () => {
    const [products, setProducts] = useState(initialProducts); // 초기 제품 상태 설정
    const [selectedCategory, setSelectedCategory] = useState('전체'); // 선택된 카테고리를 관리하는 상태
    const [sortOrder, setSortOrder] = useState('등록일순'); // 정렬 순서를 관리하는 상태
    const [selectedColor, setSelectedColor] = useState(null); // 선택된 색상 상태
    const filterContainerRef = useRef(null); // FilterContainer에 대한 참조 생성
    const colorOptionsRef = useRef(null); // ColorOptions에 대한 참조 생성
    let isMouseDown = false; // 마우스 버튼이 눌린 상태를 추적
    let startX, scrollLeft; // 드래그 시작 위치와 스크롤 위치를 저장

    const handleMouseDown = (e, ref) => {
        isMouseDown = true; // 마우스 버튼이 눌린 상태로 설정
        ref.current.style.cursor = 'grabbing'; // 커서 모양 변경
        startX = e.pageX - ref.current.offsetLeft; // 드래그 시작 위치 계산
        scrollLeft = ref.current.scrollLeft; // 현재 스크롤 위치 저장
    };

    const handleMouseLeave = (ref) => {
        isMouseDown = false; // 마우스 버튼이 눌린 상태 해제
        ref.current.style.cursor = 'grab'; // 커서 모양 변경
    };

    const handleMouseUp = (ref) => {
        isMouseDown = false; // 마우스 버튼이 눌린 상태 해제
        ref.current.style.cursor = 'grab'; // 커서 모양 변경
    };

    const handleMouseMove = (e, ref) => {
        if (!isMouseDown) return; // 마우스 버튼이 눌리지 않았으면 종료
        e.preventDefault(); // 기본 동작 방지
        const x = e.pageX - ref.current.offsetLeft; // 현재 마우스 위치 계산
        const walk = (x - startX) * 2; // 드래그 거리 계산 및 속도 조절
        ref.current.scrollLeft = scrollLeft - walk; // 스크롤 위치 조정
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category); // 선택된 카테고리 상태 변경
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value); // 정렬 순서 상태 변경
    };

    const toggleWishlist = (productId) => {
        // 찜 상태 토글
        const updatedProducts = products.map(product =>
            product.productId === productId
                ? { ...product, isWishlisted: !product.isWishlisted }
                : product
        );
        setProducts(updatedProducts);
    };

    const handleColorChange = (color) => {
        setSelectedColor(color === selectedColor ? null : color); // 선택된 색상 상태 변경
    };

    const filteredProducts = selectedColor
        ? products.filter(product => product.colors.includes(selectedColor))
        : products;

    return (
        <AppContainer>
            <NavigationBar />
            <ContentContainer>
                <Title>냉장고</Title>
                <FilterContainer
                    ref={filterContainerRef}
                    onMouseDown={(e) => handleMouseDown(e, filterContainerRef)}
                    onMouseLeave={() => handleMouseLeave(filterContainerRef)}
                    onMouseUp={() => handleMouseUp(filterContainerRef)}
                    onMouseMove={(e) => handleMouseMove(e, filterContainerRef)}
                >
                    <FilterButton active={selectedCategory === '전체'} onClick={() => handleCategoryChange('전체')}>전체</FilterButton>
                    <FilterButton active={selectedCategory === 'TV'} onClick={() => handleCategoryChange('TV')}>TV</FilterButton>
                    <FilterButton active={selectedCategory === '냉장고'} onClick={() => handleCategoryChange('냉장고')}>냉장고</FilterButton>
                    <FilterButton active={selectedCategory === '김치냉장고'} onClick={() => handleCategoryChange('김치냉장고')}>김치냉장고</FilterButton>
                    <FilterButton active={selectedCategory === '식기세척기'} onClick={() => handleCategoryChange('식기세척기')}>식기세척기</FilterButton>
                </FilterContainer>
                <SortSelectContainer>
                    <SortSelect value={sortOrder} onChange={handleSortOrderChange}>
                        <option value="등록일순">등록일순</option>
                        <option value="가격순">가격순</option>
                    </SortSelect> {/* 정렬 셀렉트 박스 추가 */}
                </SortSelectContainer>
                <ProductGrid>
                    {filteredProducts.map(product => (
                        <ProductCard key={product.productId}>
                            <ProductImage src={product.imageUrl} alt={product.productName} />
                            <WishlistButton onClick={() => toggleWishlist(product.productId)}>
                                <img src={product.isWishlisted ? SelectedHeart : UnselectedHeart} alt="찜" />
                            </WishlistButton>
                            <ProductInfo>
                                <ColorOptions
                                    ref={colorOptionsRef}
                                    onMouseDown={(e) => handleMouseDown(e, colorOptionsRef)}
                                    onMouseLeave={() => handleMouseLeave(colorOptionsRef)}
                                    onMouseUp={() => handleMouseUp(colorOptionsRef)}
                                    onMouseMove={(e) => handleMouseMove(e, colorOptionsRef)}
                                >
                                    {product.colors.map(color => (
                                        <ColorOptionButton
                                            key={color}
                                            color={color}
                                            isSelected={color === selectedColor}
                                            onClick={() => handleColorChange(color)}
                                        />
                                    ))}
                                </ColorOptions>
                                <ProductName>{product.productName}</ProductName>
                                <ModelName>{product.modelName}</ModelName>
                                <ProductPrice>{product.price}</ProductPrice>
                            </ProductInfo>
                        </ProductCard>
                    ))}
                </ProductGrid>
            </ContentContainer>
        </AppContainer>
    );
};

export default ProductList;
