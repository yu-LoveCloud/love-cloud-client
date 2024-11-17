import React from "react";
import styled from "styled-components";

function OrderCreateDeliveryAddressTable({ deliveryInfo, onMemoChange, editable = false }) {

  return (
    <Table>
      <tbody>
        <tr>
          <TdLabel>배송지</TdLabel>
          <Td>{deliveryInfo.deliveryName}</Td>
        </tr>
        <tr>
          <TdLabel>받는 분</TdLabel>
          <Td>{deliveryInfo.receiverName}</Td>
        </tr>
        <tr>
          <TdLabel>연락처</TdLabel>
          <Td>{deliveryInfo.receiverPhoneNumber}</Td>
        </tr>
        <tr>
          <TdLabel>주소</TdLabel>
          <Td>
            {`${deliveryInfo.address}`}
            <br />
            {`${deliveryInfo.detailAddress} (${deliveryInfo.zipcode})`}
          </Td>
        </tr>
        <tr>
          <TdLabel>배송 요청사항</TdLabel>
          <Td>
            {editable ? (
              <Input
                type="text"
                value={deliveryInfo.deliveryMemo || ""}
                placeholder="배송 요청사항을 입력하세요"
                onChange={(e) => onMemoChange && onMemoChange(e.target.value)}
              />
            ) : (
              deliveryInfo.deliveryMemo || "없음"
            )}
          </Td>
        </tr>
      </tbody>
    </Table>
  );
}

export default OrderCreateDeliveryAddressTable;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  td,
  th {
    padding: 8px;
    border: none;
  }
  margin-top: 12px;
`;

const TdLabel = styled.td`
  font-size: 12px;
  font-weight: bold;
  color: #333;
  width: 30%;
`;

const Td = styled.td`
  font-size: 12px;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 4px;
  font-size: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #666;
  outline: none;
  &:focus {
    border-color: #4c3073;
  }
`;
