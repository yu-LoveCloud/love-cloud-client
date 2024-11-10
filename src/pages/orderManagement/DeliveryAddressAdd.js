import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/Nav/NavigationBar';
import ContentContainer from '../../components/ContentContainer';
import { ButtonWrapper } from '../../components/button/ButtonWrapper';
import PurpleButton from '../../components/button/PurpleButton';
import { Title, Input, SectionTitle, Hr } from '../../components/Typography';
import AppContainer from '../../components/AppContainer';
import styled from 'styled-components';
import { createDeliveryAddress } from '../../api/deliveryAddressApi';

const DeliveryAddressAdd = () => {
    const [address, setAddress] = useState({
        deliveryName: '',
        zipCode: '',
        address: '',
        detailAddress: '',
        deliveryMemo: '',
        receiverName: '',
        receiverPhoneNumber: '',
        isDefault: false,
    });

    const detailAddressRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleComplete = (data) => {
        let addr = '';
        let extraAddr = '';

        if (data.userSelectedType === 'R') {
            addr = data.roadAddress;
        } else {
            addr = data.jibunAddress;
        }

        if (data.userSelectedType === 'R') {
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                extraAddr += data.bname;
            }
            if (data.buildingName !== '' && data.apartment === 'Y') {
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            if (extraAddr !== '') {
                extraAddr = ' (' + extraAddr + ')';
            }
        }

        setAddress((prev) => ({
            ...prev,
            zipCode: data.zonecode,
            address: addr,
            extraAddress: extraAddr,
        }));

        if (detailAddressRef.current) {
            detailAddressRef.current.focus();
        }
    };

    const handleSearch = () => {
        new window.daum.Postcode({
            oncomplete: handleComplete,
        }).open();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = () => {
        setAddress((prev) => ({
            ...prev,
            isDefault: !prev.isDefault,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 필수 입력값 검증
        if (!address.deliveryName || !address.zipCode || !address.address || !address.detailAddress || !address.receiverName || !address.receiverPhoneNumber) {
            alert('모든 필수 항목을 입력해 주세요.');
            return;
        }

        // 주소 생성 API 호출
        createDeliveryAddress(address).then(() => {
            navigate('/delivery-addresses');
        }).catch((error) => {
            console.error('Error creating delivery-address:', error);
        });
    };

    return (
        <AppContainer>
            <NavigationBar />
            <ContentContainer>
                <Title>배송지 추가</Title>
                <Hr />
                <Form onSubmit={handleSubmit}>
                    <SectionTitle>배송지 정보</SectionTitle>
                    <InputGroup>
                        <Label>배송지 별칭</Label>
                        <Input
                            type="text"
                            name="deliveryName"
                            value={address.deliveryName}
                            onChange={handleChange}
                            placeholder="예) 집, 회사"
                            required
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label>우편번호</Label>
                        <InputWrapper>
                            <Input
                                type="text"
                                name="zipCode"
                                value={address.zipCode}
                                placeholder="우편번호"
                                readOnly
                            />
                            <Button type="button" onClick={handleSearch}>
                                우편번호 찾기
                            </Button>
                        </InputWrapper>
                    </InputGroup>
                    <InputGroup>
                        <Label>주소</Label>
                        <Input
                            type="text"
                            name="address"
                            value={address.address}
                            placeholder="주소"
                            readOnly
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label>상세주소</Label>
                        <Input
                            type="text"
                            name="detailAddress"
                            value={address.detailAddress}
                            onChange={handleChange}
                            placeholder="상세주소"
                            ref={detailAddressRef}
                            required
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label>배송 메모</Label>
                        <TextArea
                            name="deliveryMemo"
                            value={address.deliveryMemo}
                            onChange={handleChange}
                            placeholder="예) 부재 시 경비실에 맡겨주세요."
                        />
                    </InputGroup>
                    <SectionTitle>수취인 정보</SectionTitle>
                    <InputGroup>
                        <Label>수취인명</Label>
                        <Input
                            type="text"
                            name="receiverName"
                            value={address.receiverName}
                            onChange={handleChange}
                            placeholder="예) 홍길동"
                            required
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label>연락처</Label>
                        <Input
                            type="text"
                            name="receiverPhoneNumber"
                            value={address.receiverPhoneNumber}
                            onChange={handleChange}
                            placeholder="010-1234-5678"
                            required
                        />
                    </InputGroup>
                    <InputGroup>
                        <CheckboxLabel>
                            <Checkbox
                                type="checkbox"
                                name="isDefault"
                                checked={address.isDefault}
                                onChange={handleCheckboxChange}
                            />
                            기본 배송지로 설정
                        </CheckboxLabel>
                    </InputGroup>
                    <ButtonWrapper>
                        <PurpleButton type="submit">주소 추가</PurpleButton>
                    </ButtonWrapper>
                </Form>
            </ContentContainer>
        </AppContainer>
    );
};

export default DeliveryAddressAdd;

// 스타일 컴포넌트
const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-bottom: 60px;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    font-size: 14px;
    color: #767676;
    margin-bottom: 4px;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Button = styled.button`
    padding: 8px 12px;
    background-color: #4c3073;
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-size: 12px;
    &:hover {
        background-color: #3b255b;
    }
`;

const CheckboxLabel = styled(Label)`
    display: flex;
    align-items: center;
`;

const Checkbox = styled.input`
    margin-right: 8px;
`;

const TextArea = styled(Input).attrs({ as: "textarea" })`
    height: 80px;
    resize: none;
    padding: 12px;
    font-size: 12px;
    margin-top: 4px;
    `