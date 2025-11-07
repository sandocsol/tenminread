import React from 'react';
import styled from 'styled-components';

const BookInfoContainer = styled.div`
  width: 317px;
  height: 116px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 20px 0;
  margin-bottom: 16px;
  position: relative;
  border-bottom: 1px solid rgba(226, 222, 212, 1);
  
`;

const BookInfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
  margin-right: 20px;
`;

const AuthorName = styled.p`
  font-family:  sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: normal;
  color: ${props => props.theme === 'dark' ? 'rgba(248, 243, 232, 0.3)' : 'rgba(46, 42, 39, 0.3)'};
  margin: 0;
`;

const BookTitle = styled.p`
  font-family:  sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: normal;
  color: ${props => props.theme === 'dark' ? '#f8f3e8' : '#2e2a27'};
  margin: 0;
  white-space: pre-wrap;
`;

const DayInfo = styled.div`
  display: flex;
  gap: 5px;
  align-items: flex-start;
`;

const DayText = styled.p`
  font-family:  sans-serif;
  font-weight: 600;
  font-size: 13px;
  line-height: normal;
  color: #7f7975;
  margin: 0;
  white-space: pre;
`;

const BookCover = styled.div`
  width: 62px;
  height: 76px;
  flex-shrink: 0;
  overflow: hidden;
  background-color: ${props => props.theme === 'dark' ? '#3a3633' : '#f5f5f5'};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

/**
 * BookInfoHeader 컴포넌트
 * 책 정보를 표시하는 헤더 (작가, 제목, 일차, 표지)
 * 
 * @param {string} author - 작가 이름
 * @param {string} title - 책 제목
 * @param {number} day - 일차 (선택사항)
 * @param {string} coverImage - 책 표지 이미지 URL (선택사항)
 * @param {string} theme - 테마 ('light' | 'dark')
 */
function BookInfoHeader({ author, title, day, coverImage, theme = 'light' }) {
  return (
    <BookInfoContainer>
      <BookInfoText>
        {author && (
          <AuthorName theme={theme}>{author}</AuthorName>
        )}
        {title && (
          <BookTitle theme={theme}>{title}</BookTitle>
        )}
        {day !== undefined && day !== null && (
          <DayInfo>
            <DayText>{day}일차</DayText>
          </DayInfo>
        )}
      </BookInfoText>
      {coverImage && (
        <BookCover theme={theme}>
          <img src={coverImage} alt={title || '책 표지'} />
        </BookCover>
      )}
    </BookInfoContainer>
  );
}

export default BookInfoHeader;

