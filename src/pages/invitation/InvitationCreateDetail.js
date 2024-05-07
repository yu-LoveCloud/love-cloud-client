import { useLocation, useNavigate } from "react-router-dom";
import AppContainer from "../../components/AppContainer";
import ContentContainer from "../../components/ContentContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import {
  Title,
  Subtitle,
  OrderedListContainer,
  ListItem,
  Input,
  TextArea,
} from "../../components/Typography";
import { useEffect, useState } from "react";
import PurpleButton from "../../components/button/PurpleButton";

function InvitationCreateDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedImage } = location.state || {};
  const [weddingDateTime, setWeddingDateTime] = useState("");
  const [place, setPlace] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    if (!selectedImage) {
      alert("잘못된 접근입니다.");
      navigate("/");
    }
  }, [selectedImage, navigate]);

  const handleCreateInvitation = () => {
    if (!weddingDateTime || !place || !content) {
      alert("모든 필드를 작성해주세요.");
      return;
    }

    /**
     * 여기서 청첩장을 생성하는 API를 호출합니다.
     * 작성자: 염동환
     *
     */
    alert("청첩장이 생성되었습니다.");
    navigate("/invitations");
  };
  return (
    <AppContainer>
      <NavigationBar />
      <ContentContainer>
        <Title>청첩장 생성</Title>
        <Subtitle>청첩장 내용을 입력해주세요.</Subtitle>
        <OrderedListContainer>
          <ListItem>결혼식 날짜 및 시간</ListItem>
          <Input
            type="datetime-local"
            value={weddingDateTime}
            onChange={(e) => setWeddingDateTime(e.target.value)}
            placeholder="결혼식 날짜와 시간을 입력해주세요."
          />
          <ListItem>식장 위치</ListItem>
          <Input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="결혼식 장소를 입력해주세요."
          />

          <ListItem>전할 말</ListItem>
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="전달할 말을 입력해주세요."
          ></TextArea>

          <PurpleButton onClick={handleCreateInvitation}>생성하기</PurpleButton>
        </OrderedListContainer>
      </ContentContainer>
    </AppContainer>
  );
}

export default InvitationCreateDetail;
