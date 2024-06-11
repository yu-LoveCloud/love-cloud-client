import { getOrderableFundingList } from "../../api/fundingApi";
import AppContainer from "../../components/AppContainer";
import ContentContainer from "../../components/ContentContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import { Hr, Title } from "../../components/Typography";
import PurpleButton from "../../components/button/PurpleButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderProduct from "../../components/orderManagement/OrderProduct";
import styled from "styled-components";

function OrderCreateProcess1() {
  const [fundings, setFundings] = useState([]);
  const [selectedFundings, setSelectedFundings] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchFundings = async () => {
    try {
      // 1. getOrderableFundingList를 호출하여 펀딩 리스트를 가져옵니다.
      const data = await getOrderableFundingList();

      // 2. 펀딩 리스트를 가공합니다.
      const fundingList = data.map((funding) => {
        return {
          ...funding,
          mainImages: funding.mainImages.map((image) => image.imageName),
        };
      });

      // 3. 상태에 설정합니다.
      setFundings(fundingList);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError("권한이 없습니다.");
      } else {
        setError(`펀딩 정보를 가져오는데 실패했습니다.: ${error.message}`);
      }
      console.error("Error fetching fundings:", error);
    }
  };

  useEffect(() => {
    fetchFundings();
  }, []);

  const handleCheckboxChange = (funding) => {
    setSelectedFundings((prevSelectedFundings) => {
      if (prevSelectedFundings.includes(funding)) {
        return prevSelectedFundings.filter((item) => item !== funding);
      } else {
        return [...prevSelectedFundings, funding];
      }
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedFundings(fundings);
    } else {
      setSelectedFundings([]);
    }
  };

  const handleNextClick = () => {
    if (selectedFundings.length === 0) {
      alert("하나 이상의 펀딩을 선택해야 합니다.");
      return;
    }

    navigate("/orders/create-process2", {
      state: { selectedFundings },
    });
  };

  return (
    <AppContainer>
      <NavigationBar />
      <ContentContainer>
        <Title>주문 생성</Title>
        <SelectAllContainer>
          <input
            type="checkbox"
            onChange={handleSelectAll}
            checked={selectedFundings.length === fundings.length}
            disabled={fundings.length === 0}
          />
          <Label>전체 선택</Label>
        </SelectAllContainer>
        <Hr />
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : fundings.length === 0 ? (
          <NoFundingMessage>완료된 펀딩이 없습니다</NoFundingMessage>
        ) : (
          fundings.map((funding) => (
            <div key={funding.fundingId}>
              <FundingItem>
                <CheckboxContainer>
                  <input
                    type="checkbox"
                    checked={selectedFundings.includes(funding)}
                    onChange={() => handleCheckboxChange(funding)}
                  />
                </CheckboxContainer>
                <OrderProduct product={funding} />
              </FundingItem>
              <Hr />
            </div>
          ))
        )}
        <ButtonWrapper>
          <PurpleButton
            onClick={handleNextClick}
            disabled={selectedFundings.length === 0}
          >
            다음
          </PurpleButton>
        </ButtonWrapper>
      </ContentContainer>
    </AppContainer>
  );
}

export default OrderCreateProcess1;

const SelectAllContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  width: 10%;
`;

const FundingItem = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-size: 12px;
  color: #666;
`;

const ButtonWrapper = styled.div`
  padding-top: 0px;
  padding-bottom: 0px;
  position: absolute;
  bottom: 10px;
  width: calc(100% - 48px);
`;

const NoFundingMessage = styled.div`
  text-align: center;
  font-size: 14px;
  color: #666;
  margin: 20px 0;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 14px;
  color: red;
  margin: 20px 0;
`;
