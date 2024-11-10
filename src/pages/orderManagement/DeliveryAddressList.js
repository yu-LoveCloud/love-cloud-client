import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDeliveryAddressList, deleteDeliveryAddress } from '../../api/deliveryAddressApi';
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

    const handleEditAddress = (id) => {
        navigate(`/delivery-addresses/${id}`);
    };

    const handleDeleteAddress = (id) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            deleteDeliveryAddress(id).then(() => {
                setAddresses(addresses.filter((address) => address.id !== id));
            }).catch((error) => {
                console.error("Error deleting address:", error);
            });
        }
    };

    return (
        <AppContainer>
            <NavigationBar />
            <ContentContainer>
                <Title>배송지 목록</Title>
                <WhiteButton onClick={handleAddAddress} shadow={false}>배송지 추가하기</WhiteButton>
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
                                <PhoneNumber>
                                    {address.receiverPhoneNumber}
                                    <EditDeleteButtons>
                                        <EditButton onClick={() => handleEditAddress(address.id)}>수정</EditButton>
                                        <DeleteButton onClick={() => handleDeleteAddress(address.id)}>삭제</DeleteButton>
                                    </EditDeleteButtons>
                                </PhoneNumber>
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
    opacity: ${({ isSelected }) => (isSelected ? '1' : '0.6')}; 
`;

const RadioButton = styled.input.attrs({ type: 'radio' })`
    margin-right: 15px;
    cursor: pointer;
`;

const AddressInfo = styled.div`
    display: flex;
    flex-direction: column;
    color: ${({ isSelected }) => (isSelected ? '#000' : '#888')};
    width: 100%;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    
`;

const EditDeleteButtons = styled.div`
    display: flex;
    gap: 8px;
    margin-left: auto; // 우측 끝 정렬
`;

const EditButton = styled.button`
    background-color: white; // 흰색 배경
    color: #4c3073; // 텍스트 색상
    border: 1px solid #4c3073; // 테두리 색상
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
        background-color: #f7f4fc; // 배경색을 살짝 변경하여 호버 효과
    }
`;

const DeleteButton = styled.button`
    background-color: white; // 흰색 배경
    color: #d9534f; // 텍스트 색상
    border: 1px solid #d9534f; // 테두리 색상
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
        background-color: #fdecea; // 배경색을 살짝 변경하여 호버 효과
    }
`;

