import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppContainer from "../../components/AppContainer";
import ContentContainer from "../../components/ContentContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import {
  Hr,
  Input,
  ListItem,
  OrderedListContainer,
  Title,
} from "../../components/Typography";
import styled from "styled-components";
import PurpleButton from "../../components/button/PurpleButton";
import OrderProduct from "../../components/orderManagement/OrderProduct";
import { createOrder } from "../../api/orderApi";


function OrderCreateProcess2() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedFundings = [] } = location.state || {};

  useEffect(() => {
    if (!location.state || !selectedFundings.length) {
      alert("잘못된 접근입니다.");
      navigate("/"); //리다이렉트
    }
    console.log("selectedFundings:", selectedFundings);
  }, [location.state, selectedFundings, navigate]);

  const [formData, setFormData] = useState({
    fundingIds: selectedFundings.map((funding) => funding.fundingId),
    ordererName: "",
    ordererPhoneNumber: "",
    ordererMemo: "",
    receiverName: "",
    receiverPhoneNumber: "",
    deliveryName: "",
    zipcode: "",
    address: "",
    detailAddress: "",
    deliveryMemo: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.ordererName) {
      newErrors.ordererName = "주문자명을 입력해주세요.";
    }

    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(formData.ordererPhoneNumber)) {
      newErrors.ordererPhoneNumber = "010-1234-5678 형식으로 입력해주세요.";
    }

    if (!formData.receiverName) {
      newErrors.receiverName = "수취인명을 입력해주세요.";
    }

    if (!phoneRegex.test(formData.receiverPhoneNumber)) {
      newErrors.receiverPhoneNumber = "010-1234-5678 형식으로 입력해주세요.";
    }

    if (!formData.deliveryName) {
      newErrors.deliveryName = "배송지 별칭을 입력해주세요.";
    }

    if (!formData.address) {
      newErrors.address = "주소를 입력해주세요.";
    }

    if (!formData.detailAddress) {
      newErrors.detailAddress = "상세주소를 입력해주세요.";
    }

    if (!/^\d{5}$/.test(formData.zipcode)) {
      newErrors.zipcode = "우편번호를 5자리로 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async () => {
  //   if (!validateForm()) {
  //     return;
  //   }

  //   try {
  //     const response = createOrder(formData);

  //     console.log("주문정보:" + response.status);
  //     if (response.status === 201) {
  //       alert("주문이 완료되었습니다.");
  //       navigate("/orders");
  //     } else if (response.status === 403) {
  //       alert("주문 권한이 없습니다.");
  //     } else {
  //       alert("주문이 실패했습니다. " + response);
  //     }
  //   } catch (error) {
  //     console.error("주문 생성 중 오류 발생: ", error);
  //     alert("주문 생성 중 오류가 발생했습니다.");
  //   }
  // };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    createOrder(formData)
      .then((data) => {
        // console.log("주문 생성 응답 데이터:", data);
        alert("주문이 완료되었습니다.");
        navigate("/orders");
      })
      .catch((error) => {
        if (error.response) {
          if (error.status === 403) {
            alert("주문 권한이 없습니다.");
          } else {
            alert("주문이 실패했습니다. " + error.response.data.message);
          }
        }
      });
  };

  const mockData = {
    ordererName: "홍길동",
    ordererPhoneNumber: "010-1234-5678",
    ordererMemo: "빠른 배송 부탁드립니다.",
    receiverName: "홍길동",
    receiverPhoneNumber: "010-1234-5678",
    deliveryName: "우리집",
    zipcode: "12345",
    address: "서울특별시 강남구 테헤란로 123",
    detailAddress: "아파트 101동 202호",
    deliveryMemo: "부재 시 경비실에 맡겨주세요.",
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
          <Input
            type="text"
            name="ordererName"
            placeholder={mockData.ordererName}
            value={formData.ordererName}
            onChange={handleChange}
          />
          {errors.ordererName && <Error>{errors.ordererName}</Error>}
          <Label>연락처</Label>
          <Input
            type="text"
            name="ordererPhoneNumber"
            placeholder={mockData.ordererPhoneNumber}
            value={formData.ordererPhoneNumber}
            onChange={handleChange}
          />
          {errors.ordererPhoneNumber && (
            <Error>{errors.ordererPhoneNumber}</Error>
          )}
          <Label>메모</Label>
          <Input
            type="text"
            name="ordererMemo"
            placeholder={mockData.ordererMemo}
            value={formData.ordererMemo}
            onChange={handleChange}
          />
          <ListItem>배송 정보</ListItem>
          <Label>수취인명</Label>
          <Input
            type="text"
            name="receiverName"
            placeholder={mockData.receiverName}
            value={formData.receiverName}
            onChange={handleChange}
          />
          {errors.receiverName && <Error>{errors.receiverName}</Error>}
          <Label>연락처</Label>
          <Input
            type="text"
            name="receiverPhoneNumber"
            placeholder={mockData.receiverPhoneNumber}
            value={formData.receiverPhoneNumber}
            onChange={handleChange}
          />
          {errors.receiverPhoneNumber && (
            <Error>{errors.receiverPhoneNumber}</Error>
          )}
          <Label>배송지 별칭</Label>
          <Input
            type="text"
            name="deliveryName"
            placeholder={mockData.deliveryName}
            value={formData.deliveryName}
            onChange={handleChange}
          />
          {errors.deliveryName && <Error>{errors.deliveryName}</Error>}
          <Label>주소</Label>
          <Input
            type="text"
            name="address"
            placeholder={mockData.address}
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <Error>{errors.address}</Error>}
          <Label>상세주소</Label>
          <Input
            type="text"
            name="detailAddress"
            placeholder={mockData.detailAddress}
            value={formData.detailAddress}
            onChange={handleChange}
          />
          {errors.detailAddress && <Error>{errors.detailAddress}</Error>}
          <Label>우편번호</Label>
          <Input
            type="text"
            name="zipcode"
            placeholder={mockData.zipcode}
            value={formData.zipcode}
            onChange={handleChange}
          />
          {errors.zipcode && <Error>{errors.zipcode}</Error>}
          <Label>배송 메모</Label>
          <Input
            type="text"
            name="deliveryMemo"
            placeholder={mockData.deliveryMemo}
            value={formData.deliveryMemo}
            onChange={handleChange}
          />
        </OrderedListContainer>
        <PurpleButton onClick={handleSubmit}>주문하기</PurpleButton>
      </ContentContainer>
    </AppContainer>
  );
}

export default OrderCreateProcess2;

// Label
const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 10px;
`;

// Error 메시지 스타일
const Error = styled.div`
  color: red;
  font-size: 12px;
  margin-top: -10px;
  margin-bottom: 10px;
`;
