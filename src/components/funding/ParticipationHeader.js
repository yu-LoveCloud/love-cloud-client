import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 12px;
    color: #666;
    margin-bottom: 8px;
`;

const statusLabels = {
    PENDING: '결제 대기 중',
    COMPLETED: '참여 완료',
    FAILED: '참여 실패',
    CANCELLED: '참여 취소',
    UNKNOWN: '알 수 없음',
};

const FundingInfo = styled.div`
    font-size: 12px;
    font-family: 'Pretendard';
    color: #666;
`;

const ParticipationHeader = ({ paidAt, status }) => {
    return (
        <HeaderContainer>
            <FundingInfo>{new Date(paidAt).toLocaleDateString()}</FundingInfo>
            <FundingInfo>{statusLabels[status]}</FundingInfo>
        </HeaderContainer>
    );
};

export default ParticipationHeader;
