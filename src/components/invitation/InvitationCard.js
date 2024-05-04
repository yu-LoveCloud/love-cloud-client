import styled from "styled-components";

const InvitationCard = styled.div`
  width: 100%;
  height: 428px;
  border-radius: 12px;
  box-shadow: 0 16px 24px 0 rgba(180, 154, 217, 0.1);
  margin-bottom: 24px;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지를 컨테이너에 맞추어 꽉 채우기 */
  border-radius: 12px;
`;

const PopUp = styled.div`
  width: calc(
    300px - 16px * 2 - 8px * 2
  ); /* InvitationCard의 가로 길이에서 내부 패딩을 뺀 값 */
  height: calc(92px - 16px * 2);
  background-color: rgba(242, 242, 242, 0.4); /* 투명한 흰색 배경 */

  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
  position: absolute; /* InvitationCard의 하단에 위치시키기 위해 필요 */
  bottom: 16px; /* 카드의 하단에서 16px 떨어진 위치 */
  left: 50%; /* 수평 중앙 정렬 */
  transform: translateX(-50%); /* 중앙 정렬을 위한 수평 이동 */
  border-radius: 12px; /* 팝업의 모서리를 둥글게 만듦 */
  padding: 8px; /* 내부 패딩 */
  text-align: center; /* 텍스트 가운데 정렬 */
  backdrop-filter: blur(10px); /* 배경 블러 처리 */
  -webkit-backdrop-filter: blur(10px); /* 사파리 브라우저 호환성 */

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditButton = styled.button`
  width: 78px;
  height: 32px;
  background-color: white;
  color: #4c3073;
  border: none;
  border-radius: 1000px;
  font-size: 14px;
  cursor: pointer;
  font-family: "Pretendard-Light";
`;

const TextWrapper = styled.div`
  padding: 15px 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Pretendard";
  font-size: 14px;
  color: #767676;
  letter-spacing: calc(16px * -0.025);
`;
export default function InvitationCardComponent({ src, popUp = false }) {
  return (
    <InvitationCard>
      <Image src={src} alt="Invitation Card Image" />
      {popUp && (
        <PopUp>
          <TextWrapper>최종 수정 날짜: 00.02.21</TextWrapper>
          <EditButton>편집</EditButton>
        </PopUp>
      )}
    </InvitationCard>
  );
}
