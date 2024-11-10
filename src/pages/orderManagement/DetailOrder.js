import AppContainer from "../../components/AppContainer";
import ContentContainer from "../../components/ContentContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import { Title } from "../../components/Typography";
import styled, { css } from "styled-components";
import OrderProduct from "../../components/orderManagement/OrderProduct";
import OrderDetailTable from "../../components/orderManagement/OrderDetailTable";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetail, cancelOrder } from "../../api/orderApi";
import {
  formatDate,
  getDeliveryStatusText,
  getOrderStatusText,
} from "../../components/orderManagement/orderUtils";
import LoadingSpinner from "../../components/LoadingSpinner"; // Import the LoadingSpinner component

function DetailOrder() {
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for the cancel request
  const { orderId } = useParams();

  useEffect(() => {
    getOrderDetail(orderId)
      .then((data) => {
        setOrder(data);
        setErrorMessage("");
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            setErrorMessage("존재하지 않는 주문입니다");
          } else if (error.response.status === 403) {
            setErrorMessage("권한이 없습니다");
          } else {
            setErrorMessage("오류가 발생했습니다. 다시 시도해주세요.");
          }
        } else {
          setErrorMessage("서버와 연결할 수 없습니다.");
        }
        console.error("주문 상세 정보를 가져오는 중 오류 발생: ", error);
      });
  }, [orderId]);

  const handleCancelOrder = () => {
    setLoading(true); // Start loading
    cancelOrder(orderId)
      .then(() => {
        setOrder((prevOrder) => ({
          ...prevOrder,
          orderStatus: "CANCEL_REQUESTED",
        }));
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage("주문 취소 중 오류가 발생했습니다.");
        alert("주문 취소 중 오류가 발생했습니다.", error);
        console.error("주문 취소 오류: ", error);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  const isCancellable = order.orderStatus === "ORDER_PLACED";

  return (
    <AppContainer>
      <NavigationBar />
      <ContentContainer>
        <Title>주문 상세</Title>
        {errorMessage ? (
          <Error>{errorMessage}</Error>
        ) : loading && ( // Show LoadingSpinner while loading is true
          <LoadingSpinner />
        )}
        <OrderInfo>
              <LeftSection>
                <Label>주문번호</Label> {order.orderNumber}
              </LeftSection>
              <RightSection>{formatDate(order.orderDateTime)}</RightSection>
            </OrderInfo>
            <OrderInfo>
              <LeftSection>
                <Label>주문상태</Label> {getOrderStatusText(order.orderStatus)}
              </LeftSection>
              <RightSection>
                <CancelButton
                  onClick={isCancellable ? handleCancelOrder : null}
                  disabled={!isCancellable}
                >
                  주문 취소
                </CancelButton>
              </RightSection>
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

const CancelButton = styled.button`
  padding: 8px 16px;
  background-color: #ff6666;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #ff4d4d;
  }

  ${(props) =>
    props.disabled &&
    css`
      background-color: #cccccc;
      cursor: not-allowed;
      &:hover {
        background-color: #cccccc;
      }
    `}
`;
