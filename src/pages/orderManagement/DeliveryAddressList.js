import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDeliveryAddressList } from '../../api/deliveryAddressApi';
import AppContainer from '../../components/AppContainer';
import NavigationBar from '../../components/Nav/NavigationBar';
import ContentContainer from '../../components/ContentContainer';
import { Title } from '../../components/Typography';
import { ButtonWrapper } from '../../components/button/ButtonWrapper';
import PurpleButton from '../../components/button/PurpleButton';
import WhiteButton from '../../components/button/WhiteButton';
import styled from 'styled-components';

const DeliveryAddressList = () => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getDeliveryAddressList().then((data) => {
            setAddresses(data);
            const defaultAddress = data.find((address) => address.isDefault);
            if (defaultAddress) {
                setSelectedAddressId(defaultAddress.id);
            }
        }).catch((error) => {
            console.error("Error fetching delivery addresses:", error);
        });  
    }, []);

    const handleSelectAddress = (id) => {
        setSelectedAddressId(id);
    };

    const handleAddAddress = () => {
        navigate('/delivery-addresses/create');
    };

    return (
        <AppContainer>
            <NavigationBar />
            <ContentContainer>
                <Title>배송지 목록</Title>
                <WhiteButton onClick={handleAddAddress}>배송지 추가하기</WhiteButton>
                <AddressList>
                    {addresses.map((address) => (
                        <AddressItem 
                            key={address.id} 
                            isSelected={selectedAddressId === address.id}
                        >
                            <RadioButton 
                                type="radio" 
                                checked={selectedAddressId === address.id} 
                                onChange={() => handleSelectAddress(address.id)} 
                            />
                            <AddressInfo isSelected={selectedAddressId === address.id}>
                                <AddressName>
                                    {address.receiverName} 
                                    {address.isDefault && <DefaultBadge>기본배송지</DefaultBadge>}
                                </AddressName>
                                <AddressDetails>
                                    {address.address} {address.detailAddress} ({address.zipCode})
                                </AddressDetails>
                                <PhoneNumber>{address.receiverPhoneNumber}</PhoneNumber>
                            </AddressInfo>
                        </AddressItem>
                    ))}
                </AddressList>
                <ButtonWrapper>
                    <PurpleButton>변경하기</PurpleButton>
                </ButtonWrapper>
            </ContentContainer>
        </AppContainer>
    );
};

export default DeliveryAddressList;

// 스타일 컴포넌트
const AddressList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const AddressItem = styled.li`
    display: flex;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #ddd;
    opacity: ${({ isSelected }) => (isSelected ? '1' : '0.6')}; // 선택되지 않은 항목의 투명도 감소
`;

const RadioButton = styled.input.attrs({ type: 'radio' })`
    margin-right: 15px;
    cursor: pointer;
`;

const AddressInfo = styled.div`
    display: flex;
    flex-direction: column;
    color: ${({ isSelected }) => (isSelected ? '#000' : '#888')}; // 선택되지 않은 항목의 텍스트 색상 연하게 설정
`;

const AddressName = styled.div`
    font-weight: bold;
    display: flex;
    align-items: center;
`;

const DefaultBadge = styled.span`
    background-color: #6200ea;
    color: white;
    padding: 2px 4px;
    border-radius: 4px;
    font-size: 12px;
    margin-left: 8px;
`;

const AddressDetails = styled.div`
    margin-top: 4px;
    font-size: 14px;
`;

const PhoneNumber = styled.div`
    font-size: 14px;
    margin-top: 4px;
`;
