import React from "react";
import styled from "styled-components";
import { IMAGE_PREFIX } from "../../constants/global";

function OrderProduct({ product }) {
  return (
    <ProductContainer>
      <Image
        src={IMAGE_PREFIX + product.mainImages[0]}
        alt={product.productName}
        onError={(e) => {
          e.target.src = "http://placeholder.com/100x100";
        }}
      />
      <ProductInfo>
        <TextInfo>
          <ProductName>{product.productName}</ProductName>
          <ModelNumber>{product.modelName}</ModelNumber>
        </TextInfo>
        <Price>{product.price.toLocaleString()} 원</Price>
      </ProductInfo>
    </ProductContainer>
  );
}

const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 10px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  margin-left: 10px;
  justify-content: space-between; /* 상하로 공간을 채워 Price가 아래에 위치하게 */
  height: 80px; /* Image 높이와 동일하게 설정 */
  width: 100%; /* 부모 컨테이너에 맞추어 가로 길이를 100%로 설정 */
`;

const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: column; /* 수직 정렬 */
`;

const ProductName = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: bold;
`;

const ModelNumber = styled.p`
  margin: 0;
  font-size: 12px;
  color: #767676;
`;

const Price = styled.p`
  margin: 0;
  font-size: 14px;
  margin-bottom: 5px;
  align-self: flex-end; /* 아래에 위치하게 설정 */
`;

export default OrderProduct;
