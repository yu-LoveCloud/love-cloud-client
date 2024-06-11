import React from "react";
import { useNavigate } from "react-router-dom";
import AppContainer from "../../components/AppContainer";
import ContentContainer from "../../components/ContentContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import { Subtitle, Title } from "../../components/Typography";
import styled from "styled-components";
import OrderProduct from "../../components/orderManagement/OrderProduct";
import {
  formatDate,
  getOrderStatusText,
} from "../../components/orderManagement/orderUtils";
import { getOrderList } from "../../api/orderApi";

function ListOrder() {
  const navigate = useNavigate();
  const [orders, setOrders] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    getOrderList()
      .then((data) => {
        setOrders(data);
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
  }, []);

  const handleOrderClick = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  return (
    <AppContainer>
      <NavigationBar />
      <ContentContainer>
        <Title>주문 내역</Title>
        <Subtitle>주문에 대한 정보를 확인 해 보세요</Subtitle>
        <Hr />
        {errorMessage ? (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        ) : (
          orders.map((order) => (
            <OrderDiv
              key={order.orderId}
              onClick={() => handleOrderClick(order.orderId)}
            >
              <Label>{formatDate(order.orderDateTime)}</Label>
              <Label>{getOrderStatusText(order.orderStatus)} </Label>
              <br />
              <Label>주문 상품:</Label>
              {order.orderProducts.map((product) => (
                <OrderProduct key={product.productId} product={product} />
              ))}
              <Hr />
            </OrderDiv>
          ))
        )}
      </ContentContainer>
    </AppContainer>
  );
}

export default ListOrder;

const Hr = styled.hr`
  border: 1px solid #f2f2f2;
  margin: 1em 0;
`;

const Label = styled.span`
  font-size: 13px;
  margin-right: 8px;
  color: #111111;
`;

const OrderDiv = styled.div`
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin: 1em 0;
`;
