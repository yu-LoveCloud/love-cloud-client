import React from "react";
import styled from "styled-components";

function OrderDetailTable({ deliveryInfo }) {
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
            {`${deliveryInfo.receiverAddress}`}
            <br />
            {`
          ${deliveryInfo.receiverAddressDetail} (${deliveryInfo.receiverZipCode})`}
          </Td>
        </tr>
        <tr>
          <TdLabel>배송 요청사항</TdLabel>
          <Td>{deliveryInfo.deliveryMemo}</Td>
        </tr>
      </tbody>
    </Table>
  );
}

export default OrderDetailTable;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  td,
  th {
    padding: 8px;
    border: none; /* 테두리 제거 */
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
