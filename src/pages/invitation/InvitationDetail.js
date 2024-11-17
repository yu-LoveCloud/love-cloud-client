import { useNavigate, useParams } from "react-router-dom";
import AppContainer from "../../components/AppContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import ContentContainer from "../../components/ContentContainer";
import WhiteButton from "../../components/button/WhiteButton";
import PurpleButton from "../../components/button/PurpleButton";
import InvitationCardComponent from "../../components/invitation/InvitationCard";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getInvitation } from "../../api/invitationApi";
import { IMAGE_PREFIX } from "../../constants/global";

function InvitationDetail() {
  const { id } = useParams();
  const [invitation, setInvitation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getInvitation(id)
      .then((data) => {
        setInvitation(data);
      })
      .catch((error) => {
        console.error("Error fetching invitation:", error);
      });
  }, [id]);

  const handleShareClick = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("URL이 클립보드에 복사되었습니다.");
      })
      .catch((error) => {
        console.error("클립보드 복사 실패:", error);
      });
  };

  const handleFundingClick = () => {
    navigate(`/couples/${invitation.coupleId}/fundings`);
  };

  return (
    <AppContainer>
      <NavigationBar />
      <ContentContainer>
        {invitation ? (
          <>
            <InvitationCardComponent
              src={`${IMAGE_PREFIX}${invitation.invitationImageName}`}
            />
            <InvitationInfoWrapper>
              <CoupleName>
                {invitation.groomName} - {invitation.brideName}
              </CoupleName>

              <Details>{invitation.weddingPlace}</Details>
              <Details>{invitation.weddingDateTime}</Details>
              <Content>{invitation.content}</Content>
            </InvitationInfoWrapper>
            <ButtonContainer>
              <WhiteButton onClick={handleShareClick}>공유하기</WhiteButton>
              <PurpleButton onClick={handleFundingClick}>펀딩하기</PurpleButton>
            </ButtonContainer>
          </>
        ) : (
          <h2>존재하지 않는 페이지입니다.</h2>
        )}
      </ContentContainer>
    </AppContainer>
  );
}
const InvitationInfoWrapper = styled.div`
  padding-top: 70px;
  padding-bottom: 70px;
`;
const CoupleName = styled.h1`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
`;

const Details = styled.p`
  font-size: 14px;
  text-align: center;
  letter-spacing: -0.5%;
`;

const Content = styled.p`
  font-size: 14px;
  text-align: center;
  color: #767676;
  margin-top: 70px;
  line-height: 30px;
`;

const ButtonContainer = styled.div`
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

export default InvitationDetail;
