import styled from "styled-components";

export const Title = styled.h1`
  font-size: 24px;
  font-family: "Pretendard";

  margin-top: 0;
  margin-bottom: 20px;
`;

export const Subtitle = styled.div`
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 20px;
  color: #767676;
  //자간 -2.5%
  letter-spacing: calc(16px * -0.025);
`;

export const Paragraph = styled.p`
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 20px;
`;

//OrderedList
export const OrderedListContainer = styled.ol`
  list-style: none;
  counter-reset: item;
  padding-left: 0;
`;

export const ListItem = styled.li`
  counter-increment: item;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-family: "Pretendard";
  font-size: 16px;
  color: #111111;
  letter-spacing: calc(16px * -0.01);

  &::before {
    content: counter(item);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: #4c3073;
    color: white;
    font-family: "Pretendard";
    font-size: 16px;

    margin-right: 10px;
  }

  /* 내용 스타일 */
  font-size: 16px;
`;

export const Input = styled.input`
  width: calc(100% - 24px);
  height: 36px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 12px;
  margin-bottom: 16px;
  color: #898989;
  padding: 0 12px;
  font-size: 12px;
  font-family: "Pretendard";
  &::placeholder {
    color: #c4c4c4;
  }
`;
export const TextArea = styled(Input).attrs({ as: "textarea" })`
  height: 200px; /* textarea에 맞는 크기 */
  resize: none; /* 크기 조절 비활성화 */
  padding: 12px; /* padding 추가 */
`;

export const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  font-family: "Pretendard";
  margin: 20px 0 20px;
`;

export const Hr = styled.hr`
  border: 1px solid #f2f2f2;
  margin: 1em 0;
`;