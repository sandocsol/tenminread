import styled from 'styled-components';

const TOCContainer = styled.div`
  width: 100%;
  min-height: 581px;
  background-color: #f2e9da;
  padding: 31px 30px 0 30px;
  box-sizing: border-box;
`;

const TOCList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TOCItem = styled.li`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #6f665f;
  padding: 12px 0;
  border-bottom: 1px solid rgba(111, 102, 95, 0.2);
  
  &:last-child {
    border-bottom: none;
  }
`;

const EmptyState = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #6f665f;
  text-align: center;
  padding: 40px 0;
  opacity: 0.6;
`;

/**
 * BookTOC 컴포넌트
 * [목차] 탭을 눌렀을 때 보이는 목차 리스트
 * 
 * @param {string} toc - 목차 문자열 (예: "1. 두 세계\n2. 카인\n...")
 * @param {Array} chapters - 목차 배열 (예: [{ title: "1장", page: 10 }, ...]) - 선택적
 * @param {object} bookTOCData - 책 목차 데이터 객체 { bookId, toc } (선택적)
 * @param {boolean} isLoading - 로딩 상태
 */
function BookTOC({ toc, chapters, bookTOCData, isLoading = false }) {
  // bookTOCData에서 목차 정보를 우선 사용
  const tocString = toc || bookTOCData?.toc || '';
  
  // toc 문자열을 줄바꿈으로 분리하여 배열로 변환
  const tocList = tocString 
    ? tocString.split('\n').filter(item => item.trim())
    : chapters || [];

  if (isLoading) {
    return (
      <TOCContainer>
        <EmptyState>목차를 불러오는 중...</EmptyState>
      </TOCContainer>
    );
  }

  if (!tocList || tocList.length === 0) {
    return (
      <TOCContainer>
        <EmptyState>목차 정보가 없습니다.</EmptyState>
      </TOCContainer>
    );
  }

  return (
    <TOCContainer>
      <TOCList>
        {tocList.map((chapter, index) => (
          <TOCItem key={index}>
            {typeof chapter === 'string' 
              ? chapter.trim()
              : `${chapter.title || chapter.chapter || index + 1}${chapter.page ? ` (${chapter.page}페이지)` : ''}`}
          </TOCItem>
        ))}
      </TOCList>
    </TOCContainer>
  );
}

export default BookTOC;

