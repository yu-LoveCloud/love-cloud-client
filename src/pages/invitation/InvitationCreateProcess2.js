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
import { createInvitation } from "../../api/invitationApi";

function InvitationCreateProcess2() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedImage } = location.state || {};
  // const [weddingDateTime, setWeddingDateTime] = useState("");
  // const [place, setPlace] = useState("");
  // const [content, setContent] = useState("");
  const [formData, setFormData] = useState({
    invitationImageId: selectedImage.id,
    weddingDateTime: "",
    place: "",
    content: "",
  });

  useEffect(() => {
    if (!selectedImage) {
      alert("잘못된 접근입니다.");
      navigate("/invitations");
    }
  }, [selectedImage, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateInvitation = () => {
    if (!formData.weddingDateTime || !formData.place || !formData.content) {
      alert("모든 필드를 작성해주세요.");
      return;
    }

    createInvitation(formData)
      .then(() => {
        alert("청첩장이 생성되었습니다.");
        navigate("/invitations");
      })
      .catch((error) => {
        console.error("Error creating invitation:", error);
        alert("청첩장 생성에 실패했습니다.");
      });
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
            value={formData.weddingDateTime}
            name="weddingDateTime"
            onChange={handleChange}
            placeholder="결혼식 날짜와 시간을 입력해주세요."
          />
          <ListItem>식장 위치</ListItem>
          <Input
            type="text"
            value={formData.place}
            name="place"
            onChange={handleChange}
            placeholder="결혼식 장소를 입력해주세요."
          />

          <ListItem>전할 말</ListItem>
          <TextArea
            value={formData.content}
            name="content"
            onChange={handleChange}
            placeholder="전달할 말을 입력해주세요."
          ></TextArea>

          <PurpleButton onClick={handleCreateInvitation}>생성하기</PurpleButton>
        </OrderedListContainer>
      </ContentContainer>
    </AppContainer>
  );
}

export default InvitationCreateProcess2;
