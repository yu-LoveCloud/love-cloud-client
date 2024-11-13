import AppContainer from "../../components/AppContainer";
import ContentContainer from "../../components/ContentContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import { Subtitle, Title } from "../../components/Typography";
import InvitationCard from "../../components/invitation/InvitationCard";
import PurpleButton from "../../components/button/PurpleButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyInvitation } from "../../api/invitationApi";
import { IMAGE_PREFIX } from "../../constants/global";
import WhiteButton from "../../components/button/WhiteButton";

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

  return (
    <AppContainer>
      <NavigationBar />
      <ContentContainer>
        <Title>내 청첩장</Title>
        <Subtitle>
          새로운 모바일 청첩장을 생성하거나 내 청첩장을 편집할 수 있습니다.
        </Subtitle>
        <InvitationCard
          src={
            invitation
              ? `${IMAGE_PREFIX}${invitation.invitationImageName}`
              : null
          }
          popUp={false}
        ></InvitationCard>

        {invitation && <WhiteButton>청첩장 삭제하기</WhiteButton>}

        {invitation ? (
          <PurpleButton
            onClick={() => navigate(`/invitations/${invitation.invitationId}`)}
          >
            청첩장 편집하기
          </PurpleButton>
        ) : (
          <PurpleButton onClick={handleCreateInvitation}>
            청첩장 생성하기
          </PurpleButton>
        )}
      </ContentContainer>
    </AppContainer>
  );
}

export default InvitationDashboard;
