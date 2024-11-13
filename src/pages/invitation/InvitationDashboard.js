import AppContainer from "../../components/AppContainer";
import ContentContainer from "../../components/ContentContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import { Subtitle, Title } from "../../components/Typography";
import PurpleButton from "../../components/button/PurpleButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteInvitation, getMyInvitation } from "../../api/invitationApi";
import { IMAGE_PREFIX } from "../../constants/global";
import WhiteButton from "../../components/button/WhiteButton";
import InvitationCardComponent from "../../components/invitation/InvitationCard";
import { ButtonWrapper } from "../../components/button/ButtonWrapper";

function InvitationDashboard() {
  const navigate = useNavigate();
  const [invitation, setInvitation] = useState(null);

  useEffect(() => {
    getMyInvitation()
      .then((data) => {
        setInvitation(data);
      })
      .catch((error) => {
        console.error("Error fetching my invitation:", error);
      });
  }, []);

  const handleCreateInvitation = () => {
    navigate("/invitations/create-process1"); // '/create' 경로로 이동
  };

  const handleDeleteInvitation = () => {
    deleteInvitation()
      .then(() => {
        setInvitation(null);
      })
      .catch((error) => {
        console.error("Error deleting invitation:", error);
      });
  };

  const handleCardClick = () => {
    if (invitation) {
      navigate(`/invitations/${invitation.invitationId}`);
    }
  };

  return (
    <AppContainer>
      <NavigationBar />
      <ContentContainer>
        <Title>내 청첩장</Title>
        <Subtitle>
          새로운 모바일 청첩장을 생성하거나 내 청첩장을 편집할 수 있습니다.
        </Subtitle>
        <InvitationCardComponent
          src={
            invitation
              ? `${IMAGE_PREFIX}${invitation.invitationImageName}`
              : null
          }
          popUp={false}
          onClick={handleCardClick}
        ></InvitationCardComponent>
        <ButtonWrapper>
          {invitation && (
            <WhiteButton onClick={handleDeleteInvitation}>
              청첩장 삭제하기
            </WhiteButton>
          )}

          {invitation ? (
            <PurpleButton
              onClick={() =>
                navigate(`/invitations/${invitation.invitationId}`)
              }
            >
              청첩장 편집하기
            </PurpleButton>
          ) : (
            <PurpleButton onClick={handleCreateInvitation}>
              청첩장 생성하기
            </PurpleButton>
          )}
        </ButtonWrapper>
      </ContentContainer>
    </AppContainer>
  );
}

export default InvitationDashboard;
