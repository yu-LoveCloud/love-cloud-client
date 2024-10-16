import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { apiClient } from "../../api/apiClient";
import AppContainer from "../../components/AppContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import ContentContainer from "../../components/ContentContainer";
import { Title } from "../../components/Typography";
import SelectedHeart from "../../assets/images/product/selected-heart.png";
import UnselectedHeart from "../../assets/images/product/unselected-heart.png";
import { IMAGE_PREFIX } from "../../constants/global";

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
  background-color: ${(props) =>
    props.active ? "#4c3073" : "#fff"}; // 활성 상태에 따라 배경색 변경
  color: ${(props) =>
    props.active ? "#fff" : "#000"}; // 활성 상태에 따라 글자색 변경
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
  border: ${(props) =>
    props.isSelected
      ? "1px solid #000"
      : "1px solid #ccc"}; // 선택된 경우 검은 테두리, 그렇지 않으면 회색 테두리
  background-color: ${(props) => props.color}; // 버튼 배경색 설정
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

const ProductList = () => {
  const [products, setProducts] = useState([]); // 제품 목록 상태 선언
  const [categories, setCategories] = useState([]); // 카테고리 목록 상태 선언
  const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 카테고리 상태 선언
  const [sortOrder, setSortOrder] = useState("등록일순"); // 정렬 순서 상태 선언
  const [selectedColors, setSelectedColors] = useState({}); // 선택된 색상 상태 선언
  const navigate = useNavigate(); // useNavigate 훅 선언

  useEffect(() => {
    const fetchCategories = async () => {
      // 카테고리를 가져오는 함수 선언
      try {
        const response = await apiClient.get("/categories"); // API 요청하여 카테고리 데이터 가져오기
        setCategories(response.data); // 카테고리 상태 업데이트
      } catch (error) {
        console.error("카테고리 가져올 때 에러 발생:", error); // 에러 발생 시 콘솔에 에러 메시지 출력
      }
    };
    fetchCategories(); // 컴포넌트가 마운트될 때 카테고리를 가져오는 함수 호출
  }, []); // 의존성 배열이 비어있어 컴포넌트 마운트 시 한 번만 실행

  useEffect(() => {
    const fetchProducts = async () => {
      // 제품을 가져오는 함수 선언
      try {
        const endpoint = selectedCategory
          ? `/products?categoryId=${selectedCategory}`
          : "/products"; // 선택된 카테고리에 따라 엔드포인트 설정
        const response = await apiClient.get(endpoint); // API 요청하여 제품 데이터 가져오기
        setProducts(response.data.filter((product) => product)); // 제품 상태 업데이트, null 값 필터링
      } catch (error) {
        console.error("Error fetching products:", error); // 에러 발생 시 콘솔에 에러 메시지 출력
      }
    };
    fetchProducts(); // 선택된 카테고리가 변경될 때마다 제품을 가져오는 함수 호출
  }, [selectedCategory]); // 의존성 배열에 selectedCategory 포함하여 선택된 카테고리 변경 시마다 실행

  const handleCategoryChange = (categoryId) => {
    // 카테고리 변경 핸들러 함수
    setSelectedCategory(categoryId); // 선택된 카테고리 상태 업데이트
  };

  const handleSortOrderChange = (event) => {
    // 정렬 순서 변경 핸들러 함수
    setSortOrder(event.target.value); // 정렬 순서 상태 업데이트
  };

  const handleColorChange = (productId, optionId) => {
    // 색상 변경 핸들러 함수
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: optionId, // 선택된 색상 상태 업데이트
    }));
  };

  const handleProductClick = (productId, selectedOptionId) => {
    // 상품 클릭 핸들러 함수
    navigate(`/items/${selectedOptionId}`); // 상세 페이지로 이동
  };

  // 선택된 카테고리 이름 가져오기
  const selectedCategoryName = selectedCategory
    ? categories.find((category) => category.categoryId === selectedCategory)
        ?.categoryName
    : "전체";

  return (
    <AppContainer>
      {" "}
      {/* 전체 앱 컨테이너 */}
      <NavigationBar /> {/* 네비게이션 바 */}
      <ContentContainer>
        {" "}
        {/* 내용 컨테이너 */}
        <Title>{selectedCategoryName} 제품 목록</Title>{" "}
        {/* 선택된 카테고리 이름 표시 */}
        <FilterContainer>
          {" "}
          {/* 필터 버튼 컨테이너 */}
          <FilterButton
            onClick={() => handleCategoryChange(null)}
            active={!selectedCategory}
          >
            전체
          </FilterButton>
          {categories.map(
            (
              category // 카테고리 필터 버튼 반복 렌더링
            ) => (
              <FilterButton
                key={category.categoryId}
                onClick={() => handleCategoryChange(category.categoryId)}
                active={selectedCategory === category.categoryId}
              >
                {category.categoryName}
              </FilterButton>
            )
          )}
        </FilterContainer>
        <SortSelectContainer>
          {" "}
          {/* 정렬 선택 컨테이너 */}
          <SortSelect value={sortOrder} onChange={handleSortOrderChange}>
            <option value="등록일순">등록일순</option> {/* 등록일순 옵션 */}
          </SortSelect>
        </SortSelectContainer>
        <ProductGrid>
          {" "}
          {/* 제품 그리드 */}
          {products.map((product) => {
            // 제품 목록 반복 렌더링
            const selectedOptionId =
              selectedColors[product.productId] ||
              product.options[0].productOptionsId; // 선택된 옵션 ID
            const selectedOption = product.options.find(
              (option) => option.productOptionsId === selectedOptionId
            ); // 선택된 옵션 객체

            return (
              <ProductCard
                key={product.productId}
                onClick={() =>
                  handleProductClick(product.productId, selectedOptionId)
                }
              >
                {" "}
                {/* 제품 카드 */}
                <ProductImage
                  src={`${IMAGE_PREFIX}${selectedOption.mainImages[0].imageName}`}
                  alt={product.productName}
                />{" "}
                {/* 제품 이미지 */}
                {/* <WishlistButton onClick={() => toggleWishlist(product.productId)}> */}
                {/*     <img src={product.isWishlisted ? SelectedHeart : UnselectedHeart} alt="찜" /> */}
                {/* </WishlistButton> */}
                <ProductInfo>
                  {" "}
                  {/* 제품 정보 */}
                  <ColorOptions>
                    {" "}
                    {/* 색상 옵션 */}
                    {product.options.map(
                      (
                        option // 색상 옵션 반복 렌더링
                      ) => (
                        <ColorOptionButton
                          key={option.productOptionsId}
                          color={option.color}
                          isSelected={
                            option.productOptionsId === selectedOptionId
                          }
                          onClick={(e) => {
                            e.stopPropagation(); // 부모 요소로의 클릭 이벤트 전파 중단
                            handleColorChange(
                              product.productId,
                              option.productOptionsId
                            ); // 색상 변경 처리
                          }}
                        />
                      )
                    )}
                  </ColorOptions>
                  <ProductName>{product.productName}</ProductName>{" "}
                  {/* 제품 이름 */}
                  <ModelName>{selectedOption.modelName}</ModelName>{" "}
                  {/* 모델 이름 */}
                  <ProductPrice>{`₩${selectedOption.price.toLocaleString()}`}</ProductPrice>{" "}
                  {/* 제품 가격 */}
                </ProductInfo>
              </ProductCard>
            );
          })}
        </ProductGrid>
      </ContentContainer>
    </AppContainer>
  );
};

export default ProductList;
