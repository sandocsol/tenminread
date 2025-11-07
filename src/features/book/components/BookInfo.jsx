import styled from 'styled-components';

const InfoContainer = styled.div`
  width: 100%;
  min-height: 581px;
  background-color: #f2e9da;
  padding: 42px 30px 0 30px;
  box-sizing: border-box;
`;

const Section = styled.div`
  margin-bottom: 40px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #6f665f;
  margin: 0 0 20px 0;
`;

const SectionContent = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #6f665f;
  margin: 0;
  white-space: pre-wrap;
`;

const AuthorName = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: normal;
  color: #6f665f;
  margin: 0 0 20px 0;
`;

/**
 * BookInfo 컴포넌트
 * [소개] 탭을 눌렀을 때 보이는 "무엇에 관한 책인가요?"와 "작가 소개" 섹션
 * 
 * @param {string} description - 책 소개 내용
 * @param {string} authorInfo - 작가 소개 내용
 * @param {string} authorName - 작가 이름
 * @param {object} bookData - 책 데이터 객체 전체 (선택적)
 */
function BookInfo({ description, authorInfo, authorName, bookData }) {
  // bookData가 제공되면 우선 사용
  const bookIntro = description || bookData?.bookIntro || '';
  const authorBio = authorInfo || bookData?.authorBio || '';
  const author = authorName || bookData?.author || '';

  return (
    <InfoContainer>
      <Section>
        <SectionTitle>무엇에 관한 책인가요?</SectionTitle>
        <SectionContent>{bookIntro}</SectionContent>
      </Section>
      
      <Section>
        <SectionTitle>작가 소개</SectionTitle>
        {author && <AuthorName>{author}</AuthorName>}
        <SectionContent>{authorBio}</SectionContent>
      </Section>
    </InfoContainer>
  );
}

export default BookInfo;

