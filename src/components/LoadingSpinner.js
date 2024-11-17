import styled, { keyframes } from "styled-components";

const LoadingSpinner = () => (
  <Overlay>
    <SpinnerContainer>
      <Spinner />
      <Message>응답을 기다리는 중입니다. 블록체인 연동 과정으로 인해 5초 이상 대기시간이 걸릴 수 있습니다.</Message>
    </SpinnerContainer>
  </Overlay>
);

export default LoadingSpinner;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px); /* Background blur effect */
  z-index: 1000; /* Ensure it overlays on top */
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 300px;
  text-align: center;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 16px;
`;

const Message = styled.p`
  font-size: 14px;
  color: #333;
  line-height: 1.4;
`;
