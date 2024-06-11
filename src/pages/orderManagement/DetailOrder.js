import AppContainer from "../../components/AppContainer";
import ContentContainer from "../../components/ContentContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import { Title } from "../../components/Typography";
import styled from "styled-components";
import OrderProduct from "../../components/orderManagement/OrderProduct";
import OrderDetailTable from "../../components/orderManagement/OrderDetailTable";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetail } from "../../api/orderApi";
import {
  formatDate,
  getDeliveryStatusText,
} from "../../components/orderManagement/orderUtils";

function DetailOrder() {
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 추가
  const { orderId } = useParams();

  useEffect(() => {
    getOrderDetail(orderId)
      .then((data) => {
        setOrder(data);
        setErrorMessage(""); // 성공적으로 데이터를 가져오면 에러 메시지 초기화
      })
      .catch((error) => {
        if (error.response) {
          // 서버 응답이 있으면
          if (error.response.status === 404) {
            setErrorMessage("존재하지 않는 주문입니다");
          } else if (error.response.status === 403) {
            setErrorMessage("권한이 없습니다");
          } else {
            setErrorMessage("오류가 발생했습니다. 다시 시도해주세요.");
          }
        } else {
          // 서버 응답이 없으면
          setErrorMessage("서버와 연결할 수 없습니다.");
        }
        console.error("주문 상세 정보를 가져오는 중 오류 발생: ", error);
      });
  }, [orderId]);

  return (
    <AppContainer>
      <NavigationBar />
      <ContentContainer>
        <Title>주문 상세</Title>
        {errorMessage ? (
          <Error>{errorMessage}</Error>
        ) : (
          <>
            <OrderInfo>
              <LeftSection>
                <Label>주문번호</Label> {order.orderNumber}
              </LeftSection>
              <RightSection>{formatDate(order.orderDateTime)}</RightSection>
            </OrderInfo>
            <Hr />
            <OrderInfo>
              <LeftSection>
                <Label>배송상태</Label>{" "}
                {getDeliveryStatusText(order.deliveryStatus)}
              </LeftSection>
              <RightSection>{formatDate(order.orderDateTime)}</RightSection>
            </OrderInfo>
            <Hr />
            {order.orderProducts &&
              order.orderProducts.map((product) => (
                <>
                  <OrderProduct key={product.productId} product={product} />
                  <Hr />
                </>
              ))}
            <Label>배송 정보</Label>
            <OrderDetailTable deliveryInfo={order} />
          </>
        )}
      </ContentContainer>
    </AppContainer>
  );
}

export default DetailOrder;

// 스타일 정의
const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1em 0;
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin-right: 8px;
  color: #111111;
`;

const LeftSection = styled.div`
  flex: 1;
  text-align: left;
  font-size: 12px;
  color: #111111;
`;

const RightSection = styled.div`
  flex: 1;
  text-align: right;
  font-size: 12px;
  color: #111111;
`;

const Hr = styled.hr`
  border: 1px solid #f2f2f2;
  margin: 1em 0;
`;

const Error = styled.div`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
`;
