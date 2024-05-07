import AppContainer from "../../components/AppContainer";
import NavigationBar from "../../components/Nav/NavigationBar";
import ContentContainer from "../../components/ContentContainer";
import { Title, Subtitle } from "../../components/Typography";
import PurpleButton from "../../components/button/PurpleButton";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import InvitationCardComponent from "../../components/invitation/InvitationCard";
import { useNavigate } from "react-router-dom";
const SelectBar = styled.div`
  width: 100%;
  height: 48px;
  background-color: #d9d9d9;
  display: flex;
  overflow-x: hidden; /* 스크롤바를 숨김 */
  overflow-y: hidden; /* 스크롤바를 숨김 */
  scroll-behavior: smooth; /* 부드러운 스크롤링 */
  cursor: grab; /* 드래그 가능하다는 것을 보여주는 커서 */
  margin-bottom: 16px;
`;

const ImageButton = styled.button`
  flex: 0 0 auto; /* 가변적인 크기 조정 */
  margin: 4px; /* 버튼 간의 간격 */
  width: 48px;
  height: 40px;
  background-size: cover; /* 이미지가 버튼에 꽉 차도록 함 */
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
function InvitationCreate() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const selectBarRef = useRef(null);
  let isMouseDown = false;
  let startX, scrollLeft;
  const navigate = useNavigate();

  useEffect(() => {
    // 서버로부터 이미지 데이터를 가져오는 코드
    // 예시 데이터로 간단한 URL 배열을 사용합니다.
    const fetchData = async () => {
      const imagedatas = [
        { id: 1, url: "https://via.placeholder.com/48" },
        { id: 2, url: "https://via.placeholder.com/84" },
        { id: 3, url: "https://via.placeholder.com/48" },
        { id: 4, url: "https://via.placeholder.com/48" },
        { id: 5, url: "https://via.placeholder.com/48" },
        { id: 6, url: "https://via.placeholder.com/48" },
        { id: 7, url: "https://via.placeholder.com/48" },
        // 필요한 만큼 이미지 URL 추가
      ];
      setImages(imagedatas);
    };

    fetchData();
  }, []);

  const handleImageButtonClick = (id, url) => {
    setSelectedImage({ id, url }); // 선택된 이미지 URL을 상태에 저장
  };

  const handleMouseDown = (e) => {
    isMouseDown = true;
    selectBarRef.current.style.cursor = "grabbing";
    startX = e.pageX - selectBarRef.current.offsetLeft;
    scrollLeft = selectBarRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isMouseDown = false;
    selectBarRef.current.style.cursor = "grab";
  };

  const handleMouseUp = () => {
    isMouseDown = false;
    selectBarRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - selectBarRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 스크롤 속도 조정
    selectBarRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleNextClick = () => {
    if (selectedImage) {
      navigate("/invitations/create-process2", { state: { selectedImage } });
    } else {
      alert("이미지를 선택해 주세요.");
    }
  };
  return (
    <AppContainer>
      <NavigationBar />
      <ContentContainer>
        <Title>청첩장 만들기</Title>
        <Subtitle>카드 이미지를 선택합니다.</Subtitle>
        <SelectBar
          ref={selectBarRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {images.map(({ id, url }) => (
            <ImageButton
              key={id}
              style={{ backgroundImage: `url(${url})` }}
              onClick={() => handleImageButtonClick(id, url)}
            />
          ))}
        </SelectBar>
        <InvitationCardComponent
          src={selectedImage ? selectedImage.url : null}
        ></InvitationCardComponent>
        <PurpleButton onClick={handleNextClick}>다음</PurpleButton>
      </ContentContainer>
    </AppContainer>
  );
}

export default InvitationCreate;
