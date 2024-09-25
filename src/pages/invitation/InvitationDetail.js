import { useParams } from "react-router-dom";
import AppContainer from "../../components/AppContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import ContentContainer from "../../components/ContentContainer";
import { Title } from "../../components/Typography";
import WhiteButton from "../../components/button/WhiteButton";
import PurpleButton from "../../components/button/PurpleButton";
import InvitationCardComponent from "../../components/invitation/InvitationCard";
import styled from "styled-components";

function InvitationDetail() {
  const { id } = useParams();
  // const { data } = useQuery(["invitation", id], () => apiClient.get(`/invitations/${id}`));
  const data = {
    invitation: {
      invitationId: 0,
      coupleId: 0,
      groomName: "문동은",
      brideName: "박연진",
      weddingDateTime: "2024-01-01 12:00:00",
      weddingPlace: "서울시 강남구 삼성동 123-456",
      content:
        "안녕하세요. 문동은입니다. 잘 부탁드립니다. 감사합니다. 안녕하세요. 문동은입니다. 잘 부탁드립니다. 감사합니다. 안녕하세요. 문동은입니다. 잘 부탁드립니다. 감사합니다. 안녕하세요. 문동은입니다. 잘 부탁드립니다. 감사합니다.",
      invitationImageName:
        "https://d2v80xjmx68n4w.cloudfront.net/gigs/rate/AwJVF1609941206.jpg",
    },
  };
  return (
    <AppContainer>
      <NavigationBar />
      <ContentContainer>
        <InvitationCardComponent src={data.invitation.invitationImageName} />
        <InvitationInfoWrapper>
          <CoupleName>
            {data.invitation.groomName} - {data.invitation.brideName}
          </CoupleName>

          <Details>{data.invitation.weddingPlace}</Details>
          <Details>{data.invitation.weddingDateTime}</Details>
          <Content>{data.invitation.content}</Content>
        </InvitationInfoWrapper>
        <ButtonContainer>
          <WhiteButton>공유하기</WhiteButton>
          <PurpleButton>펀딩하기</PurpleButton>
        </ButtonContainer>
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
