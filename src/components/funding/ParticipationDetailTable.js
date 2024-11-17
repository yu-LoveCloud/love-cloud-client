// ParticipationDetailTable.js
import React from 'react';
import styled from 'styled-components';

function ParticipationDetailTable({ participation }) {
    return (
        <Table>
            <tbody>
                <tr>
                    <TdLabel>이름</TdLabel>
                    <Td>{participation.name}</Td>
                </tr>
                <tr>
                    <TdLabel>휴대폰 번호</TdLabel>
                    <Td>{participation.phoneNumber}</Td>
                </tr>
                <tr>
                    <TdLabel>이메일</TdLabel>
                    <Td>{participation.email}</Td>
                </tr>
                <tr>
                    <TdLabel>펀딩 금액</TdLabel>
                    <Td>{participation.amount.toLocaleString()}원</Td>
                </tr>
                <tr>
                    <TdLabel>응원 메시지</TdLabel>
                    <Td>{participation.message}</Td>
                </tr>
            </tbody>
        </Table>
    );
}

export default ParticipationDetailTable;

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
