import React from 'react';
import styled from 'styled-components';

const RecipientCardComponent = ({ people }) => {
    
    const formatPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    };

    return (
        <RecipientCard>
            <Person>
                <RecipientRole>신부</RecipientRole>
                <RecipientInfo>
                    <div>{people.find(person => person.weddingRole === 'BRIDE').name}</div>
                    <div>{formatPhoneNumber(people.find(person => person.weddingRole === 'BRIDE').phoneNumber)}</div>
                </RecipientInfo>
            </Person>
            <Divider />
            <Person>
                <RecipientRole>신랑</RecipientRole>
                <RecipientInfo>
                    <div>{people.find(person => person.weddingRole === 'GROOM').name}</div>
                    <div>{formatPhoneNumber(people.find(person => person.weddingRole === 'GROOM').phoneNumber)}</div>
                </RecipientInfo>
            </Person>
        </RecipientCard>
    );
};

export default RecipientCardComponent;

const RecipientCard = styled.div`
    padding: 3px 20px;
    background-color: #D9D9D9;
    border-radius: 12px;
`;

const Person = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
`;

const RecipientRole = styled.div`
    font-family: "Pretendard";
    font-size: 14px;
    color: #767676;
`;

const RecipientInfo = styled.div`
    text-align: right;
    font-size: 14px;
    font-family: "Pretendard";
    margin-top: 15px;
    & > div {
        margin-bottom: 3px;
    }
`;

const Divider = styled.div`
    height: 1px;
    background-color: #767676;
    margin: 5px 0;
`;