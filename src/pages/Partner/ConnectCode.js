import React, { useState , useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import AppContainer from "../../components/AppContainer";
import NavigationBar from '../../components/Nav/NavigationBar';
import ContentContainer from '../../components/ContentContainer';
import PurpleButton from '../../components/button/PurpleButton';
import { ButtonWrapper } from '../../components/button/ButtonWrapper';

const Title = styled.h2`
  color: #000000;
  padding-top: 10px;
  margin-top: auto;
  width: 100%;
  text-align: left;
  font-size: 16pt;
`;

const Code = styled.h1`
  color: #B49AD9;
  width: 100%;
  text-align: center;
  font-size: 12pt;
  cursor: pointer;
`;

const CodeContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 27px;
  font-size: 16px;
  border-radius: 10px;
  color: #B49AD9;
  border: 0;
  text-align: center;
  position: relative;
  outline: none;
  
  &:focus + .underline::after,
  &:not(:placeholder-shown) + .underline::after {
    width: ${props => `${props.value.length}ch`};
  }
`;

const Underline = styled.div`
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background-color: black;
  transition: width 0.3s ease;
`;

const ConnectCode = () => {
  const [isInputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleCodeClick = () => {
    setInputVisible(true);
    setTimeout(() => {
      inputRef.current && inputRef.current.focus();
    }, 0);
  };

  const handleBlur = () => {
    if (inputValue === '') {
      setInputVisible(false);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <AppContainer>
      <NavigationBar />
      <ContentContainer>
        <Title>파트너의 커플 코드를<br />입력해 주세요.</Title>
        <CodeContainer>
          {isInputVisible ? (
            <InputWrapper>
              <Input
                type="text"
                ref={inputRef}
                onBlur={handleBlur}
                value={inputValue}
                onChange={handleChange}
              />
              <Underline className="underline" />
            </InputWrapper>
          ) : (
            <Code onClick={handleCodeClick}>코드 입력</Code>
          )}
        </CodeContainer>
            <ButtonWrapper>
            <Link to="/"></Link>
            <PurpleButton>파트너 연결하기</PurpleButton>
            </ButtonWrapper>
        </ContentContainer>
        </AppContainer>
    );
    
}

export default ConnectCode;