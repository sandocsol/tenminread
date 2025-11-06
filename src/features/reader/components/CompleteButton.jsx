import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CompleteButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 21px;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const DescriptionText = styled.p`
  font-family: sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: normal;
  color: ${props => props.theme === 'dark' ? 'rgba(226, 222, 212, 0.4)' : 'rgba(46, 42, 39, 0.4)'};
  text-align: center;
  margin: 0;
  width: auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  align-items: center;
`;

const QuizButton = styled.button`
  width: 272px;
  height: 50px;
  border-radius: 10px;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  background-color: ${props => props.theme === 'dark' ? '#1a1509' : '#fdd470'};
  
  &:hover {
    opacity: 0.9;
  }
  
  &:active {
    opacity: 0.8;
  }
`;

const QuizButtonText = styled.span`
  font-family: sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: ${props => props.theme === 'dark' ? '#f6c650' : '#ffffff'};
  white-space: pre;
`;

const CompleteButton = styled.button`
  width: 272px;
  height: 50px;
  border-radius: 10px;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  background-color: ${props => props.theme === 'dark' ? '#4c433c' : '#f4f4f4'};
  
  &:hover {
    opacity: 0.9;
  }
  
  &:active {
    opacity: 0.8;
  }
`;

const CompleteButtonText = styled.span`
  font-family: sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: ${props => props.theme === 'dark' ? '#c4b797' : '#e8bc50'};
  white-space: pre;
`;

/**
 * CompleteButton 컴포넌트
 * 독서 완료 후 퀴즈 풀기 및 독서 완료 기능을 제공합니다.
 * 
 * @param {string} bookId - 현재 읽고 있는 아티클의 고유 ID
 * @param {string} theme - 테마 ('light' | 'dark')
 * @param {function} onComplete - 독서 완료 버튼 클릭 시 호출되는 콜백 함수 (선택사항)
 */
function CompleteButtonComponent({ bookId, theme = 'light', onComplete }) {
  const navigate = useNavigate();

  const handleQuizClick = () => {
    if (bookId) {
      navigate(`/quiz/${bookId}`);
    }
  };

  const handleCompleteClick = () => {
    if (onComplete) {
      onComplete();
    }
    // TODO: 독서 완료 API 호출 또는 다른 로직 추가
  };

  return (
    <CompleteButtonContainer>
      <DescriptionText theme={theme}>
        읽은 내용을 정리하면 기억에 오래 남아요
      </DescriptionText>
      <ButtonGroup>
        <QuizButton theme={theme} onClick={handleQuizClick}>
          <QuizButtonText theme={theme}>퀴즈 풀기</QuizButtonText>
        </QuizButton>
        <CompleteButton theme={theme} onClick={handleCompleteClick}>
          <CompleteButtonText theme={theme}>독서 완료!</CompleteButtonText>
        </CompleteButton>
      </ButtonGroup>
    </CompleteButtonContainer>
  );
}

export default CompleteButtonComponent;

