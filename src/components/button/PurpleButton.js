import styled from "styled-components";

// 스타일드 컴포넌트 이름을 변경
const StyledButton = styled.button`
  background-color: #4c3073;
  width: 100%;
  height: 56px;
  border: 0px;
  border-radius: 12px;
  box-shadow: #d9d9d9 0 4px 4px;
  color: white; /* 글자 색상 설정 */
  font-size: 16px; /* 글자 크기 설정 */
  text-align: center;
  cursor: pointer; /* 커서 설정 */
  font-family: "Pretendard";
  margin-bottom: 10px;
  transition: transform 0.3s, box-shadow 0.3s; /* 애니메이션 적용 */

  &:hover {
    transform: translateY(-1px); /* 살짝 위로 이동 */
    box-shadow: #d9d9d9 0 5px 5px; /* 그림자 변경 */
  }
`;

// React 컴포넌트에서 스타일드 컴포넌트를 사용
function PurpleButton({ children, onClick }) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

export default PurpleButton;
