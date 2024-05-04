import AppContainer from "../../components/AppContainer";
import ContentContainer from "../../components/ContentContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import { Subtitle, Title } from "../../components/Typography";
import InvitationCard from "../../components/invitation/InvitationCard";
import PurpleButton from "../../components/button/PurpleButton";

function InvitationDashboard() {
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
            "https://d2v80xjmx68n4w.cloudfront.net/gigs/rate/AwJVF1609941206.jpg"
          }
          popUp={true}
        ></InvitationCard>
        <PurpleButton>청첩장 생성하기</PurpleButton>
      </ContentContainer>
    </AppContainer>
  );
}

export default InvitationDashboard;
