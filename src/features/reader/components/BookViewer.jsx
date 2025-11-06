import React from 'react';
import styled from 'styled-components';

const BookContentContainer = styled.div`
  width: 317px;
  display: flex;
  flex-direction: column;
  gap: 13px;
  align-items: flex-start;
  
  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const ChapterTitle = styled.p`
  font-family:  sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: normal;
  color: ${props => props.theme === 'dark' ? '#f8f3e8' : '#2e2a27'};
  margin: 0;
  width: 100%;
`;

const ParagraphContainer = styled.div`
  font-family: sans-serif;
  font-weight: 500;
  font-size: ${props => (props.fontSize / 100) * 16}px;
  line-height: ${props => (props.fontSize / 100) * 24}px;
  color: ${props => props.theme === 'dark' ? '#f8f3e8' : '#2e2a27'};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px; /* 문단 사이 간격 */
  
  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const Paragraph = styled.p`
  margin: 0;
  white-space: pre-wrap;
  word-break: keep-all;
`;

/**
 * BookViewer 컴포넌트
 * 순수 텍스트를 받아서 문단으로 나누어 렌더링합니다.
 * 
 * @param {string} text - 렌더링할 순수 텍스트 (줄바꿈 문자로 문단 구분)
 * @param {string} chapterTitle - 챕터 제목 (선택사항)
 * @param {number} fontSize - 폰트 크기 비율 (기본 100)
 * @param {string} theme - 테마 ('light' | 'dark')
 */
function BookViewer({ text, chapterTitle, fontSize = 100, theme = 'light' }) {
  if (!text) {
    return null;
  }

  // 텍스트를 줄바꿈 문자로 나누어 문단 배열 생성
  // 빈 줄은 제거하고 실제 내용이 있는 문단만 렌더링
  const paragraphs = text
    .split('\n')
    .map(para => para.trim())
    .filter(para => para.length > 0); // 빈 줄 제거

  return (
    <BookContentContainer>
      {chapterTitle && <ChapterTitle theme={theme}>{chapterTitle}</ChapterTitle>}
      <ParagraphContainer fontSize={fontSize} theme={theme}>
        {paragraphs.map((paragraph, index) => (
          <Paragraph key={index}>
            {paragraph}
          </Paragraph>
        ))}
      </ParagraphContainer>
    </BookContentContainer>
  );
}

export default BookViewer;
