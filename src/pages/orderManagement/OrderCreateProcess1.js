import { getFundingList } from "../../api/fundingApi";
import { getItem } from "../../api/productApi";
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

  useEffect(() => {
    const fetchFundings = async () => {
      try {
        // 1. getFundingList를 호출하여 펀딩 리스트를 가져옵니다.
        const fundingsList = await getFundingList();

        if (Array.isArray(fundingsList)) {
          // 2. fundingsList에서 COMPLETED 상태인 펀딩만 필터링합니다.
          const completedFundings = fundingsList.filter(
            (funding) => funding.status === "COMPLETED"
          );

          // 3. 각 펀딩에 대해 items/productOptionsId를 호출하여 상품 정보를 가져옵니다.
          const fundingDetails = await Promise.all(
            completedFundings.map(async (funding) => {
              const productOptionsId = funding.productOptions.productOptionsId;
              const productData = await getItem(productOptionsId);

              // 4. 새로운 객체를 생성합니다.
              return {
                fundingId: funding.fundingId,
                productName: productData.productName,
                productId: productData.productId,
                fundingTitle: funding.title,
                modelName: productData.selectedOption.modelName,
                price: productData.selectedOption.price,
                mainImages: funding.productOptions.mainImages,
              };
            })
          );

          // 5. 결과를 상태로 설정합니다.
          setFundings(fundingDetails);

          // 최종 결과 확인
          console.log("fundingDetails:", fundingDetails);
        } else {
          setError("펀딩 정보를 가져오는데 실패했습니다.");
        }
      } catch (error) {
        setError(`펀딩 정보를 가져오는데 실패했습니다.: ${error.message}`);
        console.error("Error fetching fundings:", error);
      }
    };

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
