import styled from "styled-components";

// 그림자 표시 여부를 prop으로 받아 처리
const StyledButton = styled.button`
  color: #4c3073;
  background-color: white;
  width: 100%;
  height: 56px;
  border: 1px solid #4c3073;
  border-radius: 12px;
  box-shadow: ${({ shadow }) => (shadow ? "#d9d9d9 0 4px 4px" : "none")};
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  font-family: "Pretendard";
  margin-bottom: 10px;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ shadow }) => (shadow ? "#d9d9d9 0 5px 5px" : "none")};
  }
`;

const ButtonWrapper = styled.div`
  padding-top: 0px;
  padding-bottom: 0px;
`;

// shadow prop을 통해 그림자 표시 여부를 조절할 수 있게 함
function WhiteButton({ children, onClick, shadow = true }) {
  return (
    <ButtonWrapper>
      <StyledButton onClick={onClick} shadow={shadow}>{children}</StyledButton>
    </ButtonWrapper>
  );
}

export default WhiteButton;
