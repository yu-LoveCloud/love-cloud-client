import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppContainer from "../../components/AppContainer";
import ContentContainer from "../../components/ContentContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import { Hr, ListItem, OrderedListContainer, Title, Input } from "../../components/Typography";
import styled from "styled-components";
import PurpleButton from "../../components/button/PurpleButton";
import OrderProduct from "../../components/orderManagement/OrderProduct";
import { createOrder } from "../../api/orderApi";
import { getDefaultDeliveryAddress } from "../../api/deliveryAddressApi"; // import the function
import OrderCreateDeliveryAddressTable from "../../components/orderManagement/OrderCreateDeliveryAddressTable";

function OrderCreateProcess2() {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedFundings = [], selectedAddress, previousFormData = {} } = location.state || {};

  const [formData, setFormData] = useState({
    fundingIds: selectedFundings.map((funding) => funding.fundingId),
    ordererName: previousFormData.ordererName || "",
    ordererPhoneNumber: previousFormData.ordererPhoneNumber || "",
    ordererMemo: previousFormData.ordererMemo || "",
    receiverName: selectedAddress?.receiverName || previousFormData.receiverName || "",
    receiverPhoneNumber: selectedAddress?.receiverPhoneNumber || previousFormData.receiverPhoneNumber || "",
    deliveryName: selectedAddress?.deliveryName || previousFormData.deliveryName || "",
    zipcode: selectedAddress?.zipCode || previousFormData.zipcode || "",
    address: selectedAddress?.address || previousFormData.address || "",
    detailAddress: selectedAddress?.detailAddress || previousFormData.detailAddress || "",
    deliveryMemo: selectedAddress?.deliveryMemo || previousFormData.deliveryMemo || "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!selectedFundings.length) {
      alert("잘못된 접근입니다.");
      navigate("/orders/create-process1");
    } else if (!selectedAddress) {
      // Load default address if no address is selected
      getDefaultDeliveryAddress().then((data) => {
        setFormData((prevData) => ({
          ...prevData,
          receiverName: data.receiverName,
          receiverPhoneNumber: data.receiverPhoneNumber,
          deliveryName: data.deliveryName,
          zipcode: data.zipCode,
          address: data.address,
          detailAddress: data.detailAddress,
          deliveryMemo: data.deliveryMemo,
        }));
      }).catch((error) => {
        console.error("Error fetching default delivery address:", error);
      });
    }
  }, [selectedFundings, selectedAddress, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    createOrder(formData)
      .then(() => {
        alert("주문이 완료되었습니다.");
        navigate("/orders");
      })
      .catch((error) => {
        alert("주문 실패: " + (error.response?.data?.message || "알 수 없는 오류"));
      });
  };

  const handleAddressChange = () => {
    navigate("/delivery-addresses", {
      state: { selectedFundings, previousFormData: formData },
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.ordererName) newErrors.ordererName = "주문자명을 입력해주세요.";
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(formData.ordererPhoneNumber)) newErrors.ordererPhoneNumber = "010-1234-5678 형식으로 입력해주세요.";
    if (!formData.receiverName) newErrors.receiverName = "수취인명을 입력해주세요.";
    if (!phoneRegex.test(formData.receiverPhoneNumber)) newErrors.receiverPhoneNumber = "010-1234-5678 형식으로 입력해주세요.";
    if (!formData.deliveryName) newErrors.deliveryName = "배송지 별칭을 입력해주세요.";
    if (!formData.address) newErrors.address = "주소를 입력해주세요.";
    if (!formData.detailAddress) newErrors.detailAddress = "상세주소를 입력해주세요.";
    if (!/^\d{5}$/.test(formData.zipcode)) newErrors.zipcode = "우편번호를 5자리로 입력해주세요.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <AppContainer>
      <NavigationBar />
      <ContentContainer>
        <Title>주문서 작성</Title>
        <Hr />
        {selectedFundings.map((funding) => (
          <OrderProduct key={funding.productId} product={funding} />
        ))}
        <Hr />
        <OrderedListContainer>
          <ListItem>주문자 정보</ListItem>
          <Label>주문자명</Label>
          <Input type="text" name="ordererName" value={formData.ordererName} onChange={handleChange} />
          {errors.ordererName && <Error>{errors.ordererName}</Error>}
          <Label>연락처</Label>
          <Input type="text" name="ordererPhoneNumber" value={formData.ordererPhoneNumber} onChange={handleChange} />
          {errors.ordererPhoneNumber && <Error>{errors.ordererPhoneNumber}</Error>}
          <Label>메모</Label>
          <Input type="text" name="ordererMemo" value={formData.ordererMemo} onChange={handleChange} />
          <ListItemContainer>
            <ListItem>배송 정보</ListItem>
            <ChangeAddressButton onClick={handleAddressChange}>배송지 변경</ChangeAddressButton>
          </ListItemContainer>
          
          <OrderCreateDeliveryAddressTable
            deliveryInfo={formData}
            onMemoChange={(memo) => setFormData({ ...formData, deliveryMemo: memo })}
            editable={true}
          />
        </OrderedListContainer>
        
        <PurpleButton onClick={handleSubmit}>주문하기</PurpleButton>
      </ContentContainer>
    </AppContainer>
  );
}

export default OrderCreateProcess2;

const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 10px;
`;

const Error = styled.div`
  color: red;
  font-size: 12px;
  margin-top: -10px;
  margin-bottom: 10px;
`;
const ChangeAddressButton = styled.button`
  background-color: white;
  color: #4c3073;
  padding: 6px 12px;
  font-size: 12px;
  border: 1px solid #4c3073;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ListItemContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;